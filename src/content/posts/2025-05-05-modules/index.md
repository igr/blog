---
title: "Pure Modules"
date: 2025-05-05T01:05:03+00:00
lang: en
slug: "pure-modules"
description: >
  Pure Modules are self-contained, dependency-free units that define and implement business capabilities through clean APIs and internal contracts.
---

A **Pure Module** is a coherent, self-contained unit that exposes a well-defined capability. It’s compilable on its own, free from entanglement with the rest of the system. Think of it as a standalone building block: it knows what it does, how to do it, and what it needs, but nothing more.

## The Domain of a Module

Let’s break down what makes up a module’s **domain**:

+	**API**: This is the public face of the module: a set of function signatures that describe what it can do. These functions express _the verbs_ of your domain, the actions the module can perform.
+ **Domain Types**: These are the data structures (ADTs, value objects) used in the API. They represent _the subjects_ of your domain, the concepts your module works with.
+	**Contract**: A module might rely on certain functionality outside its own scope. The **Contract** defines this;  it’s an internal API that must be implemented for the module to work. It describes what the module requires to function. Not all modules need a contract.
+	**Module Definition**: This is the heart of the **Pure Module**. It’s where you define your API; but unlike the public API, the **Contract** still parameterizes these functions. In other words: `Definition + Contract = API`. You curry in the contract to produce usable API functions.

All of this - the API, domain types, contract, and definition - lives together as a single, compilable unit. A module is _just data_: a collection of functions bundled together in a principled way. Because of that, we model a module as a single data structure. It's an object in memory.

## Implementations

Once the domain is defined, you need to actually implement it.

+	**Local Implementation**: This is the actual business logic. It provides real, functional code for the module’s API, assuming the contract has been satisfied. Every module _must have_ at least one local implementation.
+ **Remote Implementation**: This handles the infrastructure side of things, like wiring the module into an HTTP service. It includes:
  1. **Service** - your actual web app or server that _uses_ the local implementation.
  2. **Client** - an implementation of the module’s API that forwards calls over the network (essentially an http client, a proxy).

The same local implementation is used both directly and remotely.

## Dependencies

**Pure Modules** _don’t depend on each other_. They don’t share types. They don’t know about each other. That’s what keeps them pure.

Dependency Injection (DI) often gets mistaken for modularity, but injecting external services _directly_ into your module breaks the abstraction. The injected code brings its own types and expectations. That’s not a contract, that’s coupling. Coupling itself isn’t inherently bad: some level of coupling is necessary for any working system. The key is _controlling_ the coupling: you want it to be explicit, predictable, and easy to adapt when things change. Contracts provide that control, while direct injection leaves you at the mercy of external shapes and behaviors.

The Contract implementation (often called a **bridge**) typically invokes other modules’ public APIs, but always through the lens of the current module’s own contract. This bridge is provided during application bootstrapping, not during module construction, because the module itself is unaware of the outside world.

## No Central Authority

**Pure Modules** are not organized around a central "core" or orchestrator. There’s no hexagonal, onion, or layered architecture here. This is mesh architecture: a web of small, focused modules, each with a clearly defined role and minimal assumptions.

## Example:

One example is worth a thousand words. [Here is one](https://github.com/igr/pure-modules).

Let’s take a closer look.

The `Library` module defines two functions in its public API. One of them needs to send a message, for example, to notify that a book was returned. Instead of directly depending on a messaging system, `Library` defines a **Contract**: a small function interface describing the capability it needs (sending a message), without knowing how it’s done.

Enter the `Messenger` module. It has its own domain types and public API for sending messages. The two modules remain decoupled, they don’t share types or depend on each other directly.

We connect them using a _bridge_: an implementation of the `Library` module’s contract that converts `Library’s` internal types to those understood by `Messenger`, and calls `Messenger’s` API. The `Library` module never knows it’s using `Messenger`; it just knows its contract is satisfied.

The `Messenger` module has a _local_ implementation, the real logic for sending messages. But it also provides a `Messenger` service, an HTTP layer over that same logic. This allows another module (like `Library`) to consume the same API remotely, via HTTP, by swapping in an HTTP-based implementation of the API.

## Topics I Didn't Cover

There are a few important topics I’ve intentionally left out; not because they’re unimportant, but because each deserves deeper treatment, with examples.

**Versioning** - This should happen at the module level. While SEMVER has its place, I’ve been leaning toward automatic versioning based on a hash of the module’s code structure.

**Dynamic loading** - Since modules are just data, they can be loaded (and even reloaded) at runtime, without restarting the application. This opens doors to hot-swapping capabilities or updating parts of the system dynamically.

**State** - The root of all evil, right? The name "Pure Module" suggests no internal state, which is often a good goal. Still, I tend to think of a module as a capability - and capabilities often need to manage state. The key is encapsulation: the state lives entirely inside the module and is only accessed through its API. It doesn’t leak.

**Granularity** - How big should a module be? It should represent a business capability. But often, a single capability will rely on several cooperating modules. So modules should be cohesive, not minimal: focused on owning and delivering one meaningful piece of functionality.
