---
title: Avoid primitive obsession
---

Primitive obsession occurs when primitive data types are used to represent domain concepts. It’s one of the most pervasive and risky code smells because it’s both common and easy to miss—often leading to subtle bugs that only surface at runtime.

Every piece of domain information requires its own dedicated domain type.
