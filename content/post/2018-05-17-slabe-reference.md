---
title: Slabe reference
date: 2018-05-17T09:53:22+00:00
slug: slabe-reference
categories:
  - Razvoj
tags:
  - gc
  - java
  - razvoj
  - reference
  - vm
---

Zgodno je znati za slabe (_weak_) reference u Javi.

<!--more-->

Kada se instancira objekat, on zauzme mesto u (_heap_) memoriji, a na njega ukazuje referenca koja se dodeljuje programskoj varijabli. Ovakve reference se nazivaju _jake_ reference. Reference imaju veze sa načinom rada GC-a (_garbage collector_); on periodično čisti memoriju od svih objekata na koje ne ukazuje ni jedna jaka reference. Drugim rečima, dok god postoji referenca na objekat, GC ga neće obrisati.

Ovo nije potpuno tačno: moraju se uzeti u obzir i lanci uvezanih objekata. Zato se definiše tkzv. osnovni skup referenci koga čine sve reference aktivne u određenom momentu rada programa. Ovaj skup određuje da li je neki objekat _jako dostupan_: ukoliko postoji putanja do objekta počeviši od reference iz ovog osnovnog skupa, on je jako dostupan - te ga GC zaobilazi.

Pored jakih referenci, Java poznaje _soft_, _weak_ i _phantom_ reference; ovde su date po "jačini" od jačih ka slabijima. U praksi ima smisla koristiti slabe reference. One menjaju prethodnu sliku na sledeći način: ako je neki objekat dostupan samo preko slabih referenci, onda nije jako dostupan, a objekat na koji ukazuju postaje kandidat za GC. Ukoliko, pak, postoji bar jedna jaka referenca koja ukazuje na objekat, on neće biti uklonjen. Drugim rečima, objekat na koje ukazuju slabe reference će biti uklonjen čim nestanu jake reference na njega.

Sledeći dijagram oslikava rečeno:

![](vm2.jpg)

Crvenim su označeni nedostupni objekti, kandidati za GC. Plavim su označeni jako dostupni objekti. Osenčeni objekti predstavljaju slabe reference. Sivim su označeni objekti koji su slabo dostupni, jer nema putanje kroz koju bi bili jako dostupni; i oni su kandidati za GC.

Objekat označen sa `x` je jako dostupan jer postoji bar jedna putanja sačinjena od jakih referenci. Pored te jake reference, na ovaj objekat ukazuje i slaba referenca, kao i jedan odbačeni (crveni) objekat. Ako bi nestala jaka referenca, objekat `x` bi postao slabo dostupan.

## Kada koristiti slabe reference?

Slaba referenca se koristi kroz `WeakReference` _wrapper_ kojim se obuhvata ciljni objekat:

```java
Oblac oblac = new Oblac();
WeakReference<Oblac> weakOblac = new WeakReference<>(oblac);

// postoje 2 reference na objekat, jaka i slaba.
weakOblac.get();    // vraća referencu

oblac = null;       // ukidamo jedinu jaku referencu na objekat
weakOblac.get();    // posle GC vraća null
```

Slaba referenca je zgodna da se koristi kada ciljni objekat ima ograničeno vreme trajanja. Čim se detektuje da ga više nema, može se otpočeti sa nekom logikom, najčešće čišćenjem zaostatka ciljnog objekta.

Primer: pravimo gomilu taskova koje izvršava `Executor`, a za svaki task moramo sačuvati dodatne informacije. Jedan način je da ih smeštamo u mapu, gde je ključ task, a vrednost objekat sa dodatnim podacima. Nešto [ovako](https://github.com/igr/void/blob/master/src/main/java/v/o/i/d/ref/MapLeaker.java).

Šta je problem u ovom kodu? To što nakon završetka taska ostaje u mapi. Nakon nekog vremena dolazi do neizbežnog `OutOfMemoryException`:![](oom.png)

![](oom.png)

Problem bi se mogao rešiti uvođenjem posebne niti koja čisti završene taskove... ali može i lakše. Korišćenjem implementacije mape koja koristi slabe ključeve (`WeakHashMap`) problem je rešen. Čim task završi sa radom, _executor_ oslobađa jaku referencu kojom ‘zadržava’ objekat, a kako mapa koristi samo slabu referencu na njega, task biva uklonjen iz mape i iz memorije.

Uobičajeno mesto koje vidim kao kandidat za korišćenje slabih referenci su keševi - na primer keš koji za ključ koristi klase (čest primer). Ukoliko aplikacija koristi dinamičko učitavanje klasa, može doći do pretrpavanja memorije zaostalim objektima klasa koji su sada zamenjeni.