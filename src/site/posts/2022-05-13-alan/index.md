---
title: "Alan Key vs Alana Ford"
date: 2022-05-13T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - kvalitet
  - LoD
  - OOP
---

Za Alana, OOP čine samo tri stvari.

<!--more-->

Slanje poruka, izolacija i ekstremno kasno uvezivanje.

Zamislio je OOP kao umrežene kompjutere i to skalirao nadole. Svaki kompjuter ima svoje interno stanje, ima disk, može da računa. Komunicira sa drugim kompjuterima na mreži. Ovakav kompjuter, umanjen na virtualni entitet, je ono što Alan naziva 'objekat'.

Većina OOP jezika ne radi ovako.

> Jedna lasta ne čini proljeće, a kamoli dvije.

Da bi se bolje razumelo o čemu Alan govori, pomaže pogledati  _Smalltalk_, jezik koji je izumeo. Za razliku od većine današnjih mejnstrim jezika, objekti u _Smalltalku_ imaju samo metode. Nema propertija. Metode mogu da menjaju interno stanje objekta kojem pripadaju. Niko drugi, sa strane, ne može da menja podatke (stanje) objekta.

U našim OOP jezicima, ovo znači da objekti komuniciraju isključivo pozivajući metode. Ne mogu da čitaju ili pišu stanje koje se čuva u drugom objektu. Slanje poruka je implementirano kao poziv metoda na primalačkom objektu. Jedino je primalački objekat odgovoran za značenje i efekat poslate poruke (pozvane metode). Pozivanje metoda ima semantiku "slanja poruka".

U našim OOP jezicima je dozvoljeno direktno modifikovati stanje objekata: `alanFord.setHeight(187)`. Takva linija ne znači ništa, naročito ne znači primalačkom objektu. Samo izvor, pozivač, ima ideju o čemu se radi, razbacanu kroz kod njegove aktuelne metode.

> Bolje nešto od nečega nego ništa od ničega.

Ako pogledate [prethodni članak](https://oblac.rs/lod-paperboy-and-iscan/), upravo je to ideja iza refaktorisanja. Primer \#3 je rezultat koji odgovara Alanovoj zamisli. Do njega smo došli na drugi način, analizirajući **LoD** i nekakva pravila "dobrog" koda; zapravo sve vreme se (prikriveno) približavamo ovoj ideji. OOP-u ne treba **LoD**.

## BOOP

**BOOP** je ono što je OOP danas == "Bad OOP". Razmišljamo o objektima kao strukturama podataka na koje su zakačene funkcije.

Alan je stvari video drugačije. Video je objekat kao kolekciju _mogućnosti_, _sposobnosti_, koje se pozivaju slanjem poruke. Kako se poruka šalje je nebitno. Bitno je da objekat _nije_ kolekcija podataka. Objekat sadrži stanje neophodno da se sposobnosti izvrše.

> Tko spava, nije budan.

Znate šta može da bude objekat o kome govori Alan?

Moduo.

U **BOOP** mi grupišemo metode u objekte, pogrešno vođeni time šta sve možemo da radimo sa podacima iz objekta. To su samo sposobnosti koji dele zajedničko stanje.

Ponavljam uporno pojam "sposobnost" i čekam da se neko javi i kaže "funkcija". Upravo, sposobnosti jesu funkcije. Da podestim na [mudrost Broja Jedan](https://github.com/igr/color-code/blob/main/doc/13-function.md), funkcija o kojoj pričam nije deklarisana funkcija u programskom jeziku. Ne, to je _first-class citizen_, instanca; ono što nazivam FUNCTION (sve kapitalno) u prethodnim tekstovima.

Kolekcija funkcija (sposobnosti) je moduo.

Moduo definiše [poruke koje procesira](https://github.com/igr/color-code/blob/main/pectopah/office-api/src/main/kotlin/ac/obl/pectopah/api.kt). Moduo se danas implementira u kodu, sutra može da postane odvojena biblioteka ili udaljeni mikroservis. Moduo je izolovan i u vreme kompajliranja. I sam Alan se pitao da li je objekat kakav je u BOOP previše mali.

> Cijena? Prava sitnica.

Pred nosom nam je još jedna zabavna stvar: nema klase u definiciji modula ka spolja. Samo potpisi sposobnosti i definicije imutabilnih podataka.

Tako je, OOP ne uključuje klase. Objekti NE moraju da budu izvedeni iz klasa da bi bili OOP. Klase se, zapravo, [ne uklapaju](https://oblac.rs/oop-boja/) lepo [u OOP](https://oblac.rs/kvadrat-vs-pravougaonik/); kao ni [nasleđivanje](https://oblac.rs/otpor-oop-nasledjivanje/). Nemojte meni da verujete na reč; pitajmo Goslinga (Džejmsa, kreatora Jave; ne Rajana):

> Kada bi kreirali Javu ponovo ispočetka, šta bi promenili? Izostavio bih klase.

Koliko sam uspeo da ukačim, klase (i nasleđivanje) je došlo iz programskog jezika _Simula_ - kao hack za performanse koji su morali da implementiraju. Nikada nije trebalo da postane centralno mesto u OOP. Zato jesu u BOOP.

## Tko leti, vrijedi

Dve stvari čine da se osećam kao da sam u stripu Alana Forda. Prva je da se posle pedestak godina i dalje pitamo šta radimo. Druga je da nismo uspostavili dovoljno jasno vrednost kvalitetnog koda. Kao timejdžerski seks, svi o tome pričamo, a najmanje radimo.

Koga i briga za dobar kod?