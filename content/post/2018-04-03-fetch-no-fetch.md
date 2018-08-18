---
title: Fetch, No Fetch
date: 2018-04-03T09:53:22+00:00
slug: fetch-no-fetch
categories:
  - Razvoj
tags:
  - api
  - fetch
  - http
  - javascript
  - rest
---

U prenadošlom JavaScript ekosistemu trudim se da očuvam razum pragmatičnim pristupom: analizirajući ono što mi padne pod prste, čitajući o onome što prolazi pokraj mene. Nisam mudrijaš, drugim rečima, te me ne slušajte pažljivo.

<!--more-->

Zatrebalo mi je da pozivam nekakav API iz JS-a, pa se logično nametnulo da koristim `fetch()`. Dolazi kao deo ES6 ako se ne varam; konačno je integrisan HTTP klijent u jezik. Nažalost, nije sve tako bajno.

Prva stvar koja mi je zasmetala je to što svaki poziv zahteva korak kojim se odgovor servera pretvara u JSON. Iako razumem ovaj dizajn (nije svaki odgovor JSON), kapiram da bi bar u JS svetu trebalo da bude podrazumevani tip odgovora. Svaki poziv je izgledao ovako:

```javascript
fetch(url).then(res => res.json).then(obj => console.log(obj));
```

Druga stvar je ozbiljnija. Ili ja nešto grešim, ili `fetch` ne registruje dobro greške:

```javascript
fetch(url).catch(err => console.log(err)).then(res => console.log(res));
```

Kada je odgovor sa servera bio `400`, nije se izvršio `catch`, već samo `then` _promise_. Naravno, mogao sam da dodam još koda pa da stvari rade kako očekujem, no smatram da ne bi trebalo da ga bude.

S druge strane, dopada mi se kako [Axios](https://github.com/axios/axios) izgleda po primerima, a kako postoji i Bucklescript veza za njega, čini mi se da sam pronašao to što sam tražio.

## Dopuna

[Filip D.](http://danicfilip.com/) me je podsetio da se u JavaScriptu odzivi 4xx i 5xx smatraju korektnim. Zbog navike sa radom s REST servisima, očekivao sam grešku.

Preporučeni način da se proveri da li je fetch bio uspešan, izgleda ovako nekako:

```javascript
fetch(url).then((response) => {
  if (response.ok) {
  } else {
  }
});```

Hvala!