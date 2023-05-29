---
title: "UPSET with JPA"
date: 2023-05-29T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - projekat
  - praksa
  - jpa
  - sql
  - baza
---

Iz života programera.

<!--more-->

Česta je potreba da se entitet napravi ukoliko ne postoji, te onda, nakon obrade, snimi nazad u bazu. Reč je o `lazy` kreiranju zapisa u bazi. Zahtev bi mogli da iskažemo na sledeći način: 1) `find` or `create`, 2) update, 3) `save`.

Početničko pitanje "a kako se to radi u JPA?" na StackOverflow dobija odgovor od osobe sa pozamašnom reputacijom, koja očigledno, po istoriji odgovora, zna više o JPA nego prosečan kodarudar. Odgovor je jednostavan i jezgrovit: probaš da učitaš entitet sa `findByFoo` (gde je `foo` verovatno prirodni ključ koji identifikuje zapis); ako ne postoji, kreiraš ga. Na kraju snimaš entitet sa `save`. To je "JPA način", po rečima autora sveopšte prihvaćenog odgovora.

Najverovatnije da to nije tačan odgovor. Ispravan je ukoliko je _zagarantovan_ broj pristupa aplikaciji u istom trenutku jedan i samo jedan. Tako nešto je više svojstveno za desktop aplikacije, a ne bekend jednog APIja.

Gde je greška? Paralelno izvršavanje ove operacije može proizvesti kreiranje više od jednog novog entiteta.

## Zanimljivost

Zabrinjavajuće je da je nekorektan odgovor praktično prihvaćen kao ispravan. Ne mislim samo na ilustraciju sa StackOverflow; ako pretražite internet, na neuobičajeno puno mesta se isti odgovor navodi kao ispravan. Često se čak uzdaju u magiju iza `EntityManager` lokalnog keša, te ako postoji samo jedna instanca servera, kažu oni - nema brige. Zaboravlja se da je keš vezan za transakciju, tako da nam za problem ne treba više instanci servera.

Da ponovim zapažanje: [religija](https://oblac.rs/pomoz-bog/) u programera je na zavidno visokom nivou.

## Rešavanje problema

Za početak, problem se može bar zataškati. Uvođenjem `unique contraints` koji obuhvata polja po kojima se traži (prirodan primarni ključ) makar rešavamo problem nekonzistentnosti u bazi. Upis drugog identiteta je time onemogućen.

Upotreba mehanizama za lokovanja u bazi je ovde nemoguća, jer podatak ne postoji, nema reda, nema na čemu postaviti katanac. Rešenje zato može da lokuje nešto što postoji. Može se napraviti posebna tabela koja sadrži samo lokove. Red u ovoj tabeli predstavlja tačku sinhronizacije za tabelu iz našeg sistema. Tada bi nekakva operacija `saveOrUpdate` konsultovala i ovu tabelu. Reč je o distributivnom mehanizmu za lokovanje, te je bilo kakvo alternativno rešenje takođe validno: Redis, ShedLock... Uvedena kompleksnost je pozamašna.

Jedno polu-rešenje koje baš nigde nisam video je trivijalno. Ukoliko postoji `unique constraint` na prirodnom ključu, metoda `saveOrUpdate` može da bude trivijalno napisana, baš kao što se predlaže svuda, s tom razlikom da se stavi da je "ponovljiva". Ukoliko nastane greška u vezi sa konkurentnim zapisom, samo ponovimo funkciju. Sledeće izvršavanje ne bi trebalo da pukne; iako nema garancije da je paralelno izvršavanje došlo do `save` i konačno upisalo red u bazu. Rešenje je toliko transparentno i jednostavno, da ga ne bih odbacio, iako nije potpuno korektno. "Miriše" mi da još ima šta da se kaže, istraži, uporedi... Možda je sasvim dovoljno dobro?

Rešenje koje koristim je tkzv. `upsert` - ili `on conflict` - operacija u bazi. Svaka baza vredna pomena ima rešenje za ovaj slučaj korišćenja. Knjiški primer `upsert` je sledeći:

```sql
insert into table (...) values (...)
  on conflict on constraint constraint_name
  do update set ...
  returning id
```

Stvari ipak nisu tako jednostavne :) Za početak, često nije ni moguće konstruisati `update`, jer je potrebna nekakva biznis logika pre toga. Zatim, vredi pročitati [ovaj](https://stackoverflow.com/a/42217872/511837) sjajan odgovor na SO. Tako je, stvari uopšte nisu jednostavne. Moje rešenje koje trenutno koristim je samo:

```sql
insert into table (...) values (...)
  on conflict on constraint constraint_name
  do nothing
  returning id
```

Na ovo se nastavlja bekend kod koji završava `createIfNotExist` funkcionalnost.

Manjkavost pristupa je pisanje native sql koda. Ako si već rešio da koristiš JPA, kome je najveća [vrednost OM](https://oblac.rs/bas-bas-ne-volim-orm/), a ne R, bivaš primoran da pišeš direktan, čist SQL kod. A to nije ono što si imao na umu kada si potpisivao brak sa JPA na početku projekta.

## Kako smo došli do ovde?

Tokom jedne privatne, letnje večere u Pasadeni, izvesni Stiv Dž. je prokomentarisao:

> Kako se povećava broj korisnika, tako proizvod mora da postaje jednostavniji.

Nije toliko važno dal' sam baš prisustvovao večeri, niti da li je Stiv upotrebio reč "gluplji"; sličan rezon bi mogao da se primeni i na razvoj softvera. Danas su programski jezici i frameworci takođe proizvodi koji nam se prodaju, poput pelena, dezodoransa i magičnih kuglica za pranje veša. Ako je već tako, zašto onda ne postoji gotovo rešenje za ovaj čest problem u razvoju softvera?

Drugo zapažanje je u vezi našeg mentalnog modela razumevanja problema. Naučeni smo na `if`-`else` način razmišljanja; zapušeni algoritmima od mladosti i Guglovih besmislenih razgovora za posao. Taj konstrukt se ne preslikava lepo u skalabilna softverska rešenja. Možda je vreme da počnemo da razmišljamo na drugi način? Da pređemo na `with`-`do` način razmišljanja? Samo ideja 🤷‍♂️.
