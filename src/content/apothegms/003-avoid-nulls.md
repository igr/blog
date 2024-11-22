---
title: Avoid NULLs.
---

There is no semantic in nothingness.
`null` attempts to signify the absence of a value while paradoxically being assigned as a value itself. Using `null` undermines the effectiveness of compile-time checks, leading to errors only discoverable during runtime. `null` acts as an exception to strict type definitions, being a gap within an otherwise robust type system, since it can be assigned to any type. `null`’s ambiguity further complicates its usage as it implies various states—such as an uninitialized state, a missing value, or an error condition.
