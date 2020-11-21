---
title: "REST in pieces, REST"
date: 2020-11-21T01:07:03+00:00
categories:
  - Razvoj
tag:
  - rest
  - razvoj
  - api
  - graphql
---

Kada pomenemo REST, najčešće pomislimo na CRUD operacije nad nekakvim skupom resursa. Takvo razmišljanje je proisteklo iz jedne doktorske disertacije koja se naslanja na `RFC 3986`, gde se resurs definiše proizvoljno široko i apstraktno.

Trivijalnost CRUD paradigme je dovela do glorifikacije jednog obrasca komunikacije. Bravo za nas.

<!--more-->

Sama disertacija se ne bavi CRUD-om. REST se, zapravo, bavi uvođenjem _konvencije interakcije_ između klijenta i servera, iskorišćavajući dobro poznati protokol. Ponavljam, fokus RESTa je na svojevrsnom načinu komunikacije, koji povlači za sobom osobine kao što su identični interfejs (ne zavisi od klijenta), stateless komunikcija, mogućnost keširanja... i dalje ništa o CRUDu.

Onda je neko napravio paralelu između HTTP metoda i CRUD operacija; otvorio Pandorinu kutiju i zauvek zagušio sve(s)t nepotrebno pojednostavljenim koceptom. Obriši, dodaj, izmeni; bang - eto REST APIja. Ako uložimo (nemali) napor da API sazre, dobijamo i HATEOAS, koji se u biti svodi na to da je svaki response obogaćen metapodacima povezanih resursa.

Suština problema je što je širok koncept resursa (definisanog pomenutim RFC-om) zamenjen ograničenim konceptom _kolekcije CRUD-abilnih resursa_. U CRUD-RESTu kolekcija je osnovno polazište (`GET /articles`) dizajna API-ija.

A kada je ceo API kolekcija CRUD-abilnih resursa, sva rešenja postaju CRUD. Što ne može biti dalje od istine.

## Oslobodi API

Iz svega rečenog zaključujem da nam je dozvoljeno da oslobodimo naše API-je CRUD stega. Potpuno je u redu da ubacimo dodatne endpointe koji se bave operacijama koje nisu samo CRUD: `POST /users/{id}/approve`, `POST /books/{id}/publish`...

U redu je da imamo jediničan resurs: `GET /user`, `GET /location` ako znamo da je singleton u granicama upotrebe (iza auth sloja, na primer).

Ubacite _bulk_ (`POST /books/bulk`) i _batch_ (`POST /articles/batch`) operacije. Bulk se izvršavaju nezavisno; dozvoljavamo da neke ne prođu. Rezultat je uvek `200` zajedno sa spiskom grešaka. Batch se izvršavaju odjednom; prolaze ili sve ili ni jedna.

U redu je imati API koji nije CRUD.

## JSON Web Services

Jedna od konsekvenci CRUD-RESTa je to da uvek vraća resurs(e). A resurs (pojedinačan ili kolekcija) nam gotovo nikada ne treba sam. Jer, za knjigu nam treba i autor, za račun u banci i stanja i istorija itd. To zahteva nove pozive ka serveru ili nove resurse, kompozicije postojećih. Sve brzo rezultuje brbljivom komunikacijom sa serverom. Ona postane i detaljna: za svaki mali skup podataka (ime knjige), dobijamo nazad kompletni resurs (i, možda, drvo uvezanih resursa).

Imao sam priliku da se bavim ovim problemima REST API-ja: brbljivošću i količinom rezultata koji se vraćaju. Došao sam do nekakvog obrasca komunikacije koji je komunicirao samo JSON sadržajima i omogućavao:

1. uvezivanje poziva,
2. filtriranje rezultata (prikaz ili odbacivanje izabranih polja),
3. kreiranje rezultata po volji, i
4. batch pozive

Ovaj kod je radio nad _postojećim_ API-jem. Umesto da zove jedan po jedan API, korisnik može da pošalje jedan JSON sa spiskom endpointa, kao i strukturom rezultata. Nešto ovako:

```json
{
    "$user[firstName,contact.emailAddress] = /user/get-user-by-id": {
        "userId": 123,
        "$contact = /contact/get-contact-by-id": {
            "@contactId": "$user.contactId"
        }
    }
}
```
Ovim _jednim_ pozivom postiže se sledeće:

+ poziv `get-user-by-id` za `userId=123`,
+ rezultat se smešta u `$user` varijablu,
+ poziva se `get-contact-by-id` u kojoj je `contactId` jednak onome iz dovučenog `user`-a; dakle dovlači se korisnikov kontakt,
+ rezultat (kontakt) se smešta u rezultujući `user` objekat pod ključem `contact`,
+ dobijena kompozija se filtrira i ostaju samo 2 polja.

Zgodno, zar ne? I dan-danas je u upotrebi u tom open-source proizvodu na kome sam radio.

Ova ideja se razvijala neplanski, te nisam zadovoljan sintaksom: JSON nije baš najpogodniji jezik za opisivanje ovakvih naprednijih uvezivanja. No, nije bilo sluha u menadžmentu za bilo kakva unapređenja.

Ovo se sve kodiralo pre nego što je GraphQL postao kul. Kada smo ga se već dotakli: GraphQL mi je neuporedivo konkretnije rešenje od RESTa. Bavi se menjanjem, čitanjem i slušanjem; i ne ostavlja nedoumice kako ga treba koristiti.

## CRUD (REST) je curenje implementacije

Jedna od dobrih praksi razvoja je enkapsulacija: sakrivanje implementacije.

Svaki CRUD API, bio on u bekend jeziku ili HTTP interfejsu, narušava ovaj princip. Da objasnim.

Biznis akcija je jedan _unit-of-work_, koji se koristi u domenskim granicama problema koji se rešava. Korisnike ove akcije (frontend, udaljeni servis, krajnji korisnik...) ne zanima kako se komanda izvršava: da li će snimiti 10 entiteta ili jedan. Biznis akcija je _glagol_ u domenskom rečniku problema koji se modelira. Uvođenjem primitivnih CRUD operacija, jezik prestaje da bude domenski, orijentisan ka problemu, već se generalizuje, a domen mu se prilagođava.

Primer: u restoranu naručuješ klopu prosleđivanjem jedinstvenog ključa asinhronom servisu (kelneru). Ako bi to bio CRUDstoran, ti bi umesto toga poslao pregršt poziva: POST pasta, GET pasta, GET tanjir?duboki=true, GET pribor?spoon=false.

Isto tako frontend koji barata CRUD API-jem preuzima značajan deo logike na sebe. Bekend postaje glup adapter za bazu; što su neki i prepoznali te nude API sloj odmah nad bazom.

Sve je to samo prečica, jer nam treba rešenje sada, a inženjerstvo nikada.

U poslednje vreme se trudim da razmišljam o API-jima koji se bave 1) stanjem sistema u datom trenutku i 2) pokretanjem akcija koje modifikuju stanja. Pozivi više nisu operacije nad resursima, već zahtevi sa promenim stanja. Drugi put više o tome.

Nema prečica.
