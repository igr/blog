---
title: Razumevanje koda
date: 2018-08-17T19:04:18+00:00
slug: razumevanje-koda
categories:
  - Razvoj
tags:
  - razvoj
  - kod
  - razumevanje
---

Svi mi koji razvijamo kod se zavaravamo da veći deo vremena provodimo u _pisanju_ koda. Istina je drugačija: veći deo vremena provodimo u čitanju koda - tačnije, u pokušaju da _razumemo_ kod.

<!--more-->

Negde sam pronašao i sledeće metrike:

+ na modifikovanje koda se potroši **5x** više vremena nego na pisanje novog koda; i
+ na razumevanje koda se potroši **3x** više vremena nego na modifikovanje koda.

Zašto je to tako?

## Razumevanje

Vreme je za misaoni eksperiment. Uzmimo neku jednostavnu društvenu igru: na primer Monopol. Zamislite da ne znate pravila igre. Šta bi bilo lakše:

+ da shvatimo pravila čitajući sors koda igre, ili
+ gledajući kako je drugi igraju?

No zašto je to tako? Zašto je razumevanje koda tako teško? Odgovor leži u tome kako ljudski mozak radi.

Sve započinje percepcijom informacija. Njih mozak transformiše raznim mehanizmima (_top-down_, _bottom-up_) koji dovode do toga da se informacija procesira do određenog nivoa. Zatim nastupa filter koji sprečava da se mozak zatrpa detaljima: ukoliko posmatraš travu nećeš primetiti svaku travku, već ćeš samo dobiti informaciju o livadi. S druge strane, isti filter izdvaja ono što nam je važno iz šuma, kao kada čuješ svoje ime u galami. Na ove procese utiče i pažnja koju u tom trenutku posvećujemo. Da bi se informacija dalje obradila, mora se zapamtiti. Postoji nekoliko vrsta memorije. U slučaju čitanja (koda) od važnosti je kratkotrajna, radna memorija, koja traje 20-tak sekundi (i koja poslovično pamti 5-7 različitih informacija). Tek posle nastupaju viši koncepti koji prave veze između informacija i shvatanja i trajnije memorije.

## Šta ovo znači?

Sada je sasvim jasno ono univerzalno pravilo za pisanje koda oko koga se svi slažu: metode i klase moraju da budu kratke, kod izdeljen na sitnije delove. Imenovanje u kodu mora da bude jasno (da mozak ne bi trošio vreme na razumevanje imena), dok je opet dozvoljeno da, na primer, varijable za petlje imaju kratka imena (`i`, `j`...). Na osnovu toga kako mozak radi zaključuje se da je bitno i _prepoznavanje_ sa prethodnim iskustvom: otuda važnost obrazaca programiranja (ne nužno _design patterna_, već i uopštenih obrazaca). Slično, zato nam je bitno poznavanje sintakse jezika; jedan Javaš ne može tek tako da čita isti kod u Haskelu, jer mu nedostaje prepoznavanje sintaksnih konstrukta, što blokira radnu memoriju.

Kada razmišljam o čitanju i prepoznavanju koda zamišljam ljudski fokus koji je nekakvog kružnog oblika i kojim se skenira kod. Sve što staje u taj krug prepoznavanja će se razumeti. Iz ovog prostog (i pojednostavljenog) pravila mogu izaći mnoge prakse dobrog koda.

## Koliko se kod može razumeti?

Kada se upotrebi mentalni napor da se kod razume čitanjem, smatram da možemo doći samo do izvesne granice razumevanja. Sve posle toga je već deo subjektivnog shvatanja... pa, rekao bih, arhitekture koda. Ako bih napravio analogiju sa slikanjem, to bi značilo da se dođe do toga da se razume šta je naslikano, ali ne i da se cela slika može ponovo naslikati istim potezima kista.

Do izražaja dolazi onaj subjektivni pečat koji programer daje kodu. I upravo zbog nemogućnosti svođenja koda u strukture koje su preciznije nakon pomenute granice razumevanja, nastaje dodatni problem u absorbciji koda. To je onaj momenat kada razumeš kod, a poželiš da ga _napišeš drugačije_, jer ti nije sasvim lep/prijatan/efikasan/... Uzmi neki svoj kod od pre godinu dana i pogledaj ga - vrlo verovatno je da ćeš poželeti da ga izmeniš :)

## Da li postoji dobar kod?

Da. To je kod koji radi i koji će - većina - razumeti brzo do granice koju sam spomenuo.

Implikacija rečenog je da, prosto, ne treba previše vremena trošiti da kod bude "univerzalno" dobar, jer tako nešto je nemoguće ostvariti. Treba ga prihvatiti kao nosioca informacija i dozvoliti da bude robustan; a isključiti očekivanja naprednijih usavršavanja - nešto što je nama programerima gotovo pa fetiš (očekivano, s obzirom da dobar deo vremena trošima na njega).

Kodiraj da preneseš informaciju.
