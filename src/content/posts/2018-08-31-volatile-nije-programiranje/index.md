---
title: Volatile nije programiranje
date: 2018-08-31T13:07:04+00:00
slug: volatile-nije-programiranje
description: >
  Ključna reč `volatile` označava varijablu koju Java "čuva u glavnoj memoriji." Ukoliko ne znaš ništa o ovome, čitaj dalje. Ukoliko znaš, ipak čitaj dalje,
---

Ključna reč `volatile` označava varijablu koju Java "čuva u glavnoj memoriji." Ukoliko ne znaš ništa o ovome, čitaj dalje. Ukoliko znaš, ipak čitaj dalje, otkrićeš nešto što možda ne znaš :) Posle svega sledi kritički osvrt kao završnica.

Ukratko, `volatile` garantuje da se izmene varijable vide iz različitih threadova. U _multi-thread_ okruženju, svaki thread može da kopira varijable iz glavne memorije u CPU keš, za potrebe performansi. Ako računar ima više CPU, threadovi se mogu izvršavati na različitim CPU. Dakle, svaki thread može da ima svoju kopiju varijable u lokalnom kešu: odličan recept za nekozistentnost.

Iz tog razloga se varijable kojima se pristupa iz više threadova markiraju sa `volatile` da bi forsirali upotrebu samo glavne memorije i isključili optimizaciju kopiranjem u lokalnu memoriju threada.

## Šta verovatno niste znali

Manje je poznato da `volatile` garancija prevazilazi samu varijablu: ona važi i za sve varijable koje su vidljive threadu! Ako na pr. imaš 3 polja klase, a samo jedno označeno kao `volatile`, sva tri će biti pročitana i upisana u glavnu memoriju. Ludo, zar ne?

Druga stvar je da `volatile` takođe utiče na promena redosleda izvršavanja VM instrukcija koja je uobičajena optimizaciju koju rade VM i CPU. Ukratko, obezbeđuje se da pisanje i čitanje u glavnu memoriju radi kako treba i kako je opisano (_Happens-Before_).

Naravno, korišćenje `volatile` ne obezbeđuje thread-safety varijable, i dalje je potrebna sinhronizacija.

## Kritika

Konačno dolazim do teme o kojoj želim da pričam. Smatram da je `volatile` primer koncepta koji ne treba da se nađe u jeziku kao što je Java. Zašto bih razmišljao o implementaciji VM i višeprocesorskom jezgru? Šta će se dogoditi kada dođu kvantni računari - da li ćemo imati ključnu reč `schrödinger` da označim varijable koje mogu imati nekakva međustanja?

Moderan jezik višeg nivoa ne bi trebalo da se bavi implementacijom. Na isti način kao što se ne bavimo čišćenjem memorije, ne bi trebalo da razmišljamo o potencijalnim optimizacijama VM i CPU. Na sličan način, `int` mora da postane objekat, jer su primtivne vrednosti ponovo detalj implementacije. I tako dalje.

Razumem potrebu postojanja ovih koncepata: pre 20tak godina su imali smisla zbog značajno slabije moći računara na kojima su se izvršavali. Ali danas jednostavno više nema mesta za ove stvari.

Išao bih čak i korak dalje: `synchronized` je često neophodan (ili neki sličan `Lock`) u multi-thread okruženju. Svi znamo koliko je teško napraviti kvalitetan thread-safety kod. Da li je moguće da ne postoji nešto bolje od toga da programer sam vodi računa o tome kako će se kod "raširiti" po threadovima? Zašto takve stvari ne postanu standard u programiranju? Zašto ne rešavamo probleme koji se ponavljaju decenijama? Neka se kod bavi programerskim konceptima.

Nažalost, Java iz Oracla neće revoulirati.
