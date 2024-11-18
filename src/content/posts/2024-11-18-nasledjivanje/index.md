---
title: "Iznuđeno duplo nasleđivanje"
date: 2024-11-18T01:06:08+00:00
slug: iznudjeno-duplo-nasledjivanje
description: Iz života programera.
---

Iz života programera.

## Postavka

Potrebno je izvršiti nekakav proces verifikacije koji se aktivira na dva mesta u sistemu. Pravim interfejs, jer postoje različiti načini verifikacije (`final` je uklonjen iz primera radi čitljivosti):

```java
public interface Verify {
	VerifyResult verifyOnFoo(Task task, Employee employee);
	VerifyResult verifyOnBar(Task task, Employee employee);
}
```

Procesi verfikacije su jednostavni algoritmi koji proveravaju validnost akcija `foo` i `bar`. Bitno je da se algoritmi verifikacije služe istim domenskim jezikom: uvodim metode `approve()`, `deny()` i slične koje bi se koristile u implementacijama. Ovaj mali domenski jezik bi se mogao izvući iz bekenda u (java)skriptoliki run-time jezik, čime bi hardkodovan algoritam postao deo konfiguracije, zamenljive u runtime (jedan od vlažnih snova vlasnika projekta.) Upadica: šta je sa dinamičkom zamenom koda u Javi? Ubijena je konetejnerima.

Iako su sve domenske metode čiste, stavljam ih u baznu apstraktnu klasu:

```java
public abstract class BaseVerification {
	protected ApprovalStatus approve() {...}
	protected ApprovalStatus reject() {...}
	protected ApprovalStatus deny(String message) {...}
	// ...
}
```

Razlozi za baznu klasu:
+ Metode prvenstveno nisu bile čiste. Menjale su nekakvo zajedničko stanje, pa je bilo zgodno (?) da se stanje deli na prljav način kroz klasu.
+ Želeo sam da implementacije što više liče na kakav ljudski-čitljiv tekst koji bi biznis analitičari mogli da čitaju. Upadica: ispostavlja se da biznis analitičari ne vole čak ni jednostavan kod; više vole da izmišljaju svoje načine prikaza algoritama u tablearnim programima.
+ Hteo sam da ograničim vidljivost DSL samo na implementacije, jer koristimo "moderna" tehnološka rešenja koja ne rade udobno sa modulima pri lokalnom razvoju. Upadica: Red Hat zaista treba da promisli.

Primer korišćenja:

```java
public class ClientAVerification extends BaseVerification implements Verify {

	public VerifyResult verifyOnFoo(Task task, Employee employee) {
		if (uslov()) {
			approve();
		}
		deny("Ain't gonna happened.");
	}

	private boolean uslov() {}
	// ...
}
```

Šta sam pogrešio? Ukratko: favorizovao sam nasleđivanje zarad (upitno) čitljivijeg koda. OK, grešku sam svesno napravio, znam da postoji, lokalizovana je, idemo dalje.

S druge strane, ovo je potpuno validan slučaj OOP nasleđivanja. Zar ne?

## Nasleđivanje nasleđivanja

Pokazuje se da obe metode za verifikaciju (`verifyOnFoo` i `verifyOnBoo`) rade slično; mogu se parametrizovati. Drugim rečima, imamo novo zajedničko ponašanje za implementacije. Mesto takvom kodu je u - opet, baznoj klasi.

Međutim, ovaj kod ne može da završi u `BaseVerification` iz dva razloga. Nove metode nisu deo domenskog jezika, te nema smisla mešati ih. Drugi razlog je što `BaseVerification` ne implementira `Verify` interfejs. Sve i da hoćemo da metode đuture gurnemo u jednu baznu klasu, ne bi mogli da to izvedemo - osim da ne učinimo da i ona implementira `Verify` interfejs, što je besmisleno: jezik za verifikaciju postaje sam za sebe verifikacija.

Način da se iščupamo iz ove situacije je pravljenje nove abstraktne klase i, time, povećanje hijerarhije:

```java
public abstract class CommonVerification extends BaseVerification implements Verify {

	protected void commonVerify(Task task, Employee employee, Supplier<Boolean> uslov) {
		if (uslov.get()) {
			approve();
		}
		deny("Ain't gonna happened.");
	}
}
```

Odjednom sam završio sa hijerarhijom od dve podklase.

## Šta je problem?

Problem su višestruki razlozi za nasleđivanjem. Da se podsetimo, nasleđivanje je samo redefinisanje funkcija i varijabli u podskupu. U mom slučaju sam imao OOPotrebu da 1) definišem zajedničke metode za DSL validaciju i 2) izdvojim uočeno zajedničko ponašanje. Namere su ortogonalne: nisu kompatibilne, tiču se drugačijih ciljeva. OOP način da ih rešim je forsiranje hijerarhije.

Da se ispravim: "višestruki razlozi za nasleđivanjem" nisu problem, već su uobičajena potreba. Problem je mehanizam razrešavanja potrebe: nasleđivanje.

## Razrešenje

DSL jezik je izvučen u funkcije (statičke metode.) Time je uklonjen jedan stepen hijerarhije; ostaje samo "lagana" bazna klasa za zajedničkim ponašanjem. I ona je mogla da nestane; no s obzirom da sadrži samo jednu metodu, dozvoljavam joj da poživi... još malo.

Ništa novo: kompozicija pre, pre, pre i mnogo pre nasleđivanja.
