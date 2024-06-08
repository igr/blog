---
title: Optimizacija i realizacija
date: 2017-07-31T09:53:22+00:00
slug: optimizacija-i-realizacija
description: >
  Premature optimization is the root of all evil. Da li mislimo samo na brzinu izvršavanja koda?
---

Čuvena izreka glasi:

> Premature optimization is the root of all evil.

Smatra se da ju je skovao [Donald Knuth](https://en.wikipedia.org/wiki/Donald_Knuth), pošto je prvi put objavljena u njegovom radu. Međutim, postoje indikacije da je otac izreke zapravo [C. A. R. Hoare](https://en.wikipedia.org/wiki/Tony_Hoare), koji je, između ostalog, izmislio `null` reference (zašta se javno izvinio 2009.). Kako bilo, dugo vremena sam ovu poruku shvatao isključivo u bukvalnom značenju, vezujući "optimizaciju" isključivo za performanse sistema. Nepopravljivo naštelovan na optimizaciju brzine koda do krajnjih granica, pitao sam se da li nešto propuštam.

## Brzina ili vrednost

Iako čika Knuth u celom odeljku u kome je objavljena izreka konkretno govori o brzini izvršavanja programa ("_speed of... programs_"), danas smatram da se izreka odnosi na nešto više.

U pitanju je **vrednost** koji novi kod ili izmena donose.

Da objasnim. Tokom izrade programa cilj programera je da napiše kod koji efikasno zadovoljava traženu funkcionalnost, novu ili unapređenje postojeće. Ipak, čest je slučaj da programer u želji da učini kod što boljim ode predaleko i unese veću kompleksnost u sistem nego što ona zaista vredi (tkzv. _over-engineering_). Drugim rečima, vrednost njegovog koda se smanjuje, jer se nepotrebna kompleksnost povećava. Dalje, čest je slučaj i da se za sledeći korak u fazi razvoja bira onaj koji ne povećava suštinsku vrednost programa. Umesto da se "napadne" deo funkcionalnosti koji je kritičan (na pr. modelovanje kompleksnog obračuna), pristupa se izradi u tom trenutku nevažnog dela (na pr. formi za unos šifarnika). Pretpostavljam da smo svi imali prilike da iskusimo ovo.

U tom kontekstu, prevremena optimizacija je rad koji u datom trenutku nije utrošen na proizvodnju stvarne vrednosti. Suprotna optimizaciji je **realizacija**, rad koji konkretno donosi stvarnu vrednost. Da naglasim: u datom trenutku – pošto se tokom razvoja vrednost funkcionalnosti menja.

## Optimizacija ili realizacija

Danas se trudim da često preispitujem da li je predstojeći deo posla ili funkcionalnost realizacija, koja zaista daje vrednost aplikaciji, ili je samo optimizacija. Ako radim na kompleksnom obračunu, prvo ću raditi algoritam izračunavanja, a ne UI. Ako radim na distribuiranom sistemu, prvo ću se postarati da bude robusan, a ne da radi pregršt stvari. Ako radim na startup-u, gledaću da što pre zaživi, a ne da je besprekoran.

Balansiranje između optimizacija ili realizacije nije rezervisano samo za planiranja i top-level arhitekturu! U stvari, razmišljanje o ovome je proisteklo iz svakodnevnog rada na kodu. Čak se i nekoliko puta u toku dana zapitam oko nekog dela programa, da li sam krenuo u preranu optimizaciju i uveo nepotrebnu kompleksnost u kod koji je zapravo jednostavan i koji je ne treba. Jednostavne stvari koje rade su sveti gral kome težimo, rekao bih.

Naravno, ne znači da treba bežati od kompleksnosti. No upravo je vrlina kompleksnu stvar opisati na jednostavan način. Bilo rečima, bilo kodom.
