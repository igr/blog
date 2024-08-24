---
title: "Udoban ili precizan kod?"
date: 2024-08-24T01:06:08+00:00
slug: "udoban-ili-precizan-kod"
description: "Da li bi želeli da radite sa udobnim ili preciznim kodom?"
---

Šta bi pre: da radite sa **udobnim** ili **preciznim** kodom?

Možda da preformulišemo pitanje: da li bi pre leteli udobnim ili preciznim avionom?

---

Nedavno sam nabasao na sledeći savet na LI. Naime, autoru (nazovimo ga "Džo") smeta kada Java konstruktor ima mnogo argumenata: čini da Džo "poludi". Da bi rešio ovaj problem, Džo, softver arhitekta, predlaže korišćenje `Builder` obrasca, ali sa sledećim zapletom:

```java
public class Foo {
	private final String p1;
	private final String p2;
	private final String p3;
	// ...
	public Foo(FooBuilder builder) {
		p1 = builder.p1;
		p2 = builder.p2;
		// ...
	}
}
public class FooBuilder {
	private String p1;
	public FooBuilder setP1(String p1) {
		this.p1 = p1;
		return this;
	}
}
```

Sjajno, da?

## Ne

Džo nije u pravu. `Builder` obrazac postoji u primitvnim programskim jezicima koji nemaju imenovane i podrazumevane argumente konstruktora. `Builder` kreira instancu objekta, ima udoban fluent interfejs i ne garantuje da su dostavljeni svi neophodni argumenti. To je sve.

Stavljanjem `Buildera` kao jedinog argumenta konstruktora kažemo nešto drugo: `Builder` sada postaje _zavisnost_ naše klase. Dalje, to više nije builder, već nekakva veštačka kompozicija vrednosti, koja postoji samo zbog fluent interfejsa. Najvažniji propust je da je takva kompozicija _labava_: ne postoji način da kompajler proveri da li su dostavljeni svi elementi kompozicije, potrebni za konstrukciju objekta. To svakako važi i za uobičajeni `Builder` obrazac, no bar je osnovna klasa konstruktorom garantovala svoju zavisnost. Drugim rečima, radi udobnosti i Džoove emotivne nestabilnosti, eksplicitna, _compile-time_ zavisnost (a time i provera) se zamenjuje labavom, run-time zavisnošću.

Hej Džo, kuda si krenuo, pa ne može tako.

Jaka stvar; vodićemo računa; to je samo klasa; može ako je ostali kod uniforman; ovo je baš nevažno, zar ne?

Ne. Ovo nije pitanje stila, već tačnosti: rezultat je manje precizan i unosi nedoumicu. Nema potrebe za time. I tu bi trebalo da stane svaka dalja rasprava. Osim što se to ne dešava: kao da i dalje stavljamo lični _osećaj_ ispred preciznosti. To je potpuno razumljivo, ljudi smo. No, valjda bi trebalo da smo i inženjeri. A ako jesmo, onda Džo u nama ne sme ikada da kaže "puno argumenata" - šta "puno" tačno znači? Ne bi trebalo ni da Džo "poludi" - šta to tek znači? Šta je sledeće: klasna-depresija? Edipov-dependency? Manijačni-injection?

Ako klasa ima pozamašan broj zavisnosti koji nam alarmira iskustvo da nešto nije kako treba, to je pre naznaka da klasu možda treba pre podeliti ili zavisnosti grupisati. A dok ne dođe do takve izmene, pišemo sve šta i kako treba. Nećemo uvoditi nedoumice zbog primitivizma programskog jezika.

---

Ma, 'bole nas ćošak za trivije. Red Hat dozovljava da Quarkus projekat insistira da nema `final` propertija, da se ne koristi konstruktori za zavisnosti i ne podržava lokalni rad sa modulima. Meni su navedene osobine _nedopustive_, a opet, ne potresamo se nešto zbog toga.

Fer je priznati: svi smo mi Džo. U jednom trenutku, negde kada seniorstvo počinje da zrije, prirodno posežemo za načinima da učinimo kod "udobnijim". Razumemo alat, znamo šta radi, želimo da smo produktivni, korisniji - potpuno legitimna namera. Imam i sam koliko god voliš takvih primera na Github-u. I to je u redu - do onda kada nije. Drugim rečima, zašto ne bi preskočili ceo taj ciklus i odmah pisali samo precizan kod? Zahtevali bolje alate i bolje jezike?

---

Udobnost je svakako korisna, pa i potrebna. Ali ne bi trebalo da je na uštrb tačnosti.
