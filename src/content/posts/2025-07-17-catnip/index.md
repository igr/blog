---
title: "CATNIP"
date: 2025-07-17T01:05:03+00:00
lang: en
slug: "catnip"
description: >
  C.A.T.N.I.P. is a mnemonic for six development practices that make a difference.
---

Six development practices that make a difference: **CATNIP**.

## C • Composition Over Inheritance

There is no longer a need to revisit this topic: it has become widely accepted knowledge. After decades, the consensus is clear: inheritance should be avoided. No programming language has successfully implemented [the original concept](https://oblac.rs/lsp/) as intended, and, in practice, such an implementation is unnecessary. We should move away from inheritance.

## A • Aggregations Modeled as Data Types

The correct way to model [aggregations](https://oblac.rs/aggregations/) is through a data type that contains both the "whole" and the collection of "parts."

Rather than representing aggregations as raw collections, define a data type: e.g., `ActivePlayers(Team, Player[])`. The team no longer directly holds a collection of players. More important, the aggregate type now clearly communicates the nature of the relationship.

## T • Types for Communication

So called "primitive obsession" is a code smell is one of the most spread and harmful engineering issue.

Domain must be expressed with domain types. `String` is NOT a domain type. It is a generic, primitive type that has no additional notion than it's just an array of characters. Is it a key? Is it a user name? Is it a number? Who knows.

Types are the foundation of communication in software development. They define the shape and structure of data, enabling developers to reason about it and ensure its correctness. By using domain-specific types, we can communicate our intentions more clearly and avoid misunderstandings. Types are also essential for enforcing constraints and ensuring data integrity.

## N • Nulls are Harmful – Avoid Them

There is no semantic in nothingness.

`null` attempts to signify the absence of a value while paradoxically being assigned as a value itself. Using `null` undermines the effectiveness of compile-time checks, leading to errors only discoverable during runtime. `null` acts as an exception to strict type definitions, being a gap within an otherwise robust type system, since it can be assigned to any type. `null`’s ambiguity further complicates its usage as it implies various states—such as an uninitialized state, a missing value, or an error condition.

## I • Immutability Wherever Possible

Immutability is, first and foremost, cognitive compression: when an object is created, we don’t want to worry about it being magically changed at some later point in the program. With immutable data, once you know the value of something, you always know it. This simplifies reasoning about code dramatically.

Mutable state forces you to mentally track how data might change as control flows through your program — especially in complex systems with multiple functions, threads, or modules. Every assignment to a mutable variable becomes a potential source of bugs. When a value can change, you are required to think about when and how it changes, and whether it could be changed in ways you didn’t expect.

By treating data as immutable, we turn the program into a series of transformations from one state to the next, rather than a tangled sequence of mutations.

Granted, some languages do not offer convenient support for immutability. But that is not a reason to avoid it: form should follow functionality.

## P • Pure Functions by Default

Functions with non-deterministic output, known as impure functions, rely on external states, making them inherently dependent on factors outside their scope. This dependency makes understanding impure functions more challenging as their behavior is not determined by the code within the function itself.

While impure functions are an integral part of programming, it is advisable to limit their use by either minimizing their number or by managing the side effects.

Pure functions serve as the foundation elements of a program. Their deterministic nature and self-contained design allow them to be combined in various ways, facilitating straightforward development due to their predictable behavior.
