---
title: "Types, Again"
date: 2025-11-02T01:06:08+00:00
slug: "types-again"
description: "Classes and types are not the same thing."
---

## Type

A type is the set of possible values of an expression. It is a label we use to name a set of values. For example, `Int` is the name for a finite set of all 32-bit integers. `Boolean` is a set with only two elements. `String` is a (huge) set of all possible character sequences.

Let's create our own types (for card playing purposes):

```haskell
data Suit = Club | Diamond | Heart | Spade
data CardValue = Two | Three | Four
     | Five | Six | Seven | Eight | Nine | Ten
     | Jack | Queen | King | Ace
```

A card suit is a type with only four values; a card value has `13` possible values.

There are two ways elements from two sets can be combined: **multiplication** and **addition** (AND and OR).

Multiplication (product type) is a simple `record` (common in programming languages), which defines a set of `4 x 13 = 52` cards:

```haskell
data Card = Card {value :: CardValue, suit :: Suit}
```

Addition (sum type) we've already used:

```haskell
data RedSuit = Heart | Diamond
```

This is probably the shortest possible introduction to (algebraic data) types. Types can be combined to create new types; sets of possible values.

Types also describe sets of functions. `String -> Int` is the set of all functions that take a `String` and return an `Int`. This type doesn't need a special name beyond its function signature.

## Typeclass

A typeclass resembles an `interface` in the OOP world. It exists to achieve so-called ad-hoc polymorphism. In short, this is polymorphism where each overloaded function (implemented method) can work in a different way; that is, each can use a different algorithm.

A typeclass describes a protocol, functions that are common to multiple types. They specify capabilities that types can provide; more precisely, typeclasses are constraints on types. While they add expressive power to the type system, they're not strictly necessary from a theoretical standpoint, but they're useful in practice.

Let's say in the above example we have a common function `isPowerful` that determines which suit and value are powerful. We want both `Suit` and `CardValue` to share the same function, so we introduce the typeclass `IsPowerful`:

```haskell
class IsPowerful a where
  isPowerful :: a -> Bool
```

Now we can implement the methods so that all hearts and queens are powerful cards:

```haskell
instance IsPowerful Suit where
  isPowerful Heart = True
  isPowerful _     = False
instance IsPowerful CardValue where
  isPowerful Queen = True
  isPowerful _     = False
```

The difference from an `interface` is that a typeclass allows "free" implementation; we have the ability to add this behavior to any type, even one over which we have no control. Interfaces require types to explicitly declare their implementation at definition time, while typeclasses can be implemented separately, anywhere in the codebase. Additionally, typeclasses support higher-kinded types; you can write a typeclass for type constructors like `Maybe` or `List`, not just concrete types. These are just some differences; there are more subtle distinctions in how they interact with type inference and constraint solving.

Typeclasses are not types.

## Class

Class is a concept most often associated with the OOP world, distinct from the concept of type. A class concerns runtime; it represents a template for an object. A class defines a factory for objects (constructor) and represents storage for objects (all objects of the same class). Classes are not used to check program correctness in the way types are used.

Classes, therefore, are not types. It seems to me that the term "class" was poorly chosen; there's no classification involved. A class is just a `blueprint`, `scheme`, `prototype`; yes, I deliberately chose these names because they appear in programming languages and better describe what a class actually is.

Classes can be viewed as syntactic convenience for bundling data with behavior. They introduce "dot" notation: `A.foo(B)` which is conceptually equivalent to the function `foo(A, B)`. While classes also provide encapsulation and dispatch mechanisms, these capabilities can be achieved through other language features. That's why functional languages don't need classes; they use algebraic data types, functions, and closures instead.

## Subtyping

Subtyping is defining a subset. For example, `Short` would be a subset of the set `Int`.

Since a subtype is a subset of the parent set (i.e., its parent), any value from the subset can be used in exactly the same way as a value from the parent set. A `Short` type should be able to be used in all functions that work with the `Int` type. Subtyping allows passing an instance of a subtype to any function that expects a supertype.

Is `Int` a subtype of `Float`, and `Float` of `Double`? This seems intuitive mathematically, but in practice these types have different representations and semantics; converting an `Int` to `Float` can lose precision for large values. If we have types `C > B > A` and an object `Maybe B`, is it allowed to contain `A` or `C`? Is there a way to see this from the definition? The answer depends on variance: `Maybe` is typically invariant, meaning `Maybe B` is neither a subtype nor supertype of `Maybe A` or `Maybe C`, even though `B` is between them. For a container to accept subtypes, it must be covariant; to accept supertypes, contravariant. Function arguments are contravariant (accepting supertypes of expected input) while return types are covariant (returning subtypes of declared output). In short: limit input, expand output.

It turns out that subtyping significantly complicates type inference and requires variance annotations and careful reasoning about substitutability. It's tedious to work with such complex formalism; especially when there's no need for it. Many programming languages avoid subtyping, or use it sparingly.

## Inheritance

Inheritance is something completely different: it is specialization of the child for specific use, reuse of certain behaviors from the parent, and possibly their modification. Inheritance is a strong relationship between two classes. When an interface inherits another, it simply extends it.

