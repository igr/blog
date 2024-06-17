---
title: "Imenovanje namera i interpretacija"
date: 2024-06-17T01:06:08+00:00
slug: imenovanje-namera-i-interpretacija
description: >
  Početak mudrosti je nazvati stvari njihovim pravim imenom.
---

> Početak mudrosti je nazvati stvari njihovim pravim imenom.

(Konfučije.)

Da krenemo od primera, funkcije koja šalje mejl. Verovatno bi je nazvali:

```kotlin
fun sendEmail(nekiMejlArgs...)
```

Naziv funkcije otkriva svoju _nameru_ (intent), koja je prilično jasna. Ako upotrebimo kognitivni pritisak, `sendEmail` teško da može da se razume na mnogo drugačijih načina. (Za potrebe teksta izostavljam rezonovanje koji _tip_ mejla šaljemo, pretpostavljamo da je samo jedan za ceo sistem.)

Dolazi do promene. Slanje mejla treba da se odgodi, jer ne želimo da blokira tekući posao (working thread), kao i da omogućimo bolji način odgovora na greške u slanju, uvedemo ponavljanje itd. Drugim rečima, uvodimo uobičajen pozadinski posao koji će se baviti samo slanjem mejla. Ova promena zahteva i novi argument koji će omogućiti funkciji rad sa bazom, u kojoj sada čuvamo sadržaj mejla za kasniju obradu. Funkcija postaje:

```kt
fun sendEmail(nekiMejlArgs..., nekiDbArgs...)
```

Da li menjamo ime funkcije? Da li se promenila _namera_ funkcije?

**Polyvisum** (lat. poly - mnogo, visum - pogled) je termin koji  sam izmislo za ovakve slučajeve. Slobodni ste da ga koristite ako obećate da ćete mi kupiti kafu. Reč je o različitim pogledima na isto.

Namera programera _korisnika_ funkcije jeste da pošalje mejl. Njega briga da li se mejl šalje odmah ili kasnije - to je cela suština enkapsulacije. Programer razmišlja: želim da okinem slanje mejla i vratim kognitivni fokus na ostatak biznis logike.

S druge strane, to nije ono šta funcija zaista _radi_. Ime funkcije je ne opisuje precizno. Otvara mesta nedoumici - da li se mejl poslao ili nije?

Ima li tačnog odgovora? Da. Ime funkcije se **mora promeniti**. Ime funkcije mora da precizno označava šta funkcija radi:

```kt
fun scheduleEmail(....)
```

Šta je sa namerom korisnika funkcije? Ona ostaje nepromenjena. Međutim, njegova namera je namera upotrebe, namera u biznis kontekstu, a na namera funkcije. To su _različite namere_. Zato je autor funkcije dužan da nazove stvari _kakve jesu_.

Savet oko imenovanja koji se često čuje je da treba opisati nameru. Smatram da je ovaj savet nejasan, iako je namera saveta korektna (igra reči na delu). Umesto bih radije rekao:

> Nazovi stvari svojim imenom, kakve jesu.

(Nije Konfučije.)

Ispada da nije lako formulisati i savete i pravila.

## Interpretacije

Saveta za dobro imenovanje ima posvuda, neću ih ovde ponavljati. Ipak, postoji aspekt o kome ne vidim da se puno priča.

Naime, isti domenski entitet se predstavlja na različite načine u softverskom sistemu, ima više _interpretacija_, zavisno od mesta upotrebe (polyvisum). Knjiga u softverskom sistemu biblioteke na jednom mestu može samo biti ime knjige i ISBN; na drugom ime knjige, autora, godina izdanja; na trećem mestu je ID knjige sa svim rezervacijama... Sve vreme je u pitanju isti entitet, samo je njegova interpretacija drugačija.

Dalje, ista interpretacija može imati različite _namene_. Kako prolazi kroz slojeve, tako se jedna interpretacija menja. Na API sloju, ona ima samo primitivne tipove, na primer. U repozitorijumu može imati dodatne meta-podatke ili pak biti mutabilna (zbog primitivnog alata za rad sa bazom). Na trećem mestu ona se enkoduje kao gRPC poruka. Dakle, ista interpretacija entiteta može da ima različite namene.

U pitanju je trodimenzionalni problem, problem tri tela. Reč je o trojci: (Entitet, Interpretacija, Namena). Problem je kada ova tri ortogonalna naziva, dakle, ortogonalne informacije stapamo u nekakva imena koja ne govore mnogo.

Ne postoje nikakvi saveti kako bi ispravno imenovali ovakav trojac - ruku na srce, retko ko o tome priča, kao da svi koristimo samo jedan "božanski" `Book` data tip koji sadrži sve što nam ikada zatreba u vezi knjige (od viška glava ne boli, jelte), i njega delimo sa svim modulima. Takav božanski enitet sadrži i podatke o mapirajnju na bazu, i o serijalizaciji, validaciji, sve asocijacije... Tu i tamo smo naučeni da nalepimo sufikse kao što su `Request`, `Response`, `DTO` (posebno glup), `Value Object` (wtf!?), `Entity`, `Record`... koji se i dalje koriste proizvoljno, prema nahođenju. Ne postoji nikakva standardizacija imenovanja.

Jedna od ideja mi je da se imenski trojac razdvaja donjom crtom: `Book_QuickList_Request`, `Book_Storage_Entity`, `Book_Reservations`... Ovo nemojte da pominjete na razgovoru za posao.

## Govorni jezik

Kada pričamo o imenovanju, ne možemo da izostavimo karakteristike govornog jezika kojim se služimo. Treba imati na umu da je govorni jezik inherentno neprecizan kako bi brzo preneo podatke, računajući da primalac poruke poseduje slično iskustvo i znanje kao pošaljilac.

Trebalo bi da radimo na preciziranju i razješnjenju pojmova i termina. Jedan od takvih vokabulara već postoji: [RFC 2119](https://oblac.rs/2119/). On nije dovoljan, treba nam značajno napredniji pojmovnik. On bi precizirao pojmove koji se različito shvataju, bez da zadire u politiku problema. Zicer primer su geteri - ukoliko metoda `getFoo()` ne vraća instancu na `foo` i ništa više, onda nije geter i mora joj se promeniti ime. Ili: imenovati operacija u određenim slojevima: kada se koristi `add`, a kada `create`, `find` može da vrati i nepostojeći podatak, a `findExisting` mora da vrati postojeći (u suprotnom je izuzetak). DDD, ako ništa drugo, uvodi takav jedan vokabular. Naravno, otišli bi i dalje, na fraze i izraze u govornom jeziku, kojim prenosimo namere zahteva koje treba implementirati. Primera radi, reč `lift` ima 13 različitih značenja kao glagol i 8 različitih značenja kao imenica. Ako dodamo na to da engleski jezik (de-facto standard programiranja) nije maternji većini programera... zaključite sami.

Avionska industrija obično prednjači sa implementacijom dobrih praksi. Takav jedan standard već postoji: SIMPLIFIED TECHNICAL ENGLISH [ASD-STE100](https://asd-ste100.org) (Dejane, hvala za referencu!). Pomenuti standard započinje fotografijom pravilima Džordža Orvela, kao i sledećom notom:

> If you simplify your English, you are freed from the worst follies of orthodoxy... And when you make a stupid remark its stupidity will be obvious, even to yourself.

Da završim: ustanovili smo da je imenovanje problem, i, evo, već godinama ponavljamo isto. Šta radimo da to promenimo?
