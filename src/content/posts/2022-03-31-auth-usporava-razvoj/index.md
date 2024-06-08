---
title: "Auth usporava razvoj"
date: 2022-03-31T01:07:03+00:00
slug: auth-usporava-razvoj
description: >
  Sjajan način da pucaš projektu u nogu.
---

Sjajan način da pucaš projektu u nogu.

Autorizacija i autentikacija su, jasno, neophodne za svaki API. Uobičajeno se dodaju rano tokom razvoja; često je potrebno koristiti udaljene servise, te zarad toga imati potvrdu o korisniku API-ja.

Štos je u tome što uspostavljanje Auth funkcionalnosti uglavnom znači da je taj zadatak završen.

Posledica je sledeći scenario. Programer svako malo osvežava token tako što ručno poziva nekakav API, kopira token iz rezultata i prebacuje ga u API klijenta koji koristi. Nekada su tu i dodatni tokeni za različite servise (ukoliko nema S2S tokena).

Ne samo da se gubi vreme; narušava se i fokus. Programer bude potpuno udubljen u zadatak, kad, odjednom, vreme važenja tokena istekne, te mora da ponovi njegovo dobavljanja. Svaki dan, nekoliko puta, pomnoženo sa brojem dana... ne, hajde da ne radimo tako.

Auth nije programiranje. Auth je transparentna konfiguracija. I kao svaka konfiguracija, ne sme da smeta.

## Developer-friendly projekti

Auth se ne završava njegovim postavljanjem u projektu. Potrebno je napraviti i takav transparentan kod da se programeri uopšte ne bave dobavljanjima tokena, cooki-ja ili šta god da se koristi na projektu. Ujak Bob bi verovatno rekao nešto ovako:

> Programeri moraju da mogu da pozivaju API-je _bez_ ikakvih tokena, headera i bilo čega drugoga što nije isključivo vezano za bisnis logiku poziva.

Evo kako rešenje može da izgleda. Na jednom projektu sam dodao par flegova u `.env`, kojima se 1) uključuje/isključuje nekakav 'developer mod' i 2) definišu podaci o korisniku. Kada je pomenuti mod uključen, dodaje se filter pre poziva koji proverava postojanje neophodnih tokena. Ukoliko ih nema, filter sam dobavlja podatke, ubacuje ih u trenutni zahtev, i, _voila_ - dobijamo validan auth poziv. Ako token istekne, dovoljno je ponoviti zahtev. Na drugom nekom projektu, bilo je dovoljno kreirati `Principal` instance i umetnuti ih u sesiju. Ili, ukoliko želimo _potpuno_ odvajanje, dev fleg može da postane prost lokalni proksi, odvojeni modul, koji se diže samo u lokalu.

Nikakva nuklearna fizika. Samo stav da projekat **mora** da bude developer-friendly.

Pardon, ne mora. Samo košta značajno manje kada jeste.