OOP textbooks try to attach an "IS-A" relationship to inheritance, riding the wave of the false assumption that a class is some kind of classification. Inheritance is not an "IS-A" relationship.

Consider the tension: suppose that `B` inherits most of its behavior from `A`, but changes one method `m`. If `B` is truly a _specialization_ of `A`, we might expect `B.m` to accept more specialized input than `A.m`; narrowing the requirements. However, if `B` is a _subtype_ of `A` (substitutable for `A`), then `B.m` **must** accept all inputs that `A.m` accepts; the input must be a supertype of `A.m`'s input, not a subtype. Inheritance as code reuse conflicts with inheritance as subtyping.

Inheritance is also a misnomer because it implies a parent-child relationship that doesn't exist, since classes don't deal with classification. Extension, subclassing, or specialization would be more appropriate names.

## Inheritance is not subtyping

Imagine a `deque` structure; a queue with two ends that allows addition and deletion on both sides. Therefore it has four functions: `insertFront`, `insertBack`, `removeFront`, and `removeBack`. If we use only `insertBack` and `removeFront` we get a regular queue. If we use only `insertFront` and `removeFront` we get a stack. Since we can implement both queue and stack from `deque`, it appears that `Stack` and `Queue` inherit from `Deque`. However, neither `Stack` nor `Queue` are subtypes of `Deque` because they don't support all of its functions. In fact, the situation is reversed; `Deque` is simultaneously a subtype of both `Stack` and `Queue`. Subtyping and inheritance are orthogonal principles.

---

Imagine we have a `Point` class with two properties, `x` and `y`.

```java
class Point {
	private final int x, y;
	boolean eq(Point other) {
    if (this.x == other.x && this.y == other.y) {
        return true;
    }
		return false;
	}
}
```

Now we need a new class, `ColorPoint`, which contains color in addition to coordinates.

```java
class ColorPoint extends Point {
	private final Color color;
	boolean eq(ColorPoint other) {
    if (super.eq(other) && this.color == other.color) {
        return true;
    }
		return false;
  }
}
```

Question: how many `eq()` methods exist in `ColorPoint`?

The correct answer is two methods. If we deconstruct the syntactic sugar of the class, we get the following overloaded (not overridden) functions:

```java
boolean eq(Point, Point);
boolean eq(ColorPoint, ColorPoint);
```

That's why when we write `cpoint.eq(point)`, the method from `Point` (the first function) is called, not from `ColorPoint`. If we had truly overridden the `eq` method, the compiler shouldn't allow the call `cpoint.eq(point)`. The `ColorPoint.eq` method accepts only `ColorPoint`, making it more restrictive than `Point.eq`; this violates substitutability. A proper override would need to accept `Point` (contravariant input), but then we lose type precision for color comparison.

Inheritance, therefore, is not automatically subtyping.

## Inheritance is subtyping

Nominal OOP languages are those in which subtyping is explicitly declared through inheritance; structural OOP languages are those in which subtyping is automatic based on structure; if a type contains all members of another type, it's considered compatible.

Nominal OOP languages (Java, C#) identify subtyping through the inheritance mechanism. Every class `A` has its own type that contains all instances of `A`, as well as all instances of all classes that inherit from `A`. In other words, `B` is a subtype of `A` if and only if `B` inherits from `A`.

Here comes the tricky part; since the point of subtyping is using subtypes instead of supertypes, the programmer is the one who **must** ensure the parent class contract; that is, ensure that the child behaves the same way. This is the most important pillar of OOP, and the only one I would say that is specific to this paradigm. The programmer must respect the Liskov Substitution Principle (LSP) so that inheritance, in addition to what it is, is also subtyping.

Looking back, it turns out that OOP depends only on the programmer's attention; and in return we get the syntactic sugar of classes and an imposed type hierarchy. OOP seems increasingly contrived to me.

Back to `ColorPoint`; in the light of OOP, it's incorrectly written. To truly override the `eq` method, the signature needs to be identical:

```java
class ColorPoint extends Point {
	private final Color color;
	boolean eq(Point other) {
    // well... figure it out.
  }
}
```

## Kind

Kinds are types of types.

Just as values have types, types themselves have kinds. This is the next level up in the type hierarchy; a meta-type system that classifies types.

The simplest kind is `*` (pronounced "star" or "type"), which represents concrete types. `Int`, `String`, and `Bool` all have kind `*`. These are types that have actual values inhabiting them.

Type constructors have more complex kinds. `Maybe` has kind `* -> *`; it takes a concrete type and produces a concrete type. `Maybe Int` has kind `*`, but `Maybe` by itself is not a concrete type.

Similarly, `Either` has kind `* -> * -> *`; it takes two concrete types to produce a concrete type. `Either String Int` has kind `*`.

Higher-kinded types go further. A type constructor that takes another type constructor has kind `(* -> *) -> *`. For example, a functor type class might work with any `f` of kind `* -> *`.

Kinds prevent nonsensical type expressions. You cannot write `Int Maybe` because the kinds don't align; `Int` has kind `*` while type application expects something of kind `* -> *` on the left.

Most programmers never think about kinds explicitly. The compiler handles kind inference just as it handles type inference. But understanding kinds helps when working with advanced type system features like higher-kinded polymorphism or type-level programming.
