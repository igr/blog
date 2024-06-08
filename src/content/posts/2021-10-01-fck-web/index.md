---
title: "Izeš više Web"
date: 2021-10-01T01:06:08+00:00
slug: izes-vise-web
description: >
  Hoćeš mi reći da i dalje programiramo UI koristeći tehnologiju staru 30 godina, namenjenu umrežavanju tekstualnih dokumenata?
---

Hoćeš mi reći da i dalje programiramo UI koristeći tehnologiju staru 30 godina, namenjenu umrežavanju tekstualnih dokumenata?

Svako malo kada se vratim razvoju web stranica, sve više ludim.

HTML je stvoren za _tekstualni sadržaj_. To što je neko napravio zgodan pregledavač sadržaja, nije razlog da se ista tehnologija odjednom upotrebi za dizajn UI-ja. Kada razmisliš, to je baš odličan primer narušavanja razdvajanja interesa (separation of concerns): sadržaj postaje uvezan i sa načinom kako se prikazuje. Dobrim delom zato što sadržaj prestaje da bude samo nosilac informacija, već služi kao gradivna komponenta vizuelnog izgleda stranica.

Kako HTML biva ograničen, neko je leta '95. smislio da je dobra ideja da se dospe _Mocha_, kako je prvobitno nazvan JavaScript. Kao što moka nije kafa, tako ni ovaj jezik nije stvoren s idejom da bude programski jezik. Morao je da nastane jako brzo, da liči na Javu (u to vreme je uzimala maha), a trebalo je da bude jednostavan za razumevanje ne-programerima.

Tada su propuštene dve prilike. Zbog isključivog zahteva menadžmenta da Moka liči na Javu, propušteno je da se upotrebi neki od, u to vreme, dostupnih programerskih jezika. Druga prilika je neuviđavanje Sun-ovih inženjera da je web-u potrebna (J)VM, te da u saradnji sa Netscape inženjerima osmisle već nešto (koji su to pokušali i sami). Iako potezi koje je Sun vukao često liče na pijanog ujaka koji ne shvata šta mu je to palo u krilo, možemo se zahvaliti i Microsoftu koji je bezočno gurao Windows-oliku verziju JVMa. Da su ove tri inženjerske sile videle bar malo dalje od sopstvenih stomaka (ono ispod se nije naziralo), svašta nešto bi bilo drugačije.

ŠBBKBB. Završismo sa poluskuvanim izgovorom za kafu, upakovanim u zvučno ime, namenjenog dizajnerima.

Sve samo naglašava trn u oku - HTML se razvija(o) užasno sporo. Već desetak godina nema skoro nikakve značajne inovacije na polju HTML i CSS. Pričamo o tehnologiji koja se reklamirala kao "HTML5 svuda", obećavala rapidan razvoj, pristup native API-ijima i jednorozima. Realno, dobili smo Flexbox, pa zamenili ga sa Grid-om, dodali bolju kontrolu istorije, navigacije, i... tja. HTML je ostao u devedesetim, očajnički pokušava da se dodovori retro-šmekom nama dizajnerima - sada svi koristimo JavaScript, pa smo, dakle, svi i dizajneri. Samo, late kafa je sada više u modi; sry moka.

Problem koji ovde sagorevam je taj što je i dalje potrebno puno vremena za pravljenje prokletih web UI komponenti. **Stvaranje web aplikacije koja izgleda i ponaša se profesionalno i dalje prestavlja težak problem za prosečnog programera**. Na stranu što se tehnologije oko web razvoja menjaju već dosadnom soničnom brzinom - ne postoji konzistentan način razvoja Web UI-ja. Rešenje se svodi na biranje nekog postojećeg UI frejmvorka i bacanja kockica da će raditi sve što ti treba i kako treba. Da duple šestice retko izlaze, dokaz je svuda oko nas: toliko je profesionalnih web aplikacija koje, blago rečeno, nisu zategnute do kraja - ovde ne radi dugme, tamo skript; potrebna je armija ljudi da održava i popravlja ono što su suštinski jednostavne UI forme. Sem što je ta radna snaga često zauzeta (jer, novi zahtevi), pa mi, web korisnici, bivamo počašćeni frustracijama nefunkcionalnih, ali tako lepo dizajniranih web stranica 🤷‍♂️.

Jer, hej, HTML definiše nekih 8 različitih UI komponenti, koje su notorno nepraktične. Ako ikada pomisliš drugačije, napiši jedan `<select>` ili `<input type=radio>`, komponente koje je svako, uvek, pravio ponovo od nule. Ponoviću: skoro 30 godina standarda je donelo svega nekoliko, jedva upotrebljivih, UI komponenti. Uzdravlje nam.

Pomenuta lavina web alata ne govori u prilog tehnologiji. Stvari znaju biti toliko fragmentirane, da je teško snaći se u svemu i napraviti racionalnu odluku na koju stranu krenuti s razvojem. Ne postoji standardni set praksi koji se koristi, jer se topla moka izmišlja svako malo. Kada pogledaš, ceo web razvoj kao da predstavlja samo zakrpu na zakrpu na zakrpu ideje da se HTML koristi za UI. Najtužniji rezultat je da je ponovna upotreba (_reusability_) u web razvoju... pa, žalosna. Ponoviću, podvučeno masnim, zarad budućih naraštaja: **ponovna upotreba u web razvoju je žalosna**.

Dalje: pretraživač je postao _monolitna_ platforma. Poznaje samo jedan jezik, JavaScript. To nikako nije zdravo za bilo koji eko-sistem. Jer, ako je sve što imaš JavaScript, svaki problem će izgledati kao pogrešna referenca na `this`. Kako je moguće da sa tolikim obiljem programerskih jezika, mi se i dalje tvrdoglavo držimo jednoumlja JavaScripta? Ne, nije vreme da se pomene TypeScript, dok god ga nije svuda; do tada, kastujem s(v)e u `any`.

Ne kažem da nije moguće napraviti dobar Web UI - očigledno, to se ponekad dešava. Međutim, **mora** postojiti bolji način za razvoj klijentskih aplikacija. Pošto je web tu da ostane i nikuda otići neće, plašim se da smo dostigli tačku kada nas baš briga na koju stranu se razvija razvoj. Posla ima, frejmvorka ima, idemo dalje.

Znaš šta je posebno zanimljivo? Svi razlozi zašto se web aplikacije uopšte i koriste, više _ne postoje_; odavno nisu relevantni. Zašto onda ne razvijamo native klijente, koji su moćniji, brži i lakši za razvoj? Hm, možda zato što Gugl ne može da ih indeksira?

Reći ću to: Web je HTML+JavaScript dizajnerska platforma za oglašavanje reklama. `yarn this`.
