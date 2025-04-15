---
title: "When Life Gives You Java"
date: 2025-04-15T01:06:08+00:00
description: >
  What to do when you are stuck with Java? Make lemonade!
---

Java is a programming language designed for small devices and web applets. The real powerhouse behind it is not the language, but the JVM ecosystem — a remarkably robust and versatile platform.

Java brings with it a strong OOP paradigm. Unfortunately, in practice, this paradigm often diverges from its [original intent](https://oblac.rs/woof-oop/). Over time, OOP in Java has become more of a justification for clinging to outdated design choices than a path toward better software architecture.

That being sa(i)d, I’ve significantly changed the way I write Java code — at least when I have the freedom to do so. What follows are a few personal practices I’ve found valuable. These aren’t revolutionary ideas, just lessons borrowed from more expressive, often functional, languages. And no, I’m not talking about Java’s `Stream`, `Optional`, or `Function` APIs.

## Package Is Your Friend

I default all internal code to package-private scope. If something needs to be exposed outside the package, only then do I make it public.

Contrary to what the dot notation might imply, Java doesn’t truly support sub-packages. Funny "feature" for a language that leans heavily on inheritance:) By keeping everything in a single package, I’m forced to apply naming conventions to organize classes by capability — something I’m not particularly fond of.

What I’m essentially doing is treating packages like modules. This works, to a point. But occasionally — often due to external frameworks — implementation details leak beyond package boundaries. In those cases, I split the package into two separate, compilable units: one containing the public API, and the other holding its implementation.

## `final` Is Your Friend. `null` Is Not.

I try to work with immutability as much as possible — about 95% of my references are `final`. Unfortunately, Java doesn’t make this easy. Declaring `final` requires explicit, repetitive effort, but thankfully, there are IDE plugins that automate this.

Once you embrace immutability, `null` starts to disappear. Of course, I’m not dogmatic — if writing 20+ lines of workaround code just to avoid a `null` makes no sense, I’ll use `null` (in Java.) But I’ll scope its usage as tightly as possible.

## No `extend`

I no longer use inheritance in my own code. It tends to do more harm than good. Composition is your friend.

That said, avoiding inheritance entirely is hard when integrating with third-party libraries. There are limits to how much you can fight the ecosystem 🤷‍♀️

## A Class Is Just a Function

I think in terms of functions: input → process → output. Since Java lacks first-class functions, I model them as classes. Often, a class will encapsulate a single function or a small group of closely related ones.

For example, a function: `borrow: (Library, Book, User) -> Unit` may be represented as:

```java
class Librarian {
	void borrowBook(Library, Book, User);
}
```

Or, in a more function-centric style:

```java
class BorrowBook {
	void invoke(Library, Book, User);
}
```

Since these functions are pure, they can often be reused via a single shared instance. To simulate currying, I sometimes separate constructor and method parameters:

```java
class Librarian {
	Librarian(Library) {...}
	void borrowBook(Book, User);
}
```

I am not excited with this style, but it’s a compromise I’m willing to make for the sake of Java’s limitations.

## Use sealed Interfaces and records for ADTs

All my algebraic data types (ADTs) are modeled as records implementing sealed interfaces. This is finally tolerable in modern Java.

```java
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
	include = JsonTypeInfo.As.PROPERTY, property = "_type")
@JsonSubTypes({
	@JsonSubTypes.Type(value = NoError.class),
	@JsonSubTypes.Type(value = JobException.class)
})
public sealed interface AssessmentError {
	record NoError
		implements AssessmentError {}
	record JobException(String message)
		implements AssessmentError  {}
}
```

Yes, I’ve included Jackson annotations — a reminder that serialization is often part of the picture, and we still need to deal with it.

## No Exceptions for Business Logic

I reserve exceptions for actual runtime failures — things like memory errors, I/O issues, or failed database connections.

Business logic errors are returned as part of the result. I don’t use a generic `Either` or `Response` wrapper (no compositions in Java); instead, I define a dedicated ADT for each result type.

## Consequences

One natural consequence of this style is an increase in the number of small classes. That’s a trade-off I’m happy to make if it means better modularity, and fewer surprises.

Drink lemonade!
