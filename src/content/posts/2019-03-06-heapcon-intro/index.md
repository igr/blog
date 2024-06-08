---
title: "Heapcon intro"
date: 2019-03-06T16:26:54+00:00
slug: heapcon-intro
description: >
  Ukoliko ste prisustvovali otvaranju Heapcon konferencije 2018. godine, možda se sećate animacije koja se vrtela tokom uvodnog performansa. U jednom trenutku se iscrtavalo preko 15000 animiranih linija i krugova u 1920x1080 rezoluciji sa 60fps. Animacija je napisana u Javi. Da li sam pridobio vašu pažnju?
---

Ukoliko ste prisustvovali otvaranju [Heapcon](https://heapcon.io) konferencije 2018. godine, možda ste sećate animacije koja se vrtela tokom uvodnog performansa. U jednom trenutku se iscrtavalo preko `15000` animiranih linija i krugova u `1920x1080` rezoluciji sa `60fps`. Animacija je napisana u Javi. Da li sam pridobio vašu pažnju?

## Ideja

Zamisao je da se krene od praznog prostora (tj. ekrana) u kome počinju da se pojavlju 'vektori': linije s popunjenim krugom na svom početku, obojeni prepoznatljivim bojama [Heapspace](https://heapspace.rs)-a. Linije se pružaju dijagonalno, pojavljuju se i nestaju na ivicama prostora. U sredini prostora se nalazi nevidljivi skup tačaka koji formira slova - naziv konferencije. Ideja je da kako se neki vektor približi tačkama slova, ona se pojave, a krug vektora se poveća. U početku, kada je broj vektora mali, nije jasno šta se dešava; tek kasnije kada se broj vektora poveća broj 'sudara' sa slovima postaje toliki da se sva slova lepo vide.

Evo kako sve to izgleda:

![](heapcon.gif)

Kod je [dostupan i otvoren](https://github.com/igr/heapcon-intro). Imati u vidu da je pisano brzo :)

## Razvoj

Iako nije u pitanju neka složena animacija, zbog velikog broja elemenata koje se iscrtavaju bilo je potrebno napraviti neke optimizacije. Krenimo redom.

### Kostur animacije

Prvo je važno imati ispravan kostur koji će na pravilan način pozivati kod za animaciju određenim _frame rate_-om i da obezbedi tkzv. _double buffering_. Jedna slika animacije se **nikada** ne iscrtava direktno na vidljivom ekranu! To može da dovede do 'krzavog' efekta i neiscrtanih delova animiranog sadržaja. Umesto toga, animacija se iscrtava u memoriji, a kada je jedna slika spremna onda se prosto prebaci na ekran (u tkzv. video memoriju). Tehnika koju sam koristio još na Spectrum-u :) Pogledajte `Intro` klasu, sve je u njoj.

### Tačke od slova

Drugi izazov je bio pretvoriti slova napisana Heapspace fontom u niz tačaka. Ispada da je to moguće uraditi na sledeći način. Prvo se od fonta kreiraju vektori koji se zapravo i iscrtavaju kao tekst. Zatim se sve krive ispravljaju u linije, te konačno možemo da odradimo sampling dobijenih linija. Rezultat je, dakle, da se od slova dobija niz tačaka koji ga formiraju. Pogledaj `SLetter.sample()`.

Ovaj niz tačaka dodatno treba filtrirati da bi se izbacili neki granični slučajevi, a to je urađeno jednostavnom vizuelnom analizom i probanjem.

### Računanje blizine

Suština efekta je prepoznavanje kada je vektor došao blizu tačke slova. Formula za izračunavanje razdaljine između dve tačke koordinatnog sistema uključuje i korenovanje (`sqrt`). Prva ideja je bila da svaki vektor put u svakoj slici animacije računa koliko je daleka od svih tačaka slova. Ako ima 7 slova, svaki sa bar 30-tak semplovanih tačaka, a želimo 15000 vektora na ekranu, to dovodi do potrebe za **3 150 000** računanja udaljenosti u 60-tom delu sekunde. Neće da može.

Prva optimizacija je da se razdaljina ne računa sve dok vektor ne dođe u blizinu neke od tačaka. Dovoljno je bilo proveravati da li je vrh vektora u kvadratu oko svake tačke, pošto je to jednostavna provera koja ne uključuje bilo kakav račun. Tek kada je vrh vektora unutar kvadrata možemo da računamo daljinu. Tu je primenjen još jedan trik iz dana Spectrum-a: predefinisana tabela za funkciju daljine. Očigledno da nam ne treba velika preciznost, pa umesto da pozivam `Math.sqrt()` i računam daljinu svaki put, pozivam se na tabelu koja je popunjena na početku programa. Ubrazanje je enormno - umesto računanja formule imamo samo očitanje iz memorijskog niza! Pogledaj `SquareRoot`.

## Kod u službi umetnosti

Jednom kada je animacija 'poletela' došao sam do najlepšeg dela: igranje sa parametrima i podešavanjima; na primer, brzinom kojom se pojavljuju vektori, njihovim brojem, uglovima pod kojima vektori idu po ekranu i tome slično. Naročito mi se dopada trenutak na kraju kada vektori nestanu i ostane samo natpis - u pozadini se sve izračunava kao i obično, osim što se vektori ne iscrtavaju.

Daleko da je ovo umetnost, naravno, ali me vozi ideja kako se kod pretvara u efekat, koji posle doterujem isključivo po estetskom nahođenju. U jednom trenutku stvaranja nestane koda, a ostane vizuelna estetika na kojoj se dalje radi.

Eh, da; posetite [Heapcon](https://heapcon.io) i ove godine :)
