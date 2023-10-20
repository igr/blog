---
title: "StopWatch"
date: 2023-10-20T07:07:07+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - java
---

Kako bi modelovali štopericu u programu?

<!--more-->

Koristićemo Javu da pokažemo da se i u glupkastom programskom jeziku može _ispravnije_ programirati.

Ovo je nekakva uobičajena implementacija štoperice:

```java
public class StopWatch {
  private long startTime;
  private long stopTime;

  public void start() {
    startTime = System.currentTimeMillis();
  }

  public void stop() {
    stopTime = System.currentTimeMillis();
  }

  public long elapsed() {
    return stopTime - startTime;
  }
}
```

Divno, čisto OOP razmišljanje... Štoperica je predmet iz stvarnog života, na njoj postoji dugme za početak i za kraj merenja. To su dve operacije koje se "rade" na štoperici. Elementarno za modelovanje, prva godina faksa: štoperica je klasa sa dve metode. Pametnome dosta.

Štop. Pogrešno.

## Modelujemo ponašanja, ne predmete

Fundamentalna greška koju nas OOP uči je da "preslikavamo" objekte iz stvarnosti u program. Automobil, televizor, štoperica, kvadrat, voće... sve su primeri iz OOP udžbenika koji se tako lako modeluju klasama. Lako je da razmišljamo na taj način: tim se objektima služimo, možemo da ih jasno zamislimo, postoji značajno ne-programersko iskustvo u vezi tih predmeta.

Naučeni smo da razmišljamo o objektima kao nekakvim kutijama koje imaju svoje stanje i nude metode kojima se to stanje menja. Tok razmišljanja uvek započinje od nekakvog nacrtanog kvadrata koga nazovemo "štoperica" i u koga upišemo imena operacija, eventualno i varijable stanja. Klasni dijagram, ako baš hoćete. Nacrtani klasni kvadrat ujedno služi kao mentalna sigurnosna mreža; možemo da pokažemo prstom na njega i kažemo: evo, to je štoperica.

Hajde sada da izbrišemo linije klasnog kvadrata - i bukvalno i u prenosnom značenju. Šta nam preostaje? Koja je to apstrakcija štoperice za kojom tragamo?

Ponašanje: operacije i stanja.

Krenimo od stanja (u množini). OOP model nas uči da jedan objekat menja svoje stanje. Ispravno je, zapravo, da stanja posmatramo kao nepromenljivu karakteristiku modela, imutabilne vrednosti, snapshot sistema. Ne postoji jedno stanje; postoji više stanja. Operacije nas premeštaju iz jednog stanja u drugo. Operacije su, sada je to već jasno, jednostavne, čiste funkcije. Funkcija ne menja stanje. Funkcijom prelazimo iz jednog stanja u drugo.

U Javi bi to izgleda ovako:

```java
public class StopWatches {
  public static RunningStopwatch start() {
    return new RunningStopwatch();
  }
  public static MeasuredDuration stop(
      RunningStopwatch runningStopwatch) {
    return new MeasuredDuration(runningStopwatch);
  }

  public static class RunningStopwatch {
    private final long start = System.currentTimeMillis();
    public long elapsedMillis() {
      return System.currentTimeMillis() - start;
    }
  }
  public static class MeasuredDuration implements Supplier<Duration> {
    private final Duration elapsed;
    MeasuredDuration(RunningStopwatch runningStopwatch) {
      this.elapsed = Duration.ofMillis(
        System.currentTimeMillis() - runningStopwatch.start);
    }

    public Duration get() {
      return elapsed;
    }
  }
}
```

Stanja su: `RunningStopwatch` i `MeasuredDuration`. Operacije su:

+ `() -> RunningStopwatch`
+ `(RunningStopwatch) -> MeasuredDuration`

Obratite pažnju da je ime operacija (funkcija) _suvišno_ - jasno je šta funkcije rade!

## FAQ

_Zašto `static`?_ Jer Java nema `object`. _Zašto `StopWatches`?_ Jer Java nema funkcije. _Zašto unutrašnje `static` klase?_ Ne mora, zgodno je zbog veze sa `StopWatches` u imenu.

_Pa ove dve funkcije su razdvojene, ništa ih ne drži zajedno?_ Nisu razdvojene, vezane su ulaznim i izlaznim tipovima. Mogu da budu i na dva kraja univerzuma, ali postoji samo jedan način kako se mogu upotrebiti.

_Funkcija `stop()` je mogla da vrati `Duration`!_ Ne, jer bi trebalo da vrati domenski tip. _Zašto `Supplier`?_ Zgodno je, ne mora, može `record`.

_Kako ću da promenim ponašanje operacije, ako nemam šta da nasledim?_ Kao i pre, napiši novu instancu funkcije. Potpis funkcije je njen interfejs, definicija je implementacija. Vidi kasnije. 

_Ovako imaš bar dve klase za štopericu!_ Da, pa? _Ove dve klase ne dele zajedničku baznu klasu!_ Da, pa?

_Pfff!_ 🤷‍♂️

## Korak dalje

Kada je merenje u istom scope-u, nije nam bitno međustanje, već samo krajnji rezultat. Možemo da uvedemo i ovu pomoćnu funkciju:

```java
public static Duration measure(Runnable runnable) {
  var sw = start();
  runnable.run();
  return stop(sw).get();
}
```

## Polimorfizam

Potpis funkcije je njen tip. U Javi tako nešto ne postoji, zato:

```java
@FunctionalInterface
public interface Start {
  public RunningStopwatch invoke();
}
@FunctionalInterface
public interface Stop {
  public MeasuredDuration invoke(RunningStopwatch s);
}
```

Onda:

```java
public class StopWatch {
  final Start start = RunningStopwatch::new;
  final Stop stop = MeasuredDuration::new;
  
  // ctor, builder, injection...
}
```

Gle, vratili smo se u `StopWatch`.

Sada opisujemo _ponašanje_.

## Prljavo vreme

Ima nečega prljavog u ovim funkcijama - nisu čiste. Funkcije se oslanjaju na _sporedni efekat_, vreme na računaru. Ukoliko se funkcija pozove dva puta za redom sa istim ulazom, daće različite rezultate. To ne želimo.

Zato se dobavljanje vremena odstranjuje u interfejs `Clock`:

```java
public interface Clock extends Supplier<Instant> {
  Instant get();
}
```

Sada pređašnji kod izgleda ovako:

```java
public class StopWatch {
  private final Start start =
    () -> new RunningStopwatch(clock);
  private final Stop stop =
    (sw) -> new MeasuredDuration(clock, sw);
}
```

gde je `clock` neka implementacija časovnika.

Sada su funkcije štoperice čiste i jasne.

## Merenje u kontejneru

Čekaj, zar nije merenje vremena nekakav kontekst oko izvršavanja? Jeste, to smo videli u primeru `measure()`. Čim imaš kontekst, imaš kontejner, imaš potencijalni... monad.

Hajde da ovde stanemo. U Javi sve dalje bi bilo besmisleno bolno raditi.

Postigli smo već sasvim dovoljno: opis ponašanja, imutabilna stanja, čiste funkcije.