---
title: "Tri jezika za dve bitange i ribicu"
date: 2022-07-28T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - jezik
  - crystal
  - v
  - go
---

Leto je vreme kada se gustiraju novi programski ukusi.

<!--more-->

## GoLang

[Go](https://go.dev/) sam upotrebio za CLI komandu, koja je bila nekakav wrapper oko generisanog API klijenta. Go je tu već neko vreme; popularnost se oslikava i u bogatom ekosistemu. Jedna od odlika je striktnost oko mnogih postavki: formatiranju, imenovanju i još koječemu. To nas svakako oslobađa izvesnog mentalnog uigravanja i olakšava upoznavanje jezika. Ipak, par puta sam morao da se konsultujem oko toga da li pišem na ispravan, očekivani (neiznenađujući) način; što je posledica popularnosti i različitih razumevanja i pristupa u stvaranju koda.

Zanimljivost s pointerima: pristupio sam praktično do krajnosti ("get things done"), bez većeg udubljivanja. Kada nešto nije htelo da se kompajlira, dodavao bih `*` ili `&` prefix bez razmišljanja. Zar to, onda, nije sam kompajler mogao da uradi?

## V

[V](https://vlang.io) je mladi jezik koga bi trebalo imati na `v`idiku. Jednostavan, siguran, performantan; generiše značajno manje izvršne datoteke. Ekosistem još nije toliko veliki. Krase ga i alati koji konvertuju postojeći C kod u V; primer koji vredi izdvojiti je bezbolna translacija DOOM koda; te kompajliranje generisanog koda igrice za manje od sekunde.

U `v` sam napisao tek kratak proračun; par struktura i funkcija. Ipak, _osećam_ dozu "lakoće" koju nisam imao sa Go. Ne umem da se bolje izrazim: pisanje koda je prosto teklo samo od sebe; ceo proces instaliranja, kompajliranja i jednostavnog debagovanja je prošao sa značajno manje `WTF` nego u prethodnom slučaju. Možda je samo primer bio suviše prost.

Iskreno bih voleo da ovaj jezik opstane.

## Crystal

[Crystal](https://crystal-lang.org) je jezik koji više podseća na Ruby nego na Go. Sva sreća, od Rubija preuzima najviše ideju: da bude programski jezik koga je lako čitati i pisati. I, čini se, uspeva u tome.

Crystal nisam mnogo pisao; više sam proučavao već napisani kod; proveo sam čak i neko vreme debagujući ga. Ono što me je iznenadilo je ekosistem - dolazi sa bogatim bibliotekama (rad sa bazom, itd), ima čak i online igralište; solidne integracije, jasnu dokumentaciju itd. Očigledna je zrelost ovog projekta, bez trunke sumnje.

Razumevanje je bilo udobno. Sintaksa je takva da se svašta uradi u malo teksta, a nemaš osećaj da nešto propuštaš. Zanimljivost: iznenadila me je čitljivost `break <expression>` konstrukta (koju sam predložio na Kotlin forumu, više razgovora radi).

Ipak, jednostavnost ima cenu. Postojeći kod je imao grešku-dve, koje se nisu dale tako lako pronaći; upravo jer je napisana linija mnogo toga radila odjednom. Ništa dramatično, svakako.

Zanimljivo iznenađenje za letnje dane.