---
title: "Listanje 29 miliona filmova"
date: 2023-10-18T07:07:07+00:00
slug: "29miliona"
description: "Kako pročitati 29 671 440 filmova iz baze?"
---

Kako pročitati `29 671 440` filmova iz baze?

Postoji javno dostupan Postgres dump baze sa milionima filmova preuzetih sa IMDB. Ako bi trebalo da ih iz nekog razloga pročitamo sve i mapiramo u nekakvu listu (`List[MovieInfo]`), to verovatno neće proći - čak i da imamo dovoljno memorije za jedan upit, sasvim sigurno neće ostati dovoljno resursa za ostale zahteve.

Rešenje je trivijalno - koristi se _kurzor_ koji povlači rezultate u manjim grupama. Umesto da dovučemo milione rekorda odjednom, pa potom ih obradimo, dovlačimo ih u grupama koje se odmah obrađuju.

Ovo i vrapci na zgradi \<mesto-za-reklamu-it-firme\> znaju. Zašto pišem banalnosti? Šta je sledeće, screen-snippeti na LI? Mudrost kako ubrzati `for` petlju tako što se smanji broj iteracija?

Na sreću (ne znam samo čiju) - ne. Zanima me nešto drugo: koliko je velika ta kurzor-grupa? Što je manji kurzor, to je češće dovlačenje podataka, to je sporiji odziv.

Zanimljivo je da verovatno svi biramo neki proizvoljan broj, na pr. `1294`, koji nam, onako odokativno deluje razumno. Dekadni pirutanci biraju broj koji je stepen desetke: `1000` rekorda. I jedan i drugi su podjednako legitimni. Tačnije: podjednako magični. Mi, zapravo, _ne znamo_ da li ova vrednost ima ikakvog smisla. Poznato je i da ljudi bolje "osećaju" razlike između manjih brojeva (`1` vs `7`), nego većih (`1000` i `10000`); ovakva sklonost ne pomaže u odabiru vrednosti.

Šta je rešenje? Merenje.

Da pokažem da merenje ne mora da bude skupo, napravio sam [kratak primer](https://github.com/igr/pgimdb). Tražim korelaciju vremena odziva i utroška memorije. Rezultati su neprecizni, ali tačni: sistemska greška sigurno nije mala. Merenje memorije je štapom i kanapom. JVM nije "zagrejana". Kako bilo, rezultat je _ponovljiv_ i čini se dovoljnim da dobijem grubu sliku šta se dešava u sistemu.

Kao šlag na tortu, fitujem rezultat krivom koju biram _isključivo_ zbog svog dramatičnog izgleda. Ona mi saoštava da je neka lepa vrednost između `10^4` i `10^5` logaritamske skale. Time sam dobio nekakve granice. Koju vrednost uzeti sada već zavisi od ostatka sistema: koliko ima preostale memorije, koliko paralelnih sličnih poziva radi itd. Ovde je `10^5` smisleniji izbor od `1294` i `1000`.

Sve ovo je trajalo nekih 30-tak minuta.

Lepo je imati razloge odluka. Što više činjenica imamo, to možemo više da diskutujemo o njima.
