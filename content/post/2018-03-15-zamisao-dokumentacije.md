---
title: Zamisao dokumentacije
date: 2018-03-15T11:00:22+00:00
slug: zamisao-dokumentacije
categories:
  - Razvoj
tags:
  - agilno
  - dokumentacija
  - kvalitet
  - razvoj
---

Šta biste više voleli? A) projekat bez ikakve dokumentacije ili B) projekat sa zastarelom i neadekvatnom dokumentacijom?

Kao i većina, imao sam prilike da radim na projektima koji se prema dokumentaciji odnose dijametralno drugačije. Kod jednih je dokumentacija bila efemeralna stvar, nešto što se piše sporadično i ne održava; kod drugih je svaka funkcionalnost zahtevala UML dijagrame (koji su se svi pisali _posle_ razvoja, ironično); treći nisu dozvoljavali ikakav komentar u sorsu; jedni su opet insistirali na potpunoj dokumentaciji sorsa do najsitnijih detalja. Zajedniči sadržilaca mog iskustva je da je dokumentacija uvek bila u drugom planu. Kao i da je to uvek imalo negativnu posledicu po razvoj projekta, kad-tad.

Ali da se vratimo korak nazad.

## Zašto Pišemo Dokumentaciju?

Dokumentacija, u najširem smislu, predstavlja materijal napisan ljudima razumljivim jezikom koji objašnjava ono na šta se odnosi: ciljeve projekta, zahteve, sors, infrastukturu itd. Dugo sam razmišljao o tome zašto nam je dokumentacija zapravo neophodna. Jer, složiće te se, komputerski sistem može da postoji i obavlja svoju svrhu bez dokumentacije; dokumentacija nije neophodna za funkcionisanje sistema.

Voleo bih da je neko poznati izjavio sledeće:

> Dokumentacija služi da nadomesti nedostatak komunikacije.

Da objasnim.

Programski kod, korisnički interfejs, infrastruktura... svi na neki način komuniciraju sa ljudskom jedinkom na drugom kraju. Kod govori sintaksom programskog jezika, korisnički interfejs govori vizuelnim simbolima i tekstom... S obzirom da je ova komunikacija prema mašinama, daleko od toga da je savršena. Zapravo, često je vrlo ograničena. S druge strane sistemi mogu biti kompleksni za objasniti ih čak i ljudskim jezikom. Nastaje nepremostivi ponor koji se ogleda kao nedostatak _razumevanja_. Sistem sam za sebe postaje nedovoljan za razumevanje. Potrebno ga je objasniti.

I to je upravo ono što je svrha dokumentacije.

U redu, dokumentacija je neophodna. Ali koliko dokumentacije treba praviti?

## Pragmatična Dokumentacija

Najvažnije pitanje je upravo ovo - šta je pragmatična dokumentacija? Osim sada već klasičnih pristupa (korišćenje UML ili pisanje priručnika) postoji ideja da se dokumentacija podeli u celine prema tome čime se bavi. Tako, na primer, postoje [šabloni](http://arc42.org/overview/) po kojima se dokumentacija deli na ciljeve, ograničenja sistema, kontekst itd. Svaka celina dokumentuje jedan pogleda na arhitekturu i proizvod.

Pristup je svakako zanimljiv, a šabloni znaju biti korisni. S druge strane, ovakav pristup zna da proizvede mnogo više dokumentacije nego što je zaista potrebno. Granica između premalo i premnogo dokumentacije opčinjava, a pokazuje se da je teško naći “pravu meru”.

Možda gornja misao može da pomogne. Ukoliko dokumentaciju posmatramo kao nešto što treba da nadomesti nedostatak komunikacije, ostaje zapravo pronaći gde je taj nedostatak! Na primer, ako korisnički interfejs i pored svih vizuelnih obrazaca ne uspeva da korisniku komunicira šta se dešava, potrebna je dokumentacija da to objasi. Ukoliko kod i pored sveg pravilnog imenovanja i svih obrazaca ne uspeva da relativno brzo saopšti namenu, potrebna je dokumentacija u kodu i/ili van njega. Ukoliko projekat ne uspeva da isprati standarde za pokretanje i bildovanje sistema, potreban je dokument koji to opisuje. S druge strane, ukoliko interfejs jasno govori o nameri, ne treba vam ništa više (kada ste poslednji put čitali dokumentaciju za igricu na telefonu?). Standardi u postavljanju infrastrukture i koda upravo smanjuju potrebu za dokumentacijom, jer je ona jasna ili podrazumevana.

## Documentation Driven Development

Pitam se, dalje - zašto ne postoji “_Document Driven Development_”? Ako se povuče paralela sa TDD, to bi bio razvoj u kome bi 1) dokumentacija bila pisana prva i 2) dokumentacija mogla da se automatski proverava. Druga tačka je izazov, ali ne i nemoguć. Primera radi, svi primeri u [Gradle](https://gradle.org/docs/) dokumentaciji su deo koda koji se testira. To znači da se ne može desiti da dokumentacija sadrži kod koji nije aktuelan ili je neispravan. Dalje razmišljanje na tu temu mogu da budu funkcionalni testovi. Nije teško zamisliti alat koji parsira ljudski jezik dokumentacije od čega pravi funkcionalni test sistema - ili pak obratno: da domenski jezik testa bude blizak ljudskom.

Kako bilo, vreme je da dokumentacija prestane da bude samo puki tekst i postane punopravi artifakt kompjuterskog sistema.