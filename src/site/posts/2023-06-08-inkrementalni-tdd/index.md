---
title: "Inkrementalni razvoj kao TDD projekta"
date: 2023-06-08T07:07:07+00:00
categories:
  - Razvoj
tag:
  - projekat
  - agilno
  - izmene
---

A to nije okej.

<!--more-->

"Inkrementalni" je atribut za razvoj u koracima, kako bi se održao fokus tokom jednog intervala razvoja. Rezultat takvog koraka je uvećanje vrednosti i/ili umanjenje budućih napora.

Kada se priča o razvoju u koracima, priča se i o raspoloživosti zahteva. Prilagodljiv razvoj (nije valjda agilan?) rešava ono šta je vaspostavljeno kao aksiom: ne postoje finalni zahtevi, sve se sve vreme menja. Kada je tako, razvoj u koracima je smisleni odgovor: ne može se analizirati i planirati ono šta ne postoji.

Problem je kada se iz prepostavka izvodi pravilo, bez potvrde da zahteva zaista manjka. Dešava se češće nego što bi trebalo: zahtevi koji nisu u fokusu se zanemaruju, stavljaju po strani i ne saopštavaju razvojnom timu. Negde između klijenta i razvoja se odluči ne samo šta je trenutno fokus (to je ok), već i koji sve zahtevi se vide. Priznajem, izgovori zvuče primamljivo: "štite" se programeri, ostaje jasnoća, čuva se obim trenutnog posla, piše u knjizi.

Fokus samo na trenutni korak, bez ideje o kasnijem razvoju podseća na TDD - programersku praksu koja je simpatična igračka i ništa više od toga. Obećava idilični tok razvoja: samo se fokusiraj na uvedeni test i program nastaje sam od sebe. Ispravka: najbolja verzija programa nastaje sama od sebe. Samo čitanje ovih rečenica zvuči neozbiljno (držim TDD radionice, pa se možete i sami uveriti.) Ne postoji nikakav garant niti dokaz da TDD radi.

Inkrementalni razvoj sa uskraćenim informacijama podseća na TDD. Može biti neučinkovit, a sigurno košta. Baratanje izmenama je skupa stvar. Naracija da izmene treba oberučke prihvatati izostavlja pomen cene. To ne menja stav o izmenama, ali podiže svest o implementaciji. Zaboravljamo da što manje izmena pravimo, sistem je robusniji. Dešavalo mi se da bukvalno jedna rečenica u novom zahtevu ostavi iza sebe dramatičnu izmenu koda, neočekovana pomeranja granica, novi modul. Prvobitni kod je oprezno napisan, nedostajale su ključne informacije koje su bile poznate, te da je tim imao uvid u njih na vreme izmena ne bi bila dramatična.

Da sumiram: tim za razvoj ne sme biti uskraćen informacija o zahtevima. Izmene ne možemo da predvidimo, ali bar možemo da ih sami ne stvaramo.

Evo jedne bolje prakse da zameni TDD: `DR4F`. "Dry Run 4 Fun" je opozicija: razvoj počinje na papiru, a ne u editoru. Osmišljava se arhitektura, API, uočavaju se _detalji_ koje treba implementirati. Kod se uopšte ne piše, ali sve ostalo je tu. `Dry Run` faza traje dok se ne prođu svi zahtevi i sve izmene. Nakon toga, razvoj kreće. Sve je ujedno i zabavno, jer ceo tim učestvuje. `Dry Run` se ponavlja sa svakom sledećom izmenom.

(Tražim DEV influensere za promovisanje #dr4f brenda.)

Izmislio sam toplu vodu: ovo je samo _analiza problema_ pre implementacije. To nije waterfall, nije agilno; to je [zdravorazumski](https://zdrum.work) pristup. Svakoj analizi su potrebne sve dostupne informacije. Svakom radu bi trebalo da prethodi analiza (jer [nismo umetnici](https://oblac.rs/pisanje-programa-umetnost-ili-nauka/)). Na primer, u TOGAF, tehnika koja je poznata kao "Gap analiza" upravo služi za validaciju izmena.