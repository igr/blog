---
title: "Baš, baš, ne volim ORM"
date: 2020-11-01T01:07:03+00:00
categories:
  - Razvoj
tag:
  - java
  - razvoj
  - baza
  - jpa
  - hibernate
  - orm
---

Ako ima jedno softversko rešenje koje bih hibernirao, to je ORM. Da mogu, pritisnuo bih dugme `DELETE`, a zatim `COMMIT` i poslao ga u zaborav.

<!--more-->

SQL je zreo domenski jezik. Preživeo je desetine godina svakakve upotrebe; napravljen tako da se lako razume. Relacione baze nikuda neće otići.

Onda su došli OOP programeri. Videvši tabele u bazi, pomislili su da ih mapiraju na klase. Videvši relacije među tabelama, žurno su prigrabili kolekcije. Nabrijani na paterne, poskočili su da naprave fasadu za baze. Sve što štrči biće upeglano anotacijama. Voila! Da završim rečima Gavina Kinga: "problem programiranja baza je rešen."

OOP programeri su odlučili da je sve to baratanje sa bazama previše. Kako vole prečice, neko je negde pomislio da je mudro da _ne razmišljamo_ o bazi, već se posvetimo isključivo mapiranim entitetima u odabranom OOP jeziku. Ko će još da uči SQL? Jer, na kraju, baza je samo implementacija, zar ne?

Pogrešili su u konceptu. Upiti rade na i sa dinamičkim - dakle, _runtime_ - strukturama podataka. Podaci o tabelama i veze jesu definisane pre korišćenja (_compile time_), ali definisanje seta na kome se operiše je ostavljeno korisniku u _runtime_. Drugim rečima, kroz upit se određuje da li vraćamo jednu ili deset kolona, kao i to da li pravimo join-ove ili ugnježdene upite. I to je potpuno legitimno - šta više, upravo se tako izražava i koristi moć baza i domenskog jezika SQL.

Zato ORM nije prečica, već over-engineering. Umesto da se bavimo bazama, bavimo se JPA. Pažljivo baratamo entitetima (jer nisu tek tako obični objekti), dodajemo kojekakve anotacije, pišemo pseudo-SQL: sve u cilju da JPA fasada proizvede upit kakav samo zamislili na samom početku. I sva ta muka da bi imali... šta to, tačno? Da bi sakrili SQL? Da bi u produkciji mogli da zamenimo bazu preko noći? Mda, srećno s time.

## Greška u koracima

Glupo je menjati domenski jezik (SQL) univerzalnim jezikom (OOP programski jezik). Time se potpuno urušava smisao postojanja domenskog jezika! Zapravo, naša nastojanja bi trebalo da su u suportnom smeru: treba nam što više domenskih jezika! Ukoliko je OOP jedini alat koji imas, onda ti svaki problem izgleda kao OOP problem.

Ponavljam: treba nam što više domenskih jezika. Ono što OOP programeri treba da reše nije fasada za te jezike, već adapter. Treba nam način da _lako_ koristimo drugi domenski jezik, kao što je SQL; a ne da ga izopštimo.

Konkretno, u slučaju baza - treba nam **samo** mapiranje. `OM`, a ne `ORM`. Lak način da dinamički set podataka mapiramo u objekte. Korak dalje su prečice _samo_ u korišćenju jezika - generisanje kao sa JOOQ, ili templejtski SQL kao u Jodd (pozor: samo-reklama). Sve ostalo možemo da rešimo sami.

## Meta

Jedan način da se domenski jezici uvezuju je kroz meta-programiranje. Zamisli takav jezik u kome možeš uključiti plugin koji ti dozvoljava novu sintaksu... No, ovo je već tema za neki drugi put.
