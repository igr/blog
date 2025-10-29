---
title: "Monads, Again"
date: 2025-10-30T01:05:03+00:00
lang: en
slug: "monads-again"
description: >
  Yet another (updated) post about monads: nothing spectacular, just an overview.
---

**A monad generalizes composition of computations (or effectful functions).**

To make sense of this, it helps to start with its formal definition:

> **A monad is a monoid in the category of endofunctors.**

Category theory is a highly abstract branch of mathematics that focuses on _relationships_: specifically, relationships between objects. It deals with "pure" abstractions: instead of working with concrete numbers, it studies relations, relationships between relations, and so on. This kind of abstract thinking has proven surprisingly powerful and has found applications across many areas of science, including computer science and programming language theory.

**Legend:**

+ ⭐️ - explanation of a concept or term,
+ 🤦‍♀️ - supplementary material that goes beyond the main topic
+ 🔥 - layman's explanation. Not a formal definition, and often not even technically precise; but it helped me understand.

## Category

⭐️ **A set** is a collection of distinct objects, referred to as the _elements_ of the set. The _elements_ can be anything, of any kind, including other sets. A set may also be empty.

⭐️ **An algebraic structure** is a set equipped with:

+ one or more elements,
+ one or more operations on those elements (typically binary), and
+ a finite number of distinguished elements called _identities_.

Such a non-empty set, together with its operations and identities, qualifies as an _algebraic structure_. The same applies to the other structures we’ll discuss later.

⭐️ **A category** is an algebraic structure made of objects and morphisms. Two simple laws tie everything together and make it a proper category.

⭐️ **Objects** in a category can be anything, real or imagined: numbers, planets, cars, flowers, sets, matrices - you name it.

⚠️ Objects from category theory have nothing to do with OOP, they just share the same name. Let's forget about OOP!

⭐️ **Morphisms** are the relationships (or _arrows_) between objects. A morphism represents a mapping from one object to another within a category. Not every pair of objects necessarily has a morphism between them.

If `A` and `B` are objects in a category `C`, then their relation, i.e., morphism `f`, is written as:

```
f : A → B
```

🔥 **Category theory is more concerned with morphisms than with objects!** In category theory, objects are essentially "black boxes": you can't look inside them or ask about their internal structure. What matters is: 1) How objects relate to each other (the morphisms/arrows) 2) How morphisms compose 3) The patterns and structures formed by morphisms.

⭐️ **Composition.** It’s not enough for a category to simply have relationships (i.e., morphisms). To truly form a category, there must also be a way to compose those morphisms.

Composition is denoted by a circle `∘` which reads as "after." For every pair of morphisms `f : A → B` and `g : B → C`, there must exist a morphism `h` that represents their composition, linking `A` directly to `C`:

```
h = g ∘ f : A → C
```

We say that `f` is composed with `g`; we read it as "`g` after `f`."

So, a category doesn’t just have relationships (functions, morphisms, arrows) between its objects, these relationships must also compose. In other words, every pair of connected morphisms can be replaced by a single morphism that represents their composition.

Composition `∘` is a binary operation on two morphisms: it takes two morphisms and produces a third.

⭐️ **Laws of a category.** The composition of morphisms is not arbitrary: it’s governed by two fundamental laws (or axioms). These are the rules that composition must obey for the structure to qualify as a category.

⭐️ **Identity law:** For every object in a category, there must exist an identity morphism (often just called "an identity").

An identity is a morphism that maps an object to itself. For every object `A` in a category, there must exist an identity morphism `id_A : A → A` such that:

```
id_A ∘ f = f = f ∘ id_A
```

No matter how you compose a morphism with an identity, it remains unchanged.

In other words, the identity acts as the "zero" of composition: an operation that leaves everything exactly as it is (just as adding zero leaves a number unchanged).

⭐️ **Associativity law:** Composition in a category must be associative. For any three morphisms `f`, `g`, and `h`:

