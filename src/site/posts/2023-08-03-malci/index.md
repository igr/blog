---
title: "Bez dva Malca nema udarca"
date: 2023-08-03T07:07:07+00:00
categories:
  - Razvoj
tag:
  - pomoć
  - razvoj
  - moduli
---

Gru ima dva pomoćnika na projektu.

Iz života programera.

<!--more-->

## Malac: Meta Mita

U svakom projektu se uspostavljaju nekakva pravila koja se uglavnom ne mogu opisati upotrebljenim programskim jezikom. Deo pravila se ne tiče biznis logike, već projekta - na pr. organizacijom fajlova, imenovanjem, odvajanjem, granicama i slično. Nedavno sam uveo praksu da u projektu uvek postoji `meta` modul, koji proverava sam projekat. Neki jezici dolaze sa odličnom podrškom za parsiranje koda; Kotlin, na primer, nudi isti parser koji koristi pri kompajliranju. Šta `meta` projekat može da proverava? Da li je imenovanje funkcije u skladu sa imenom klase koja ga implementira. Da li se koriste izvesne metode tamo gde ne treba. Da li je sve u pravim paketima. Da li finderi vraćaju `Option` ili kolekciju. Nastavite niz...

Meta projekat može i da _generiše_ kod. Tako mi je, na jednom mestu, sakupljao sve implementacija funkcija i generisao njihove deklaracije, čime sam izbegao jedan korak neophodan zarad korišćenih frejmvorka.

Meta modul nije zabavan, parsiranje sora je suvoparno i slabo otporno na izmene u kodu. Može biti deo CI toka.

## Malac: Dashboard Znalac

U svakom projektu u kome me nešto pitaju, napravim _dashboard_ za bekend. To je nekakav super-jednostavan UI implementiran direktno na bekendu (dakle, ne ide preko frontenda), koji:

+ daje uvid u važna stanja u sistemu. FE može da ne radi, ili nije završen ili ne pokazuje tačno stvari, ili ne pokazuje dovoljno. Ovo je direktan pogled na ono šta se dešava u sistemu.
+ omogućava razne važne akcije nad stanjima. FE ne može uvek da ponudi sve opcije (jer nisu deo biznis logike), ili se do nekih stanja ne dolazi lako ili brzo. Na dashboardu stavim dugmiće koji postavljaju sistem u odgovarajuće stanje, ili dozvoljavaju neke akcije koje inače nisu dozvoljene, ili im treba vreme da se dogode.
+ Daje spisak važnih linkova u sistemu, naročito za upstream APIje. Dinamičke prečice za lakše analiziranja sistema.
+ Ponekad je tu i SQL konzola (jednostavni textarea.) Nekada nemam pristup bazi na dev/stage okruženju, pa je vrlo važno biti u mogućnosti da kako-tako izvršavamo upite.
+ Tu je obavezno i ispis aktuelne verzije i GIT SHA potpis poslednjeg komita. Zlata vredi.
+ Tu su i neke sistemske funkcije, kao na primer ispis svih ENV (ako nema već aktuatora.)

Dakle, dashboard je nekakva admin-konzolna-bekend-papazjanija koja daje direktan uvid u stanje sistema, sa kojekavim akcijama/prečicama za lakše analiziranje sistema ili dovođenje sistema u željeno stanje. Odvajam svoje vreme da ga napravim ako ne može drugačije (obično u početku nema razumevanja za takav rad), jer je nebrojeno puta pomoglo.