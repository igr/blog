---
title: "Model Singularity"
date: 2025-09-22T01:05:03+00:00
lang: en
slug: "model-singularity"
description: >
  Lord of the Rings vs Star Wars. And types.
---

> One model to rule them all,
> one model to find them,
> One model to bring them all
> and in the darkness bind them.

“My precioussss… my model. One, and only one!” hissed Gollum in a low murmur. His great, staring eyes were lit with the pale glow of the screen before him. With the chill and clammy tips of his fingers he struck the keys, weaving lines of code, and he took delight in the work of his own devising: a fair and complete domain, wherein all things were ordered, each after its kind. A class for Orcs, a class for Hobbits, a class for Wizards: set apart, each in its place. Though not every property should be called upon at all times, yet all were gathered there together, ready to be chosen and filled at will.

"My precious, my singular model…" he muttered, and his tongue crept forth to wet his lips.

## Don't be Gollum

I’ve noticed a curious habit in SDB (Software Developer Behavior): the obsession with crafting a single, all-powerful class to represent a real-world "thing." One class to rule them all, one class to find them, one class to bring them all… you get the idea.

Take `Student`, for example. Developers tend to stuff every possible property into it: whether relevant or not. Need an active state? Toss in a `boolean`. Need tuition tracking? Add another field. Need validation? Just cram it inside and keep using the same bloated object.

This approach is not just wrong; it’s completely, spectacularly, irredeemably wrong. Why does this happen? Two main culprits:
1. OOP’s obsession with class hierarchies and its failure to embrace Algebraic Data Types.
2. Database-first thinking.

Here’s a litmus test: when faced with a new problem, what’s the first thing you design? Tables and relations? Or domain types?

Remember: a _type is a set of possible values_. A "catch-all" type isn’t just useless—it’s dangerous. And if you think that’s fine, why not just model everything as a Map or Dictionary and be done with it?

## Be a Software Engineer
In software, there’s no such thing as a singular, universal definition of a real-world entity. The meaning depends entirely on context: the business capability it serves.

A plain `Student` type is nearly meaningless. A `RegularStudent` makes sense for those enrolled in a program. An `ActiveStudent` might describe someone currently studying and up-to-date on tuition. Sure, they might share some properties, but they are not the same thing. They still represent a real-life student, but each one describes that student in a different context.

Here’s a handy rule of thumb: if a field is null-able or a boolean, it probably hints at a missing type. And let’s be clear: we don’t do nulls here, right?

Collections follow the same principle. A `List<Student>` is a faceless bucket. But `CollegeStudents` or` ClassStudents`? Now we’re talking meaningful types with real intent.

So: **embrace the strong in strongly typed languages**. Model the domain first, define the subjects clearly, and let functions articulate what those subjects can actually _do_.

May the strong force be with you!
