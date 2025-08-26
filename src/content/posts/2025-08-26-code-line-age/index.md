---
title: "Long Live the Line of Code!"
date: 2025-08-26T01:05:03+00:00
lang: en
slug: "long-live-the-line-of-code"
description: >
  Software development is all about strict rules and metrics and guards, right?
---

We use so many metrics in projects, yet one of the most important is completely ignored.

Let me set the stage: imagine you're working for a medium-sized company with 6k employees operating in 10 countries across two continents, serving hundreds of thousands of users and handling monetary transactions. The company launches a critical project for their core business. Everything must be perfectly aligned before development begins, so the architecture team works relentlessly on specifications. There's a mountain of documentation, dedicated teams per microservice, project templates ensuring every service looks identical, unit tests, functional tests, mock servers - name it, it's all there. Guards are stationed from day one: high code coverage (90%), PIT tests, SonarQube checks, branch/gradle checks covering naming conventions and beyond. Every PR must pass all checks and get reviewed by a developer, team lead, and DevOps.

Nothing can go wrong now, right?

Well. If only software engineering were a simple set of rules... We adore rules because programmers' brains love binary outcomes: true/false. We love recipes and patterns. Why? They eliminate the need to reason about each particular task. This makes perfect sense, until we forget that every rule has boundaries, assumptions, goals, and most importantly, a price tag attached.

Thats right. **Everything in software development is a trade-off**. If you don't see it, you just haven't identified it yet: it's lurking somewhere. Dig deeper. Every rule carries trade-offs, and we must acknowledge them.

In our example, these strict rules are _stifling_ the project's initial phase by essentially creating a waterfall process. At the very beginning, when requirements are half-baked at best, we're operating on pure assumptions. In other words: lots of code will change. Soon. Very soon. And that's totally fine.

Now, insisting on strict guards for code that will change imminently - code that's months away from any use - significantly slows development. When each PR must pass numerous guards, review times inevitably drag, changes pile up, and with a small initial codebase that's hard to divide among team members, bottlenecks become inevitable.

There's a metric I call the "**predicted age of a line**", measuring how long a single line will survive in the codebase unchanged. The focus is on overall code trends, not obsessing over individual lines. Development isn't a constant process; it evolves and changes over time. At the beginning of _every_ software project code changes rapidly and dramatically. This is healthy and necessary; it's also an axiom of development. You should refactor as soon as new knowledge enters the project. Each merged change provides opportunities to observe your decisions in action, both at runtime and within the software architecture itself.

Spending time guarding and testing code that will change soon, very soon while blocking development has serious trade-offs. Development becomes expensive. If everyone understands these consequences, expensive development isn't inherently bad. If code owners value tested code on the main branch more than rapidly developing business capabilities, that's their prerogative.

In my humble opinion, throttling initial development is absolute nonsense.
