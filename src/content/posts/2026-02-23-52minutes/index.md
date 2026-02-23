---
title: "52 Minutes of AI"
date: 2026-02-23T01:06:08+00:00
slug: 52-minutes-of-ai
description: "A simple JSON deserialization issue turned into a 52-minute experiment with AI. What seemed straightforward quickly exposed something deeper about how we write and structure code."
lang: en
---

It was a simple task: figure out what’s wrong with JSON de/serialization of a somewhat large hierarchy of types. It was not the first time I was prompting for a similar issue; I had previous experience with existing deserialization problems in the codebase.

This time, my dear _Claudette_ (Claude set into danger mode) took 52 minutes to resolve the issue. It failed: the final solution was far from working.

And that’s OK. This post is not another AI rant.

The core issue of the problem is "Smart Programmers" - and, just in case you missed it, I am being ironic here. For some unknown reason, we programmers try so hard to be "smart." In this case, the author of the code simply refuses to understand what a simple, dumb data class is. And since it's all Java, where class is the alpha and omega of programming, it's so easy to be "smart" and add business capabilities inside the data class - why not, right? - introducing unnecessary coupling between business logic and data. So much so that almost an hour and thousands of Opus tokens could not resolve it.

Don't be a smart programmer. Keep data dumb and typed. Keep functions away from data. That's the bare minimum you have to do.

Knowing what good code is matters.
