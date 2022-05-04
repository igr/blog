---
title: "Dan kada sam ignorisao loš kod"
date: 2022-05-04T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - tim
  - kvalitet
  - firma
---

Prvo da postavim kulise: velika firma, mnoštvo timova. Jedan od zadataka je integracija sa novim spoljnim sistemom, trećom stranom. Deo integracije zahteva pisanje malog servisa koji periodično dostavlja potrebne podatke.

<!--more-->

Moj zadatak je da ucrtam put ove migracije; sudelujem u komunikaciji sa dobavljačem i lokalnim timovima. Odgovornost implementacije nije na meni; predlažem šta treba, ali ne i kako.

Sticajem okolnosti, zapada mi da se pozabavim implementacijom. Firma je inertna usled veličine, ne uspeva - ili nema takav način rada - da pronađe osobu koja bi preuzela _odgovornost_ za razvoj komponente. Kako se sve ne bi odužilo, samoinicijativno pomažem razvoj kada negde zapne. Izolovano, minimalnim izmenama, svega par puta sam "silazio" u kod.

_Odgovornost_ je odličan oblik razumevanja šta bi ko trebalo da radi. Ne možemo svi raditi sve. Ne možemo se ni mešati u radne procese drugih, sve da i imamo ideju kako može bolje.

Odgovornost je isto što i imati _poštovanje_ i dati _poverenje_ drugoj osobi.

## Ignorisanje == prihvatanje

Pomenuti servis radi posao. Kod, s druge strane, je slabog kvaliteta. Da ne bude zabune: kod je objektivno, bez ikakvog preterivanja ili upliva ličnih uverenja, nezreo: mešavina koncepata, mala kohezija komponenti; svašta nešto je tu "mirisalo". Takođe, ne mislim da je autor kriv (zapravo, i ne tražim krivca); uradio je kako je umeo, verujem, na najbolji način.

Šta sam uradio povodom toga?

Baš ništa. I to je OK.

## Putem kojim se ređe ide

Put do kvaliteta je da on postane deo zahteva. Time i deo razvojnog procesa.

Jer:

1. Dobar kod se neće desiti sam od sebe.
2. Razumevanje šta je dobar kod bi trebalo da dolazi sa višeg nivoa odgovornosti.

Molim da se druga stavka shvati na _najskromniji_ mogući način; implicitno prisutna hijerarhija je tu iz dva razloga. Razumevanje je subjektivno, te je potrebno poravnati zahteve; što je zadatak koji prevazilazi jedan tim. Slično, odgovornost za (ono što smo se složili da je) dobar kod nije samo na proizvođaču koda, već prevazilazi (čak i) tim.