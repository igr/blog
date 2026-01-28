---
title: "The Day the Sun Didn't Shine"
date: 2026-01-28T01:06:08+00:00
slug: definitions-to-clarify-typing
description: "A 114-page specification about reusable visual components. And a generation of developers who only heard what they wanted to hear."
lang: en
---

It was the summer of 1997. On August 8th, Sun Microsystems published the final update of the JavaBeans specification, version 1.01.

JavaBean is a software component model for Java, enabling third-party vendors to create reusable components that can be composed into applications. Or, as stated right at the beginning:

> The goal of the JavaBeans APIs is to define a software component model for Java, so that third party ISVs can create and ship Java components that can be composed together into applications by end users.

We should try to understand the software world in 1997. It was the era of COM/ActiveX components, OpenDoc (Apple's attempt to make applications object-oriented), LiveConnect (Netscape)... It was all about objects and components... and Lego. The promise of components was building solutions using Lego-style composition of business components: put a brick here, a roof piece there, and you've got yourself a house. That's what objects are for, right? Moreover, visual software building was all the rage back then: drag-and-drop components in a GUI editor.

Sun, understandably, had to provide business components in this still-new, shiny Java; hence the detailed JavaBeans specification, spanning 114 pages. This new component, the JavaBean, was meant to be a new Lego brick, regardless of size (a button or an entire app, it's all the same), easily portable and connectable to existing bricks, even across different technologies (like embedding a JavaBean in Word or Visual Basic).

But what is a Bean? The specification is clear:

> A Java Bean is a reusable software component that can be manipulated visually in a builder tool.

Wait, what? A visual builder tool?

Exactly. JavaBeans is all about components that are, to put it simply, connectors. They may be used in a visual builder tool, but can also be instantiated in, say, an applet.

The specification says nothing about how to build the application itself. There's nothing about how you should model your state. There's nothing about your state needing to be modeled with setters and getters. JavaBeans: yes. State: no. And, keeping in mind that it's a definition for visual components, I can see why there are setters and getters for JavaBeans. But no, a JavaBean is not your internal state. In fact, Chapter 8 contains an explicit note on this:

Property editors are given an object representing the current value of a property. However a property editor should not directly change this initial object. Instead, based on user input, it should create a new object to reflect the revised state of the property.

Truth be told, the specification could have done a better job explaining JavaBeans versus internal application state. Well, given it's Java and the OOP madness of the time, I can see how that was never going to happen.

## So What's the Point?

Why am I writing about a godforsaken specification?

I remember when I first heard about JavaBeans. I was told the following: just add setters and getters for your state, and you've got yourself a JavaBean. Being young, I accepted what I was told. Granted, back then I'd never read the full specification, only parts of it.

Fast forward to today. It's still common knowledge that JavaBeans (well, POJOs) means just setters and getters around state. That single, misunderstood fact has invited such a volume of shitty code that calling it a mistake would be an understatement. I'm not being dramatic here: the codebases I've had the opportunity to see are, literally, hell. State is exposed via properties, changed at any time, anywhere in the code: it can be accessed and modified by any method called during a single business interaction. The result: an extremely coupled codebase. The price: extremely slow changes and upgrades. Add management that doesn't understand the complexity, and...welcome to the software development world of the 21st century.

It's yet another example of misunderstood concepts. I guess it's easier to be lazy, generate those setters/getters, and go with the flow, right? Guilty as charged - little Igor included.
