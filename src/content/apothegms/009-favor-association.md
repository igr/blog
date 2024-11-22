---
title: Favor association when modeling relationships.
---

There are two ways to model relationships between objects: association and aggregation/composition. Association represents a weaker, natural, relationship: essentially a tuple of objects, such as: `<Library, [Book]>`. Aggregation, on the other hand, represents a stronger relationship, where `Library` _has_ a collection of `Book`.

Use association to model the most relationships between objects. Reserve aggregation for relationships that are defining and integral to the objects involved.
