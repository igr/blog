---
title: "The Office as a Code"
date: 2022-07-29T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - formula
---

"Tačno znamo šta da radimo. Ali u nekom mnogo stvarnijem smislu, mi pojma nemamo šta da uradimo." - Majkl Skot, menadžer programera.

Da li postoji formula razvoja?

<!--more-->

Baš tako - zašto ne bi kvantifikovali razvoj u nekakve parametere i izašli sa formulom koja preslikava proces rada firme? Na kraju, inženjeri samo (valjda); stremimo ka razumevanju sistema i postupaka.

Već neko vreme motam ovu misao po glavi; desilo se da imam uvid u različite kulture razvoja, i, prirodno, uočavam obrasce. Svi se tiču protoka informacija i razumevanja, ali to je [druga tema](https://oblac.rs/it/). Kako bilo, takva nekakva formula bi trebalo da ilustruje razvojni proces kompanije; ne bi služila za (g)estimacije, već za upoređivanje. Zato fokus nije na preciznosti za konkretan slučaj, koliko na tačnosti za više slučajeva upotrebe.

Nešto ovako...

## Dobrodošli u kanc!

Količina posla se meri **jedinicama posla**. Kao i sve ostale jedinice u ovom misaonom eksperimentu, nema stvarnu vrednost. Jedna jedinica posla predstavlja potpuno efikasan rad u trajanju od jedne **vremenske jedinice**. Vremenska jedinica je takođe proizvoljna vrednost; ovde uzimam da traje `30` minuta. Da pojednostavimo: jedinica posla je maksimalno učinkoviti rad u trajanju od `30` min.

Programera opisujem sa dve grupe parametara. Prva grupa se tiče "proizvodnje" posla:

+ utilizacija - koliko procenata vremena zaista radi na projektu. Uvek postoje nekakav "servisni" deo obaveza koji nisu vezane za projekat. Očekivane vrednosti su, na primer, od `0.7` do `0.9`.
+ efikasnost - kako neko koristi svoje vreme provedeno u radu, usrednjeno. Vrednost od `1.0` podrazumeva očekivanu, maksimalnu efikasnost. Sigurno je postižemo, nekada prebacimo, često pobacimo (usled ometajućih faktora).

Druga grupa parametara se tiče potrebnog znanja:

+ znanje - količina [tehničkog i domenskog](https://oblac.rs/paralelne-ravni-seniorstva/) znanja potrebnog za projekat. Teško za izmeriti: deo vremena koji zaposleni provodi u sticanju informacija i razumevanju ono šta treba proizvesti.
+ brzina učenja - koliko se brzo dolazi do potrebnog znanja. Ovo je ponajmanje mera sposobnosti programera, koliko je mera uređenosti informacija koje su programeru dostupne.

Tim opisujem sa samo dva parametra:

+ procenat vremena utrošenog na sastanke - uključujući bilo kakvu komunikaciju: na sleku, mejlu, tokom pregleda PR-a. Svaka sinhrona i asinhrona komunikacija koja nije proizvodnja.
+ efikasnost komunikacije - sposobnost prenošenja informacija i omogućivanje razumevanja istih. Na primer, sastanak koji traje pola sata, koliko prenosi relevantnih informacija vezanih za razvoj? Ili: ogromni, neodržavani wiki - koliko dugo je potrebno doći do informacije koja ti treba?

Većina ovih metrika nema jasan način merenja. To je potpuno u redu; firma sama mora da osmisli način kvantifikacije parametara.

## Primeri

Hajde da pokrenemo ovaj misaoni eksperiment.


Zamislimo da imamo `100` jedinica posla koje treba uraditi. To je nekih `50` sati potpuno efikasnog posla; nešto malo više od šest dana.

### Radnik meseca

Stavljamo Dvajta na projekat, koji je savršeni radnik. Postavimo da `10%` vremena provodi na sastancima, jer Majkl voli da mikro-menadžuje. Rezultat: posao se uradi za `110` vremenskih jedinica.

### Duplo radnika nije duplo brže

Vlažni san svakog menadžera: ako dupliramo broj radnika, prepoloviće se vreme izrade. Uključujemo Džima na projekat.  Džim je odličan radnik, tek nešto manje efikasan nego Dvajt. Ipak, komunikacija je nije odlična (`80%`), usled sporadičnih pošalica.

Rezultat: `69` vremenskih jedinica. Razvoj nije duplo brži.

### Dugo leto

Stenli nije efikasan (pola vremena rešava ukrštene reči), zna samo koliko mu treba i osrednjim tempom stiče nova znanja. Kevin je već na drugoj strani spektra, neradnik meseca. Komunikacija u timu je bleda.

Rezultat je `490` vremenskih jedinica.

### Vreme za podvale

Ima perioda kada Džim i Dvajt podvaljuju jedni drugome. To povećava broj "sastanaka" (veći deo su, zapravo, podvale), a smanjuje se efikasnost komunikacije.

Rezultat: `165` vremenskih jedinica. Komunikacija i dostupnost informacija je ključni parametar razvoja. Tim nije zbir članova.

### Novi lik

Džima menjamo za Rajanom, novajlijom. Iako je efikasan i ima tehničkog znanja, ne poznaje domen. Sva sreća, uči umereno brzo.

Rezultat: `132` vremenske jedinice. Zaposliti radnika koji ne poznaje domen je skupa stvar. Što je razumljivo, dok god su sve strane poravnate s rezultatom.

## U sledećoj epizodi...

Bilo bi zanimljivo nastaviti ovaj eksperiment. Poraditi na koeficijentima i - najviše - sprezi međusobnih uticaja parametara. Usuđujem reći da nam ne treba više od ovih šest parametara. To takođe daje zanimljv pogled na razvojni proces.

[Github projekat](https://github.com/igr/theoffice)

Naslućujem da bi mogli doći do nečeg interesantnog.

> "To je ono što je i ona rekla!"
