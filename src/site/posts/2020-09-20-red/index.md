---
title: "Refactoring Enabled Development aka RED"
date: 2020-09-20T01:07:03+00:00
categories:
  - Razvoj
meta:
  img: "ig.png"
tag:
  - razvoj
  - tdd
  - programiranje
  - prakse
---

TDD programerska praksa je baš nesrećno nazvana.

<!--more-->

"Nomen est omen", kažu Latini. Sudbina je htela da TDD dobije prizvuk onoga što ova praksa nije - testiranje. Jedna od prvih napomena na [radionici](https://oblacodemia.com) je: TDD se najmanje bavi testiranjem. TDD je praksa razvoja u malim koracima, uz neprestano unapređenje refaktorisanjem. Kada pričamo o TDD neizostavno se pojavi ilustracija ciklusa tri faze: 1) testovi koji su pali, 2) testovi koji prolaze i 3) refaktoring.

Nažalost, ovako postavljene stvari izostavljaju značajnu suštinu: inkrementalno usložavanje. Ne prestaje da me fascinira koliko mi, programeri, pokušavamo da rešimo algoritamske probleme _odjednom_. Prisustvao sam nemalom broju sesija gde programer sa solidnim znanjem pristupa problemu 'generalno': uviđa već kako rade jednostavni slučajevi i odmah programira one teže ili pak specijalne slučajeve. Gotovo uvek se takav pristup završi Gargamelom od koda. To se toliko često ponavlja da sam razvio i strah od sličnog ponašanja u sličnoj situaciji (_fear of behaving the same_, iliti `fobs` - kako to Denis Riči nikada nije nazvao).

Da se vratim na temu. Usložnjavanje u TDD je ostavljeno programeru: iako se naziru obrasci usložnjavanja, nema nam puno pomoći. Rešenje može da ode na bilo koju stranu, ka lepom ili rogobatnom dizajnu. Zanimljivo je da se, bar iz mog iskustva, jednom izabrana putanja _ne_ menja. Kako odmiču ciklusi, rešenje nastavlja da se gradi nad postojećim izborima, kakvi god bili. Tu refaktoring igra ulogu samo čistača _code smell_-ova, ništa više. Kao kada bi u Tarantinovom filmu Semjuel Džekson glumio Hani Bani.

Hajde da pristupimo na drugačiji način. Ako bi trebalo da izdvojim jednu i samo jednu komponentu TDD-a, to bi bio: **refaktoring**. Da proširim odatle misao: "mogućnost refaktoringa". Hajde da i da definišemo ovaj pojam:

> To je takav razvoj u kome u svakom trenutku možemo da primenimo kakav god potreban refaktoring.

Nazvao bih ga i _agresivni refaktoring_; ali kako je svet sam po sebi već dovoljno agresivan, odlučujem se za mirniji oblik: `R.E.D.` (iz naslova teksta).

+ `RED` razvoj podrazumeva postojanje testova. Prosto, nema izmene koda ukoliko nema testa. Međutim, ne insistira na redosledu pisanja testova. Šta više, ne insistira na postojanju testa (pratite me još malo) ukoliko kod ne doživi izmenu!
+ `RED` razvoj podrazumeva da se kod menja od prvog koraka. Kod je promenljiva stvar: tečnost kojoj praviš posudu rešenjem. Kako se posuda stvara, tako i kod kao tečnost prati i prilagođava se izmenama. Proizilazi da kod biva pokriven testovima.
+ Često - gotovo uvek - da bi dodao nešto novo u sledećem koraku, postojeći se mora prilagoditi, tj. refaktorisati. `RED` zato podrazumeva izredu u malim koracima, slično TDD. Ipak, ne trebaju nam testovi da kažu šta je sledeći mali korak; taj ukaz i nije toliko vredan koliko se o tome priča. Vrednija je konkretna izrada koraka.

Ukratko, da ponovim, `RED` razvoj nam dozvoljava da u bilo kom trenutku promenimo sve što je potrebno da bi došli do boljeg rešenja.

Ova praksa se ne odnosi samo na kod i algoritamske probleme. Priznajem da sam često doživljavao parališući strah o izboru pravog rešenja, naročito jak na početku projekta/problema (_fear of choosing right_, iliti `focr` kako to Stiv Džobs nikada nije nazvao). RED me oslobađa straha - biram rešenje koje mi se _čini_ dobrim u tom trenutku, a dozvoljavam da bude zamenjeno _bilo kada_ ukoliko se ukaže da ima bolje. To je već velika vrednost.

Sad, može biti da sve ovo liči na mudrovanja kakvog dokoličara. No nekada drugačiji pristup istome može da pruži nove i šire uvide.

Kao što Kent Bek nosi zelenu narukvicu da ga podseća na TDD, ja nosim crvenu da me podseća na `RED`. Koju vi nosite?
