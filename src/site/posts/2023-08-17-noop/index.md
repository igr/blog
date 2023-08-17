---
title: "PP, FP, OOP, Imp"
date: 2023-08-17T07:07:07+00:00
categories:
  - Razvoj
tag:
  - programiranje
  - oop
  - funkcionalno
  - proceduralno
---

Programiranje bi trebalo da je jednostavnije nego što jeste. 

<!--more-->

Naučeno teško napuštamo. Kada ideja jednom postane popularna, uprošćava se do nerazumevanja.

Sledi angedota iz starog Japana. Programer je čuo da tamo negde živi mudrac koji je dostigao konačni nivo razumevanja kako pisati kod. Krenuo je da ga traži. Prošao je preko sedam mora i sedam gora za sedam i dvadeset godina. Konačno, programer je pronašao mudraca: ovaj je mirno sedeo za kompjuterom u skromnoj sobi. Došavši do njega, sada već matori programer ga upita: "Kako ispravno pisati program?" Mudrac se zamisli za trenutak, pa odgovori:

> Piši proceduralni kod.

"Proceduralno programiranje? Jel me za'ebavaš, bre?", razjareno će matori programer. Mudrac se zbuni: "Ček, zar nije tako?"

---- 

Program je proceduralni niz instrukcija. Čitanje koda je proceduralno.

OOP nije dobra ideja. Ovo nije definitivno "ne" paradigmi; ipak, OOP nije odgovarajući model za rešavanje poslovnih problema; a svakako ne zaslužuje pažnju ni ozbiljnost kojom joj se pristupa. Nemam nameru da raspaljujem vatru; vreme je da sebi odgovorim na pitanje postavljeno pre baš mnogo vremena.

Klasa ima kakvog-takvog smisla. Predstavlja asocijaciju data tipova i nekakvih srodnih funkcija. Postoji najviše iz _estetskih_ razloga; može da bude zgodna. Prilično bezazlena programerska konstrukcija.

**Loša, baš loša** ideja je da svaku funkciju (dakle, svako ponašanje) moramo da uglavimo sa nekakvim stanjem (data tipovi.)  U OOP tako funkcije završavaju kao metode u klasi, uvezane u asocijaciju ničim izazvanu. To što je data tip ujedno i argument funkcije ne daje za pravo da se funkcija dodatno uvezuje sa stanjem kroz nekakvu klasu. Zašto bi? OOP liči na kakvu igru povezivanja: sa jedne strane imamo funkcije (ponašanja), a sa druge strane imamo klase; zadatak je da funkcije linijom _nekako_ uvežemo sa klasama, izmišljajući razloge za takvu asocijaciju. Često ponuđene klase nisu dovoljne, te je potrebno napraviti dodatne, što usložnjava stanje stvari. Ako stavimo u perspektivu i to da je ponašanje glagol, a klase su imenice, uviđamo apsurd ove fiktivne igre: pokušavamo da uparimo glagol sa samo jednom imenicom da bi mogli da iskažemo sve buduće rečenice koda.

Apstrakcija _nije_ problem. Problem je što izjednačavamo apstrakciju sa klasama. Apstrakciju je teško, teško ispravno modelovati - sigurno nam to neće uspeti iz prve, kako se obično završi. Ispravna apstrakcija zahteva mnogo vremena i energije i truda; često mnogo više nego što nam je na raspolaganju.

