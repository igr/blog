---
title: "Liskov Substitution Problem"
date: 2024-07-04T01:06:08+00:00
slug: "liskov-substitution-problem"
description: >
  Barbara je dala mnoga lepa razmišljanja o ponašanju i tipovima. Mi smo ih zanemarili i na njih zalepili "LSP" etiketu.
---

Barbara, dobitnica Tjuringove nagrade 2008., je dala lepa razmišljanja na temu ponašanja i tipova. Mi, softverski kvazi-inženjeri, bez predumišljaja smo ih zanemarili i na sve zalepili "LSP" etiketu.

## Geneza

Postoji nedoumica sa definicijom LSP, pošto ih ima nekoliko u opticaju. Jedna je od Roberta Martina:

> A program that uses an interface must not be confused by an implementation of that interface.

Izvorno je objavljena 1996. i formulisana je u C++ maniru:

> Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.

U pitanje je parafraziran tekst koji se može naći u radu Barbare Liskov: "Data Abstraction and Hierarchy" iz 1987.:

> What is wanted here is something like the following substitution property: If for each object o1 of type S there is an object o2 of type T such that for all programs P defined in terms of T, the behavior of P is unchanged when o1 is substituted for oz, then S is a subtype of T.

Druga definicija LSP koja se sreće je:

> Objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program.

