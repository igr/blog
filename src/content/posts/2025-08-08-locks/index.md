---
title: "The Very First Time AI Really Helped Me"
date: 2025-08-08T01:05:03+00:00
lang: en
slug: "the-very-first-time-ai-really-helped-me"
description: >
  Jobs, locks and two smoking metaphors.
---

I needed to create a lock with a soft limit on the maximum number of acquired permits. The goal was to avoid blocking when acquiring the lock, since I intended to handle the blocking in a different method beforehand.

Let me explain the use case with the `Semaphore` (pseudo code):

```java
val list = fetchJobRequests(10)
for (jobRequest in list) {
	semaphore.acquire()
	runJobAsync(jobRequest)
	// runs job in a thread
	// calls semaphore.release() at the end
	ack(jobRequest)
}
```

The semaphore's `acquire()` method blocks when no permits are available. In this case, the fetched `jobRequest` sits idle until permits are released. This behaviour doesn't work for my use case: the blocking time is indeterminate and may cause the `jobRequest` to timeout. Note that the above code runs on a single thread.

I need two separate methods: one non-blocking for acquiring permits and one blocking for checking permit availability. Such a lock would have a soft permit limit, requiring careful usage. When these methods are used together, they enforce a hard limit that cannot be exceeded. The idea is to block _before_ fetching job requests when no permits are available, and always fetch exactly the number of requests that can be executed immediately. Something like:

```java
val availablePermits = min(lock.permits(), 10) // may block
val list = fetchJobRequests(availablePermits)
for (jobRequest in list) {
	lock.acquire()	// never blocks
	runJobAsync(jobRequest)
	// runs job in a thread
	// calls semaphore.release() at the end
	ack(jobRequest)
}
```

If I can't use `Semaphore` with a given number of permits, let's try `ReentrantLock`:

```java
public void waitForSlot() {
	while (activeJobs.get() > maxConcurrentJobs) {
		  lock.lockInterruptibly();
      lock.unlock();
    }
}
public void acquire() {
	if (activeJobs.incrementAndGet() > maxConcurrentJobs) {
		lock.lock();
  }
}
public void release() {
  final var current = activeJobs.decrementAndGet();
  if (current < maxConcurrentJobs) {
		lock.unlock();
	}
}
```

Granted, this is not _exactly_ what I described. The `waitForSlot()` doesn't return the number of available permits, but as long as it is called before the `acquire()`, we are getting similar behavior: the `waitForSlot()` blocks first.

Looks reasonable, doesn't it?

## With Little Help From My Friend

Fortunately, AI Capone objected. Can you see why?

The issue is that `ReentrantLock.unlock()` must be called from the same thread that acquired the lock! This isn't the case here, as `unlock()` is called from the job thread once the job finishes.

This completely escaped me! Sure, the issue would surface in the tests I wrote shortly afterwards, but there would still be time wasted going back and forth with CI and reviews.

The solution was to keep things simple and use `Semaphore` as a global, thread-safe lock instead (code tidied for brevity):

```java
public void acquire() {
    if (activeJobs.incrementAndGet() > maxConcurrentJobs) {
        semaphore.tryAcquire(0, TimeUnit.SECONDS);
    }
}
public void release() {
    final var current = activeJobs.decrementAndGet();
    if (current <= maxConcurrentJobs) {
        semaphore.release();
    }
}
public void waitForSlot() {
    while (activeJobs.get() > maxConcurrentJobs) {
        semaphore.acquire();
        semaphore.release();
    }
}
```

## The Road to Hell Is Paved with Good Intentions

AI Capone offered a solution for the `ReentrantLock.unlock` issue: use `isHeldByCurrentThread()` in `release()` to prevent exceptions from being thrown. Obviously the wrong approach. What worries me more is that using `isHeldByCurrentThread()` might work in tests, giving the untrained eye a false impression that everything's fine—and such code could reach production.

AI Capone was trying to address the symptom, not the cause.

## Run, You Fools!

Gandalf never said that. Gandalf also never advocated for Java and the primitive, deceptively comfortable languages we're drowning in today. Actually, Gandalf never said anything at all: he's a fictional character who exists only in books. Rather like the behaviour of `ReentrantLock`, it's documented only in Javadoc: it's not enforced in the code itself.

I'm constantly amazed by the inertia of software engineers. Granted, business focus is never on improving tools, but on producing faster. Even so, I believe computer languages must evolve rapidly too. Perhaps it's time for new language extensions that simply won't allow thread-unsafe code to be written? Languages with queues and distributed locks as first-class citizens? One that will leave bad practices behind?

As Gandalf, this is a fantasy.
