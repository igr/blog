---
title: Tezej protiv Minotaura
date: 2018-12-02T19:00:00+00:00
slug: tezej-protiv-minotaura
categories:
  - Razvoj
tag:
  - razvoj
  - programiranje
  - izazov
  - edukacija
---

U praksi se retko susrećemo sa pravim programerskim izazovima. Zato ponekada izazivam sebe programerskim zadacima i problemima. Takav jedan problem je zadatak iz finala [ACM](https://en.wikipedia.org/wiki/International_Collegiate_Programming_Contest) takmičenja iz 1995: Tezej i Minotaur jure jedan drugog po lavirintu. Ovaj put, međutim, ne želim da se bavim logičkim rešenjem već primenjenim principima: namera mi je bila da rešenje bude što... čitljivije (bolje?).

<!--more-->

Sledi tekst zadatka:

> The maze is a series of caverns connected by passages. Theseus managed to smuggle into the labyrinth with him a supply of candles and a small tube of phosphorescent paint with which he could mark his way, or, more specifically, the exits he used. He knew that he would be lowered into a passage between two caverns, and that if he could find and kill the Minotaur he would be set free. His intended strategy was to move cautiously along a passage until he came to a cavern and then turn right (he was left-handed and wished to keep his sword away from the wall) and feel his way around the edge of the cavern until he came to an exit. If this was unmarked, he would mark it and enter it; if it was marked he would ignore it and continue around the cavern. If he heard the Minotaur in a cavern with him, he would light a candle and kill the Minotaur, since the Minotaur would be blinded by the light. If, however, he met the Minotaur in a passage he would be in trouble, since the size of the passage would restrict his movements and he would be unable to either light a candle or fight adequately. When he entered a cavern that had been previously entered by the Minotaur he would light a candle and leave it there and then turn right (as usual) but take the Minotaur’s exit.
>
> In the meantime, the Minotaur was also searching for Theseus. He was bigger and slower-moving but he knew the caverns well and hence, unlikely as it may seem, every time he emerged from a passage into a cavern, so did Theseus, albeit usually in a different one. The Minotaur turned left when he entered a cavern and traveled clockwise around it until he came to an unmarked (by him) exit, at which point he would mark it and take it. If he sensed that the cavern he was about to enter had a candle burning in it, he would turn and flee back up the passage he had just used, arriving back at the previous cavern to complete his ‘turn.’

Ostatak zadatka se bavi opisom formata ulaza, što ovde nije bitno; celokupan tekst i primer se mogu pronaći na netu.

## Rešenje

Kao što sam napomenuo, želeo sam da rešenje bude razumljivo na prvi pogled. Evo ga:

```java
public void solvePuzzle() {
    while(true) {
        if (minotaur.senseCandleInNextCavern()) {
            minotaur.turnBack();
        }

        minotaur.enterCavern();
        theseus.enterCavern();

        theseus.lightCandleAndPutInCavern();

        if (theseus.killIfInCavern(minotaur)) {
            printMinotaurKill();
            break;
        }

        minotaur.enterLeftUnvisitedPassage();
        theseus.enterRightUnvisitedPassage();

        if (minotaur.killIfInPassage(theseus)) {
            printTheseusKill();
            break;
        }
    }
}
```

Kako vam se čini?

Ceo kod je dostupan [ovde](https://github.com/igr/void/tree/master/src/main/java/challenge/theseusvsminotaur).

## Šta sam primenio?

Osnovni koncept rešenja je da napravim domenski jezik. U redu, ovde nisam zaista pravio novi jezik; ali sam koristio domenske izraze - iz teksta problema - što sam vernije mogao. Ovo je možda najvažnija stvar koju treba zapamtiti. Jednostavno sam uzeo da čitam tekst i pisao gornje linije bukvalno kako je tekst navodio, prvo za Tezeja, a zatim za Minotaura. Jedini deo koji je različit od teksta - tačnije, koji nedostaje u gornjem ispisu koda rešenja - je deo oko označavanja prethodno prođenih prolaza. Suština je ipak tu, u `unvisited` imenima metoda.

Druga stvar koju sam koristio je provera stanja. Dugo sam razmišljao i pokušava da napravim kod koji _ne dozvoljava_ programeru da koristi aktere i objekte na pogrešan način. Na primer, takvim kodom prosto ne bi moglo da se napiše da Tezej uđe u pećinu dva puta. Nažalost, programski jezici su ograničenih mogućnosti; Java zaostaje za modernim jezicima, te tako nešto napraviti nije lako ili bi zahtevalo značajno puno koda. Odustao sam od toga i zamenio _compile-time_ pravila sa _run-time_ proverama stanja: iako je moguće dva puta uzastopce pozvati `theseus.enterCavern()`, takav kod će baciti izuzetak.

Idemo dalje: po neka metoda vraća (ozloglašeni) `Optional`, pošto stanje ne garantuje postojanje rezultata. Skrenuo bih pažnju na njegovu upotrebu - ni u jednom slučaju nisam koristio `get()` ili `isPresent()` metode! Smatram da te metode ne trebaju da postoje, te ih i ne koristim.

## Šta mi se ne sviđa?

Najviše mi se ne dopada to što se isti objekti koriste u različitim fazama: za kreiranje strukture lavirinta i potom za rešavanje. Zato `Cavern` klasa ima metodu `addPassage()`, a `Maze` ima `connectCaverns()`. Prvi slučaj od ova dva mi teže pada; no u ovom trenutku nisam siguran kako bih to promenio, pošto je nemoguće kreirati `Passage` i `Cavern` nezavisno jedan od drugog.

Druga stvar je već opisana - programer mora sam, ručno, da proverava stanje, da bi bio siguran da će sve raditi u _run-time_, pošto je trenutna pozicija naših heroja opisana sa 4 promenljive. No, ako ništa drugo, ovo se ublažava testovima.

## Da li može drugačije?

Dolazim do dela koji me najviše zanima: da li je moguće ovaj kod napisati drugačije? Naravno, ne mislim na razlike u ličnom načinu pisanja koda; neko će metode zvati drugačije, organizovati memoriju na neki malo drugačiji način... no i dalje ćemo ostati na istom.

Da tek zagolicam maštu: pokušavao sam da koristim _immutable_ data klase, nije bilo uspešno. Da li možda treba da "okrenemo" pozive:

```java
...
enterCavern(minotaur);
enterCavern(theseus);
...
```

Ili pak da naši heroji budu svesni logike pokreta i da imaju metodu `runNextStep()` koja će izvršiti sledeću akciju koga god ona bila (paljenje sveće, pomeranje, ubijanje...)? Ili...

Zato želim da uputim izazov na izazov: da li može da se napravi _značajno_ drugačije rešenje, koje bi bilo... bolje (ma šta to značilo)?
