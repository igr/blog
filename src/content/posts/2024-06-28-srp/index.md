---
title: "Single Responsibility Problem"
date: 2024-06-28T01:06:08+00:00
slug: "single-responsibility-problem"
description: >
  Softversko inženjerstvo mora biti precizno. Sve šta ustanovimo kao princip ili pravilo mora da nosi što manje nedoumica. SRP je primer jednog pogrešnog i neupotrebljivog principa.
---

Softversko inženjerstvo mora biti precizno. Sve šta ustanovimo kao princip ili pravilo mora da nosi što manje nedoumica.

SRP je, tako, primer jednog pogrešnog i neupotrebljivog principa.

## Geneza

SRP princip je skovao Martin Robert. Pojavljuje se u knjizi "Agile Software Development, Principles, Patterns, and Practices", 2003. Ova knjiga kasnije postaje "Clean Code", 2009. SRP je definisan ovako:

> A class should have only one reason to change.

Autor termin "responsibility" (odgovornost, zaduženje) izjednačuje sa "a reason for change" (razlog za promenu). Ako smatramo da ima više od jednog razloga za promenu klase, onda klasa ima više odgovornosti.

Dat je primer sa interfejsom `Modem`, koji nudi četiri metode (ne najbolje nazvanih, ali je to druga priča): `dial`, `hangup`, `send`, `recv`. Ovakav interfejs ispoljava dve odgovornosti: rad sa konekcijama (`dial`, `hangup`) i komunikacije (`send`, `recv`).

Razdvajanje odgovornosti zavisi od toga kako se aplikacija menja. Ukoliko menjamo potpis metoda za komunikaciju, onda se sve klase-korisnici ove dve metode moraju rekompajlirati i re-deploy-ovati ponovo. Tada ima smisla podeliti `Modem` na dva interfejsa: `DataChannel` i `Connection`. Tako se klijenti koda oslobađaju uvezanosti (coupling) sa dve zavisnosti.

Ako se, međutim, aplikacija menja tako da se ne menjaju ove dve odgovornosti u različito vreme, onda ih nema potrebe razdvojiti. To je posebno naglašeno: SRP se ne primenjuje ukoliko nema simptoma.

Robert zaključuje da je ovo jedan od najjednostavnijih principa koji je najteže sprovesti kako treba.

## Analiza

Već je sam početak nejasan. Robert pominje SRP u konktestu i modula i klase, a daje formalnu definiciju koja se odnosi samo na klasu. To je pogrešno. Uopšte ne treba razmišljati o klasi. Zašto je Robert izabrao taj termin je nejasno; možda zato što je klasa u Javi papazjanija koja trpi sve šta treba: i modul (niko je ne koristi tako) i klasa i datatip i statički kontest.

"Structured Design" iz 1975. je knjiga iz koje je Robert preuzeo mnoštvo toga. U njoj se modul definiše kao:

> A module is a lexically contiguous sequence of program statements, bounded by boundary elements, having an aggregate identifier. Another way of saying this is that a module is a bounded, contiguous group of statements having a single name by which it can be referred to as a unit.

Ovakva definicija modula je prilično otvorena. Iako se ne slažem potpuno s njom, ima mnogo više smisla od onoga šta Robert nije definisao i uzeo zdravo za gotovo. Dakle, u našem fokusu je modul, koji zapravo može biti bilo šta _zaokruženo_: modul, klasa, funkcija, mikro-servis, fajl.

Zašto se ne slažem sa definicijom? Ukratko: klase i funkcije same za sebe su _suviše mala_ granulacija za enkapsulaciju. Ipak, ovde ćemo se držati ove originalne ideje, pošto je ona poslužila Robertu za SRP.

----

Idemo dalje. Izvor iz kojeg je SRP pravilo preuzeto je rad Dejvida Parnasa: "On the Criteria To Be Used in Decomposing Systems into Modules" iz 1972. U njemu se zaključuje:

> ...it is almost always incorrect to begin the decomposition of a system into modules on the basis of a flowchart. We propose instead that one begins with a list of difficult design decisions or design decisions which are likely to change. Each module is then designed to hide such a decision from the others...To achieve an efficient implementation we must abandon the assumption that a module is one or more subroutines, and instead allow subroutines and programs to be assembled collections of code from various modules.

Parnas, dakle, govori o _nepoznavanju odluka_, preciznije, o grupisanju delova sistema o kojima ne znamo dovoljno. Promena o kojoj Parnas priča je promena nastala usled _nedoumica_, te dolazi do promene odluka o dizajnu. Nažalost, Robert je to nevešto preneo kao "razlog promene klase", neuviđajući da "promena klase" može da znači mnogo toga što nije u vezi sa originalnom Parnasovom idejom. Robert, zapravo, napušta originalnu ideju i dozvoljava da se ona potpuno izgubi.

