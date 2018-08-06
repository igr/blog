---
title: Maven Central i Gradle
date: 2017-08-01T09:53:22+00:00
slug: maven-central-i-gradle
categories:
  - Razvoj
tags:
  - artefakti
  - central
  - gradle
  - java
  - maven
  - razvoj
  - repo
---

_Maven Central_ je [centralno mesto](http://central.maven.org/maven2/) za Java artefakte. Da bi neka biblioteka (uključujući i sve njene verzije) bila dostupna, ona se objavljuje na centralnom repozitorijumu. Maven repozitorijum (skraćeno: _repo_) je u biti samo struktura foldera i fajlova, imenovana i organizaovana kako to već Maven zahteva.

Pošto je Maven repo tek skup foldera i fajlova, nemoguće ga je pretraživati pukim pregledanjem. Srećom, postoji [sajt](https://mvnrepository.com/) preko koga je to moguće.

## Gradle (Ne)Voli Maven Central

Volim [Gradle](https://gradle.org/), ali baš ne volim kako je rešeno objavljivanje na centralnom repo-u! Zapravo, nije nikako rešeno 🙁 Svaka biblioteka koju objavljujem na Maven central repo-u sadrži jedan dosadan, ogroman blok u `build.gradle`. On izgleda otprilike [ovako](https://github.com/igr/nomen-est-omen/blob/master/build.gradle#L21). Da krenemo redom i objasnim šta je sve tu:

  * Prva je definicija taskova `sourcesJar` i `javadocJar` koji prave odgovarajuće arhive sorsa i dokumentacije. Ovaj deo je u redu.
  * Zatim sledi definicija artifakta, kao i naznaka da se sve arhive potpisuju. Maven Central zahteva tri arhive: sa kodom, sorsom i dokumentacijom, kao i to da one budu potpisane ključem autora. I ovaj deo je u redu.
  * Kreće haos. U `publishing` delu prvo se radi izmena generisanog `pom` fajla. Neophodno je dopuniti fajl sa podacima o projektu koje Maven Central zahteva. Ovo je moglo biti rešeno importovanjem podataka iz nekog eksternog fajla, na primer.
  * Deo koji me najviše izluđuje je potpisivanje `pom` fajlova i arhiva! Potrebno je izvesti ove ružne operacije, koje manipulišu direktno sa fajlovima... Vrlo, vrlo ružno, ali nisam našao bolje rešenje.
  * Ostatak je u redu i tiče se definisanja modela i skraćenice-taska za objavljivanje u lokalni Maven repo (u lokalu).

Kada bi postojao način da se lakše potpišu artefakti i `pom` fajlovi, kao i da se lako dopuni `pom` fajl sa podacima o projektu, svet bi bio mnogo lepše mesto.

Ovako ostaje sve na tome da neko (možda ja? možda ti?) napiše Gradle plugin koji će razrešiti ove probleme.