```
h ∘ g ∘ f = (h ∘ g) ∘ f = h ∘ (g ∘ f)
```

No matter how we group the compositions, the result is the same. That’s why parentheses are unnecessary and usually left out when writing compositions.

🚀 **Now a category is fully defined.**

### Category: Summary

⭐️ **A class** in mathematics is a collection of sets, each uniquely determined by some shared property of its members. For example, the set `{2, Blue}` cannot belong to a class, because its elements have nothing in common. However, the sets `{2, 8}` and `{Blue, Red, Yellow}` can belong to a class, since each set’s elements share a common property.

🤦♂️ **Let's summarize:** in category `C` we have:
+ **objects** - forming the class `ob(C)`
+ **morphisms** - forming the class `hom(C)`. When we write `hom(A,B)`, this refers to the class of all morphisms from `A` to `B`
+ **Binary operation** `∘` called "composition of morphisms," defined for any three objects `A`, `B`, and `C` as:

```
∘ : hom(B,C) × hom(A,B) → hom(A,C)
```

This binary operation also obeys the laws: associativity and identity.

### Example Category: WWW

**Is the internet (WWW) a category?**

+ Objects are web pages ✅
+ Morphisms are links; page A has a link to page B ✅
+ Composition? If A links to B, B to page C, does a link from A to C exist? No. ❌

The internet (as a graph of direct links) is not a category.

But if we change what we consider a morphism, things get interesting. Instead of treating a morphism as a direct link, let’s treat it as a path: a sequence of zero or more links connecting two pages. Now WWW actually becomes a category:

+ Composition exists: if there's a path from A to B and from B to C, then there's a path from A to C. ✅
+ Identity exists: every page has a path to itself (a path of length zero). ✅
+ Associativity holds: the way we group paths doesn’t matter. ✅

⭐️ **This kind of category is also called a "free category,"** because it's built by freely composing the arrows of a directed graph, that is, by considering all possible paths.

### Example Category: Inheritance of Programming Types

Let's define a category over types in a program:

+ Objects are types in the programming language: `Int`, `String`, `Book`… ✅
+ morphism is the "isSubclassOf" (or "extends") relation. For example, `Int -> Number`. ✅
+ Composition exists. Example: `Int -> Number -> Object` ✅

**Types in a programming language form a category.**

#### Brief Note on Types in Programming Languages

 A type in a programming language defines the set of all possible values that belong to that type. For example, `Bool` represents a set of two values. `Number` represents the set of all numeric values programming language supports, and `Int` is a subset containing only integers.

Functions also have types. The type `String → Int` is the set of all possible mappings from strings to integers, regardless of what any particular function actually computes.

🔥 In functional programming, **functions are values with function types**. A function like `f: Int → String` is a value of type `Int → String`. Because functions are values, they can be passed as arguments, returned from other functions, and composed: exactly like morphisms in a category. Types themselves describe sets of values, and function types describe the set of all possible functions between two types.

### Categories in Programming: Scal/Hask

Every programming language has its category. In Haskell, this category is called "Hask"; in Scala, "Scal."

+ **Objects** are all types of that language. For example: `Int`, `String`, `Book`; but also `List[Book]`, `Map[Int, Double]`.
+ **Morphisms** correspond to functions. Morphism `f` is a function that takes a value of type `A` and returns an value of type `B`:

```scala
def f(a: A): B
```

Morphisms themselves also have a types in the language: for instance, `(A) => B` in Scala or `A -> B` in Haskell.

+ **Composition exists:**

```scala
def f(a: A):B
def g(b: B):C
def h(a: A):C = g(f(A))
```

Associativity also works.

**Identity morphism** is a function that returns the input unchanged:

```scala
def identity(a: A): A = a
```

🚀 **The category of a programming language is fully defined.**

## Two Worlds

🔥 **The programming structures that follow are essentially contexts that wrap values.**

We can divide types in a programming language category into two groups:

