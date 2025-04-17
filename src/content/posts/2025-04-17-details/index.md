---
title: "When Is a Detail Just a Detail?"
date: 2025-04-17T01:05:03+00:00
lang: en
slug: "when-is-a-details-just-a-detail"
description: >
  A common phrase in software development claims that "X is just a detail"—but is that really true?
---

> The database is just a detail.

A phrase often repeated in programming circles, echoed in software architecture discussions, and found in the pages of influential tech books. But is it true? Yes—and no. Let’s unpack why this seemingly simple statement is both insightful and misleading.

In the early days of understanding the universe, humanity widely believed the Earth was the center of everything—a concept famously challenged by Copernicus. He proposed a revolutionary idea: the Earth is not central, but rather one of several planets orbiting the Sun, which he placed near the center of the universe. Although his model retained some elements of earlier systems, it fundamentally shifted our view by making the Earth just one moving object among many in a cosmos more ordered and dynamic than previously thought.

We encounter a similar fallacy in software architecture. It’s tempting to look for a "center"—a component that grounds the system, a place where everything connects. For some, this central component is the database. For others, it might be the API layer, the event bus, or the domain model. But the truth is: there is no universal center.

There’s only context.

## What Is a Detail?

> A detail is a cognitive compression of everything outside our current mental focus.

In other words, something becomes a detail when we _choose_ not to engage with its complexity—when we mentally abstract it away to simplify the task at hand. This makes "detail" not a property of the component itself, but a property of our relationship to it at a specific moment.

A detail isn’t inherently less important. It’s just temporarily out of focus.

For example:

When building a service layer, I’m concerned with orchestrating logic, managing state transitions, and defining behavior. The database becomes a magical black box that "just stores stuff." I don’t care about query optimization or schema design right now.

When writing SQL, the tables, joins, and indexes are front and center. The service that calls these queries? It’s just an external entity making requests, a magical black box, a detail.

When implementing a command handler, the event bus that delivers the command feels like a black box. It simply "calls" my function. I don't care about how the subjects are partitioned, how the events are stored, or how the bus is implemented. It's just a detail at this moment.

## Details Are Relative

"Detail" is not a synonym for "irrelevant." It’s a reflection of our mental spotlight—what we’re choosing to illuminate, and what we’re willing to let fade into the background.

The relativity is crucial. Declaring that a component is a "detail" is thus an incomplete statement. Much like velocity, which must be defined relative to another object, the notion of a "detail" must be expressed in terms of which part of the system is being temporarily abstracted away from our cognitive focus. A component becomes a detail only relative to the part of the system we’re currently focusing on. Just like velocity, "detail" is not absolute.

It’s a **relationship**.


