---
title: 'Docker, Java & OOM'
date: 2018-02-13T10:46:51+00:00
slug: docker-java-oom
categories:
  - Razvoj
tags:
  - docker
  - java
  - kontejner
  - memorija
  - mikroservisi
  - paas
---

Pokrećete Java aplikaciju u kontejneru i dobijate `OutOfMemoryException`; iako ne postoji greška u kodu u vezi curenja memorije. Šta se onda dešava?

<!--more-->

Evo primera kojim ću objasniti problem: [mali Java program](https://github.com/igr/docker-cats/tree/master/java-nom-nom) koji ispisuje koliko je memorije dostupno JVM-u.

## Van kontejnera

Kada se program pokrene van kontejnera dobija se sledeće:

```bash
> ./gradlew run

Available processors (cores): 8
Free memory: 242.9 MB
Maximum memory: 3.6 GB
Total memory: 245.5 MB
```

Procesor mog računara ima `8` jezgara i `16 GB` memorije. Ukoliko se ne definiše drugačije, po [JVM ergonomiji](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gc-ergonomics.html) Java se ograničava na _četvrtinu_ dostupne memorije. Otuda je vrednost `Maxium memory` `3.6 GB` (ugrubo četvrtina od `16 GB`) - to je, dakle, ukupna memorija koju naš program može da koristi.

## U kontejneru

Hajde sada da pokrenemo program u Docker kontejneru. Pre toga, moramo znati kako je Docker konfigurisan: koliko CPU i memorije mu stoji na raspolaganju. Na mom sistemu trenutno stanje je ovakvo:

![](/gfx/docker-settings.png)

Pokrećemo program:

```bash
> docker build -t oblac/java-nom-nom .
> docker run -a stdin -a stdout oblac/java-nom-nom

Available processors (cores): 4
Maximum memory: 1.7 GB
```

Važno je sledeće: **Java očitava konfiguraciju Docker sistemskog servisa**! Kada se JVM startuje u Docker kontejneru, ona vidi `8 GB` i ograničava se na četvrtinu (`1.7 GB`), što predstavlja novi maksimum koji program može da koristi.

## U limitiranom kontejneru

Kada god hostujete aplikaciju na nekom od "kontejnerizovanih" platformi (PaaS), ona će se izvršavati u kontejneru koji ima podešene limite za memoriju i CPU, zavisno od vašeg izabranog (kupljenog) plana. Primera radi, uzmimo da nas plan ograničava na `1 CPU` i `1 GB` memorije. Da bi to simulirali pokrenućemo naš Java program u takvom jednom limitiranom kontejneru:

```bash
> docker build -t oblac/java-nom-nom .
> docker run -a stdin -a stdout --memory=1g --cpuset-cpus=0 oblac/java-nom-nom

Available processors (cores): 1
Maximum memory: 1.9 GB
```

Čekaj... `1.9 GB`??? Zar nismo ograničili kontejner na `1 GB`?!

Ovo je upravo razlog zašto nastaje `OutOfMemoryException` u kontejnerizovanim Java aplikacijama: JVM očitava dostupnu memoriju Docker servisa, a **ne kontejnera** u kome se izvršava! U ovom primeru, JVM uopšte ne vidi ograničenje od `1 GB`, već i dalje vidi četvrtinu od `8 GB` koliko je dato Dockeru. Ukoliko program krene da alocira memoriju misleći da ima dovoljno mesta, može da dođe do `OutOfMemoryException`. Situacija u stvarnom životu je drastičnija: mašine na kojima se startuju kontejneri su često sa mnogo više RAMa, što samo znači da će pogrešno očitana vrednost dostupne memorije biti značajno veća od pravog limita kontejnera.

## Skrivene JVM opcije

Odnedavno (od Jave 8u131) JVM uvodi eksperimentalne konfiguracione opcije kojima rešava ovaj problem:

    -XX:+UnlockExperimentalVMOptions
    -XX:+UseCGroupMemoryLimitForHeap

Kada su uključene, JVM očitava dostupnost memorije ne za Docker servis, već za kontejner. Program ispisuje sledeće:

```bash
> docker build -t oblac/java-nom-nom .
> docker run -a stdin -a stdout --memory=1g --cpuset-cpus=0 oblac/java-nom-nom

Available processors (cores): 1
Maximum memory: 247.5 MB
```

JVM sada (ispravno) zaključuje da sistem ima `1 GB`, te se ograničava na četvrtinu (`250 MB`). Ovo ograničenje memorije je malo, naročito ako je reč o hostingu.

## Rešenje

Rešenje je trivijalno. Prosto upotrebi `-Xmx` da definišeš maksimalnu memoriju koju tvoj plan nudi.