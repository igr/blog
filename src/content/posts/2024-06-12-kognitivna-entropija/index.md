---
title: "Kognitivna entropija"
date: 2024-06-12T01:06:08+00:00
slug: kognitivna-entropija
description: >
  Ako bih sumirao suštinu razvoja softvera u jednoj rečenici, to bi bilo:
---

Ako bih sumirao suštinu razvoja softvera u jednoj rečenici, to bi bilo:

> Razvoj softvera treba neprestano težiti smanjenju nedoumica.

Sumiranjem dolazimo do suštine neprestanim uklanjanjem onoga što može biti izostavljeno. Rezultat je čista forma: _ideja_. Imati takvu ideju je korisno, da nas neprestano podseća i vraća na pravi put.

Postoji, međutim, paradoks: abstrahovanjem ideje, udaljavamo se od njene suštine. Zato moramo potpuno shvatiti sve što smo uklonili pre nego što zaista možemo razumeti i prihvatiti koncept. U suprotnom, sumirana ideja je samo beznačajna izjava.

Šta je sa stvaranjem funkcionalnog softvera? Zar to nije cilj razvoja softvera? Ako razmislimo, "razvoj softvera" je, zapravo, sinonim za "proces izrade ispravnog softvera." Ta dva pojma su identična. Hoće li rezultat biti uspešan ili ne, to je već druga stvar. Dalje, cilj softvera nije isto što i suština razvoja. Cilj je rezultat, suština je proces kojim dolazimo do cilja.

## Entropija

Šta je nedoumica? Kako je entropija povezana sa nedoumicom?

> Entropija je mera neizvesnosti i haosa.

Entropija je takođe mera informacija. Informacija predstavlja podatke koji smanjuju neizvesnost.

Neizvesnost o kojoj ovde pišem je nedoumica _učesnika softverskog razvoja_. Ona se ne nalazi unutar koda, infrastrukture, kompjutera. Svaki deo softvera, čak i onaj koji baca izuzetak i ruši sistem, radi kako mu je rečeno, baš kako treba. Kod je deterministički i nedvosmislen; da nije tako, ne bi mogao biti izvršen.

Neizvesnost leži u nama samima: u našoj sposobnosti da _razumemo_ softverski sistem, shvatimo i koristimo apstrakcije, obradimo ulazne podatke, pridržavamo se projektnih pravila,
komuniciramo i primenjujemo metodologije... Sve je u ljudima. Mi smo ti koji pišemo sors kod organizovan u foldere i datoteke, razbijamo sistem na delove, kreiramo interfejse, API-je,
upravljamo projektima na različite načine, pišemo testove, održavamo sastanke... radi boljeg razumevanja sistema. Mašinama je svejedno, ljudima nije.

Entropija o kojoj govorim odnosi se, dakle, na nedoumice u razumevanju softverskog sistema koji se razvija. Nazvao sam je **kognitivna entropija**.

Ova entropija je slična Šenonovoj entropiji, s tom razlikom da sada razmatramo moguća (ne)razumevanja sistema umesto broja bitova potrebnih za prenos informacije. Idealno, broj razumevanja sistema je `1`: tada je softverski sistem apsolutno precizan i svaki deo je jasan i upotrebljiv svima koji rade na njemu. U stvarnosti, broj mogućih (ne)razumevanja `n` je veći od `1`, pa možemo izraziti verovatnoću da je nečija interpretacija tačna kao: `p = 1/n`. Ako bismo nekako mogli izmeriti kognitivno razumevanje svih komponenti sistema za sve učesnike u projektu, došli bi i do formalnog proračuna za ukupnu kognitivnu entropiju softverskog sistema `H(X)` prema Šenonovoj formuli.

Naravno, formalni proračun poput ovog nije praktičan. Praktična primena se svodi na izolovanje pojedinačnih komponenti sistema i analizu varijacija mogućih nedoumica (kognitivne entropije).

## Namere i Promene

Odakle potiče nedoumica? Iz dva izvora:

