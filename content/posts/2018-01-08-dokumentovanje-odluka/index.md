---
title: Dokumentovanje odluka
date: 2018-01-08T23:48:22+00:00
slug: dokumentovanje-odluka
categories:
  - Razvoj
tags:
  - arhitektura
  - dokumentacija
  - komunikacija
  - razvoj
---

Dokumentacija projekta je vragolasta drugarica: kada nam ne treba, ima je previše; kada nam zatreba, ima je premalo. O dokumentaciji je puno toga već dokumentovano (eto šale): od toga kako se komentariše kod, do postojanja jezika kojim se opisuju softverski sistem.

<!--more-->

U svemu tome postoji vrsta dokumentacije koja je važna, a nisam imao prilike da vidim da se praktikuje. Reč je o dokumentovanju _odluka_ u vezi arhitekture sistema. Dakle, ne same aktuelne arhitekture, već odluka kojima se do nje došlo.

## Odluke su deo projekta

Na svakom projektu se donosi nemali broj - definitivnih - odluka. Koje biblioteke koristiti, kako su uvezane komponente sistema, kako one komuniciraju, gde su granice modula, kakav je tok podataka... Odluke se donose i za rešavanje tehnoloških izazova koji se javljaju u toku razvoja.

Opis odluke je, pojednostavljeno, _sažeto objašnjenje zašto je nešto urađeno na jedan, a ne na neki drugi način_. Jedna takva odluka bi mogla da sadrži sledeće:

  * potreba zbog koje se odluka donosi,
  * obrazloženje izabrane odluke,
  * lista odbačenih rešenja i razloge za to,
  * primena u projektu.

Odbačena - odnosno druga razmatrana rešenja je neophodan deo dokumentovanja odluke, možda i najvažniji. Bitno je da sagledamo zašto nam neko drugo rešenje u tom trenutku nije odgovaralo. Pri tome je sasvim u redu da razlog za odbacivanje bude subjektivan; kakav kog da je, bitno je da se zabeleži svaki.

Beleženjem odluka u vezi arhitekture pomaže da sazrevamo: čini arhitekturu _uporedivom_ u okolnostima u kojima odluka važi. Matematički rečeno, odluka je _funkcija_ koja je prevela arhitekturu iz jednog oblika u drugi. Može li se arhitektura zapravo predstaviti kao... formula?

Skalirajte sada ovu zamisao. Moćno, zar ne?