+ Ground types (concrete types): `Int`, `Book`, `String`
+ Type constructors (parameterized types): `List[_]`, `Option[_]`, `Future[_]`, etc.

A type constructor like `List[_]` or `Option[_]` provides a computational context for values. Think of it as a box, wrapper, container, or environment that holds values while adding some behavior or meaning:

+ `Option[A]` - context of possible absence,
+ `List[A]` - context of multiple values,
+ `Future[A]` - context of asynchronous computation,
+ `Either[E, A]` - context of possible error.

Most importantly, the context is _polymorphic_: it doesn't care what type it wraps. It only cares about the ability to apply functions (morphisms) to its contents while preserving the context structure.

🐈 Time for a joke: Schrödinger put a cat in a `Maybe` box :)

But it's not enough to just apply functions to contents. We also need to combine these contexts somehow. That's why a context must have appropriate behavior, i.e., an interface. Let's talk about that next.

We denote a type constructor generically as: `F[_]`.

## Functor

⭐️ **A functor** is a function that maps one category (algebraic structure) to another while preserving its structure. Given two categories `C` and `D`, a functor is a function `F : C → D` that:

+ maps every object in `C` to an object in `D`
+ maps every morphism in `C` to a morphism in `D`
+ preserves composition: `F(g ∘ f) = F(g) ∘ F(f)`
+ preserves identity: `F(id_A) = id_F(A)`

🤦♂️ **Covariant functor** denotes the direction `C → D`. There's also a contravariant functor from a so-called "opposite category" `C^op` toward `D`. Notice the terminology: it might remind you of generic type parameters in programming.

⭐️ **Endofunctor.** A functor doesn’t have to map between different categories; it can map a category to itself. Categories `C` and `D` don't have to be different. Such a functor is called an endofunctor. In fact, a functor is sometimes called a homomorphism of categories because it preserves their structure.

**In a programming language category, all functors are also endofunctors**: they map the category of types and functions to itself.

### Functor in Programming

⭐️ **Type constructor** is a generic definition of a programming type. `List` by itself is not a type, but `List[String]` is a type. `List` is a type constructor; denoted `List[_]`. A type constructor is also a function, because `A → List[A]`. More generally, a type constructor can be written as: `F[_]`.

⭐️ **In programming, a functor is a type constructor that satisfies one key criterion:** the type it constructs must implement a `map` (or `fmap`) function, which applies a function to the values inside the container.

In short:

+ A functor (type constructor) maps type `A` to type `F[A]`
+ `F[A]` implements `map()` which applies a function to transform its contents, e.g., from `F[A]` to `F[B]`
+ The composition and identity laws are preserved

⭐️ **The function `map(f : A → B)` applies a morphism to the value carried by the functor.** The `map()` function "lifts" a morphism from the "regular" world into the "containers" world and applies it to the value inside.

In other words, the function `map(f)` is itself a morphism in the category of functors.

⭐️ **Here's what the `Functor` trait looks in Scala:**

```scala
trait Functor[F[_]] {
  def map[A, B](fa: F[A])(f: A => B): F[B]
}
```

🤦♂️ `F` is also called an effect (or context). `List` is therefore both a functor and an effect. However, not every effect is a functor: an effect just abstracts some behavior.

For example, the `Option` effect encapsulates handles the possibility of missing values.

Reminder: `List` alone isn't a type. `List[String]` (or `List[A]`) is a concrete type. Once instantiated, it no longer behaves as a functor; the functor is the type constructor, not the type itself.

🔥 **Summary.** A functor is a type constructor that creates containers carrying values. The container type implements `map()`, which lifts a function from the world of values into the world of containers. `map()` applies the function to the value container holds, thereby changing it.

## Monoid

⭐️ **A semigroup** is a non-empty set (an algebraic structure) equipped with an associative binary operation `*` (notation, not multiplication). The operation `*` takes any two elements of the set and returns another element from the same set.

⭐️ **A monoid** is a semigroup that also has an identity element `id`, which satisfies:

```
id * x = x * id = x
```

