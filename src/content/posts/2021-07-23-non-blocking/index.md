---
title: "Non-blocking zvrčka"
date: 2021-07-23T01:06:08+00:00
slug: non-blocking-zvrcka
description: >
  Jedna mala inženjerska ilustracija za podeliti.
---

Jedna mala inženjerska ilustracija za podeliti.

**Kontekst**: aplikacija je podeljena na mikroservise. Očekivano, svaki mikroservis ima potrebu za autentifikacijom. Zbog toga se uključuje posebna auth biblioteka na svaki mikroservis. Prema zamisli CTO, biblioteka dodaje nove, auth endpointe na mikroservis. Tako se korisnici mikroservisa lakše autentifikuju, bez potrebe da idu direktno do centralnog auth tela, ma gde ono bilo - to za njih obavlja biblioteka.

Dalje, CTO insistira na tome da se auth proces spolja i lokalno koristi na isti način: pozivom auth endpointa. Drugim rečima, kada se pozove neki biznis endpoint, mikroservis će ga prvo autentifikovati pozivajuću _samog sebe_ na auth endpointima (ukoliko to ovaj već nije sam uradio).

Na primer, korisnik `A` poziva `B/hello` endpoint. Da bi se poziv autentifikovao, `B` poziva `B/auth`, pa kada dobije zeleno svetlo krene sa izvršavanjem biznis logike koda:

```plaintext
A -> B/hello -> B/auth -> Hello.java
```

**Problem**: testovi prolaze, produkcija radi... sve dok, odjednom, stane: pojedinačni zahtevi se "zaglupe", a uskoro se zablokira i ceo server.

Uočava se obrazac: problem se javlja svaki put kada je saobraćaj malo veći. Neobično je što je u pitanju zaista malo povećanje saobraćaja, na pr, par desetina zahteva u sekundi.

Šta nije ok?

----

Srž problema je u načinu kako server radi. Da je Tomcat u pitanju, na primer, problem se ne bi tako skoro pojavio, ako ikada ovako drastično. U ovom projektu je korišćen non-blocking server, [Vert.x](https://vertx.io). On radi malo drugačije.

Tradicionalni server alocira neku (veliku) količinu threadova, svaki opslužuje jedan dolazni zahtev. U pitanju je blocking način rada. Vert.x alocira tek nekoliko threadova - uobičajeno dvostruko više od broja CPU-ova. Na serveru, na primer, broj alociranih threadova (tkzv. IO threadovi) može biti samo `8`. Ideja je da se koristi non-blocking asinhroni način rada; te da se IO threadovi _nikada_ ne blokiraju. Dolazni pozivi se pridružuju IO threadovima u red (queue) i čekaju da budu opsluženi. Na taj način jako malo threadova može da opsluži veliki saobraćaj.

I eto problema u dizajnu biblioteke. Poziv `B/hello` blokira i čeka `B/auth`. Ono šta se dešava je da Vert.x pridruži oba poziva istom IO threadu. Nastaje tipičan deadlock: `B/hello` poziva `B/auth` koji čeka da se `B/hello` završi, na istom threadu.

Zanimljivije je što CTO dugo nije prihvatao uzrok problema. Primenjeno rešenje nije bilo rešenje: povećanje broja threadova i prisilno guranje koda u worker executore.
