---
title: "The Liskov Substitution Problem"
date: 2025-03-31T01:06:08+00:00
slug: "lsp"
description: >
  SRP has a problem.
---

Barbara Liskov, recipient of the 2008 Turing Award, offered profound insights into behavior and type systems.

## Origins

There is some confusion regarding the definition of LSP, as multiple versions exist. One definition comes from Robert Martin:

> A program that uses an interface must not be confused by an implementation of that interface.

Originally published in 1996, it was formulated in C++ terms:

> Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.

This is a paraphrased version of an idea found in Barbara Liskov’s 1987 paper, _Data Abstraction and Hierarchy_:

> What is wanted here is something like the following substitution property: If for each object o₁ of type S there is an object o₂ of type T such that for all programs P defined in terms of T, the behavior of P is unchanged when o₁ is substituted for o₂, then S is a subtype of T.

Another frequently cited definition of LSP states:

> Objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program.

The most famous example used to illustrate LSP is the modeling of `Rectangle` and `Square`. `Square` cannot inherit from `Rectangle`.

A fitting phrase for LSP is: If it looks like a duck and quacks like a duck, but needs batteries—it’s not a duck.

In essence, LSP warns that the contract of a base class (i.e., a type) must not be altered by its subtypes.

## Analysis

Let’s start with a brief observation. In _Data Abstraction and Hierarchy_, Barbara Liskov focuses on data abstraction and concludes:

> …although data abstraction is the more important idea, hierarchy does extend its usefulness in some situations.

Hierarchy—meaning inheritance—is, at best, occasionally useful as an abstraction. In other words, inheritance, the holy grail of OOP, is merely a convenient idea in certain cases. Interestingly, this sentiment was common in early OOP discussions, making it all the more peculiar—perhaps even alarming—that inheritance has become an irreplaceable pillar of OOP.

Liskov’s paper also highlights some interesting benefits of type hierarchies, such as incremental design, a concept I had not encountered before. The idea is as follows: Initially, both `P` and `Q` use type `T`. Over time, `Q` evolves to use a new type `S`, which is a subtype of the original `T`. However, this example is not particularly compelling—incremental design is neither a consequence nor an exclusive feature of type hierarchies. The complexity that hierarchies introduce as systems grow is often overlooked.

That said, this particular paper should not be treated as a definitive source. While it contains valuable and highly relevant insights, it represents the beginning of an idea that was later refined. The very phrasing—“What is wanted here is something like…” (often omitted!)—suggests that this was merely a conceptual summary for clarity, not a formal definition.

-----

Now, let’s move on. The paper that most accurately defines the principle behind LSP is _A Behavioral Notion of Subtyping_ (1994) by Liskov and her co-author, Jeannette Wing:

> Let ϕ(z) be a property provable about objects x of type T. Then ϕ(y) should be true for objects y of type S, where S is a subtype of T.

Now comes the interesting part. Before we can even discuss subtype behavior, we must define what a type is! The authors begin precisely there: with type specifications, which later extend into subtype specifications. In other words, their paper covers much more than what we now consider to be LSP. Any discussion about LSP is superficial if it does not account for the formal specification of types. Vague terms like “confused,” “correctness,” and similar expressions introduce ambiguity rather than offering concrete definitions. It is immature—and intellectually dishonest—to summarize the authors’ work in such a simplistic way.

The authors define a type as a set of methods and their associated parent types. Each method is specified with constraints:

```plaintext
bag = type
uses BBag (bag for B)
for all b: bag

  invariant | bpre.elems | <= bpre.bound

  put = proc (i: int)
        requires | bpre.elems | < bpre.bound
        modifies b
        ensures bpost.elems =
          bpre.elems U {i} ^ bpost.bound = bpre.bound
```

Each method is defined not only by its name and input/output types but also by its behavior, described using preconditions, modifications, and post-conditions—the triplet: `requires`, `modifies`, and `ensures`. State changes are explicitly marked. Constructors (or creators) are omitted, but `invariants`—rules that all constructors must satisfy—are included.

Now, compare this to how we define types today: through interfaces. Aside from method names and input/output types, everything else is omitted. Expected behavior is relegated to comments and specification tests that almost no one writes (`assert`, anyone?). OOP has not evolved—it remains stuck in a primitive state.

-----

Moving on. Once type behavior has been specified, we can finally reason about subtypes. The authors define two ways to establish a subtype: one using constraint rules and the other using extension mapping, with the former being preferred.

```plaintext
stack = type
uses BStack (stack for S)
for all s: stack
  invariant length(spre.items) <= spre.limit

  push = proc(i: int)
  requires length(spre.items) < spre.limit
  modifies s
  ensures spost.items = spre.items || [i] ^ spost.limit = spre.limit

  subtype of bag (push for put)
    ...
      where...
```

A subtype can even have different (!) method names better suited to its context—yet another lost OOP idea. Subtypes are defined as a series of conditions (not fully visible above), and the document later presents a comprehensive set of rules for defining subtype relationships.

The authors acknowledge that their approach is rigid:

> The requirement we impose on subtypes is very strong and raises a concern that it might rule out many useful subtype relations. To address this concern, we looked at a number of examples. We found that our technique captures what people want from a hierarchy mechanism, but we also discovered some surprises.

They identify two broad categories of subtype relationships: those that add new methods (and potentially new states) and those that introduce new constraints. Multiple inheritance is also allowed. Examples that introduce new constraints are particularly interesting, as `invariant` to define constructor behavior and permissible states. A fun example involves elephants: an Elephant type has a color. Two subtypes exist—(fictional) Royal and Albino elephants—with exclusively blue and white colors, respectively. However, if a base-type elephant acquires a blue color, it must necessarily become royal. Good luck handling that in OOP.

-----

Moving on. In 2020, Robert himself admitted that he had misinterpreted Barbara—just as many others had. LSP is not about inheritance but about subtypes. However, he did not elaborate much further on what LSP actually entails.

## Conclusion

The core problem with LSP lies in inheritance and type hierarchies—the very things it attempts to formalize. It is a well-constructed attempt at defining subtypes, yet most of its ideas remain in academic texts rather than programming languages. And perhaps that fact itself is telling: if inheritance is still challenging to define precisely after half a century, do we even need it?

Moreover, the authors assume precisely defined method behavior, which is often not the case. Consider `toString()`—its behavior is highly subjective. If we write `object.toString().contains("@")` in Java, we will get wildly different results. Equality (`equals()`) is even worse: are `{x:0, y:0}` and `{x:0, y:0, z:1}` the same if the latter extends the former?

Inheritance should disappear. It is merely a mechanism for copying methods and attributes between classes for reuse—often at the cost of abstraction. It was never meant to be this way.
