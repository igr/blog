---
title: Multi-Release JARs
date: 2017-12-14T13:17:22+00:00
slug: multi-release-jars
categories:
  - Razvoj
tags:
  - jar
  - java
  - java9
  - razvoj
---

Sa Javom 9 dolazi i [Multi-Release JAR Files](http://openjdk.java.net/jeps/238) specifikacija. Reč je o dodatnoj osobini JAR fajlova da podržavaju klase namenjene različitim verzijama Java platforme.

<!--more-->

Primer strukture MRJAR-a je dovoljan za razumevanje ove specifikacije:

    Foo.class
    Bar.class
    /META-INF
    	/versions
    		/9
    			/Bar.class


Kada se ovakav jar koristi na JDK koji nema podršku za MRJAR fajlove, sve će raditi na uobičajeni način: videće se samo klase u korenu arhive.

Kada se MRJAR koristi na novijem JDK (od verzije 9), dozvoljena je zamena bilo koje klase njenom novom varijantom - koja koristi nove i naprednije funkcionalnosti platforme nedostupne u prethodnim verzijama JDK. U našem primeru, klasa `Bar` biva zamenjena kada se ovakav MRJAR koristi na JDK 9.

## Priprema

Da bi napravili MRJAR, prvo se mora "uključiti" ova osobina u `MANIFEST.MF`:

    Multi-Release: true

Nakon toga, u suštini, potrebno je:

  * kompajlirati kod na staroj verziji Jave (na pr. Java 8),
  * kompajlirati unapređene varijante klasa na novoj verziji Jave (Java 9),
  * spakovati obe varijante klasa na gore prikazan način: Java 9 klase se smeštaju ispod `META-INF/versions/9` foldera.

Nažalost, nisam našao lak način da sve ovo ostvarim i automatizujem (još uvek). Za početak, jedan Gradle sub-modul se još uvek ne može tek tako kompajlirati različitim verzijama Jave. Zato sam Java 9 varijantu prosto smestio u zaseban projekat koji se kompajlira nezavisno. Imao sam sreće jer klase od interesa nisu zavisile od ostalih, tako da je bilo dovoljno kompajlirati ih zasebno. Prebacivanje klasa na odgovarajuću lokaciju je izvršena jednostavnim linkovanjem _output_ foldera. Prvo se kompajlira Java 9 varijanta, pa tek onda Java 8.

## Falinka

Ideja iza MRJAR-ova je zasita smislena. Jasno, postoji očigledan izazov održavanja ovakvog _code base-a_; ne postoji nikakva provera da li su varijante iste klase zaista zamenjive. Iapk, ovaj problem je očekivan i važi za sve slične _multi-release_ specifikacije.

Drugi problem je konceptualan i mnogo važniji: MRJAR-ovi rade samo ako su... jarovi. Drugim rečima, ukoliko je sadržaj MRJAR-a _exploded_ (t.j. raspakovan), on neće raditi.

Zašto je to problem?

Svakodnevni rad sa kodom se dešava u _exploded_ modu: artifakti, kao što su jarovi, se pripremaju tek kasnije, pre objavljivanja koda. Testovi se takođe izvršavaju pre ikakve pripreme artifakta.

Čekaj... testovi?

Da. Da ponovim još jednom ako to nije jasno: testovi koji zavise od implentacije na različitim platformama Jave neće raditi. Ne mogu da se pokrenu iz IDE-a, a neće raditi ni na CI serveru.

**O** **O**rakle, **o**tkuda **o**vo?

Biću pomalo grub: ovaj primer specifikacije (koji se kuva još od 2014.) je dobra ilustracija _nemaštovitosti_ kompanije koja je preuzela razvoj Jave.

[bug report](http://bugs.java.com/view_bug.do?bug_id=8193346)