To je ujedno i čest razlog nerazumevanja SRP-a: koja je to "promena klase" o kojoj Robert priča? Zašto je jedan razlog za promenu bolji od više? Da li se pravilo mora/može upotrebiti za svaku klasu, funkciju, biznis domen, programski jezik? Na neka od ovih pitanja autor odgovara 2014. novim pitanjem: kome odgovara (respond) dizajn programa? Zaključuje da su _ljudi_ razlog za promenu, oni koji zahtevaju da se ona desi. Drugim rečima, treba da grupišemo kod prema onome ko je njegov korisnik, jer se taj kod menja iz istog razloga, a taj razlog dolazi od korisnika samo tog modula.

Iako to sve naliči da ima smisla - u svojoj biti nije pogrešno - insistiranje na izrazu "razlog za promenu" i nejasnim terminima kao što su "odgovornost" i "klasa" stvaraju više nedoumica nego što rešavaju.

Konačno, odstupanje od originalne ideje ne implicira dokaz ili uvid da SRP zaista ima smisla.

----

Idemo dalje. Robert, kao što je kasnije i sam napomenuo, zapravo govori o koheziji - karakteristici softverskog sistema koja je opisana u knjizi "Structured Design":

> The most effectively modular system is the one for which the sum of functional relatedness between pairs of elements not in the same module is minimized; among other things, this tends to minimize the required number of intermodular connections and the amount of intermodular coupling... The greater the cohesion of individual modules in the system, the lower the coupling between modules will be.

Napomena: ne tako davno sam izneo primer postupka koji upravo razmatra sve funkcije u sistemu (dakle, parove elemenata: ulaz i izlaz) i na osnovu njih iznalazi module (tj. boundaries) takve da je komunikacija (coupling) između njih što manja. Rekao bih da je vredna ideja.

Da se vratimo na koheziju i, nešto manje važnu, uvezanost. Cela ideja iza SRP je zapravo da održavamo veliku koheziju modula i njihovu malu uvezanost. Ispravan modul je onaj koji iskazuje svetu šta radi, ništa više, ništa manje. Ispravan modul sakriva kompleksnost i detalje od sveta. Kohezija je suprotna generalizaciji.

Sve ovo nam i dalje ne govori _kako_ da razdvojimo module. SRP daje krajnje nejasan odgovor, udaljen od originalne ideje, bez ikakvih dokaza koji potkrepljuju novo značenje.

----

Idemo dalje. Zašto su nam moduli uopšte važni? Robert se, opet nevešto, pozviva na esej Dijsktre "On the role of scientific thought", iz 1974. Ovo kaže za inteligentno razmišljanje:

> It is what I sometimes have called "the separation of concerns", which, even if not perfectly possible, is yet the only available technique for effective ordering of one's thoughts, that I know of. This is what I mean by "focussing one's attention upon some aspect": it does not mean ignoring the other aspects, it is just doing justice to the fact that from this aspect's point of view, the other is irrelevant.

Reč je, dakle, o rastavljanju sistema na delove, kako bi svaki deo zasebno analizirali; uobičajena praksa u programerskoj praksi. To je inače i izvorno značenje pojma "separation of concerns". Čini se da još više vredi originalna Parnasova ideja, jer modulima rasčlanjujemo sistem na delove prema onome kako ih _razumemo_. Robertova SRP "promena" je samo efekat.

Način kako raščlanimo sistem je način kako ga _razumemo_. A to nije ono šta Robert piše.

## Zaključak

SRP je loše formulisan princip, koji znači ništa i svašta.

Izbor termina je - zaista nemam primereniji izraz - glup: "razlog za promenu" stvara tolike nedoumice, ne uzimajući u obzir da se moduli menjaju iz mnogih razloga. Štaviše, to je tek samo jedan faktor kohezije i modularizacije. SRP samo _zvuči_, jer naslućujemo sve ono našta autor nije obratio pažnju. Odgovornost ne može da bude sinonim za "razloga za promenu".

SRP pokušava da sabije i koheziju, i uvezanost, i module, i separation of concerns u jednu traljavu rečenicu. SRP je pogrešna apstrakcija: sakriva mnogo toga važnog, a nudi malo upotrebljivog, ako išta.

Ne pomaže ni to što je primena SRP binarna, crno/belo: ili si prekršio  "pravilo" ili nisi. A to je tek besmisleno; nema sistema koji ima potpunu koheziju i nultu uvezanost.

Ako nam je softversko inženjerstvo poziv, onda moramo biti precizni. SRP to nije. Ergo, treba ga odbaciti.
