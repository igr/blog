---
title: 'ArangoDB - tvoja nova NoSQL baza'
date: 2018-04-23T09:00:22+00:00
slug: arango-tvoja-nova-nosql-baza
categories:
  - Razvoj
tags:
  - arango
  - baza
  - graf
  - mongo
  - nosql
  - razvoj
---

Kada se pomene NoSQL baza, nekako uvek prvo pomislim na MongoDB; u sledećoj iteraciji razmišljanja pomislim na graf bazu Neo4j. Mongo odlično radi posao, Neo4j nisam još imao prilike da uposlim. Kako bilo, pomen za mene nove NoSQL baze izaziva prevrtanje očiju i uzdah: "ah, još jedna". Šalu na stranu, u mnoštvu danas dostupnih tehnologija teško je pronaći dragulje.

<!--more-->

[ArangoDB](https://www.arangodb.com) je upravo takav izuzetak za koji mislim da zaslužuje pažnju. Reč je o tkzv. _multi-model_ bazi otvorenog koda: to znači da izvorno podržava _key/value_ zapise, dokumenta i grafove! Da, nije greška - u jednoj kutiji se nalaze tri motora. Tu nije kraj. Bazu krase [odlične performanse](https://www.arangodb.com/2018/02/nosql-performance-benchmark-2018-mongodb-postgresql-orientdb-neo4j-arangodb/) - mada da se razumemo, sigurno postoje slučajevi korišćenja kada neka druga baza preuzima tron. Konačno, sa bazom se priča kroz REST API, ali i kroz Foxx - javascript programski okvir koji daje potpun pristup funkcionalnostima. Poslednje što bih izdvojio iz moje kratkotrajne i burne veze sa ArangoDB: upiti se mogu pisati u jeziku koji liči na SQL: tkzv. AQL.

Kako čovek da ostane ravnodušan?

## Primer

Najbolji način da se nešto isproba je da se nekako upotrebi. Rešio sam da modeliram primer iz prave aplikacije i vidim kako izgledati raditi sa ArangoDB. Problem je sledeći: u sistemu postoje nekakvi događaji (_event_) generisani od strane korisnika, a koji se zapisuju u bazu. Svaki događaj je opisan vremenskom odrednicom, tipom (ime događaja) i nekim meta-podacima, od koji je jedan i _email_ korisnika, koji ga ujedno jednoznačno određuje:

```json
{
  "createdAt": 12323232,
  "type": "START",
    "metadata": {
      "emailAddress": "igor@oblac.rs",
      ...
    }
}
```

Struktura kojom se opisuje događaj nije najsrećnije izabrana; ali tako-je-kako-je.

Zadatak je da se za svakog korisnika izračuna broj događaja istog tipa. Rezultat potom treba da je moguće sortirati po nekoj od izračunatih vrednosti. Nešto ovako:

| email:        | START | STOP | DEPLOY |
| ------------- | ----- | ---- | ------ |
| one@email.com | 358   | 234  | 312    |
| two@email.com | 323   | 298  | 566    |

Generisao sam 500.000 događaja koje su generisali 500 korisnika, svi podaci su zapisani kao JSON fajlovi.

Izabrao sam da radim u JavaScript-u, radi jednostavnosti.

### Unos

Unos JSON podataka je prošao glatko. Slično kao i MongoDB, moguće je jednostavno proslediti ceo sadržaj ArangoDB kolekcije u jednoj liniji.

### Web interfejs

Prijatno me iznenadilo postojanje web interfejsa za ArangoDB. Startovanjem zvaničnog Docker imidža dobija se i web interfejs koji daje uvid u bazu, a nudi mogućnost i izvršavanja upita. To značajno olakšava rad i testiranje upita.

### Agregacija

Vreme je da uključimo vijuge. Tražena kalkulacija nije trivijalna. Podatke treba agregirati događaje i grupisati ih po korisniku, a onda za svakog korisnika ponovo grupisati rezultate po tipovima, da bi ih ‘pivotirali’ u nove, dinamičke kolone, koje sadrže samo sume. Da ne dužim, rezultujući kod izgleda ovako:

```javascript
const arangojs = require("arangojs");
const aqlQuery = require('arangojs').aqlQuery;
const db = new arangojs.Database('http://127.0.0.1:8529');

db.query(aqlQuery`
FOR event IN events
COLLECT
emailAddress = event.metadata.emailAddress,
  type = event.type WITH COUNT INTO count
COLLECT email = emailAddress INTO perUser KEEP type, count
LET ret = MERGE(PUSH(perUser[* RETURN {[CURRENT.type]: CURRENT.count}], {email}))
SORT ret.CREATE DESC
LIMIT 10
RETURN ret
` ).then(
  cursor => cursor.all()
  ).then(
  data => data.forEach(d => console.log(d)),
  err => console.error('Failed:', err)
);
```

Svašta se vidi iz ovog koda. Priznajem, nije bilo lako doći do rešenja - no, naravno, deo muke leži u mom neiskustvu rada sa ovom bazom.

### Performanse

Isti primer, sa istim skupom podataka sam modelirao i na MongoDB, da bih uporedio i performanse. Isti MongoDB upit se izvršava za nekih 650ms; ArangoDB je to uradio za oko 580ms. Naravno, ne treba pridavati značaj konkretnim brojkama, niti je ovo nekakav ozbiljan test; merenje je samo ilustracija da iza ArangoDB postoji ozbiljna namera.

## I dalje...

Priznajem, navukao sam se. Iako nisam isprobao sve što nudi, gledaću da ubuduće ArangoDB bude moj prvi izbor kod NoSQL baza.