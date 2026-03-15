---
title: "Did You Know We Could Generate Code All This Time?"
date: 2026-03-15T01:06:08+00:00
slug: did-you-know-we-could-generate-code-all-this-time
description: "AI didn't invent code generation."
lang: en
---

"I created 100k lines of code in just 2 days!" Fun times, right? We are back to measuring productivity with the LOC metric: every manager's wet dream, now brought to life by AI.

But did you know we could already generate code long before AI came along?

A software project is essentially a set of patterns that emerge during development and engineering. One of the goals of architecture is precisely that: to establish a domain language and repeatable usage patterns. Patterns mean repetition. And repetition is an open invitation for code generation.

There is also something I call "metadata": tightly coupled information related to domain entities, where that coupling cannot be expressed easily in code - or, more often, expressing it becomes so repetitive that it turns error-prone. The usual workaround is reaching for black-magic tools like reflection, which cannot be verified at compile time.

On the other hand, there are solid, battle-tested approaches: generating code from existing sources before the project compiles, building bytecode at runtime before the code is actually used, or using lexers to generate parsers for your domain grammar. And here's one more to sweeten the deal: you don't need runtime reflection for any of it.

## My Code Generation Adventures

Just for inspiration.

My very first open-source project was a Java preprocessor: [Jappo](https://web.archive.org/web/20070108115438/http://jappo.opensourcefinland.org/), hosted by a Finnish open-source organization. Java was at version 1.3, and I was coming from a heavy background in ASM/C/C++; naively missing preprocessing. I used it mostly for debugging, but there were some interesting macros too: generating getters/setters (before Lombok!), and raw multi-line strings — something Java introduced _decades_ later. Of course, preprocessors are painful without IDE support, so this project was always going to be short-lived.

More interesting was building a parser for ColdFusion. Back in the day, running a ColdFusion server was expensive, so the idea was to create a free CF code runner. I used Yacc to generate a parser for CF's HTML-like syntax (grammar) - not as challenging as it sounds. The mission was successful, but the timing was off; CF was already in decline.

At one contract job, I found over 100 classes all doing almost the same thing: they were dummy GraphQL action handlers required for registration with a third-party library, and in nearly every case the class simply gathered input and forwarded it to a service named after the action. I replaced all 100+ classes with a bytecode generator that created the action classes at runtime, before the classpath scan. Where specific behavior was actually needed - only a handful of cases - the original GraphQL action class remained in the codebase. That was a satisfying commit: removing a massive slab of boilerplate. The kind of thing LOC-hungry managers won't quite know how to process.

I also built one open-source project around smooth [proxy generation](https://proxetta.jodd.org) - slightly more ergonomic than the existing Java solutions at the time. Proxetta's advice uses a completely different concept than any other AOP library. Advice is written the same way a user would write a real subclass. Instead of using a custom class for accessing the proxied method and its arguments, they are replaced directly at the call site. This makes Proxetta-generated code very fast (e.g. compared to CGLIB).

Another project is a fast and capable [JSON serializer/deserializer](https://json.jodd.org). It uses reflection, yes. But I kept thinking: do we really need reflection if we already know the types we're serializing ahead of time? Why serialize a `Book` via reflection when we _know_ `Book` is going to be serialized? We could instead generate specialized serialization code at compile time - the most performant solution possible. The idea ended up as an experiment on a private branch, never published. That was long before Kotlin.

Kotlin has a great code processing framework: [KSP (Kotlin Symbol Processing)](https://kotlinlang.org/docs/ksp-overview.html). It's straightforward to set up for the purpose of code generation and - more importantly - it doesn't interfere with the rest of development. If there's an error in generated code, compiler catches it at compile time and you get an error right in IntelliJ IDEA with a direct link to the generated file. No surprises at runtime! Recently, in a home project, I used KSP to generate a set of metadata objects coupling domain `Event` types with their corresponding `Tag` identifiers. It doesn't sound like much - but it eliminated tedious hand-written mapping code. Multiply that by the number of events in an event-driven system, and it adds up to a lot of dummy code to either maintain, or generate.

## Generate the Generators

Generating text is easier today than ever. But when repetition enters the picture - patterns again - it makes more sense to rely on a deterministic solution rather than an expensive, non-deterministic AI call.

Recently, I split a monolith into ~50 modules. Each module follows the same interface: a defined way to provide input, call the module's main function, and receive results. We also needed documentation for all third parties consuming this code via events. My first instinct was to ask Claude to generate the docs for the first module I wanted to expose. After a few retries, it worked. But now my solution depended on an AI tool - which is, by definition, non-deterministic. There's a cost to every call, and time spent reviewing the output each time. Since I needed to repeat this for all the other modules, instead of using AI repeatedly, I used it _once_: to build a documentation generator from the code itself. (Plain Javadoc wasn't an option here.) It took more time upfront, but that was a one-time investment. Now I have a free, deterministic solution that runs anytime, with no delays and no review overhead.

The takeaway: any time I find myself generating the same kind of text repeatedly, I look to build a specific generator - and if needed, use AI to help write that generator - rather than using AI to produce the content over and over again.
