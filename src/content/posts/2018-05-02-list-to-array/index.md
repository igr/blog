---
title: List.toArray()
date: 2018-05-02T11:11:22+00:00
slug: list-to-array
description: >
  Java ima nekih izluđujućih momenata, koji se ne vide na prvi pogled.
---

Java ima nekih izluđujućih momenata. Konverzija liste u niz je jedan od njih. Uobičajeni način na koji sam do sada radio bio je sledeći:

```java
List<Foo> list;
...
Foo[] array = list.toArray(new Foo[list.size()]);
```

Metoda `toArray()` koja ne prima argument vraća `Object[]`, a to je uglavnom beskorisno. Zato se češće koristi ova varijacija koja prima niz koji odgovara tipu koji se čuva u listi.

Implementacija ove metode je radila na sledeći način: ukoliko je predati niz iste dužine, lista se prosto ‘prespe’ u njega. U suprotnom, kreira se novi niz odgovarajuće dužine, a predati niz se prosto ignoriše. Tip i dužina niza su poznati, tako da nema problema za refleksiju. Zaključak je, dakle, da ima smisla svaki put instancirati niz tačne dužine, kako bi se izbeglo interno kreiranje novog niza i odbacivanje predatog - što zajedno daje bolje performanse i bolji utrošak memorije.

Sve je to razumljivo, osim što je baš ružno. Osim toga, ovaj kod nije ni potpuno ispravan ukoliko se lista deli kroz više niti: moguće je dodati element u listu nakon što se pročita njena veličina. Kako bilo, uvek sam ovako pisao konverziju liste u niz.

Sve dok sam, slučajno, naučio da to više nije neophodno. Preporučeni način je sledeći:

```java
Foo[] array = list.toArray(new Foo[0]);
```

Kraće i konciznije, lepo. Čekaj, ali šta je sa performansama i duplim kreiranjem niza? Zar nisu narušene?

Ispostavlja se da ne. Šta više, druga varijanta je i brža! `Arrays.newArray` radi vrlo dobro u VM. U ovom slučaju VM i izbegava inicijalizaciju liste, jer pretpostavlja (ispravno) da će cela biti popunjena. I verovatno radi još kojekakvu optimizaciju. Kakva god da je magija iza, `toArray(new T[0])` radi brže.

I to je tako već godinama unazad. Eh, čovek se uči dok je živ.
