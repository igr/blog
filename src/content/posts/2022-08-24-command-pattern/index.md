---
title: "Command pattern u dobru i zlu"
date: 2022-08-24T01:07:03+00:00
slug: command-pattern-u-dobru-i-zlu
description: >
  Iz života programera.
---

Iz života programera.

Na projektu se koristio SpringBoot za pravljenje vrlo uobičajenog APIja. Projekat je mahom bio neopterećen ostalim delovima ekosistema klijenta, pisan od početka. Inače, pisanje projekata od nule se dešava toliko retko da takvu priliku treba ceniti na primeren način - uspostavljanjem delotvornog razvojnog okruženja.

Kako bilo, dočekao me je projekat u ranoj fazi izrade. Sve je bilo prepoznatljivo (dobra vrednost SpringBoot-a), osim što se koristio command pattern za međusobno pozivanje servisa.

## Obrazac

**Command Pattern** je jedan od načina za razdvajanja mesta poziva (tj. zahteva za izvršavanje) i zapravog izvršavanja pozvane komponente.

Na primer, komponenta `A` želi da izvrši `foo()` koja je implementirana u `B`. Umesto da to uradi direktno (dakle `b.foo()`), `A` će poslati komandu `Foo` nekakvom izvršiocu komandi `E`. Izvršilac `E` potom pronalazi komponentu koja može da opsluži ovu komandu i izvršava je. Komanda `Foo` je često obična data klasa, praktično argument za `foo()`.

Drugim rečima, umesto `A -> b.foo()`, odigrava se: `A -> E -> b.foo()`.

Vrednost ovog programerskog obrasca je tamo gde je labavo uvezivanje komponenti neophodno. Kako se odluke izvršioca `E` dešavaju u runtime, ovim obrascem se dozvoljava bilo kakva implementacija `B`: lokalna, udaljena, čak i njena zamena tokom izvršavanja programa.

## Zašto?

Kada mi je predočena arhitektura projekta, moj jedini komentar je bilo pitanje "Zašto?" Odgovor je bio kratak i uključivao je pojmove kao što su "heksagonalna arhitektura" i "modularnost".

Sad dolazimo do zanimljivog dela.

Prihvatio sam odgovor. Ne postoji stvar za koju sigurno možeš tvrditi da je znaš, kada je reč o veštinama. Upalila mi se lampica upozorenja, ali sam isključio alarm. Sigurno postoji nešto što ne vidim, smatrao sam; uostalom, arhitekturalna odluka je već donešena, rezonovana i izvagana pre toga.

Kada treba podići glas? Nije stvar toliko u "nadjačavanju" (možda i jeste!?) koliko u delotvornosti reakcije.

Kako bilo, prvo vreme smo kodirali pod komandom ovog obrasca. Labava uvezanost ima cenu - pratiti tok izvršavanja od `A` do `B` zahteva više klik-i-klakova, a tok misli se prekida.

## Par nedelja kasnije...

Ono što žulja može se trpeti ukoliko postoji zdrav razlog koji ga opravdava. Ovde to nikako nije slučaj. Obična, neuzbudljiva (u dobrom smislu), API bekend aplikacija nema razloga za labavo uvezivanje svojih _internih_ komponenti, koje sve pripadaju istom modulu.

Jedne noći sam pretumbao ceo kod i izbacio uljeza. To je bila dobra odluka. Ipak, sprovedena je na pogrešan način - trebalo je komunicirati sa ostalim projektima. U tom okruženju nisam osećao psihološku sigurnost da tako i učinim.
