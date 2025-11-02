---
title: "Variance"
date: 2025-11-03T01:06:08+00:00
slug: "variance"
lang: en
description: Producer Extends, Consumer Super
---

It all started with a simple question from my son, who asked me to explain the following question.

Given the following classes and definitions:

```scala
class List[+A]
class Printer[-A]

class Animal
class Bird extends Animal
class Ostrich extends Bird

def transformPrinter(f: Printer[Bird] => List[Bird]): Unit = ()
```

which of the following is correct?

```scala
transformPrinter(null : Any => Nothing)
transformPrinter(null : Printer[Nothing] => List[Nothing])
transformPrinter(null : Printer[Ostrich] => List[Ostrich])
transformPrinter(null : Printer[Animal] => List[Ostrich])
transformPrinter(null : Printer[Ostrich] => List[Animal])
transformPrinter(null : Printer[Animal] => List[Animal])
```

While I was (almost:) able to answer the question, at that moment I wasn’t able to _explain why_: I missed one important detail.

## Subtyping Order

The subtyping order is as follows: `Nothing <: Ostrich <: Bird <: Animal <: Any`. We are moving from the empty set on the left towards larger supersets to the right, until we end up with the universal set `Any` that contains everything. _Subtypes are on the left, supertypes are on the right._

That being established, what is the type order of the complex types, like `List[Bird]`, `Printer[Animal]`? Do we maintain the same order?

Welcome to variance.

**Variance** describes how subtyping relationships between complex types relate to the subtyping relationships of their components.

## The Three Kinds of Variance

1. **Covariance** (preserves subtyping direction)

+ The relationship goes in the same direction
+ Safe for output/producers (things you read from)
+ Example: In Java, `? extends T` is covariant
+ In Scala: `List[+A]` is covariant
+ `List[Nothing] <: List[Ostrich] <: List[Bird] <: List[Animal] <: List[Any]`

Covariance problem with writing:

```scala
// If List were covariant and mutable(!), this would be allowed:
var birds: List[Bird] = List(new Ostrich())

// but then we could do:
var animals: List[Animal] = birds // if covariance allowed this...
animals = animals :+ new Animal() // add a generic Animal
// now birds would contain a generic Animal, not a Bird!
```

2. **Contravariance** (reverses subtyping direction)

+ The relationship goes in the opposite direction
+ Safe for input/consumers (things you write to)
+ Example: In Java, `? super T` is contravariant
+ In Scala: `Printer[-A]` is contravariant
+ `Printer[Any] <: Printer[Animal] <: Printer[Bird] <: Printer[Ostrich] <: Printer[Nothing]`

Why does this make sense? A `Printer[Animal]` can safely be used wherever a `Printer[Bird]` is expected, because if it can print any `Animal`, it can certainly print a `Bird`.

Contravariance problem with reading:

```scala
// If we had contravariant lists (doesn't make sense, but hypothetically):
var animals: List[Animal] = List(new Animal(), new Bird())

// if contravariance were allowed:
var ostriches: List[Ostrich] = animals // opposite direction
val ostrich: Ostrich = ostriches.head // expecting an Ostrich...
// ...but we'd get a generic Animal or Bird!
```

3. **Invariant** (no subtyping relationship)

+ No relationship between the complex types, regardless of component types
+ Safe for both reading and writing (mutable structures)
+ Example: In Java/Kotlin, `T` is invariant
+ Example: In Scala, `Array[A]` is invariant
+ `Array[Animal]` and `Array[Bird]` have no subtyping relationship

## The Key Detail: Function Variance

Functions in Scala are contravariant in their parameters and covariant in their return type: `Function1[-T, +R]`. Broaden input, narrow output.

## Solving the Puzzle

The first answer is simple:

```scala
Any => Nothing ✅
```

It is correct since `-T` can be replaced with `Any`, and `+R` can be replaced with `Nothing`.

Now let's analyze `transformPrinter(f: Printer[Bird] => List[Bird])`. We need a function of type `Printer[Bird] => List[Bird]`, which is `Function1[Printer[Bird], List[Bird]]`. Since functions are `Function1[-T, +R]`:

+ Input (`-T`): we can provide a _supertype_ of `Printer[Bird]`
+ Output (`+R`): we can provide a _subtype_ of `List[Bird]`

What are the supertypes of `Printer[Bird]`?

Since `Printer[-A]` is contravariant:

```
Printer[Any] <: Printer[Animal] <: Printer[Bird] <: Printer[Ostrich] <: Printer[Nothing]
```

Supertypes are on the right; the answer is: `Printer[Bird] <: Printer[Ostrich] <: Printer[Nothing]`.

What are the subtypes of `List[Bird]`?

Since `List[+A]` is covariant:

```
List[Nothing] <: List[Ostrich] <: List[Bird] <: List[Animal] <: List[Any]
```

Subtypes are on the left; the answer is: `List[Nothing] <: List[Ostrich] <: List[Bird]`.

Now we know supertypes of the input and subtypes of the output.

Final answers:

```scala
Printer[Nothing] => List[Nothing] ✅
Printer[Ostrich] => List[Ostrich] ✅
Printer[Animal] => List[Ostrich] ❌
Printer[Ostrich] => List[Animal] ❌
Printer[Animal] => List[Animal] ❌
```
