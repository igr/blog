---
title: "Woof, OOP?"
date: 2025-04-07T01:06:08+00:00
slug: "woof-oop"
description: >
  Object-Oriented Programming should focus on hiding data and exposing interactions, yet it’s often missing the essence.
---

At its core, OOP should be about just two key principles:

+ **Hide Data**
+ **Reveal Interactions**

That’s it. `HD,RI`.

Maybe it’s just my two decades of missing the point, but I believe something is deeply wrong with how OOP is usually taught and understood today. And it’s causing real, lasting damage to how we build software.

## Some Facts

🔥 **Objects don’t exist without interaction.**

This is a fundamental law of nature — and it applies to software too. You can’t model an object without knowing how it interacts with the world around it. Yet, OOP books always start with isolated objects: a bicycle has gears and can be ridden, a person has a name and age, a dog can bark. But that’s the wrong approach. You can’t design an object in isolation — you have to understand how it’s used.

🔥 **Interactions come first, behavior comes second.**

Behavior is a reaction to an interaction. That’s why we should first think about interactions — only then can we figure out what behaviors we need, and what abstractions make sense for our system.

🔥 **Data stays hidden inside objects.**

This point can’t be emphasized enough. Even though most OOP theory talks about encapsulation, I rarely see it respected in practice. There should be no shared global state, no public getters or setters. Each object keeps its own private data — only what it needs to function.

🔥 **Channels connect senders and receivers.**

Each object uses specific channels to communicate. Every pair of communicating objects has its own channel. A channel acts as an interface: it defines the name of the message and the data being passed. Messages are implemented as methods within the receiving object.

🔥 **Messages are signals.**

A message is a signal to the receiver: "Hey, do something" or "Hey, something happened." The message includes data the receiver actually needs — not whatever the sender happens to have lying around.

🔥 **Objects are not shared.**

You don’t send objects in messages — you send data. You don’t inject one object into another — you connect them with a communication channel. Objects are isolated and self-contained.

## Example in Java

Here's a simple scenario:

> Corgis run around a rectangular garden, moving one cell at a time without crossing the boundaries. They start with some energy, which decreases when they enter a cell occupied by other Corgis. When their energy reaches zero, they fall asleep and are removed. Each move prints the Corgi’s name and new position.

Check out [Java implementation here](https://github.com/igr/exemplatory/tree/main/corgi-dogs). Not your usual textbook material.
