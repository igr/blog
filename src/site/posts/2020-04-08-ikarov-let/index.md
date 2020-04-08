---
title: "Direktan prenos Ikarovog leta"
date: 2020-04-08T01:07:03+00:00
categories:
  - Razvoj
tag:
  - društvo
  - razvoj
  - kotlin
  - ktor
  - vue
---

Uzmite kokice, udobno se zavalite i gledajte kako razvoj jedne app kreće svoj Ikarov let ka svrsishodnosti. Da li će pohrliti ka Suncu naivnosti i razbiti se o stene neupotrebljivosti? Ili će, možda, ovaj let krenuti nekim drugim tokom?

<!--more-->

## Priprema krila

Najlakše je napraviti softver. Najteže je napraviti softver koji ima vrednost i koristi se.

Na tom putu ne postoje prečice. Dva developera ne rade dva puta brže. Dobar proizvod, jednostavno, zahteva i vreme; ma koliko iskustva imali. Proizvod nikada nije samo softver, aplikacija. On je i korisnički osećaj (UX), podrška, bekap. Proizvod je komunikacija sa klijentom, korisnicima, koja ne prestaje. Proizvod se nikada ne završava.

Svaki put kada mi neko kaže: "Hajde de, ovo su _samo_ dva ekrana; pa koliko može da ti treba vremena", samo slegnem ramenima. Više se i ne trudim da razuverim naivne. Moj lični tempo su ciklusi od 3 nedelje, dva takva minimalno. Znam šta sve treba da učinim za ovo vreme; te i koliko toga treba spremiti za produkciju. Nije malo stvari.

Kako bilo, pre dve nedelje sam uradio potpuno suprotno: rekao 'DA' projektu koga je trebalo od nule dovesti do vrednosti. Par ekrana samo, očas posla.

## Skok

Za utehu (i opravdanje), aplikacija ima humanu namenu: **besplatna psihoterapeutska pomoć** za sve kojima treba. Okuplja stručne volontere koji nude svoje termine kada su u mogućnosti da pomažu.

Kako reći "NEtflix" ovome?

Da začinim stvari, za tehnologije biram _Vue_, _Ktor_ i _Exposed_. Dozvoljavam sebi masan izazov - kao da kratak rok i to što nema konkretne pomoći nije dovoljno. Nove stvari se najbolje uče kada se koriste na pravim primerima, zar ne?

## Let

_Vue_ mi je baš legao. Mali, zaokružen, radi kako kaže da radi, solidno izgleda u Typescript-u. Pronašao sam i odličnu biblioteku komponenti: _Vuetify_, iz drugog pokušaja. Napravio sam nekakvu podelu na komponente, ekrane i okvire; i niz nekih drugih odluka za koje mislim da mogu da budu solidna i ponovljiva arhitektura sličnih aplikacija. Treba vremena za to; naročito je uzbudljivo kada linter krene da se buni oko spejsa u komentaru, a ti samo želiš da vidiš prokletu stranicu.

_Kotlin_ pratim od prve najave: to je Java kakva je trebalo da bude da nije završila u grotlu najneinventivnije firme na svetu. Ipak, nisu sve sami kotlinorozi na\_polju; nekada mi se čini da prosto nudi previše, te i da nisu uvek ustanovljene najbolje prakse. No, ovo je tek fus-nota, a ne zamerka. Kotlin je odlična alatka. A ako želite da se otisnete malo dalje, potražite Arrow.

_Ktor_ je logičan izbor: server koji podržava ko-rutine. Nisam ga ni osetio. Podesio, namestio, radi. Još je mlad, nedostaje mi recimo OpenAPI podrška, ali, hej, radi, hej, korutine.

_Exposed_ mi je zapao za oko jer jako liči na ono što je Jodd DbOom trebalo da bude. Ne volim R u ORM; pa sam ubrzo izbacio takvu podršku. Koristim razumljiv DSL i nije mi teško. Kada se razume ideja i sintaksa, svaki dalji rad je bio prilično jednstavan.

Ovo je tek polovina priče. Treba sve ovo uvezati na pravi način. Na bekendu gledam da ne koristim anemične servise (o tome drugi put), tu je validacija, autentikacija, uključiti testove, staviti sve u Docker, te podići app na server; a dan traje koliko traje...

## Pad?

Aplikacija je dovedena u razumno stanje za desetak dana (dva vikenda). Nažalost, za smislenu produkciju treba neko bolje okruženje od jedne-u-sve instance na Herokuu, ali time zaista ne mogu da se bavim. Količina frontend koda je takođe prerasla moje mogućnosti da se razumno bavim njime, te i tu posustajem. A na keca bih častio najvećom pizzom onoga ko bi mi podesio sitnicu u Ngnix proksiju.

S druge strane, muči me moralno pitanje, kao da hronični nedostatak sna nije dovoljan. Da li sam imao za pravo da uopšte pokušam sve ovo, ako _znam_ da nisam u mogućnosti da sam isporučim (na nivou na kome bi trebalo da bude), a _bez osnova_ se nadam konkretnoj "pusti-ja-ovo-preuzimam" pomoći? Da li se namera računa?

Prava tragi-komedija, kao što sam nagovestio. Nadam se da ste spremili dovoljno kokica, padanje kreće da bude zabavno.

https://github.com/igr/appoint.one
