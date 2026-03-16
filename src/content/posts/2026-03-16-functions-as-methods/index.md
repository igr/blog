---
title: "When a Type Has a Method?"
date: 2026-03-16T01:06:08+00:00
slug: when-a-type-has-a-method
description: "It started with a number. That became a type. And brought questions and tensions."
lang: en
---

In a recent home project, [Galcon](https://github.com/igr/galkon), I used rich domain types (like there is another way to program?). Take a look:

```kt
/** A planet in the galaxy. */
data class Planet(
    val label: PlanetId,
    val position: GridPos,
    val owner: Owner,
    val ships: ShipCount,
    val production: ShipCount,
    val killRatio: KillRatio,
)
```

Types are domain nouns. `Int` is just a number and has no domain meaning. `ShipCount` is a very specific domain value. If you are not using domain types, you are making an architectural mistake.

Anyway, I want to talk about value classes, or simple data types that just wrap a general type:

> Value classes (often inline classes) are a type-safe, performance-focused feature in languages like Kotlin and Scala that wrap a single, immutable value.

In the game, `ShipCount` is one such value class. It wraps an integer: but not _any_ integer; specifically, the number of ships:

```kt
@JvmInline
value class ShipCount(val value: Int) {
// ...
}
```

Simple, right? Let's look at some questions and topics behind this very small definition.

➡️ Wrapping a number in a value class usually leads to a bunch of enclosed methods and overloaded operators, for example:

```kt
operator fun plus(other: ShipCount) = ShipCount(value + other.value)
operator fun minus(other: ShipCount) = ShipCount(value - other.value)
```

This allows writing expressions like: `planetShips + productionShips`; pretty convenient, right? However, I always like to pause when designing value classes and reflect on the domain. It is so easy to just add and overload operators: accepting `Int`, for example: `plus(value: Int)`. But that would not be correct: we are assuming knowledge of the internal value's type, leaking the implementation detail.

➡️ Next: not every operator needs an implementation. A business case (during battle in the game) required decreasing the ship count by 1. My first, rushed approach was to add `minus(value: Int)`, so I could write: `ships - 1`. As I said above, that is not correct. So to decrease the count I started writing: `ships - ShipCount(1)`. But wait: I have a clear business intention here: _decrease the value by 1 during the battle_. So instead, I added a new method: `fun decrease() = ShipCount(value - 1)`. Now the intention is visible: `ships.decrease()`.

➡️ That opens a new question: should I override operators at all? The `+` operator in the game might become `reinforce()` or `join()`. Worth pondering.

➡️ Do you see the issue in the above definition of `ShipCount`? The publicly exposed internal value. At least, it should be `internal` or `private`. No other part of the code should depend on the internal storage structure (in this case, just an `Int`) of this type.

➡️ But then how would we write this:

```kt
((averageKill * planetShips.value / 8.0).toInt() + planetsOwned * 50)
```

This expression combines several domain types in a formula. There are two options: either each type has a `toScoreValue()` converter, or the `calculateScore` function lives in the `internal` scope of the types.

➡️ Wait! I haven't implemented the suggestions I'm making here. Not yet; but I will. Software is not built in a day.

---

Such a small type, and so many questions. And AI won't help here: it gives whatever we ask for, so we need to know what to ask.

## When Should a Function Become a Method?

This is the actual topic I want to talk about. Just to be clear: there is no single right answer to this question, but there are wrong ones.

The pure functional approach is beautifully simple: _data is dumb, functions are generic_. No operator shortcuts. Just take care that internals are not exposed outside the module, and that is all there is. More and more, I lean towards this approach.

A semantically different approach comes from other languages. I can think of the following reasons when a function earns the right to be a method:

1. It's fundamentally about the type's identity. If removing the operation would make the type feel incomplete, it belongs there. `list.append()`, `list.sort()`, `string.split()`: these define what it means to be a list or string. You can't really imagine the type without them.
2. It operates primarily on internal state. If the function needs privileged access to internals (not just the public API), it belongs inside. `list.sort()` can sort in-place efficiently because it owns the memory layout.
3. It has no meaningful existence outside that type. `str.startswith()` doesn't make sense on anything other than a string. A standalone `startswith(s, prefix)` would just be weird; it has no generality.
4. It's the natural vocabulary of the abstraction. Methods define how you talk about a type. `connection.close()`, `file.read()`, `iterator.next()`: these feel like verbs that belong to those nouns.

If you pay close attention, there are a lot of _feelings_ and _imagination_ in the rules above. That means people will have different opinions, without a concrete, deterministic, mathematical reason; myself included. There are periods when my rules are stricter or more relaxed. Currently, rule (`1`) makes the most sense to me; the others I would ignore. And I wouldn't mind falling back to just using functions.

I also mentioned a wrong way: data that owns behavior, where methods proliferate and types grow rich vocabularies. The OOP way... no way :)

## Autocomplete Saga

Which brings us to another topic: autocomplete on dot. All our IDEs provide a useful feature: typing a dot after a reference shows all methods belonging to its type, letting you complete the expression. While useful, autocomplete on dot discourages the use of free functions.

Instead, I would like to see: **autocomplete in context**. With strong types in place, an IDE should be able to filter which functions you might want to call simply by knowing which references are available in scope. For example, if we have:

```kt
val book = Book()
val library = Library()
// autocomplete here (!)
```

The IDE should be able to surface a function like `addBookToLibrary(book, library)` from all available functions at that point. Autocomplete in context would be more valuable than autocomplete on dot, as it would implicitly enforce: shorter context (so there is less to autocomplete) and strong types (so you don't get a gazillion functions for `Int`). What a different world that would be!
