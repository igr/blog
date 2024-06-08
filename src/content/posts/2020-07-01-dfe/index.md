---
title: "DFE FTW!"
date: 2020-07-01T01:07:03+00:00
slug: dfe-ftw
description: >
  Precvetali svet razvoja softvera kao da je fanatično opsednut efikasnošću i rapidnom proizvodnjom; sve dok neko, kao u onoj priči, ne poviče "Car je go" i ukaže na višak priče, a manjak rezultata. U vezi toga postoji jedna važna praksa za koju se, koliko uočavam, slabo mari: DFE.
---

Precvetali svet razvoja softvera kao da je fanatično opsednut efikasnošću i rapidnom proizvodnjom; sve dok neko, kao u onoj priči, ne poviče "Car je go" i ukaže na višak priče, a manjak rezultata. U vezi toga postoji jedna važna praksa za koju se, koliko uočavam, slabo mari: `DFE`.

To nije nešto što se uči na agilnim kursevima. Nije glamurozna tema o kojoj bi se pisalo. Ova praksa se pretpostavlja i gotovo uvek zanemaruje. A to sve košta i svakodnevno nagriza (vaš) projekat.

`DFE` je akronim za **Developer-First Experience**, koji se definiše kao:

> Dužnost rukovodilaca projekata je da uklanja sve nedoumice koje programer susreće tokom rada. Projekat treba da bude podešen isključivo prema programeru.

## Nedoumice

Svaki put kada programer prekine svoj _tok_ da bi radio nešto što nije programiranje je, u suštini, dvojako gubljenje vremena: i njegovog i projektnog.

U pitanju je specifičan problem _komunikacije_. Pored koda, kao sredstvo komunikacije između članova tima služi i samo projektno okuženje. Svi se slažemo da kod treba održavati, refaktorisati; na isti način neprestano treba raditi na projektnom okruženju.

Šta ovo znači u praksi? Mnogo toga. Projekat mora da može da se otvori u bilo kom programerskom okruženju (IDE) odmah nakon preuzimanja. Slično je i sa pokretanjem projekta - podrazumevana podešavanja moraju da budu podešena za lokalni razvoj. Svi neophodni servisi se moraju startovati jednom skriptom, čije ime jasno ukazuje šta radi. Nema `run.sh`. Nema konfiguracije "iz vedra neba" koju treba dodati da bi sve lokalno proradilo. Obriši `README.md`; da li se sada snalaziš?

Dalje: svi logovi, greške, izveštaji, dokumentacija, podešavanja moraju da budu jasno dostupna na jednom i samo jednom mestu, u okviru projekta. CI/CD mora da postavlja rezultate jasno i ujednačeno da bi im se pristupalo na identičan način, bez obzira na servis. Automatizacija ne prestaje sa uspešnim bildom projekta.

Dalje: mora postojati pristup svakom delu sistema u radnom i testnom okruženju (tkzv. dev/test environment). Svako mora da bude u mogućnosti da ponovi bilo koji scenario i da se zakače na servis na bilo kom portu. Aplikacija mora da ima admin konzolu koja daje brze informacije (stanje sistema, ssh pristup, varijable...). Postavljanje nove verzije servisa mora da bude jedan korak; koji - ne mogu ovo dovoljno jako da naglasim: mora da traje **što kraće**.

A tek kod: mora da obiluje informacijama, ne samo u sorsu (o čemu već toliko i pričamo), već i u runtime-u (o čemu manje pričamo). Pravilno logovanje, verifikacija ulaza, nedvosmisleno mesto greške... pragmatična detaljnost nije mana.

## Zavaravanje

Mnogi će reći da sve ovo već imaju. Može i izgledati da je ovo o čemu pišem trivijalno. Ah, nije tako.

Projekat podešen na takav način da ne ostavlja nikakvu nedoumicu, prazan hod, nepotrebno čekanje... nisam imao prilike da susretnem često. Obično se sve završi na nekakvom `README.md` ili wikiju, u klinču između neophodnosti da sve bude jednostavno i, s druge strane, potrebe dokumentacije da bude detaljna i sveobuhvatna. Srećno s time. Nekada i postoji namera da sve bude kako treba koja se završava na početnom podešavanju. Nadalje se više niko ne bavi projektom, ili, još grđe, svi se bave istim, te se informacije krpe ili dele pogrešnim kanalima.

Da ponovim ideju iz uvoda: fiksirani na rešenja iz susednog dvorišta, ostavljamo sopstvenu baštu neoplevljenu.

# DFE!

Lakmus test je novi programer na projektu: koliko mu vremena treba da pronađe grešku na poslednjem testu, pokrene projekat lokalno od nule i krene da kodira, bez ikakve konsultacije sa timom. Prolazi li tvoj projekat ovaj test?

DFE je nešto na čemu se neprestano radi, kako projekat raste i usložnjava se. Neprestano. Dobro je osluškivati kanale svakodnevne komunikacije tima za temama koje ih usporavaju: svaki put kada neko pita "kako da uradim...", "gde se ono nalaze...", je trenutak za primenu DFE.

Dozvoljeno je biti kreativan. Gde je taj AI i mašinsko učenje koji prepoznaju mačke ili generišu kvazi-umetničke sadržaje? Dobrodošao je kod mene u baštu, ima tooooliko pleve.
