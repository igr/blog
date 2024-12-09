---
title: "Classes are an inefficient mid-sized abstraction."
---

A class represents an abstraction that resides in the intermediate scale between functions and modules. This positioning leads to challenges in its effective use for software modeling. Classes are generally too limited in scope to encapsulate complex behaviors, which typically span multiple interacting states. Simultaneously, they are too rigid and cumbersome to support the lightweight composability inherent to functions. Classes are most useful as data containers rather than tools for modeling behavior.