OOP nudi samo iluziju rešenja: 1) nasleđivanje nije "jeste" relacija, već samo [podskup](https://oblac.rs/kvadrat-vs-pravougaonik/), 2) polimorfizam postoji i bez OOP, i konačno, 3) enkapsulacija - konačni promašaj OOP. Enkapsulacija sugeriše da se program (tj. problem) i njegovo stanje mogu podeliti na sitne, sitne delove, ali da ujedno ti delovi budu dovoljno nezavisni, te da se čak i ponovo mogu upotrebljavati. Apsurd je u skali: što je nešto sitnije, to manje odgovara enkapsulaciji, teže je za ponovnu upotrebu, više je komunikacije između komponenti. Da li kompleksnost nestaje time što smo problem razdovojili na jako uvezane sitne delove? Ne, samo biva razmuljana.

Ako premotamo unazad na devedesete, za deo razloga zašto je OOP tu gde jeste možemo da zahvalimo Javi, koja je ponudila nekakav minimalni skup osobina, ponovo, ničim opravdano. Zapravo, Java se i nije st(v)arala da bude programski jezik budućnosti; popularnost je stekla iz drugih razloga: sličnost C-u, nezavisnost od platforme i kolektor đubreta su ugrabili pažnju, a ne OOP.

Ne impliciram da je funkcionalno programiranje (FP) opozicija OOP-u. Iako danas smatram da je FP pravac kamo bi razvoj trebalo da se kreće, ne tvrdim da je to i jedini. Zapravo, suprotnost od OOP _nije_ FP (!), već proceduralno programiranje (PP). Obe metodologije (i OOP i PP) se mogu izvesti funkcionalno ili imperativno.

Kako program raste, funkcije i data tipovi postaju sitniji, te se javlja potreba za "unit of code" - nekakvom smislenom apstrakcijom koja obuhvata i ponašanje i stanje. Tugica je što se nije otišlo daleko - sve se završilo pre nego što je i počelo banalnom asocijacijom funkcija i podataka u onom što nazivamo klasa. Ruku na srce, kada čitaš udžbenik iz programiranja za prvu godinu (`Mačka` je `Životinja`), OOP zvuči kao jednostavan niz pravila koje treba ispratiti, tu su SOLID, paterni, DI, TDD, dodaj i kašičicu Agilnog i dobijaš uputstvo za pisanje svakog programa na svetu. Nekome recepti; meni su samo ukaz da nešto nije kako treba, čim su potrebni.

Problemi postoje i sa komunikacijom između klasa - pozivanjem metoda, odnosno slanjem poruka drugim objektima. Slanje poruka zahteva da se _ne_ prenose reference na objekte(!); retko koji programski jezik je to ispoštovao. Tako nastaje uvezivanje klasa (da bi `A` pozvao `B.foo()` mora da zna za `B`), gde jedna sadrži referencu na objekat druge klase da bi mogla da pozove njenu metodu. Uvezivanje prerasta u hijerarhiju, u kojoj je jedini ispravni smer pozivanja od roditelja prema deci. U slučaju da klase iz dve različite grane hijerarhije žele da komuniciraju nastaje problem, koji rešavamo kako se već snađemo, smišljanjem novih pravila, čime anuliramo potrebu za hijerarhijom. A gde je tu enkapsulacija?

Asocijacija metoda u klase dozvoljava i pisanje poziva na sledeći način: `subjekat.predikat(objekat)`. Zvuči sjajno, dok god verujemo da se služimo isključivo prostim rečenicama. Jasno, to nije slučaj. Upitan je i subjekat - jer on to nije: u izrazu `televizor.uključi(program)` subjekat je i dalje korisnik, a televizor je samo objekat. Nema razlike od `program.uključiNa(televizor)`, kada je zapravo: `uključiTelevizorNaProgram(televizor, program)`. To što kod pišemo na način koji podseća na jezičku konstrukciju ne znači da i preuzima ulogu reči u rečenici koda.

Asocijacija metoda u klase je sjajna za brzo programiranje, reći će neko: otkucam tačku i dobijam katalog funkcija iz kojeg biramo željenu metodu. Auto-complete može sasvim lepo da radi i sa funkcijama, dovoljno je da izlistaš sve funkcije kojima argument odgovara tipu na kome je trenutno kurzor. Alatka nije opravdanje za metodologiju.

## Jel me za'ebavaš, bre?

Proceduralni kod je svet funkcija. Ponavljam, to nije nužno funkcionalno programiranje. FP ili imperativno je način iskazivanja koda. OOP i PP se bave strukturom koda, organizacijom. Nemojte misliti da u PP ne postoje izazovi kako ispravno i pragmatično grupisati kod; od toga se ne može pobeći. Razlika je što u PP nema bespotrebne, nametnute stege OOP pravila; kod biva oslobođen.

Dakle:

+ Pišemo funkcije, po mogućstvu bez efekata.
+ Podaci "teku" kroz graf poziva i transformišu se usput.
+ Podaci i funkcije su razdvojeni.
+ Metode imaju smisla samo tamo gde postoji eksplicitna asocijacija sa stanjem (ADT: liste, redovi...).
+ Tipovi se obilato koriste.
+ Enkapsulacija je na nivou modula.

Poslednje je i najvažnija. Moramo definisati šta modul znači. Dakle, [modul](https://oblac.rs/modulacije/) ima:

+ interfejs(e) za korišćenje,
+ internu implementaciju,
+ opcione interfejse (1 ili više) za povezivanje.

Kada jednom evoluiramo od programerskih neadertalaca, doći ćemo do jezika i alata kojim ćemo modul moći da prikažemo na pragmatičan način, a ne da pravimo nekoliko pod-projekata. Tada ćemo konačno ostaviti OOP na zidovima pećina iz kojih ćemo izaći, da posluže kao podsetnik. Sva sreća pa se svet softverskog razvoja ne kreće u pravcu manjih programskih jezika. `sarkazam.primeti(čitalac);`