for every element `x` in the set. This identity element `id` acts as a "unit": combining it with any other element leaves that element unchanged.

🤦♂️ A monoid can also be viewed as a category! A monoid `(M, *, id)` as a category has:

+ One object (representing the set)
+ Each element of `M` is a morphism from that object to itself
+ Morphism composition is the monoid operation `*`
+ Identity morphism is the identity element id

For example, in the monoid `(ℤ, +, 0)`:

+ There's one object `•`: essentially, a placeholder or dummy object. Here it represents "the integers as a whole."
+ Each integer like `5` is a morphism `• → •`
+ Composing `2` and `5` gives `2 + 5 = 7`
+ The identity morphism is `0`

⭐️ **A monoid is an abstraction of combining two elements of a set.**

Thanks to associativity, monoids support parallel combination and divide-and-conquer strategies. For example, in a monoid with integers `1`, `2`, `3`, and `4`, we can simultaneously (in parallel) combine the first pair (`1+2=3`) and the second pair (`3+4=7`), then combine the results (`3+7=10`).

**Monoids enable "divide-and-conquer" strategy, incremental accumulation, parallelism and composable operations.**

### Monoid in Programming

⭐️ **In programming, a monoid is a type with a binary associative operation and an identity element.**

```scala
trait Monoid[A] {
  def combine(x: A, y: A): A   // or mappend, or |+|
  def empty: A                 // identity element
}
```

The operation must satisfy:

+ Associativity: `combine(combine(a, b), c) == combine(a, combine(b, c))`
+ Identity: `combine(empty, a) == a == combine(a, empty)`

Examples of monoid instances:

```scala
object IntAddition extends Monoid[Int] {
  def combine(x: Int, y: Int): Int = x + y
  def empty: Int = 0
}
object StringConcat extends Monoid[String] {
  def combine(x: String, y: String): String = x + y
  def empty: String = ""
}
```

⭐️ **A monoid is formally written as a triplet: `(S, *, id)`:** set of elements, operation, identity.

**Examples of monoids:**
- `(Int, +, 0)`
- `(Int, *, 1)`
- `(String, +, "")`

Why monoids are useful: Because the operation is associative, we can:

+ Fold/reduce collections: `list.foldLeft(monoid.empty)(monoid.combine)`
+ Parallelize computation (split, combine parts, merge)
+ Incrementally accumulate results
+ Handle empty cases gracefully with empty

```scala
val numbers = List(1, 2, 3, 4)
numbers.foldLeft(IntAddition.empty)(IntAddition.combine)  // 10
```

🔥 **Summary.** A monoid is a type with a combining operation that's associative and has an identity element. This structure lets us safely combine values in any order (enabling parallelism) and handle empty cases.

## Natural Transformations

Let’s take a step back. We started with a category, where objects are connected by morphisms. A functor gave us the ability to map entire categories to one another, preserving structure. Now we can go one level higher: mapping functors themselves. So:

+ arrows/morphisms map objects to each other within a category
+ functors map entire categories to each other
+ natural transformations map functors to each other

**Example of a natural transformation:** the `headOption()` method transforms any `List[T]` to `Option[T]`, working uniformly for all types `T`. This is therefore a morphism: `List[T] → Option[T]` (from `List` functor to `Option` functor).

⭐️ **Natural transformations are morphisms between functors (relations for relations) that preserve internal structure.** Does this look like we can create a category of endofunctors?

## Monad (Step #1)

⭐️ **A monad is defined as a triplet `M = (F, η, μ)` (or equivalently `M = (F, unit, join)`):

- `F` is an endofunctor: `F : C → C` (maps objects in category `C` to objects in `C`, and morphisms in `C` to morphisms in `C`)
- `η` (eta, also called `unit`, `pure`, or `return`) is a natural transformation from the identity functor `Id : C → C` to our functor `F`. Thus: `unit : Id → F`. It "wraps" or lifts a value into the monad.
- `μ` (mu, also called `join`) is a natural transformation: `μ: F∘F → F`. It flattens nested structures: `F[F[A]] → F[A]`

