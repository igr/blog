---
title: Avoid impure functions.
---

Functions with non-deterministic output, known as impure functions, rely on external states, making them inherently dependent on factors outside their scope.
This dependency makes understanding impure functions more challenging as their behavior is not determined by the code within the function itself.
While impure functions are an integral part of programming, it is advisable to limit their use by either minimizing their number or by managing the side effects.
Pure functions serve as the foundation elements of a program.
Their deterministic nature and self-contained design allow them to be combined in various ways, facilitating straightforward development due to their predictable behavior.
