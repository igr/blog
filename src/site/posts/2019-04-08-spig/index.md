---
title: "Spig"
date: 2019-04-08T12:52:12+00:00
slug: spig
categories:
  - Razvoj
tags:
  - razvoj
  - programiranje
  - javascript
  - projekat
  - gulp

---

Godinama unazad koristim statičke generatore: [nanoc](https://nanoc.ws), [hugo](https://gohugo.io), [11ty](https://www.11ty.io)... Kako to biva, kada programera nešto žulja, napravi ga sam - to je ujedno i najgluplja i najpotentnija stvar koju može da uradi. Tako je za vikend nastao [Spig](https://github.com/igr/spig) - _framework_ za `gulp` za generisanje statičkog web-a.

<!--more-->

## Šta je smetalo?

**Nanoc** sam voleo jer podržava [kramdown](https://kramdown.gettalong.org) - ekstenziju markdown-a za koju nalazim da vredi. Međutim, stalno sam imao problema sa `ruby`-jem na lokalnoj mašini, što sam rešio `Docker`-om, no deployment i dalje nije pouzdan. Neke stvari je bilo baš teško odraditi, kao na pr. generator indeksa za pretragu.

**Hugo** je odličan - i vrlo brz (pisan je u `go`). Konceptualno je odlično zamišljen, iako na trenutke kompleksan. Problem koji sam imao je markdown engine koji se koristi - zna da ubaci nove redove gde ne treba. Dalje, nikako nisam voleo sintaksu koja se koristi u šablonima. Treba puno probanja i žongliranja da se neke stvari urade; na kraju je rezultat baš... meh. Ne postoji način da se proširi, što je rezultat izabranog jezika u kome je napisan.

Tu sam odlučio da probam da nađem lagani framework, ovaj put pisan u javascript-u, koji će mi zaista biti više framework nego alat. **11ty** radi lepo, ali još uvek tek osnovne stvari - toliko osnovne, da sam na kraju digao ruke i odlučio da ne gubim vreme na proučavanje i čekanje da neko napravi očigledno potrebnu funkcionalnost i napravim svoj alat.

Čemu još jedan statički generator na svetu - ne znam. Meni izgleda da radi posao na način kako zamišljam da je ok. I valjda je to, samo po sebi, dovoljno.

## Spig!

Nije zamišljen kao alat, već se instalira kopiranjem foldera sa sorsem. Radi na `gulp`-u. Dolazi sa predefinisanim setom `gulp` taskova koji rade uobičajene stvari: sass, minimizacije, babel, kompresije slika i sl. Srce **Spig**-a su njegove operacije, kojima se opisuje šta se radi na kom setu fajlova. Sve operacije se izvršavaju u fazama, kojih ima proizvoljan broj, koje služe kao mesto za sinhronizaciju. Evo primera:

```javascript
Spig
  .on('/**/*.{md,njk}')
  ._("PREPARE")
  .pageCommon()
  .rename(postsToRoot)
  .collect('tags')
  ._("RENDER")
  .summary()
  .render()
  .applyTemplate()
  .htmlMinify()
;
```

Ovde imamo 2 faze. U prvoj pripremamo atribute is `frontmatter`-a, sakupljamo tagove i slično, premeštamo foldere. U drugoj fazi pretvaramo markdown u html i primenjujemo šablone. Mnogo više se tu nešto dešava, ali ne bih išao u detalje.

Šabloni su za sada pisani u [Nunjucks](https://mozilla.github.io/nunjucks/), koji se pokazao kao odličan!

Sada je, na primer, lako dodati novu fazu koja će se izvršiti nakon svega i pokupiti sadržaj za potrebe pravljenja indeksa za pretragu:

```javascript
Spig
  .on('/index.json')
  ._("POST_RENDER")
  .applyTemplate()
;
```

Ceo kod za sadržaj indeksa je napisan u javascriptu koga sam primenio na kolekciju stranica u šablonu.

## Prednost - vrednost

Možda je najveća vrednost to što je ceo framework jednostavan i razumljiv. Lako je pisati kompleksnije stvari. Planiram da njime zamenim postojeće sajtove koje radim, čime će dobiti na zrelosti (već ih je par zamenjeno). Videćemo kako će to sve ići.

[Kod je otvoren](https://github.com/igr/spig).