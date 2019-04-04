---
title: Nije REST svaki API
date: 2017-11-11T09:53:22+00:00
slug: nije-rest-svaki-api
categories:
  - Razvoj
tags:
  - api
  - dizajn
  - http
  - interfejs
  - mikroservisi
  - rest
  - web
---

Napravio si HTTP API intefejs (_endpoints_) i nazivaš ga "REST API". Najverovatnije je da nisi u pravu. No ne brini, svima nam se to događa. REST je nešto više.

<!--more-->

Najkraća definicija REST-a je sadržana u sledećoj formuli:

> WWW := URI + HTTP + MIME + Hypermedia.

REST je način da se ostvari inter-operabilinost između kompjuterskih sistema na Internetu. Korišćenjem protokola, tipova sadržaja i URI-ja se definišu _resursi_ i način kako se njima manipuliše. No bez `hypermedia` nema potpunog REST APIja.

REST nije specifikacija, već preporuka. To čini stvari podložnim različitim tumačenjima i implementacijama. Kako bilo, neka pravila se mogu izvući. Ipak, to su i dalje samo _predlozi_ (ovde i subjektivni), a ne definicije koje treba slepo slediti.

I još nešto: napravi REST API nije nimalo jednostavno.

## Odlike REST APIja

**Koristi množinu za listu resursa, a jedninu za konkretan resurs**

    GET /users
    GET /user/123

Međutim, češći je slučaj da se koristi množina u oba slučaja:

    GET /users/173

  **ID resursa je deo URI; atributi se navode u parametrima**

Kada se resurs dobavlja svojim ID, on se navodi u URI. Primer:

    GET /users/173

Resurs koji se dobavlja pretragom po nekom od atributa:

    GET /users?email=joe@oblac.com

**Svaki resurs ima `link` na sebe**

    GET /user/173

```json
{
  "id" : 173,
    "name" : "Joe",
    "_links": {
      "self":{"href": "http://oblac.com/user/173"},
      "html":{"href": "http://oblac.com/user.html?id=173"}
  }
}
```

**Lista resursa sadrži navigacione linkove**

    GET /users?start=15

```json
{
  "result": [
    {"id": 1},
    {"id": 2},
    ...
  ],
  "_links": {
    "prev" : {"href" : "http://oblac.com/users?start=10"},
    "next" : {"href" : "http://oblac.com/users?start=20"},
    "first": ...
    "last" : ...
  }
}
```

**Vrati kompozitni resurs kada to ima smisla**

Kada resurs ima smisla jedino u kontekstu roditelja, vrati ga ugnježdenog:

    GET /persons/1

```json
{
  "name" : "Freedy",
  "address" : {
    "type" : "home",
    "street" : "Elm street"
  }
}
```

Ali isto tako:

    GET /persons/1/address

```json
{
  "type" : "home",
  "street" : "Elm street"
}
```

Zavisno od načina korišćenja treba identifikovati nove resurese koji su agregacija postojećih da bi smanjili učestanost komunikacije sa serverom.

**Tretiraj atribute resursa kao posebne resurse**

Ako je element resursa dovoljno važan i često se koristi, može da predstavlja resurs za sebe. Primer:

    GET /users/173/name
    GET /users/ids

**POST vs PUT**

`PUT` je idempotentna operacija: ako se ponovi više puta, rezultat je uvek isti. `PUT` služi da napravi resurs ako ne postoji ili da izmeni postojeći resurs.

`POST` uvek pravi novi resurs.

Dakle:

    POST /report
    PUT /report/1029

**Parcijalne izmene**

Često treba izmeniti nekoliko atributa resursa. Obično se to postiže slanjem `PUT` _requesta_ sa delimično definisanim resursom:

    PUT /users/123
    {"status":false}

Alternativno se može koristi `PATCH` metod, noviji, pa stoga i manje podržan.

## HATEOAS

Princip hipermedije je da svaki HTTP _response_ sadrži linkove koji korespondiraju na sve akcije koje klijent može da izvrši. Dakle, zavisno od trenutnog stanja aplikacije, svaki response opisuje sve akcije koje su dostupne. Server dinamički menja koje su akcije dostupne, a klijent bi trebalo da se sam adaptira na izmene.

Trenutno stanje resursa je kombinacija:

  * vrednosti atributa koji pripadaju resursu,
  * linkova na resurse koji su po prirodi stvari povezani sa trenutnim resursom,
  * linkova koji predstavljaju tranziciju na buduće stanje trenutnog resursa,
  * biznis operacija koje se mogu izvršiti na resursu.

HATEOAS (_Hypermedia as the Engine of Application State_) je krajnji nivo u poznatoj [lestvici zrelosti REST APIja](https://martinfowler.com/articles/richardsonMaturityModel.html) koju je sastavio Martin Fowler. Ova osobenost REST APIja pruža informacije kako navigirati i koristiti REST API dinamički, uključujući hipermedia linkove u _response_.

Jednostavan test za vaš API može biti sledeće: dovuci resurs i probaj da navigiraš kroz sve ponuđene linkove. Na sličan način kako prolaziš Web sajtom prateći linkove, tako i ovde, u domenu REST APIja, bi trebalo da možeš da dođeš do svih drugih resursa i akcija koje se mogu izvesti nad njima. _Simple as that._