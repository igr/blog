---
title: "Kratkoživeći objekti i drugi bauci"
date: 2020-08-10T01:07:03+00:00
categories:
  - Razvoj
meta:
  img: "ig.png"
tag:
  - java
  - razvoj
  - memorija
  - gc
  - oop
  - performanse
---

Postoji ne tako mali broj onih koji smatra da `new` treba štedeti. Pravljenje nove instance je, jelte, skupa operacija, te ga treba pažljivo konzumirati; pa, možda, čak i na ušrtb dizajna koda.
<!--more-->

Ako permutujemo cifre i zamislimo da je danas 2002. godina, ovo bi _možda_ bilo tačno. Od tada su se stvari promenile.

Kreiranje objekata u Javi (i u drugim modernim OOP jezicima) je brže od C\++ u najvećem broju slučajeva, zahvaljujući posebnim strategijama kako se memorija interno alocira. Drugim rečima, u _praktičnoj_ primeni jezika, kreiranje objekata u JVM se može smatrati **zanemarljivim** u odnosu na performanse svega ostalog što se unutra dešava. Nula. Zero. Ništica.

## Štucanje GCa

Čekaj, ako sada kreiramo puno kratko-živećih objekata... zar oni neće da "zaguše" GC, te učine da pauzira aplikaciju na trenutak dok se ne očisti od tih silnih nepotrebnih objekata?

Ne. Svi moderni GC koji se danas koriste su optimizovani baš za kratkoživeće objekte. Stvari su zapravo drugačije: svako "čuvanje" objekata (a koji ne žive sve vreme), može više da šteti aplikaciji nego gomile kratkoživećih objekata. Stvari idu čak toliko daleko, da se kaže da treba čuvati (kao _pool_) samo objekte koji su veza ka spoljnem svetu: baza, soketi, fajlovi...

Ah, da ne zaboravim: ni GC ne štuca više.

Heap je podeljen na 3 dela: _young_, _old_ i _permanent_ generaciju. Ime ukazuje na životni vek objekata koji se tu čuvaju. Najzanimljivija je _young_ generacija, podeljena dalje na _eden_, `S0` i `S1` (tkzv. _survivor space_).

Većina objekata se kreira u _eden_ prostoru. Kada se popuni, preživeli objekti se kopiraju u jedan od `S`. Drugi `S` je uvek prazan. Kopiranje je deo rada tkzv. _young GC_, koji se bavi samo ovom generacijom. Ovakvim žongliranjem prostora se dobija na performansama i smanjuje fragmentacija memorije.

Zašto onda kratko-živeći objekti nisu problem? Zato što JVM ne troši vreme na njihovo brisanje. JVM troši vreme samo za preživele objekte koje pomera tamo-amo kroz prostore. Jednom kada se živi objekti kopiraju, preostali prostor se posmatra kao nov, prostim resetovanjem pointera na početak prostora.

Drugim rečima, `new` je jeftinije od "starenja".

Zanimljivost: ovaj koncept je smišljen 1970.

## Imutabilna iluzija

Očigledno, stanovište da imutabilni objekti "koštaju" više, jer se stalno pravi nova instanca - takođe nema smisla. Da, pravi se jedan objekat više u moru od hiljada drugih objekata koje tvoj program pravi.

Šta više - malo ko zna da imutabilni objekti zapravo više odgovaraju GC! Objekat je mlad bar koliko njegova najmlađa referenca koju čuva. Imutabilnost garantuje da su sve reference starije od samog imutabilnog objekta. Time _young GC_ može da preskoči imutabilne objekte u starijoj generaciji, jer sigurno zna da su sve reference na koje ukazuje starije i ne u trenutnoj generaciji! Drugim rečima, GC bolje radi sa mladim/novim objektima koji sadrže starije, nego obratno.

## Hajde da ludujemo

Ovo nije poziv na divljanje po kodu! Ne treba zaboraviti da iako kreiranje objekta nije skupo, njegova inicijalizacija može da bude. No, to je već programerski problem, a ne problem JVMa.

Ovo je poziv da arhitektura koda bude primarni fokus, te da ne trpi zbog pogrešnih pretpostavki.

I ono što neprestano ponavljam: kada god pričamo o performansama aplikacije, moramo uzeti u obzir ceo sistem, a ne samo kod. No to je već neka druga tema.

p.s. nadam se da više niko ne koristite `final` pod izgovorom da je 'brži' kod :)

---

## Dodatak

Nadahnut odličnim [odgovorom](https://www.linkedin.com/feed/update/urn:li:activity:6698851995274547200?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A6698851995274547200%2C6699464736146280448%29) [Jovana Popovića](https://www.linkedin.com/in/jovan-popovic/), dužan sam da naglasim ono što možda nisam dovoljno :)

Kreiranje objekta (kao i svaka alokacija) _svakako_ da ima cenu. Poenta je da `new` odavno nema nikakve **dodatne** penale, kao što se to možda još misli.

Primera radi, uporediću kreiranje objekta jednostavne klase koja sadrži jednan properti sa najprostijim ekvivalentim kontejnerom: nizom od jednog elementa. U oba slučaja se alocira memorija za čuvanje istog podatka, samo je kontejner drugačiji. [Rezultat](https://github.com/igr/java-benchmarks/blob/master/src/main/java/com/oblac/jmh/lang/NewBenchmark.java) (na JVM 8) je:

```text
allocArray    avgt   20  3.282 ± 0.060  ns/op
createFoo     avgt   20  2.896 ± 0.045  ns/op
```

Alokacija objekta je čak i nešto brža :) Da ponovim, `new` košta, ali nema **dodatnog**, vanrednog usporavanja.

Vredi ponovo skrenuti pažnju i na ovo: ako bi imali klasu sa više propertija, njena _inicijalizacija_ traje duže. Objekat je svojevrsni kontejner; sve vrednosti treba setovati na uobičajene. `new` sam po sebi nema penala.

Ovo su sve izolovani slučajevi koje sam merio; u praksi teško da performanse možemo da posmatramo kao uniju pojedinačnih delova. Tako, na primer, `String s = a + b + c` ili `new Foo(a + b + c)` nemaju smisla da se porede, jer većina vremena odlazi na konkatenaciju stringova.

## Šta poneti odavde?

Dizajn softvera ne treba da trpi preuranjene optimizacije u ime performansi - sve dok se to ne dokaže pravilnim benchmark testovima. Na to se nadovezuje opsednutost primitivama (o [kojoj sam pisao](/opsednutost-primitivnim/)), korišćene nepromenljivih klasa, itd.
