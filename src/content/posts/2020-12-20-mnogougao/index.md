---
title: "Mnogougaona arhitektura"
date: 2020-12-20T01:07:03+00:00
slug: mnoougaona-arhitektura
description: >
  Koncept je jednostavan; ništa novo sada ne delim. Skrećem pažnju na efikasnu arhitekturu, jer mi izgleda da je često propuštamo na projektima - a nema razloga za time.
---

Koncept je jednostavan; ništa novo sada ne delim. Skrećem pažnju na efikasnu arhitekturu, jer mi izgleda da je često propuštamo na projektima - a nema razloga za time.

Arhitektura je poznata kao "čista", "heksagonalna" i po još nekim sinonimima. Kada se prvi put susretne s njom, čini se apstraktna, i - bar je meni tako bilo - nejasno nepotrebno komplikovana. Nadohvat ruke bude i DDD, koji nađe načina da upliva u celu priču i dodatno optereti razumevanje.

Da bih naglasio jednostavnost i odstranio suvišno, odlučio sam da je nazivam drugim imenom: _mnogougaona_ arhitektura. Zasniva se na konceptima koji se uče u prvom semestru svakog OOP kursa.

## Koncept

Srž je 1) enkapsulacija i 2) programiranje ka interfejsima.

Da se naježiš, zar ne?

Enkapsulacija je nešto što već (nadam se) radimo u kodu. Odvajamo ono čemu je logično da ide zajedno u klase i pakete, grupišemo kod u domenske glagole (funkcije)... Problem je što tu često stanemo. Ukoliko je sav kod u istoj celini koja se zajedno kompajlira, neumitno dolazi do _entropije_: rasipanja upotreba enkapsuliranog koda i prelivanje logike. To je prirodna sila; treba joj samo nešto vremena. Način kako izlazimo na kraj (ako uopšte) je neprestani review i refactoring koda, te pažnja prilikom razvoja.

Postoji, međutim, bolji način: entropija se obuzdava _granicama_. Šta više: smatram da su granice (_boundaries_) možda jedan od najvažnijih koncepata softverskog inženjerstva. Kad pogledaš, enkapuslacija je samo način povlačenja granica.

U praksi to znači podelu koda na module. Time se celine potpuno odvajaju od ostatka aplikacije. Očigledno, neophodno je imati bar dva modula po celini: jedan moduo sa API-jem preko koga se komunicira (dakle, sa interfejsima i data klasama), a drugi sa implementacijom.

Da, monolitni, jedno-modularni projekat treba razbiti na pregršt manjih modula. Toliko jednostavno.

Gde povući granice? To je važno pitanje. Zicer je da se povuku ka svakom spoljnom efektu: enkapsulirati bazu (nekakvo skladište), svaki eksterni servis ponaosob, UI sloj; a onda se može preći i na parčanje same biznis logike, što, već zavisi od problematike rešenja.

## Konsekvence

Implementacija ovog koncepta sama po sebi iznedri sve ono što Heksagonalna/Čista arhitektura definišu. Na primer:

Neophodno je da postoje zajednički nosioci informacija za module. Odatle nastaje domenski modul. Jasan je i smer korišćenja: negde biznis centar aplikacije konzumira druge module; a negde drugi moduli konzumiraju centar aplikacije.

Programiranje preko APIja i modula garantuje da nema curenja logike - prosto, kod ne može da se kompajlira u suprotnom slučaju.

Testiranje odjednom postaje neuporedivo lakše: svaki moduo se mokuje bez muke.

Najlepše je to što moduli mogu da se odvoje, započnu svoj život zasebno i podele sa drugim projektima. Jer, ko još ima vremena da sve piše ispočetka?

Šta onda smeta?

Nije sve potaman - ali je rešivo. Postojanje modula iziskuje neuopredivo više data objekata i neprestano presipanje jednih u druge. Srećom, Lombok i Mapstruct tu fino pomažu. Skloniji avanturama mogu da pribegnu i generisanju koda. Pokrivenost testovima takođe znači.

Veliki broj takvih klasa, nosioca podataka, dovodi do problema sa imenovanjem. Bilo bi lepo da se jedan entitet različito naziva u modulima, kako ne bi svi bili nazvani isto. Neophodna je stroga konvencija po tom pitanju.

## Mnogougao

Da se vratim na početak: suština je izdvajanje koda u module i komunikacija preko API-ja. Dalji rasporedi po slojevima, prstenovima i čemu već ne, je stvar ukusa.

Čekaj, da li to pričam o mikroservisima? Ne i da. Zapravo, koncept je identičan. Kod mikroservisa menjamo bajtkodni interfejs sa HTTP interfejsom, a implementaciju u istom VM sa pozivom udaljenog koda. Eto još jedne lepote mnogougla: u bilo kom trenutku se modul može transformisati u mikroservis.
