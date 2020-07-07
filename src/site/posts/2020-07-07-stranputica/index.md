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

Razvoj softvera je okovan verigama, ne ide mnogo dalje; a jedan je uzrok tome.

> Moderan razvoj softvera čini jednostavne zadatke teškim, zarad toga da trivijalni zadaci budu još lakši.

_Dvadesetak_ godina gotovo svakodnevnog kuckanja koda je utkano u ovu misao. Ne treba je olako odbaciti.

## Odakle početi?

Programski jezici kojima se većinom služimo i dalje su generalni po svojoj nameni. Svaki za sebe je 'jezik za sve', u najboljem slučaju dostigne preuveličane-do-besmisla koncepte OOP-a. Programski jezici znaju da zahtevaju neprirodnu, preopširnu preciznost da bi, na pr., definisao tip varijable, a lako se izgube u zahtevnijoj nameri kontrole nad kodom. Postoje samo compile-time i run-time faze (phase distinction), nametnuti načinom dobijanja izvršnog koda, a ne potrebom. I dalje se mučimo da razdvojimo izuzetke od grešaka. Paternima plašimo početnike, a algoritme smo prestali da pišemo. Ono što učimo se nije promenilo već desetinama godina, samo dobija novu sintaksu.

Šta bi bila evoluciju programskih jezika? Prestanak njihovog postojanja. Generalizacija je uopštavanje, ujednačavanje aktera, redukcija raznovrnosti i osobina. Trebaju nam novi, domenski jezici, koji svaki rešava konkretne probleme i koji se mogu mešati. Trebaju nam jezici koje možemo sami pisati i dorađivati, menjati u hodu gramatiku i sintaksu. Trebaju nam jezici koji su rešili upravljanja memorijom, sinhronizacije i sve onoga što uplivava u apstrakciju domena koji se modelira: što veći otklon od mašinskog razmišljanja.

A tek frejmvorci! Sve što ne uspevamo s programskim jezicima, rešavamo kroz programske biblioteke. Frejmvorci su zapravo _platforme_: ne programiraš _pomoću_ frejmvorka, već _u_ platformi, iz koje nema izlaza jednom kada je usvojiš. Frejmvork bi trebalo da pruži samo okvir u kome programer i dalje rešava trivijalne stvari kako mu se prohte; platforma ti daje rešenje za trivijalne stvari, ali ukalupi kako radiš i sve ostalo. Treba li nam magija da bi uvezali bekend komponente? Treba li nam čaroban frontend koji sam prepoznaje sve izmene? Ispravan okvir ograničava upotrebu u domenu rešenja koje nudi, te dizajnom ne dozvoljova da ga programer pogrešno upotrebljava. Zamisli takav API koji sam sebe objašnjava, gde te frejmvork navodi sintaksom na sledeći korak, a ne StackOverflow! Dizajn platformi biva određen istom tromošću koja traži da se što pre reši i ode dalje, ili pak nedovoljno skuvanim konceptima koji ne rešavaju uzrok, već posledicu. Korporacije mogu da se igraju jer ima ko ih sledi, te dozvoljavaju inkrementalne tektonske izmene svojih platformi. Da međusobno sarađuju, to već ne znaju. Programske platforme postaju _sredstvo konzumerizma_, od programera pravi potrošače, te privlači nove šarenim tantijemama lakog rešavanja trivijalnog.

Svet programiranja doživljava krizu hiperprodukcije. Način da se programer privuče je da mu se nametnu kompulzivne potrebe. A te potrebe moraju da budu homogene, nikako individualne. Ergo, ne rešavamo teške zadatke.

## Inherencija?

Ima ona urbana programerska poslovica koja kaže da je dobar programer lenj programer. Njega mrzi da radi repetitivne poslove, te pronalazi način da ih umesto toga isprogramira.

Dugo sam je prihvatao, do nedavno - naučio sam da nije sasvim tako. Iako je propozicija na mestu, pokazuje se da lenj programer isto tako lenjo isprogramira rešenje. Bar su takva moja iskustva - priznajem, nebrojeno puta sam i sam tako postupio. Jedva dovoljno rešenje je podjednako opasno kao i pre-inženjerisano rešenje.

Pravi pristup bi trebalo da je drugačiji: ne da lenjost bude ta koja ukazuje na refaktoring, već _analiza_. A ona je upravo suprotna lenjosti; zahteva aktivno uključivanje kognitivnih veština i znanja.

Nije ovde tema lenjost, već _stav_. Ne želim da programerski kod bude određen osećajem, već razmišljanjem. Ne želim da razvoja softvera bude određen rešenjima za trivijalne zadatke, već progresijom ideja za rešavanje teških.

Na kraju moram da se zapitam: da li je stanje takvo zato što nam je to dovoljno?

Jer, onda smo u problemu. A ako vam je ipak OK, onda ništa.
