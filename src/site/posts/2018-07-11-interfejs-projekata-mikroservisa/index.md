---
title: Interfejs projekata mikroservisa
date: 2018-07-11T09:58:58+00:00
slug: interfejs-projekata-mikroservisa
categories:
  - Razvoj
  - Saveti
tags:
  - make
  - mikroservisi
  - organizacija
  - projekat
  - razvoj
  - savet
---

Mikroservisna arhitektura je karakteristična po tome da se kod za svaki mikroservis drži odvojeno: u zasebnom repozitoriju (_multi-repo_) ili u istom, ali zasebnim modulima (_mono-repo_).

<!--more-->

Svaki mikroservis **mora** da bude nezavisan! Ceo _lifecycle_ mikroservisa mora da se postoji zasebno od drugih mikroservisa. Ovo je naročito važno za razvoj - pogotovo onih komponenti koje se nalaze u sredini niza zavisnosti. U toku razvoja se obavezno javlja potreba za modifikovanjem zavisnih mikroservisa (_downstream dependency_), ili onih koji zavise od onog na kojem se radi _(upstream_ dependency). Potrebno je umeti napraviti i pokrenuti 'tuđi' mikroservis, promeniti verziju, objaviti snapshot verziju i sl. Pokazuje se da je ovo ozbiljan problem koji se često ne adresira na pravi način.

Lepota mikroservisa je sloboda u razvoju. Svaki mikroservis može da koristi koju god tehnologiju za kompajliranje, razvoj i sl. Problem je u tome što drugi timovi ne znaju - i ne trebaju da znaju - kako da koriste te druge tehnologije u kojima nisu vični. Ponavljam: ne treba da znaju. Kako onda očekivati da pokrenu tuđi mikroservis?

Rešenje je jednostavno. Svaki mikroservis **mora** da ima jedinstveni interfejs za korišćenje. Koji god mikroservis da izabere, tim mora da na _potpuni isti način_ pokrene, kompajlira, testira, objavi artifakte...

Jedno rešenje je korišćenje bash skripti istih imena u svakom projektu. Mana je što broj skripti može da poraste i što su vezane za platformu. Rešenje koje više volim je `make`. Reč je o dokazanom build-alatu koji postoji na svim platformama. `Make` je moćan alat, no za ovu svrhu name treba samo osnovno: `.PHONY` targeti i komande koje se izvršavaju. Sve je sadržano u jednom `Makefile` koji se nalazi u osnovnom folderu mirkoservisa.

Mali trik koji može značajno da poboljša svakodnevno iskustvo programera.