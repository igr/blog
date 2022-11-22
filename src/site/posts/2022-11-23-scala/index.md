---
title: "Scala je..."
date: 2022-11-23T01:07:03+00:00
categories:
  - Razvoj
tag:
  - skala
  - razvoj
  - programiranje
---

...kul.

---- 

Ova izjava potire [prethodnu](https://oblac.rs/vise-ne-biram-skalu/). To je okej; učimo, pa se menjamo.

Obično kažu da nema smisla koristiti Skalu kao prostu zamenu za Javu. Zanimljivo; pitam se - zašto ne? Sam jezik ima dovoljno prednosti da se može koristiti kao zamena. Da, propušta se mnogo toga; no ono što ne znaš ti i ne nedostaje. Nisam ljubitelj takvog narativa.

## Efekti

Čiste funkcije su divne: isti ulaz uvek da isti rezultat. To dozvoljava kombinovanje, zamenu funkcije rezultatom, drugom funkcijom. Nečiste funkcije nisu lepe, [inficiraju](https://oblac.rs/boje-koda/#boje) upotrebu; ali su neophodne. Nazivam ih side-effectima; što nije potpuno ispravno, ali je meni tako jasnije.

Da bi se izborili sa postrance-efektima, guramo ih u kontejner. Kontajner postane nosioc funkcije; njen zapis, specifikacija. Kontejneri ne izvršavaju funkciju. Kontejneri se međusobno kombinuju. Kontejner je monad.

Svi postrance-efekti se guraju u monad. Koji? Mora da postoji jedan koji će enkapsulirati izvršavanje. Takav se tradicionalno zove `IO` monad. Pošto imamo jedan, moguće je kombinovati ih.

Za razliku od Haskela, Scala nema IO monad ugrađen u sam jezik. Služimo se implementacijama. Jedna dolazi iz Cats Effect biblioteke.

Pisanje programa je pisanje specifikacije, a ne izvršnog koda. Specifikacija može, ali i ne mora da se izvrši.

## Type i Data tipova

Cats biblioteka donosi i implementacije Type i Data tipova. Pomenuti Monad; pa Either, State, itd su tek neke koje želimo da koristimo. Dodatno obogaćuje sintaksu i olakšava pisanje implicitima.

## Tag Types

Ne želimo da sve bude `String` ili `Int`. `BookId` nije isto što i `UserId`. Aliasi pomažu, ali esencijalno ne menjaju stanje stvari. Zato pravimo nove tipove koji imaju referencu na drugi, osnovni tip.


## Primer
Čitamo ENV varijable. Čitamo XML fajlove koji opisuju gradove. Parsiramo XML u objekte. Za svaki grad pozivamo HTTP poziv koji dovlači dodatne podatke. Spajamo ove podatke u jedan JSON. Pišemo JSON nazad u fajlove.

Biramo implementaciju HTTP klijenta, blokirajuću ili async.

[Github primer](https://github.com/igr/citycatz)