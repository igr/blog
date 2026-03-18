---
title: "How I Introduced a Regression"
date: 2026-03-18T01:06:08+00:00
slug: how-i-introduced-a-regression
description: "A single undocumented exception, a missing finally, and 3 million daily jobs quietly grinding to a halt - and what Gleam gets right that Java never will."
lang: en
---

**Context:** as part of a monolith decomposition, I built a Java job engine that runs CPU- and I/O-heavy jobs via NATS. At the moment, we process 3+ million jobs daily.

At the core of the framework is a pull loop that fetches messages from the NATS stream. The job engine is bounded: there is an upper limit on how many parallel jobs a single replica can run (otherwise it will burn in flames:). The loop looked like this:

```java
private void runJobAsync() {
    limiter.acquire();
    executor.execute(() -> {
       runJob();
       limiter.release();
    });
}
```

The contract of `runJob` is that it never throws. The limiter acts as a soft lock, keeping the total number of running jobs under control.

## The Change

Months later, a change request came in. We needed optional behavior: to ack a NATS message once a job is complete. The same framework is used on both the client side (sending job requests and receiving job results) and the server side (receiving job requests and sending job results). These two cases require different treatment of NATS messages: job processing takes time, but processing job results does not.

Being a good boy, instead of using boolean magic, I created an interface to capture the behavior and added two implementations. Here is the updated snippet:

```java
private void runJobAsync() {
    limiter.acquire();
    executor.execute(() -> {
       runJob();
       ackStrategy.onJobEnd();
       limiter.release();
    });
}
```

Easy.

## The Error

The toughest thing about working with external services is handling invalid states. Under the mentioned load, NATS could get "confused" from time to time - but everything was resilient: the NATS client would reconnect when needed, causing only a slight pause in processing. Overall, NATS worked nicely for weeks.

Until it wasn't. Jobs stopped being processed even though the connection to NATS was fine.

The regression was introduced in the added line. One implementation of the strategy acks messages: an operation that can fail due to a temporary NATS issue. You see it now: an exception is thrown, `release()` is never called, and the number of available slots quietly drains over time, degrading throughput.

Damn errors that are invisible in signatures! `ack()` throwing is something you cannot see anywhere: the Java NATS client does not document it, and there is nothing in the method signature to warn you. No excuses, I should have known better. It's also a good example of how our brains play tricks on us: because the surrounding code had been working fine for months, it was mentally stamped as "safe." I was focused on something else entirely.

The fix is wrapping `onJobEnd()` in a `try/finally` block, and all that jazz.

## Enforcing Prevention

A better solution would be to explicitly declare a checked exception on `onJobEnd()`. But do we even need exceptions at all? I pity some design choices of mainstream languages.

Let's look for a better solution. Errors should be part of function results; it's that simple. But even if `onJobEnd()` returns some ADT, the programmer might simply miss handling it; nothing forces you to do otherwise.

Well, meet [Gleam](https://gleam.run): a language that gets this right. In Gleam, ignoring a non-`Nil` return value is a **compile error**. If `on_job_end` returns `Result(Nil, MyError)`, this won't compile:

```gleam
on_job_end()  // ❌ Error: value is unused
```

You are forced to either handle it:

```gleam
case on_job_end() {
  Ok(_) -> Nil
  Error(e) -> handle_error(e)
}
```

or explicitly discard it, making the intent visible in code:

```gleam
let _ = on_job_end()  // ✅ explicit, intentional discard
```

The key insight is that `let _ =` is a **loud silence**: a reader immediately knows a result was consciously thrown away, not forgotten. Brilliant!

What about Haskell?

Haskell uses the `-Wunused-do-bind` warning to catch this:

```haskell
runJobAsync :: IO ()
runJobAsync = do
  runJob
  onJobEnd   -- ⚠️ Warning: result discarded
  release limiter
```

To make the discard explicit:

```haskell
_ <- onJobEnd   -- ✅ explicit discard
```

Still, only a warning. Kotlin has `@CheckResult`, which can also produce a warning for an unused result; but again, not a compilation error.

Gleam is beautifully pragmatic. _If a function returns a value, you must use it._ That is the only sane default a programming language should have.
