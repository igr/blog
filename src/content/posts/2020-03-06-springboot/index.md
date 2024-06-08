---
title: Reasonable defaults vs Unreasonable abstraction
date: 2020-03-06T01:07:03+00:00
slug: reasonable-defaults-vs-unreasonable-abstraction
description: >
  Premisa "reasonable defaults" zvuči tako sjajno. Izvoli uobičajene postavke, besplatne su. Kao i prvi fiks. Sve radi odmah, primenjena magija na delu. Uostalom, svi ih koriste; ukoliko ti ne, onda nisi dobar programer, niti ćeš ikada biti.
---

Premisa "_reasonable defaults_" zvuči tako sjajno. Izvoli uobičajene postavke, besplatne su. Kao i prvi fiks. Sve radi odma\`, primenjena magija na delu. Uostalom, svi ih koriste; ukoliko ti ne, onda nisi dobar programer, niti ćeš ikada biti.

`SpringBoot` mora prestati da postoji.

Uvek, baš uvek kada sam koristio sve-prožimajuća 'magična' rešenja, kao što je to i Spring Boot, upadao sam u zlosutnu zavisnost od platforme. Početak, ah, početak je tako lep i lak, kao tinejdžerska ljubav: ubaciš jednu zavisnost i bam: jednorozi skakuću poljem i [Zeke Peke](https://oblac.rs/cuvajmo-zeke-peke/) veselo pevaju Odu radosti.

Ono šta sve-obuhvatajuće platforme donose je nepotrebna apstrakcija... pa, svega. Jer da bi podržao druga rešenja moraš ih integrisati. To znači uvođenje još jednog - nepotrebnog - sloja apstrakcije, koji postoji isključivo zarad platforme! Pogrešna apstrakcija koja postoji samo da bi nam dala _reasonable defaults_, jer, priznajemo, malo smo lenji pa ih ne pravimo sami, te nam treba tetka iz Pivotala da maskirana ispod _open-source_ plašta kaže šta treba da radimo.

Ono što plaćamo sa _reasonable defaults_ je svako kasnije skretanje sa _defaults_ puta - koje se, pre ili kasnije, **mora** desiti. Umesto da se tada bavimo konkretnim problemom, mi se bavimo platformom (!) i apstrakcijom koja je ona tetka iz Pivotala tako lepo osmislila. Ne rešavamo problem, nego apstrakciju.

_Reasonable defaults_ imaju samo jednu primenu - PoC. Kada treba da za vikend iskucam 10 servisa i pokažem sebi da cela zamisao ima smisla.

Vreme koje uštediš na početku da dobiješ instant-jednoroge je beznačajno u poređenju sa vremenom koje kasnije trošiš da te iste jednoroge uteraš u red. Ako ne znaš da napraviš svoje _reasonable defaults_ za razumno vreme, pa... onda bi možda trebalo da se baviš gajenjem Zeka Peka.

A tetki iz Pivotala bih da se zahvalim na ponuđenom fiksu: hvala, ali ne hvala; i naterao bih je da pojede ceo stack-trace jedne uobičajene Spring(Boot) greške uz sve kolače iz pridruženih _jar_-ova.

p.s. Hvala Revolut-u na podsećanju da nisam usamljen u ovome.
