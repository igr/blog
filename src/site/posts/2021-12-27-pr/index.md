---
title: "PR PogReška"
date: 2021-12-27T01:06:08+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - pullrequest
  - git
---

Volim Pull Requestove (PR). Radim sam, bez ometanja, u vreme koje mi odgovara, svojim tempom. Pošaljem izmene, uradi se _code review_; kod svakako postane bolji posle par iteracija. Izmene zatim odu na glavnu granu; to je to, razvoj ide dalje.

Izrečeno ništa nije dalje od istine.

<!--more-->

Za slučaj da neobičnost duple negacija u srpskom ostavlja nedoumicu programerima (jer se negacije ne potiru kao u matematici), ponoviću to jednostavnije: PR je pogrešna praksa. PR unazađuje razvoj projekta. PR je samo skupa i spora navika.

Kako je uopšte nastao PR?

GitHub je stvoren kao platforma za open-source projekte. Karakteristika takvih projekata je da svako može da učestvuje. Štaviše, podrazumeva se da kontributori _nisu_ članovi projektnog tima. U takvoj postavci, GitHub nudi PR kao odličan kanal za komunikaciju. Kontributor daje _predlog_ popravke ili dopune, a tim dalje odlučuje šta sa time da radi.

Komunikacija između kontributora i projektnog tima je _asinhrona_.

## GitHub obmanjuje programere

Ono šta nam se dogodilo je da je GitHub postao popularan.

Programeri ko programeri, `copy` pa `paste`: ako je dobro za open-source projekte, sigurno je dobro za sve, jej! Timovi su, dakle, počeli da koriste GitHub za projekte koji nisu otvoreni, nastavljajući da po navici - i bez trunke analize - koriste istu praksu PR-ova.

Jbg, zaebali smo se.

Projekti uglavnom ne prate open-source model razvoja. Članovi tima nisu kontributori na projektu. Članovi tima ne daju predloge, već aktivno rade na razvoju koda.

PR je kanal za asinhronu komunikaciju, limitiranu formom: kodom i limitiranu medijumom: GitHub-om.

Efikasna komunikacija je ona u stvarnom vremenu, kada se informacije prenose odmah i do svih. Svaka nedoumica u tumačenju (i daljem razumevanju) se odmah razrešava. Efikasna razmena informacija je preduslov za efikasno [razumevanje](https://oblac.rs/it/); obratno je nemoguće. Jednostavno je: ne postoji prenos razumevanja, postoji samo prenos informacija. Teško je preneti potrebne informacije tako da druga strana brzo razume, čak i kada su nam na raspolaganju matematički i govorni vokabulari, a kamoli kod. I onda opet, odlučujemo se za PR praksu, stavljamo sebi amove koda i kaskamo dalje.

Ilustracija? Pitajte NASU kako joj je dok vozi rovere po Marsu sa 6 minuta zadrške koliko treba oskudnom signalu da ode do tamo i nazad. PR je upravo to - komunikacija između programera koji je svaki na svojoj planeti, a koji pokušavaju da zajedno pričaju uglas.

Ilustrativno je i što toliko insistiramo na [sastancima](https://oblac.rs/okvir-za-sastanke-oksa/). Njima se služimo kao zakrpama za razumevanje. Sve ono što ne uspevamo da ostvarimo limitiranim asinhronim razvojem, trudimo se da rešimo beskonačnim sastancima. Kada bi programiranje bilo pravovremeno, možda nam sastanci ne bi trebali?

Deljenje znanja - dokumentovano ili usmeno - je notorno loše na svim softverskim projektima: ko pa još ima vremena da se i time bavi!? Uostalom, tu je uvek [neko](https://oblac.rs/filip-visnjic-guslar-projekta/) ko zna ono što nam treba, dosta je samo da ga pitamo. Stvari nisu takve.

Dokumentacija su sve one informacije koje _ceo tim_ ne zna o projektu. Ako ima nešto što znao samo deo tima, to se dokumentuje. Ukoliko se aktivno radi na tome da tim razume što više, to manje dokumentacije treba! PR zato naročito škodi svemu što nije kod - a toga, ma šta mislili, uvek ima _više_ nego što je koda. Dokumentacija nije, dakle, samo pisani tekst! Dokumentacija je i aktivnost prenošenja znanja _celom_ timu.

Zatim: traži se da razvoj bude brži, jeftiniji. U svoj toj prekomerenoj suludoj potrebi, PR i popratne ceremonije najviše usporavaju razvoj. Pošto je limitirana asinhrona komunikacija u pitanju, razmena informacija se obavlja tek kada se akteri odluče na to, uz upitno razumevanje.  Nedostatak razumevanja nagriza kvalitet. U međuvremenu, dok PR traje, kod čeka. A vrednost koda koji je na čekanju je nula, dok košta puno. Svaki `git rebase`, razrešavanje konflikta, čekanje na `codeowners` je _preplaćena bezvrednost_.

> Kod koji ne leti, ne vredi. (Alan Ford)

Uočavam još nešto: programeri kao da se boje refaktorisanja. PR mora da bude _savršen_, ali samo u očima onih koji ga pregledaju. Da bi namirili nadgledače, pre se odlučujemo da dopunjavamo PR, čime produžavamo njegovu bezvrednost, nego da uradimo refaktoring kasnije. Možda jer smo naučili da se "kasnije" nikada ne dogodi? Šta to tek govori?

## Ne diraj mi PR!

Gotovo svaki programer će pre ili kasnije frknuti na ovaj tekst: "pa, vidi druže, nama PR odlično radi posao". Da, ekser se može zakucati i tastaturom umesto čekićem. To ne znači da tako i treba. Pokazuje se, zapravo, da timovi kojima radi PR imaju nešto zajedničko: veličina PR je mala, a code-review se dešava brzo. Tipično se u toku dana pojave i obradi po nekoliko PR-ova.

Tu se negde i svi slažemo: mali PR i brzi code-review jesu _dobra stvar_. Hajde da interpoliramo dalje: šta bi bilo bolje od ovoga? Kakav je to još manji PR i još brži code-review? Možda nepostojeći?

Možda **zajednički razvoj**?

Žao mi je što ispadam Grinč, ali programiranje nije ona romantična, usamljena algoritamski-izazovna aktivnost kakva nam se predstavlja. Razvoj softvera nije skup usamljenih PR-ova. Tim nije prosta suma članova.

Softverski razvoj je komunikacija. Razvoj projekta je _zajednički_ poduhvat. Tim je zajednička aktivnost. PR nije ništa od toga.

Neki programer će frknuti opet: "mi smo to probali, ne valja". Pokazuje se da nisu zaista probali, niti bilo kako smisleno merili učinke, osim inicijalnog, zastrašujućeg, provođenja vremena zajedno. "Zajednički razvoj", "pair programming" ili "mob programming", kako se već nazivaju različite varijante istoga, ne znači prosto sedanje u "istu" stolicu, jedna tastatura, jedan ekran. Ne. Zajednički razvoj zahteva promišljeno organizovanu aktivnost, prostor i resurse; merenje.


## Zaključak

Da sumiram: 1) razumevanje projekta, 2) brzina razvoja, 3) kakvoća, 4) timski duh - sve je to nagriženo PR praksom.

Ne želiš limitirani asinhroni razvoj skupa pojedinaca. Želiš maksimum timskog truda, sada.

Onda, šta čekamo? Zašto ne menjamo? Zašto ne primenjujemo zajedničko programiranje i ne nalazimo nove obrasce _zajedničkog_ razvoja?

Možda sledeće godine.
