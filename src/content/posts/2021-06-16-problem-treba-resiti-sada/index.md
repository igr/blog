---
title: "Problem treba rešiti sada"
date: 2021-06-16T01:06:08+00:00
slug: "problem-treba-resiti-sada"
description: >
  Jedna mala inženjerska ilustracija za podeliti.
---

Jedna mala inženjerska ilustracija za podeliti.

**Kontekst**: web aplikacija je puštena u produkciju, radi par meseci, a koristi je limitiran broj odabranih korisnika. Kvalitet aplikacije je cca `25%`. Između ostalog, nije izvršen nikakav load test. Mikroservisi + SpringBoot + React + PostgreSQL.

Jedna od tekućih potreba je migracija starih podataka. U to ime se prave privremeni endpointi koji rade migraciju domenskog sadržaja. Broj potrebnih konverzija nije mali. Pojedinačna konverzija nije trivijalna i prati odgovarajuće domenske procese.

**Problem**: pošto se pokrene migracija, nakon nekog dužeg vremena (60+ min), _ponekad_ dođe do zastoja u delu programa koji _nema dodirnih tačaka_ sa procesom migracije. _Zaseban_ connection pool namenjen 3rd-party rešenju ne uspeva da dohvati konekciju. Ponavljam, ovaj deo aplikacije se ne koristi; reč je o nekakvom pozadinskom procesu tog 3rd-party rešenja. Actuator takođe detektuje problem, te _healtcheck_ prestane da se odaziva 60 sekundi, koliko je maksimalno trajanje HTTP poziva.

Postoji pristup samo logovima i kodu. Nema pristupa bazi, niti detaljima JVMa (memorija, cpu).

----

Prirodna rekacija na ovo stanje je: moramo rešiti problem. Ako nam se ovako nešto desilo pri migraciji, desiće se i korisnicima. Uključimo logove, povećamo connection pool parametre... pritisnemo Toyota Way dugme; prionemo i odmah i prvo i hitno da odstranimo problem.

**Netačno.**

(Sledi opis kako razmišljam u ovoj situaciji. Nije isključeno da je pristup pogrešan.)

Primarni zadatak je _migracija_. Usputni zadatak **nije** rešavanje problema - već njegovo _detektovanje_.

Načinjene su pretpostavke bez osnova. Ne znači da će migracioni tok rada biti i način kako korisnici koriste aplikaciju. Šta više, često to nije slučaj. Može se desiti da se korisnici _nikada_ ne susretnu sa ovim problemom. Druga neosnovana pretpostavka je da treba povećati parametre connection poola. Treća pretpostavka je da aplikacija mora da radi sve vreme. Zanimljivo, u svetu mikroservisa, to nipošto ne mora da bude slučaj. Problem se može ublažiti resetovanjem poda kada se zabode. Četvrta neosnovana pretpostavka je da infrastruktura radi kako treba. Itd.

Puno toga u ovom trenutku _ne znamo_. A kada puno toga ne znam, vodim računa o pretpostavkama - svaka se mora proveriti.

Zato: ne rešavamo problem odmah, već ga ublažavamo; fokus je na primarnom zadatku. Pokušamo da usput detektujemo problem. Rešavanje se ostavlja za onda kada se ima dovoljno provernih pretpostavki.
