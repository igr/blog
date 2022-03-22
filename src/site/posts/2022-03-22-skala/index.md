---
title: "Više ne biram Skalu"
date: 2022-03-22T01:07:03+00:00
categories:
  - Razvoj
tag:
  - skala
  - razvoj
  - api
  - programiranje
---

Skalu sam retko koristio, najviše za sebe. Dopadalo mi se šta vidim: mogućnosti, efikasnost. Zahteva trud, no izgleda kao da se isplati.

Kasnije me je sačekao komercijalni projekat.

<!--more-->

Projekat, nekakvi REST servisi, su postavili momci sa više nego očiglednim Skala & Akka & Cats iskustvom. Nisam im ni blizu što se tiče poznavanja Skala eko-sistema, niti domena projekta. To sam prihvatio kao dobru priliku da, konačno, sagledam kako se stvari rade.

Takođe, smatram da sam prosečan programer; vredniji na neke druge načine. Verujem da se dobro snalazim u nepoznatom, nekako sam se time naviše i bavio.

---

Iskustvo sa projekta se može sumirati pitanjem koje sam sebi često postavljao: "čemu to?"

Drugim rečima, nisam uočio nikakvu _značajnu_ prednost skala tehnologija. Sve je, zapravo, mirisalo na čudne načine. Anemični servisi su i dalje tu. API klase su imale hiljadu linija, jer se swagger generisao zasebno anotacijama, a ne iz koda. Ugnježdavanje u više nivo je uobičajeno. Validacija i transakcije i logovanje je eksplicitno pisano. Validacija ne liči da je pisana ujednačeno. Testove nisu pokretali programeri, već CI. Code review je trajao i po desetak dana. Soft delete, verzionisanje, objavljivanje... sve se pisalo ručno, ponavljajući obrasce. JSON se serijalizuje u API sloju, a CSV, opet ručno, u servisima. Impliciti su magija. Zvuče tako zanimljivo u tutorijalima, ali kada treba brzo sagledati šta se dešava, ne pomažu. Teško je bilo čitati kod. Zanimljivo, otkucanog teksta nije bilo manje.

Najveća zamerka je da bogatstvo sintakse jezika rezultuje nedostatkom domenskog rečnika. Skala svakako ne manjka načinima kako se nešto može uraditi. Poslovično, nazivi takvih operacija su generička kratka imena ili kakvi znakovni operatori. Rezultujući kod postaje pisan isključivo takvim sintaksnim rečnikom. Po meni, treba da postignemo upravo suprotno - da stvaramo bogati domenski rečnik.

---

Ne mislim da je Skala loš programski jezik. Ipak, više izgleda kao da je stvoren da rešava specifične softverske probleme u mainstream jezicima, a ne za prozivodnju komercijalnog softvera.

Ponavljam: nisam vešt sa Skalom. Sigurno da dobar deo iskustva dolazi iz mog neznanja. Ipak, ako posle 20+ godina kodiranja u svemu i svačemu, nalazim da teško pratim obrasce u postojećem kodu, mora da nešto govori 🤷‍♂️

Svakako, nastaviću sa učenjem. U međuvremenu, Skala nije moj izbor za bekend web aplikacije.