1) nepotpunog razumevanja postojećeg, sadašnjeg - opisanog kroz _namere_ (_intent_),
2) nepredvidljivosti budućnosti - opisane kroz _impulse promene_ (_change impulse_).

Softverski sistem se sastoji od _namera_: interesa koje želimo postići softverom. U ovom kontekstu, razvoj softvera je proces
pretvaranja namera u _izvršenja_: akcije koje obavlja softverski sistem. Transformacija namere u izvršenje inherentno uvodi nedoumicu (entropiju) kao nuspojavu. Razlog tome je manjkavost ljudskog aparata za komunikaciju: namerama izražavamo šta bi treba da bude, a zapravo samo isključujemo ono šta ne treba (vidi: [ontologiju razvoja](https://oblac.rs/ontologija-softverskog-razvoja/)). Dakle:

```plaintext
namera -> izvršenje + entropija
```

Svaka komponenta softverskog sistema ima ugrađene namere. Bilo da se radi o jednostavnoj funkciji, modulu, strategiji implementacije, dokumentaciji, testovima, upravljanju projektom — svaka ljudska interakcija s projektom proizilazi iz namere i proizvodi nameru.

Impuls promene je motivacija ili zahtev za izmenom sistema. Promena, dakle, proizvodi nove namere: dodavanje novih funkcionalnosti, menjanje postojećih, ispravke, dopune:

```plaintext
impuls promene -> namere
```

Impuls promene, dakle, posredno utiče na entropiju sistema. Odnos između impulsa promene i varijacija u kognitivnoj entropiji oslikava stabilnost sistema na promene.

## Pritisak

Način da razumemo obim kognitivnih nedoumica je primenom _pritiska_ na delove sistema.

Pritisak je povećanje nerazumevanja namera i povećanje impulsa promena sa ciljem varijacije kognitivne entropije. Pritisak je, na primer, analiza načina kako se kod može pogrešno protumačiti, naglo povećanja broja interakcija u timu, promena tokova komunikacije među timovima, namerno uvećanje broja grešaka i propagacija istih kroz sistem, naglo uvećanje broja klasa, horizontalno i vertikalno skaliranje, kako se sistem ponaša kada padne većina dependencija, šta ako treba izmeniti nepovezane tačke sistema, šta ako se doda još jedan enum, argument, parametar, šta ako se promeni tip podataka - koliko sigurno možemo odgovoriti na sve ove pritiske?

Primenom pritiska stvaramo informacije o sistemu. Informacije nam govore o varijaciji kognitivne entropije. Sami biramo koje su nam informacije relevantne i na koje želimo da odgovorimo. Ne moramo da odgovaramo na sve pritiske, dovoljno je da budemo svesni da postoje i njihovog uticaja. Preciznost minimizuje nedoumicu. Preciznost dolazi iz prikupljenih relevantnih informacija. Relevantne informacije su rezultat primene kognitivnog pritiska.

```plaintext
pritisak -> informacije
relevantne informacije -> smanjenje nedoumice
```

Što se kognitivna entropija manje menja pod pritiskom, to je sistem zdraviji. Što je manja kognitivna entropija, to je sistem zdraviji.

## Sumiramo okvir

+ Softverski sistem se sastoji od namera.
+ Namere uvode kognitivnu nedoumicu (kognitivnu entropiju).
+ Impulsi promene generišu nove namere.
+ Primenom pritiska dolazimo do relevantnih informacija.
+ Informacijama smanjujemo nedoumice i dobijamo precizniji i zdraviji softverski sistema.

Ovaj okvir mi svakodnevno pomaže u detektovanju loših obrazaca razvoja. Primetio sam da i mnogi poznati softverski principi proizilaze iz ovog okvira. Nije iznenađujuće, na kraju krajeva, jer je razvoj softvera — komunikacija.

Sigurno da postoji sličnosti sa drugim metrikama softverskih sistema, kao što su kohezija, uvezanost itd. Verovatmo je da pričamo o istim principima. Važna razlika je što, za razliku od knjiških definicija ostalih metrika, naglašeno na prvo mesto stavljam upravo ljudski faktor: razumevanje.
