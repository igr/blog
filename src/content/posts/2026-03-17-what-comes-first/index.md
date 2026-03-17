---
title: "What Comes First?"
date: 2026-03-17T01:06:08+00:00
slug: what-comes-first
description: "Trios de Orderos: ordering software development traits has never easy."
lang: en
---

In my last article I made a convincing case for hiding the value inside a value class. It was put there as a "hook", just for the sake of challenge. I'll come back to that.

But first, let's answer this question. Order by importance: **Fast**, **Correct**, and **Simple** (in the context of software development). It's easy to say all three matter; having to rank them really puts things into perspective. That said, picking an order doesn't imply the absence of the other traits. It's more about the _ratio_ of time and energy spent during development.

I care deeply about software resilience, so **Fast** is never my first pick (which is probably why I'm not a CEO preaching "better wrong than late"). I'm always torn between **Simple** and **Correct**. The trouble with correctness is that it's slippery: ask me ten years ago and I'd have sworn by OOP orthodoxy. Also, many things can be simultaneously correct when domain knowledge is still thin. **Simple** feels like the clear winner, with one important caveat: it becomes dangerously easy to start making wrong decisions _in the name of_ simplicity.

So my answer isn't a single ranking. I want **Simple** and **Correct** to be _entangled_. Going back to the value class internals, there are two aspects at play:

1. The value _must_ be immutable: the **Correct** trait.
2. The value _may_ be visible outside: the **Simple** trait.

Both traits are present, just in different contexts.

## Trios de Orderos

This is an old question, not invented by me. After sitting with it for a while, I realized that ordering traits is a surprisingly effective way to interrogate your own assumptions. Here are a few trios worth ranking:

- **Readable, Performant, Maintainable**: most codebases silently pick one and politely pretend they have all three.
- **Explicit, Concise, Consistent**: about code style and expression. Explicit and concise are often in direct tension; consistency is the one that survives long-term teams.
- **Local, Testable, Composable**: about design units. A function or module that scores high on all three is a rare pleasure. Most code sacrifices locality for composability.
- **Reversible, Cheap, Correct**: about decisions. A nice reframe of the original trio: reversibility is almost always underweighted early.
- **Discover, Model, Encode**: stages of understanding a domain. Are you a discover-first engineer, spending time in the problem space? Or do you rush straight to modeling, or worse, straight to encoding? This one reveals how someone handles uncertainty.
- **Boring, Correct, Elegant**: loosely borrowed from the "boring technology" school of thought. Elegant and boring are near opposites, yet both can be correct. How you rank these says something deep about your relationship with craft versus pragmatism.
- **Coupled, Cohesive, Complete**: three things a module can be, where one is a sin, one is a virtue, and one is perpetually confused with the other two.

This would make a fantastic interview question, by the way, asking a candidate to rank any of these. During the binary tree inversion round, obviously.
