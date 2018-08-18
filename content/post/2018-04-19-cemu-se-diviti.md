---
title: Čemu se diviti
date: 2018-04-19T11:11:22+00:00
slug: cemu-se-diviti
categories:
  - Razvoj
tags:
  - ideal
  - primer
  - razvoj
  - sistemi
---

Postoji jedan primer softverskog sistema - ne znam bolji naziv koji uključuje i razvoj i procedure i infrastrukturu - koji me ne ostavlja ravnodušnim. Šta više, izdvojio sam jedan pasus izveštaja o prestanku rada tog sistema i njega držim kao podsetnik kako bi stvari trebalo da izgledaju. Te reči su mi uzor i vodilja. Daju nadu da je moguće dostići vanredno.

<!--more-->

Jula 2016. došlo je do prekida rada tog sistema usled softverske greške. [Izveštaj o incidentu](http://stackstatus.net/post/147710624694/outage-postmortem-july-20-2016) počinje ovim pasusom:

> On July 20, 2016 we experienced a 34 minute outage starting at 14:44 UTC. It took 10 minutes to identify the cause, 14 minutes to write the code to fix it, and 10 minutes to roll out the fix to a point where Stack Overflow became available again.

Koliko ovo... ostavlja bez daha?

Šta ove rečenice govore? Mnogo toga. Prvo, postoji odličan monitoring sistema, koji je pravovremeno obavestio o kriznoj situaciji. Izveštavanje o grešci mora da je efikasno, jer je brzo ustanovljeno gde je problem. Razvojno okruženje je očigledno lagano (_lightweight_), jer se ispravka brzo implementirala. Konačno - puštanje ispravke na produkciju, koja sigurno prolazi kroz kojekakve procedure (CI) - teče besprekorno.

Voleo bih da je moj bajtkod deo sistema koji radi _ovako_ uigrano.

Svaka čast, _Stack Overflow_.