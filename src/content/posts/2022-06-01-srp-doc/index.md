---
title: "SRP & Doc"
date: 2022-06-01T01:07:03+00:00
slug: "srp-and-doc"
description: >
  Nisam odavno video dobru tehničku dokumentaciju.
  Razlog je narušen SRP princip. Koga ste, garantujem, bar jednom čuli objašnjenog na pogrešan način.
---

Nisam odavno video dobru tehničku dokumentaciju.

Razlog je narušen SRP princip. Koga ste, garantujem, bar jednom čuli objašnjenog na pogrešan način.

## SRP

**Single-Responsibility Principle** je princip koji se često tumači pogrešno; preciznije: nepotpuno. Na zilion mesta se govori o tome da _klasa radi samo jednu stvar_. Dugo sam ga i sam tako razumeo.

Definicija ne pomaže. "Jedan razlog za promenu", iskreno, zbunjuje. Čini da mislimo da je reč o bilo kakvoj promeni koda, što potom implicira da kod radi "samo jednu stvar". To dovodi do naivnih primera gde klasu sa dve metode delimo u dve klase, svaka sa po jednom metodom.

Fokus **SRP** nije na tome. Kako to i sam Ujko sebe objašnjava:

> Modul treba da bude odgovoran jednom i samo jednom akteru.

Nigde nema ni reči o promeni, niti o klasi, niti o obavljanju jedne stvari. SRP se, zapravo, bavi biznis akterima i razdvajanjem njihovih poslovnih interakcija u kodu. Ono što zaboravljamo je da se SRP bavi verovatnim obrascima promene, a ne zavisnošću ili funkcionalnim odnosima unutar koda. Drugim rečima, kod sam po sebi _nije_ dovoljan da presudimo povodom SRP principa.

SRP (**CCP**, generalnije) naglašava specijalizaciju; tj. govori u protiv generalizaciji.

## Doc

Tehnička dokumentacija je odličan primer narušenog SRP. Dokumentacija je jedno mesto - modul - koje sadrži podatke za _sve_ aktere. Jedan veliki `README.md` (ili više manjih) sadrži sve: od instalacije, uputstva za pokretanje, uputstva za razvoj, objavljivanje artifkata, šta raditi u slučaju opskurdnih grešaka, model arhitekture, opis komunikacije, spisak odluka... Isti dokument čitaju novopridošli na projektu, arhitekte, dependecy menadžeri, release menadžeri... (reč je o rolama, ne nužno o zasebnim pozicijama).

Ispravna dokumentacija (informacija) je ona prilagođena upotrebi, tj. roli korisnika. Na primer, novopridošlog najviše zanima kako da što pre podesi i pokrene lokalno okruženje. Arhitektu zanima mesto modula u sistemu. Kada dolazi vreme objave nove verzije, zanima nas kakva je procedura izdavanja verzije. Nekoga sa strane zanima kompleksan primer korišćenja.

Ukoliko je sav tekst dokumentacije uvek sve vreme dostupan, informacija neće lako naći svoj put do korisnika. Služiće svrsi, ali ne efikasno. Kao korisnik želim da _brzo_ dobijem _potrebnu_ informaciju - to je prava vrednost, a ne samo da informacija postoji.

Dokumentacija, zato, bi mogla biti dinamična: prilagođena roli koja je koristi. Nema razloga da se ne ispoštuje SRP. To što koristimo statični medijum (tekstualni fajl) je prilično ušljiv izgovor.

Ako smo već softverski inženjeri, šta kažete da poradimo na ovom problemu? I dokumentacija može da bude kodirana. Zamišljam DSL jezik kojim se pišu paragrafi teksta i prilagođavaju se rolama; a koristi se, ne skrolovanjem, već interaktivno.
