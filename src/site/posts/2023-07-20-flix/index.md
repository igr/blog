---
title: "Flix"
date: 2023-07-20T07:07:07+00:00
categories:
  - Razvoj
tag:
  - flix
  - razvoj
  - jezik
---

Leto je sjajno za učenje novih programskih jezika. Ako pored uporne vrućine i bespoštedne omore nastavljaš da džedžiš ispred monitora punog koda, mora da ima nešto u tome šta ti drži pažnju.

<!--more-->

Izbor za ovo leto je: [Flix](https://flix.dev).

Neko je konačno napravio JVM jezik koji nije Skala, nije Rust, nije Haskel, nije Elm, ali zato uzima najbolje od svega. Zašto "konačno"? U svetu JVM jezika postoji veliki nepopunjen prostor između Skale i prvog-daleko-sledećeg-po-sposobnostima, Kotlina. Flix nudi ukusnu kombinaciju karakteristika koja negde nadmašuje Skalu (Hindley-Milner type sistem, na pr.), a uvodi i jedinstvene sposobnosti. Glavna stranica projekta pobrojava neke vrlo uzbudljive osobine:

+ precizno praćenje "čistoće" svakog izraza. Kompajliranje neće proći ukoliko čista funkcija koristi neku sa side-efektom.
+ lokalna mutacija u okviru regiona - imutabilnost je neophodna, ali baš zna da ponekad umori prilikom inicijalizacije kakvog skupa podatka.
+ Higher-Kinded Types - gomila očekivanih type classes već postoji, nema potrebe za bibliotekama.
+ Uključena Datalog podrška, zanimljivo.
+ Records i Tuples - konačno su deo jezika.

Ovo je samo vrh ledene kocke u čaši letnjeg pića. Nemam nameru da prepričavam šta sve sadrži: Flix vredi pogledati! Ponavljam, reč je o JVM jeziku, kompajlira se u bajtkod, a lako se koriste biblioteke iz sveta Jave. Zanimljivo je pogledati principe dizajna ovog programskog jezika, sve deluje kako treba.

Postoje stvari koje su i upitne. Jedna je način definisanja modula; nisam siguran da je okej da bude definisan u samo jednom fajlu. Za razvoj trenutno postoji samo Visual Studio Code plugin, koji sasvim lepo radi sa kodom: boji ga, prepoznaje greške, itd; meni malo štuca sa startovanjem REPLa (ništa strašno).

Flix je baš sjajno programersko osveženje. Projekat je mlad; otvorenog koda; super je što se razvija na univerzitetu, a ne u laboratoriji kakvog tehno-ego-gmaza. Nadam se da će Flix imati prilike da poraste i lepo sazri; baš, baš navijam za njega.