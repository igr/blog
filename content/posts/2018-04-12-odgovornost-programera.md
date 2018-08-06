---
title: Odgovornost programera
date: 2018-04-12T09:53:22+00:00
slug: odgovornost-programera
categories:
  - Mišljenja
tags:
  - istorija
  - java
  - jezik
  - odgovornost
  - programiranje
---

Sve je krug. (Vrcam od mudrosti, ha! :))

Šta se dešava: svet je pun koda. Programeri uočavaju obrasce u programiranju; neki su dobri, ima i nepoželjnih. Računari pak imaju svoja ograničenja, te se programiranje ne može potpuno prepustiti abstrakciji; još uvek je neophodno da se kodira imperativno - ili pak ljudi nisu dovoljno zreli za nešto drugo. Kako bilo, programi lako postaju glomazni i teški za održavanje, greške su i dalje učestale; pored svega što kompjuterske nauke uče kvalitet programiranja nije na zavidnom nivou.

Godina o kojoj pišem je 1996. Suočeni sa stanjem u industriji, izlazi nova platforma, kuvana pet godina. Kreatori Jave kao svoje ciljeve navode sledeće:

> It must be “simple, object-oriented, and familiar”.

> It must be “robust and secure”.

> It must be “architecture-neutral and portable”.

> It must execute with “high performance”.

> It must be “interpreted, threaded, and dynamic”.

Ostavimo na stranu JVM platformu - ona neosporno predstavlja evoluciju. Ovde želim da pričam o samom jeziku. I o prvoj premisi u gornjoj listi. Java je stvorena kao _opšti_ (_general purpose_) jezik. Da bude jednostavan, OO i familijaran. Jezik stvoren za sve, da spoji sve, da reši sve. Podseća li to na našto, _my preciousssss_?

## Zašto Podilazimo Lošem Kodu?

I to je upravo problem. Jer Java je toliko opšta da je gotovo pogrešna! 22 godine kasnije, ispaštamo jer programeri u devedesetim nisu uspeli da uspostave kvalitet programiranja, iako su svi koncepti koje sada zovemo modernim već odavno postojali! Znalo se za kompoziciju, ali se poklanjamo nasleđivanju. Znalo se za funkcionalno, ali su odlučene opšte klase. `final` je tek modifajer, imutabilnost samo strana reč, _side-effects_ je nešto što se priča deci da se zaplaše, sintaksnog šećera ima koliko i u limunu. To nam je dalo anemičan programski jezik koji nema... duda.

Potom jezik stagnira, da bi se razvijao kao platforma kroz svoje biblioteke. Bili su trenuci kada je trebalo odskočiti dalje, no odlučeno je da se sakrije iza skuta kompatibilnosti sa pređašnjim verzijama.

Priznajem, pojednostavljam stvari. No, mnogo je tu dima, biće da ima i vatre.

## Posledice

Da, rešili smo probleme koje su loši programeri pravili kada su koristili kojekakve prečice koje su tada popularni jezici nudili. Ali smo isto tako obučili _generacije_ programera da razmišljaju u skučenim granicama koje Java kao jezik nudi.

Danas je više nego ikada bitno uspostaviti zdrave programerske obrasce. Jer sve je krug.

> Novi jezik ne treba da rešava probleme loših praksi, već treba da uspostavlja dobre.

Eto, rekao sam.