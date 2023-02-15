---
title: "Opasne veze"
date: 2023-02-15T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - programiranje
  - veze
  - baza
---

Markiza de Mertej izaziva vikonta De Valmona da zavede nevinu Sesiliju de Volanž; upuštaju se u sofisticiranu igru zavođenja i manipulacije kako bi se zabavili. Tokom igara sa svojim žrtvama, mnoge tajne veze bivaju isprepletane. Posledice su ozbiljne, čak i smrtonosne.

<!--more-->

## Ekspozicija

Projekat ima uobičajenu hijerarhiju zaposlenih, korisnika aplikacije. Veza je modelovana atributom `reportTo` na modelu korisnika: uobičajena jednosmerna dete `->` roditelj poveznica. Korisnik zna ko mu je menadžer. Zato menadžer ne zna ni da li je menadžer, niti kome je manadžer - potreban je dodatni upit da razotkrije vezu.

## Zaplet

Informacija da li je neko menadžer je češće potrebna od toga kome je menadžer. Ima smisla da očekujemo podatak o menadžeru u istom modelu korisnika, te kao što postoji `reportTo` mogao bi da postoji nekakav atribut `isManager`.

Kako je ovaj podatak redudandan, želimo da se izračunava samo kada je potreban. Drugim rečima, ne želimo da se bavimo njime: da ga proračunavamo i upisujemo iz aplikacije, već da ga samo čitamo. Ovde se nazire i nekakvo pravilo o redudandim podacima: određivanje vrednosti se ne radi u istom sloju gde se i čita (zanimljivo). Jedan od razloga je i to što aplikacija nikada nije i jedini korisnik baze. Drugim rečima, bavimo se redudansom/kešom što bliže izvoru podataka, a čitamo ga svuda.

Jedno rešenje je view u bazi koji pored kolona korisnika vraća i kolonu sa proračunom. Uostalom, view služi za takve probleme. U ovom slučaju, međutim, nisam zadovoljan rešenjem. Aplikacija se bavi organizacijom, te se korisnici često očitavaju iz baze, pa se i view često koristi. Da podsetim, view je virtuelna tabela i podaci se neprestano nanovo izračunavaju. Iako se trudim da izbegavam prevremnu optimizaciju, nalazim da upotreba view nije baš rešenje koje ovde trebamo.

Sledeće rešenje je tkzv. materijalizovani view. On se fizički čuva u bazi, nema dodatnog izračunavanja pri čitanju, te nudi bolje performanse. Štos je što takav materijalizovani view moramo eksplicitno osvežavati kada nastane promena ulaznih podataka proračuna.

Iako validno rešenje, ne biram materijalizovan view zarad jedne kolone. Odlučujem se za treće rešenje - triger na tabeli korisnika. Na svakoj promeni korisnika u bazi menja se proračunata vrednost kolone korisnikovog menadžera. Odlučujem da umesto prostog `boolean` tipa (menadžer je ili ne) čuvam koliko je ljudi u timu: ukoliko ih ima, onda je i menadžer. O približno istom trošku čuvam više informacija, to je sve.

Podsećam da je odnos čitanja i izmena korisnika drastično asimetričan u korist čitanja.

## Intermeco

Pomen trigera bi izazvalo salvu uvreda desetak godina mlađeg mene. Biznis logika mora biti u kodu, vičem!

Prvo, ovde se ne bavimo nikakvim biznis pravilima. Reč je o keširanju redudandnih podataka i načinu perzistencije.

Drugo, baza je servis kao i svaki drugi. Nema razloga da ne koristimo njene pune mogućnosti. U to ime, ilustracija: u jednoj firmi nije bilo dozvoljeno koristiti (fk) ključeve za referenciranje vezanih tabela. Programeri su sami pisali kod koji proverava validnost veza između entiteta. Zabadava. Bazu treba maksimalno iskoristiti i nema tog ORM alata ili vođe projekta koji može da zahteva drugačije.

## Kulminacija

Jednostavan triger odlično radi posao, a kolona se mapira u entitet.

Ipak, nešto je drugačije:

```kt
userRepository.save(UserEntity.fromModel(user))
```

Vidite li šta?

---- 

Keš - ovaj put u frejmvorku koji radi sa bazom. Ako u istoj sesiji (čitaj: transakciji) učitamo menadžera, pa potom promenimo njegovu hijerarhiju, izmena nastala trigerom se _neće_ videti. Frejmvork nema razloga da invalidira učitani entitet menadžera; nije svestan događanja u bazi.

Ništa lepše nego kada ti testovi ukažu na ovakve probleme:)

Problem se rešava eksplicitnom invalidacijom sesije, tj. svih do sada učitanih entiteta:

```kt
userRepository.save(UserEntity.fromModel(user)).also {
  clearSession()
}
```

Brisanje keša ima uticaj na performanse; no kako su izmene korisnika značajno ređe, to nema efekat na aplikaciju.

Zamka leži na drugom mestu.

## Peripetija

Gornje linije koda su opasne. Ne postoji ama baš ništa u kodu što nas _primorava_ da ih pišemo jednu za drugom. Moramo da obratimo eksplicitnu pažnju koje sve funkcije Repo modula utiču na promenu hijerarhije, te da u njima očistimo sesiju. Napravimo ADR odluku i pohranimo je. Zatim to komuniciramo i ostatku tima, kako bi se ovo znanje perzistiralo u projekat. I ponadamo se da neko mesto nije propušteno - sada ili u budućnosti.

To je pozamašan posao. Pozamašno je i verovanje, koje se ne može lako potkrepiti testovima.

Da bi izbegli kognitivno opterećenje pronalaženja kritičnih mesta u kodu, možemo si, ipak, pomoći: wrap-ovanje je uvek rešenje;) Tako bi ovde wrapovali `Repository`; Kotlin pruža kratku sintaksu za delegiranje. Eksplicitan rad sa sesijom ostaje isključivo u wrapperu, u jednoj klasi; iako razbacan po metodama. I dalje nisi _primoran_ da kritičnu metodu overajduješ u wraperu, ali je bar znanje o izmeni izmeštena na jedno mesto.

## Rasplet

Opisana ilustracija je jedna od najopasnijih svojstava razvoja softvera: jake veze koje se ne vide.

Nastaju usled ograničenja programskih jezika i okvira. Ne možemo ih izbeći - postoje u svakom kodu. Možemo samo da se trudimo da ih izolujemo. Probamo da što više toga rešimo za vreme kompajliranja. U primitivnijim, skriptaškim sredinama, oslanjamo se na testove i religiju.

> Opasne veze su one koje se ne vide.

Pustimo sad mašti na volju: kako utkati jake veze u kod?