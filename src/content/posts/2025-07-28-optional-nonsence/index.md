---
title: "Optional Nonsense"
date: 2025-07-28T01:05:03+00:00
lang: en
slug: "optional-nonsense"
description: >
  Java Optional is a container, period.
---

The `Optional` class is introduced in Java 8 to handle `null` values gracefully. Well, that statement is not entirely accurate.

`Optional` is introduced because of streams. Java authors needed a way to handle _returned_ `null` values in a "functional" way. Yes, returned.

The JDK 8 documentation didn't have any note regarding the `Optional` use. However, in the JDK 11 docs there is statement that `Optional` "is primarily intended for use as a method return type." Per their own words: "Our intention was to provide a limited mechanism for library method return types" and "it was not to be a general purpose Maybe or Some type."

As a result, usage of `Optional` anywhere but in the returned type is considered a code smell in Java. There are default checks in IDEs that detect usage in class fields and method arguments. The armies of Java developers are thought to think in the same way.

Nonsense.

While I do understand cautious approach of JDK authors, statements about `Optional` are pure nonsense. They want to hide monadic behaviour of containers for unknown reason. Instead of pushing towards `null`-free programming, we are advised to be cautious with idiomatic `Optional` usage.

But in the same time, `Optional` class in Java 9 introduces the `stream()` method. This is identicaly to saying: yes, `Optional` _is_ a container for your nullable values. So any discussion and confusion ends there, invalidating the JDK authors remarks.

I have no idea why we have to still talk about this.
