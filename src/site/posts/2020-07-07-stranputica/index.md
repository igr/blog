---
title: "Stranputica (softverskog) razvoja"
date: 2020-07-07T01:07:03+00:00
categories:
  - Stav
tag:
  - tehnologija
  - razvoj
  - programiranje
---

Grebe me dugo, ne uspevam da rešim osećaj da nije sve kako treba; zavaran plemenitim odsjajem esnafa. Konačno, nakon mnogo godina, osećaj postaje misao, a reči nalaze put.

<!--more-->

Razvoj softvera je okovan verigama, ne ide nikuda _dalje_; zbog jedne i samo jedne stvari.

> Moderan razvoj softvera čini jednostavne zadatke teškim, zarad toga da trivijalni zadaci budu još lakši.

_Dvadesetak_ godina gotovo svakodnevnog kuckanja koda je utkano u ovu misao. Bremenita je, te je ne treba olako odbaciti.

## Odakle početi?

Programski jezici kojima se većinom služimo i dalje su generalni po svojoj nameni. Svaki za sebe je 'jezik za sve', u najboljem slučaju dostigne preuveličane-do-besmisla koncepte OOP-a. Programski jezici znaju da zahtevaju neprirodnu, preopširnu preciznost da bi, na pr., definisao tip varijable, a tako lako se izgube u svakoj zahtevnijoj nameri kontrole nad kodom. Postoji samo compile-time i run-time, nametnuti načinom dobijanja bajtkoda, a ne potrebom. I dalje se mučimo da razdvojimo izuzetke od grešaka. Paternima plašimo početnike, a algoritme smo prestali da pišemo. Ono što učimo se nije promenilo već desetinama godina, samo dobija novu sintaksu. S druge strane, programski jezici se i dalje uzimaju kao bitno znanje u industriji, te se plašimo promena, iako je znanje jezika najmanje važno u celom ekosistemu modernog projekta.

Šta bi bila evoluciju programskih jezika? Prestanak njihovog postojanja. Generalizacija je koncept čiji je cilj ušteda vremena, a rezultuje ujednačavanjem aktera. Trebaju nam novi, domenski jezici, koji svaki rešava konkretne probleme. Trebaju nam jezici koje možemo sami pisati i dorađivati, menjati gramatiku i sintaksu. Trebaju nam jezici koji su rešili probleme upravljanja memorijom, sinhronizacije i svega onoga što uplivava u apstrakciju domena koji se modelira: što veći otklon od mašinskog razmišljanja.

A tek frejmvorci! Sve što ne uspevamo s programskim jezicima, preusmeravamo na programske biblioteke. Frejmvorci su zapravo _platforme_: ne programiraš _pomoću_ frejmvorka, već _u_ platformi, iz koje nema izlaza jednom kada je usvojiš. Frejmvork bi trebalo da pruži samo okvir u kome programer i dalje rešava trivijalne stvari kako mu se prohte; platforma ti daje rešenje za trivijalne stvari, ali ukalupi kako rešavaš i sve ostalo. Treba li nam magija da bi uvezali bekend komponente? Treba li nam čaroab frontend koji sam prepoznaje sve izmene? Da li je neophodno imati pet načina da se uradi ista stvar? Dizajn platformi biva određen istom onom tromošću koja traži da se što pre reši i ode, ili pak nedovoljno skuvanim konceptima koji ne rešavaju uzrok, već posledicu. Korporacije mogu da se igraju jer ima ko ih sledi, te dozvoljavaju inkrementalne tektonske izmene svojih platofrmi. Da međusobno sarađuju, to već ne znaju. Programske platforme postaju _sredstvo konzumerizma_, od programera pravi potrošače, te privlači nove šarenim tantijemama lakog rešavanja trivijalnog.

Svet programiranja doživljava krizu hiperprodukcije. Način da se programer privuče je da mu se nametnu kompulzivne potrebe. A te potrebe moraju da budu homogene, nikako individualne. Ergo, ne rešavamo teške zadatke.

## Inherencija?

Ima ona urbana programerska poslovica koja kaže da je dobar programer lenj programer. Njega mrzi da radi repetitivne poslove, te pronalazi način da ih umesto toga isprogramira.

Dugo sam je prihvatao, do nedavno - naučio sam da nije sasvim tako. Iako je propozicija donekle na mestu, problem je u realizaciji takvog rešenja. Pokazuje se da lenj programer isto tako lenjo isprogramira rešenje. Bar su takva moja iskustva - priznajem, nebrojeno puta sam i sam tako postupio: jedva dovoljno rešenje je podjednako opasno kao i pre-inženjerisano rešenje.

Pravi pristup bi trebalo da je drugačiji: ne da lenjost bude ta koja ukazuje na mesto za refaktoring, već _analiza_. A ona je upravo suprotna lenjosti; zahteva aktivno uključivanje kognitivnih veština.

Nije ovde priča o lenjosti, već o _stavu_. Ne želim da programerski kod bude određen osećajem, već razmišljanjem. Ne želim da budućnost razvoja softvera bude određena rešenjima za trivijalne zadatke, već progresijom ideja za rešavanje teških.

Na kraju moram da se zapitam: da li je stanje takvo zato što nam je to dovoljno?

Jer, onda smo u problemu. A ako vam je ipak OK, onda ništa.
