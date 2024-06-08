---
title: Ne koristi String equals()
date: 2017-12-06T09:53:22+00:00
slug: ne-koristi-string-equals
description: >
  Nekada se greške pojavljuju gde ih ne očekujete.
---

Razlog za "naduvani" naslov leži u sledećem kodu. Možete li reći šta nije u redu sa ovom metodom:

```java
public boolean equals(CharSequence cs1, CharSequence cs2) {
	return cs1.equals(cs2);
}
```

Sve je u redu, jel da?

Pa... i ne baš.

```java
String one = "text";
CharSequence two = CharBuffer.wrap(one.toCharArray());
```

Definišemo jedan string i jedan `CharBuffer`. Oba tipa su `CharSequence`. Ako ih prosledimo gornjoj metodi, rezultat bi trebalo da bude `true`, pošto je sadržaj isti:

```java
equals(one, two);
> false
```

Šta? Kako? Zašto?

`equals()` metode `CharSequence` implementacija proveravaju sadržaj samo za iste tipove. U našem primeru, `String#equals()` prvo proveri da li je argument takođe `String`. Kako to ovde nije slučaj, rezultat je `false`.

Ako imate kod koji vraća `CharSequence` - a to je nešto što je sasvim u redu da se ima - budite obazrivi sa poređenjem sadržaja. Iz tog razloga je dodata metoda `String#contentEquals()` koja upravo poredi sadržaj sa bilo kojom implementacijom `CharSequence`. Šteta što ona nije dodata baš u `CharSequence`, ali to su te sitne gluposti u JDK na koje se navikavamo.
