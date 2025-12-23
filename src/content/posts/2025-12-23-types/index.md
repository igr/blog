---
title: "Definitions to clarify typing"
date: 2025-12-23T01:06:08+00:00
slug: definitions-to-clarify-typing
description: "The core concepts behind types in programming in 3 sentences or less."
lang: en
---

## Type

A type is a name for a set of values. Some definitions also include operations (the “types are defined by their algebra” view), but I treat operations as separate. This does not mean types themselves cannot be algebraic.

## Data type

A data type is a concrete representation of data, such as a 32-bit integer. It describes how values are encoded in memory, which is often not important at higher abstraction levels.

## Abstract data type

An abstract data type describes what you can do with data, not how it is implemented. A `stack` is a classic example, defined by operations like `push`, `pop`, and their axioms, with implementation details hidden.

## Algebraic data type

An algebraic data type, or ADT, builds complex types using `AND` and `OR` combinations. Product types (records) represent `AND`, and sum types (like Either) represent `OR`. This is a systematic way to construct new types from simpler ones.

## Data structure

A data structure describes how data is organized in memory. This is especially important in low-level languages like C.

## Static vs. dynamic typing

Static typing checks types at compile time, catching many errors early. Dynamic typing checks types at runtime, offering more flexibility but potentially later failures.

## Strong vs. weak typing

Strong and weak typing are informal terms describing how strictly a language enforces type rules. Strong typing avoids implicit or unsafe conversions between unrelated types, such as treating `2` as `"2"`.

## Type constructors

A type constructor builds new types from existing ones. For example, `List[A]` can produce `List[Int]`. It operates on types, not on values.

## Kind

A kind is the type of a type. Concrete types like `Int` have kind `*`, while type constructors like `List` have kind `* -> *`, meaning they take a type and return a type. Kinds let us reason about type constructors the same way types let us reason about values.

## Nominal vs. structural typing

Nominal typing considers types equal only if they share the same declared name (as in Java). Structural typing considers types equal if they have the same shape, such as the same fields or methods (as in TypeScript).

## Type system & type theory

A type system is the set of rules that define how types work in a programming language. Type theory is the mathematical foundation behind type systems and is more abstract than everyday programming.

## Interface

An interface is a set of method signatures that separates what a type does from how it is implemented. It defines a contract that classes or objects must satisfy. A class is a blueprint for creating objects.

## Interface as a type

An interface is also a type representing the set of all its possible implementations. A `Foo` interface stands for any value whose concrete type implements `Foo`, making it similar to an existential type in a sense: "there exists some implementation satisfying these constraints."

## Interface vs. data type

An interface is not a data type because it does not define stored data. It is also not an algebraic data type, although interface inheritance resembles AND, and union types resemble OR.

## Parametric polymorphism

Parametric polymorphism allows code to work uniformly over any type. A function like `def identity[A](a: A): A` works the same way regardless of what `A` is.

## Ad-hoc polymorphism

Ad-hoc polymorphism allows different implementations for different types. Function overloading and type classes are common examples.

## Subtype polymorphism

Subtype polymorphism allows a value of a subtype to be used where a supertype is expected. If `Dog extends Animal`, a `Dog` can be passed to any function expecting an `Animal`. This is the polymorphism most OO programmers think of first.

## Variance

Variance describes how subtyping of type parameters affects subtyping of constructed types. Covariance preserves subtyping (`List[Dog] <: List[Animal]`), contravariance reverses it, and invariance allows neither. Covariance works for types in output position (producers), contravariance works for types in input position (consumers).
