---
title: "Aggregations Modeled as Data Types"
date: 2025-05-20T01:05:03+00:00
lang: en
slug: "aggregations"
description: >
  Aggregations should be modeled as data types, not collections.
---

This is a practice that is rarely discussed. Let us examine it more closely.

## Association

**Association** is the cardinal concept in programming that describes the relationship between two independent data types. It implies that two classes are related, but neither class owns the other. The lifecycles of the associated objects are independent. One object can exist without the other. Association represents a general "uses-a" or "knows-a" relationship. Examples: A student enrolls in a course. A teacher teaches a student. A customer places an order.

In OOP, associations are represented through method arguments within a class. For instance, the method `Professor.teach(Student)` expresses a relationship between a `Professor` and a `Student`. When we strip away the syntactic white-sugar of OOP, this association can be more clearly understood in functional terms: `teach :: Professor -> Student`. In this form, the association is effectively modeled as a function.

## Aggregation

**Aggregation** is a special form of association that represents a "has-a" or "is-part-of" relationship. It implies a _whole-part_ relationship where the "part" can exist independently of the "whole." The "whole" (aggregate) object has a reference to the "part" (aggregated) object, but the "part" object's lifecycle is not strictly tied to the "whole." If the "whole" is destroyed, the "part" can still exist. The "part" can also be shared among multiple "wholes." Examples: A professor belongs to a department. A playlist has a song. A team contains a player.

A common approach to implementing aggregations is through collections stored within a container object. For example, a `Team` class typically contains a collection of `Player` instances. This pattern is widely adopted and reinforced in many ORM tutorials, where relationships are often modeled in this way. At first glance, it seems intuitive: a team has a collection of players—doesn’t it?

## Composition

**Composition** is a stronger form of association where one object contains another object, and the contained object cannot exist independently of the container. It is also a "has-a" or "is-part-of" relationship, but it's a strong form of ownership. The "part" object belongs exclusively to the "whole" object and cannot exist independently. The "whole" (composite) object owns the "part" (component) object. The lifecycle of the "part" is tied to the "whole." If the "whole" is destroyed, the "part" is also destroyed. A "part" cannot be shared among multiple "wholes." Examples: House has a room. A book has chapters. Human has a heart.

Composition is implemented as an element of a data type. The `House` class contains various fields of type `Room`. I like to refer to this relationship as an "identifying" one, as the "parts" form the identity of the "whole."

## Critique of Aggregation Implementation

Let’s take a closer look at the `Team`–`Player` aggregation implementation.

When the `Team` class has a collection of `Player` objects, we assume an aggregation relationship between the `Team` and `Player` domain types. However, at the same time, this implies a strong, composite relationship between the team and a specific _collection_ of players (`Team`–`Player`[]).

Using a collection in this way reflects a form of primitive obsession: a common code smell. Every time we use a collection, we implicitly omit the specification of what that collection represents. It could be all players, active players, the top five players, etc. Each of these is different, yet they are all modeled the same way: as a collection, distinguished only by the field or variable name.

From the `Team`'s perspective, there's no difference between containing a `Player[]` or a single `Player`—both establish a strong, composite relationship. In the `Team`–`Player[]` model, while `Team` may act as an aggregate for `Player`, it becomes a composite with respect to the `Player[]`. This implicitly strengthens the relationship between these two domain types.

To summarize: using a collection to implement an aggregation between a "whole" and its "parts" effectively creates a composite relationship between the "whole" and the "part-collection." And that's problematic.

## Aggregation is a Composite of Whole and Parts

The correct way to model aggregations is through a data type that contains both the "whole" and the collection of "parts."

Rather than representing aggregations as raw collections, define a data type—e.g., `ActivePlayers(Team, Player[])`. The team no longer directly holds a collection of players. More important, the aggregate type now clearly communicates the nature of the relationship.