Najpoznatiji primer kojim se opisuje LSP je modeliranje `Rectangle` i `Square`. Detaljno sam ga obradio [ovde](https://oblac.rs/kvadrat-vs-pravougaonik/); ukratko: `Square` ne može da nasledi `Rectangle`.

Zgodna krilatica za LSP je sledeća: ako liči na patku i kvače kao patka, a trebaju joj baterije - onda nije patka.

LSP, dakle, upozorava da se ugovor osnove klase (tj. tipa) ne sme menjati pod-tipovima.

## Analiza

Počinjem sa kratkom zabeleškom. Barbara Liskov se u radu "Data Abstraction and Hierarchy" bavi "abstrakcijom podataka." Zaključuje da:

> ...although data abstraction is the more important idea, hierarchy does extend its usefulness in some situations.

Hijerarhija - dakle, nasleđivanje - je tek sporadično korisna apstrakcija. Drugim rečima: nasleđivanje, taj sveti gral OOP, je tek samo zgodna ideja u _ponekim_ situacijama. Inače, ovakav ton se provlači kroz mnoga razmišljanja i zaključke iz perioda nastanka OOP-a, pa je neobično, čak i zabrinjavajuće, kako je nasleđivanje uopšte postalo nezamenljivi stubac OOP-a.

Ovaj rad ističe i zanimljive benefite hijerarhije tipova, kao što je - inkrementalni dizajn, zašta prvi put čujem. Ideja je sledeća: u početku `P` i `Q` koriste tip `T`, a onda, vremenom, `Q` se menja tako da koristi sada novi tip `S` koji je pod-tip izvornog `T`. Ovaj primer i nije najbolji; inkrementalni dizajni nije posledica niti ekskluziva hijerarhije tipova. Zanemaruje se i kompleksnost hijerarhije usled usložnjavanja sistema.

Pomenuti rad _nije_ taj na koji se treba oslanjati. Iako ima neke interesantne - i vrlo relevantne - uvide, on je začetak ideje koja dolazi kasnije. Upravo početak: "What is wanted here is something like..." (koji se često izostavlja!) je naznaka da je reč o sumiranju za potrebe teksta i boljeg razumevanja, a _nikako_ definicija.

----

Idemo dalje. Rad u kome je definisan princip najbliži onome šta LSP jeste je "A Behavioral Notion of Subtyping" iz 1994. Barbara i koautorka Žanet kažu:

> Let `ϕ(z)` be a property provable about objects `x` of type `T`. Then `ϕ(y)` should be true for objects `y` of type `S` where `S` is a subtype of `T`.

Specifikacija tipa određuje koje propertije možemo dokazati o objektu.

Sada kreće zanimljivi deo. Da bi uopšte mogli da pričamo o ponašanju subtipova, moramo definisati tip! Rad autorki upravo kreće tako: specifikacijom tipova, nad koje se, kasnije, uvodi specifikacija podtipa. Dakle, rad autorki ima značajno _veći domet_ od onoga što danas smatramo da je LSP. I svaka naša diskusija o LSP je potpuno prozaična, ukoliko ne ispratimo formalnu specifikaciju tipova. Termini "confused", "correctness" i slični su nejasni, uvode nedoumice, a ništa zapravo ne definišu. Nezrelo je i ne-etički sumirati rad autorki na takav banalan način.

Autorke specificiraju tip kao skup metoda i njegovih roditeljskih tipova. Svaki metod se definiše _ograničenjima_.

```plaintext
bag = type
uses BBag (bag for B)
for all b: bag

  invariant | bp. elems | <= bp.bound

  put = proc (i: int)
        requires | bpre.elems | < bpre.bound
        modifies b
        ensures bpost.elems =
          bpre.elems U {i} ^ bpost.bound = bpre.bound
```

Svaka metoda se definiše ne samo imenom i ulazno-izlaznim tipovima, već i svojim ponašanjem opisanim pred- i post-uslovima,  trojkom `requies`, `modifies` i `ensures`. Označena su i promena _stanja_. Izostavljeni su tkzv. kreatori (konstruktori), ali su tu `invariant`: pravilo koji svaki kreator mora da zadovolji.

Uporedimo ovo sa današnjim načinom definisanja tipova: interfejsima. Osim imena metoda i ulazno/izlaznih tipova, sve ostalo je izostavljeno; očekuje se ponašanje bude opisano komentarima i specifikacionom testu koji niko ne piše (`assert`?). OOP nije evoluirao, ostao je u primitivnom zapećku. Još jedna opaska: da je sva energija utrošena na pseudo-inženjersku praksu TDD potrošena na specifikaciju tipova, eh...

----

Idemo dalje. Nakon specifikacije ponašanja tipa, konačno možemo da rezonujemo o podtipovima. Autorke definišu čak dva načina kako se podtip može predstaviti. Jedan je pravilima ograničenja, drugi je mapom ekstenzija; prvi način se preferira.

```plaintext
stack = type
uses BStack (stack for S)
for all s: stack
  invariant length(spre.items) <= spre.limit

  push = proc(i: int)
  requires length(spre.items) < spre.limit
  modifies s
  ensures spost.items = spre.items || [i] ^ spost.limit = spre.limit

  subtype of bag (push for put)
    ...
      where...
```

(Ograničen sam sintaksom i vremenom; pogledajte izvorni rad za ceo primer.)

Podtip, za početak, može da ima drugačija (!) imena metoda, koja više odgovaraju njegovom kontekstu (još jedna izgubljena OOP ideja.) Podtip se definiše kao niz uslova (koji se ne vide na gornjem primeru); a kasnije u dokumentu je dat i ceo niz pravila kako se definiše relacija podtipa i šta ona podrazumeva.

----

Idemo dalje. Autorke na kraju tvrde da je njihov sistem rigidan:

>  The requirement we impose on subtypes is very strong and raises a concern that it might rule out many useful subtype relations. To address this concern we looked at a number of examples. We found that our technique captures what people want from a hierarchy mechanism, but we also discovered some surprises.

Nalaze da postoje dve kategorije podtip relacija: one koje dodaju nove metode i, eventualno nova stanja; i one koje uvode nova ograničenja. Dozvoljava se, na primer, višestruko nasleđivanje. Primeri koji uvode nova ograničenja su naročito interesantni, jer su definisani kao `invariant` - čime određujemo ponašanje konstruktora i mogućih stanja podtipa. Simpatičan primer je sa slonovima. Slon ima boju. Postoje dva podtipa, (fiktivni) kraljevski i albino slon. Oni imaju isključivo plavu i belu boju, respektivno. Ono što nije rečeno je da se osnovni tip isto menja, jer ako slon dobije plavu boju, mora da postane - cvrc - kraljevski. Srećno s time, OOP.

----

Idemo dalje. Robert sam 2020. godine priznaje da je pogrešno interpretirao Barbaru (kao što su to radili i mnogi drugi). LSP se ne tiče nasleđivanja, već subtipova. Međutim, nije otišao mnogo dalje u objašnjenje o čemu je LSP.

## Zaključak

Problem LSP-a je: _nasleđivanje_ i hijerarhije tipova; upravo ono čime se bavi. Reč je o lepom i kvalitetnom pokušaju formalizacije podtipova; međutim, većina je ostala u tekstu, a malo toga je završilo u programskim jezicima. Ta činjenica takođe govori: ako je nasleđivanje još uvek, posle pola veka, teško za precizno definisanje, onda nam možda i ne treba?

Dalje, autorke podrazumevaju precizna ponašanja metoda. To ne mora biti slučaj. Metod `toString()`, na primer, ima vrlo slobodnu interpretaciju. Ako bi u Javi napisali: `object.toString().contains("@")` dobili bi vrlo _različita_ ponašanja. Poređenje (`equals`) je tek priča za sebe: da li su tačke `{x:0, y:0}` i `{x:0, y:0, z:1}` iste ako druga nasleđuje prvu?

Ispostavlja se da je teško precizno opisati ponašanje; a još teže kada na to primenimo podtipove. `TreeSet#contains()` u Javi, na primer, koristi (ili je koristio) komparator da pronađe da li objekat postoji u setu. Komparator služi za ustanovljavanje redosleda, a ne jednakost. To je ponašanje koje se ne vidi spolja; opisano je samo kratko u dokumentaciji.

Primetite da uopšte ne pominjem `IS-A` (jeste) vezu. Podtipovi su specijalizacija i re-definicija podskupa vrednosti, a ne relacija "jeste".

Nasleđivanje je koncept koji treba da nestane. Koristi se kao način za kopiranje metoda i atributa iz jedne klase u drugu kako bi se ponovo upotrebile, često ugrožavajući apstrakciju; nema tu 'I' od nasleđivanja :) Naši objekti su samo kontejneri stanja i procedura. A to nije bila ideja.