From these, we can derive `flatMap`:

```scala
def flatMap[A, B](fa: F[A])(f: A => F[B]): F[B] =
  join(fa.map(f))
```

**Does this definition remind you of a monoid?** That's because a monad *is* a monoid.

## Monad (Step #2)

⭐️ If `C` was a category of types, let `End(C)` be a category of endofunctors:

+ objects: endofunctors (like `List`, `Option`, `Future`) ✅
+ morphisms: natural transformations of endofunctors. ✅
+ composition: natural transformations compose. If `α: F → G` and `β: G → H`, then `β ∘ α: F → H` . ✅
+ identity: for each endofunctor `F`, there's an identity natural transformation `id_F: F → F` ✅

Now, a monoid in `End(C)` is:

+ An object (one endofunctor `F`, like `List`, `Option`, `Future`)
+ A binary operation (multiplication): `μ: F∘F → F` (the `join` operation)
+ An identity element (unit): `η: Id → F` (the `pure`/`unit`/`return` operation)

🚀 **A monad is a monoid in the category of endofunctors.** The monoid gives us value wrapping and unwrapping of nested structures; the functor gives us monad chaining.

More precisely: a monad is an endofunctor `F` equipped with natural transformations:

+ η (`unit`) - giving us a way to lift values into `F`
+ μ (`join`) - giving us a way to flatten `F∘F` to `F`

These operations satisfy the monoid laws in `End(C)`, making `F` a monoid object in that category.

## Monad in Programming

🔥 Similar to a functor, **a monad is a type constructor: a container for values; that satisfies a certain criterion.** The types (containers) that a monad creates must implement two core operations: `flatMap()` and `unit()`.

**Example:**

```scala
// our category object
class User(name: String) {
  override def toString(): String = "<" + name + ">"
}

// fetches user
def fetchUser(id: Int): Option[User] =
  if (id == 2) None else Some(User("user" + id))

// composition
val users = List(1,2,3).map(id => fetchUser(id))
```

The result is `List[Option[User]]` with 3 elements, containers within a container. That's not what we want.

We need to transform the `List` container by combining elements and unwrapping nested containers.

⭐️ **The `flatMap()` function does exactly that: it maps, then "flattens" (straightens) the container's contents:**

```scala
val users = List(1,2,3).flatMap(id => fetchUser(id))
```

Now the result is `List[User]` with 2 elements (`user1` and `user3`; `user2` doesn't exist).

+ The `flatMap()` takes a function `A => M[B]`, maps it over `M[A]` to get `M[M[B]]`, then flattens to `M[B]`.
- The `unit()` "lifts" a value into the monad container: `A → M[A]`.

⭐️ **A monad in Scala might look like this:**

```scala
trait Monad[M[_]] {
  def unit[A](a: => A): M[A]
  def flatMap[A,B](ma: M[A])(f: A => M[B]): M[B]
}
```

Here, `M` is a monad, a type constructor that defines `flatMap` and `unit`. In practice, we often refer to the container itself as "the monad" (similar to functors).

⭐️ **A monad is also a functor.** We can derive the functor's `map` method as:

```scala
def map[A, B](ma: M[A])(f: A => B): M[B] =
  flatMap(ma)(x => unit(f(x)))
```

What's happening here? We apply the function `f(x)` to the inner value, but since the result isn't in a container, we must "lift" the result back with `unit()`.

## Trivia for the End

The name "monad" comes from blending "monoid" and "triad": "monoid" because it's a monoid in the category of endofunctors, "triad" because it packages three components: an endofunctor with two natural transformations.

We mentioned earlier: category theory isn’t concerned with values themselves, only with relationships.
This leads to a profound insight:

> An entity is defined not by what it is, but by how it relates to others.

That’s what the Yoneda lemma captures.

Does that mean the existence of anything is unambiguously defined only by existing relations?
