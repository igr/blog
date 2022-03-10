---
title: "TDD ili ne"
date: 2022-03-10T01:07:03+00:00
categories:
  - Razvoj
tag:
  - tdd
  - razvoj
---

Pitanje je sad.

<!--more-->

Da bi bilo šta upoređivali, potrebne su nam **dve** veličine koje merimo.

Zato izjava "_TDD radi..._" ne znači mnogo. Naravno, isto važi za ostale softverske prakse: [code review](https://oblac.rs/pr-pogreska/), Scrum, [Zdrum](https://zdrum.work)... (nastavi niz dalje). To što je nešto definisano, a naš ga omiljeni softverski guru strastveno propoveda - i dalje ne čini tvrdnju validnom. Potrebno je pravilno izmeriti dve prakse da bi se mogle uporediti, pa tek onda doći do tvrdnji.

Sledeće što čujem je: "_Od kada koristimo TDD, procvetali smo_". Na ovo odmah odgovaram pitanjem: "Kako ste pre radili?". Zanimljivo, većina onih koji naglašavaju prednosti TDD u praksi, mahom nisu imali razumni, struktuirani razvoj pre toga. Takva komparacija onda nema smisla, jer ne opravdava da TDD radi, već da prethodna praksa ne radi.

_Havtornov efekat_ je težnja ljudi da rade kvalitetnije i ponašaju se bolje ukoliko su svesno podvrgnuti nadzoru (na pr. eksperimentu.) Tim koji svesno doživljava TDD kao nekakvu posebnu praksu, čime nadgleda sam sebe, potpada pod uticaj ovog efekta motivacije.

Retki su se usudili da naprave _istraživanje_. Microsoft, tako, izveštava: 60-90% poboljšanje gustine defekata (broj defekata po linijama koda). S druge strane, vreme izrade se produžava 15-35%. Da bi istraživanje bilo potpuno, trebalo bi taj višak vremena vratiti ponovo u prethodni način razvoja.

Neke TDD pretpostavke su _neutemeljene_. Ne postoji razlog zašto bi test prednjačio kodu. Postoje istraživanja koja pokazuju da ovakva praksa ne doprinosi kvalitetu. Štaviše, TDD način pisanja testova čini da se testovi preklapaju, te se ista funkcionalnost (tj. linije koda) testira više puta, što nije efikasno.

TDD ne daje naznaku kada stati sa testovima. Ako uzmemo poznatu katu, konverziju u arapske brojeve, svi se, nekako, složimo da ne testiramo brojeve `7` i `8`, pošto prethodni rade. Zašto ne? Kako smo sigurani da dosadašnji program zaista radi i za ove brojeve? Ista ta analiza koja nam daje odgovor na ovo pitanje se može primeniti i ranije.

Inkrementalni razvoj i _usložnjavanje_ algoritma je još jedna neutemeljena mit. Naime, ukoliko usložnjavamo algoritam u najmanjim mogućim koracima, magično dolazimo do optimalnog algoritma. Da je to tačno, svi bi onda došli do istog algoritma koristeći TDD na istom polaznom problemu. Ispostavlja se da to nije tako: [ujko Bob i ja](https://oblac.rs/tdd-kuglanje-i-teca-bob/) imamo različite pristupe suočeni s istim zadatkom. Smatram da je njegovo rešenje ujedno lošijeg kvaliteta. Ako se malo udaljimo od programiranja: inkrementalnim usložnjavanjem možemo samo pronaći lokalni minimum entropije, koji nije nužno optimalan. Drugim rečima, nema garancije da dolazimo do kvalitetnog rešenja.

_Dodatni refaktoring_ je još jedna boljka TDDa koju retko ko uočava i pominje. Svakih nekoliko koraka sledi nešto što nazivam "wave refactoring". Usled pomenutog usložnjavanja, dešava se da program svako malo menja izgled. Par koraka kod ima jednu strukturu, a onda dođe "talas" i drastično izmeni izgled koda. Kako koraci odmiču, talas refaktoring može da bude sve teži (dugotrajniji, kompleksniji itd). Slično kao i sa ponovljenim testovima, refaktorisano se često prepisuje u nekom narednom koraku, čime ga obezvređujemo.

Evo jedne provokacije za test fataliste: da li je bolji kod koji je 100% pokriven testovima ili onaj kod koga je samo "srećna putanja" istestirana? A šta ako dodam i to da vreme za potpuno pokrivanje testovima košta koliko i omanji tim za podršku korisnicima u vanrednim slučajevima? Šta ćeš pre kupiti?

## Ipak workshop?

Uprkos svemu napisanom, držim [TDD radionice](https://oblacodemia.com/tdd/). Smatram da ovu praksu treba probati, propustiti kroz prste; čitanje o njoj nije dovoljno.

TDD nije nikakva magična rabota. Bolja je od kaubojskog programiranja, to svakako; kao što je slučaj i sa svakom drugom smislenom praksom.

O TDD ne treba pisati hvalospeve. Ima šta da dopuni softverskim veštinama, i to je to; idemo dalje.

Ono što sam poneo je sledeće:

+ [RED](https://oblac.rs/refactoring-enabled-development-aka-red/) - fleksibilnost projekta da u svakom trenutku mogu da napravim značajan refaktoring, usled toga što želim da odluke donosim kasnije, pre nego ranije.
+ Kočnica za preterani prerani inženjering. Reč je o ličnom problemu nastalom iz pogrešnog učenja programiranja, opsesivno fokusiran na OOP. Isksutvo TDD mi je podsetnik da se lupim po prstima i dozvolim kasnije odluke.
