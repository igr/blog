---
title: "Višeznačje"
date: 2024-07-30T01:06:08+00:00
slug: viseznacje
description: "Iz života programera."
---

Bazna klasa kontrolera (koji odgovaraju na API pozive) ima polje `activeAccount`. Bazna klasa popunjava ovu vrednost za svaki poziv, na osnovu `ID` naloga koji je deo putanje. Ideja: nalog (account) je potreban u aplikaciji za svaki poziv, potrebno je uraditi i još kojekave pripreme i verifikacije, te je zgodno sačuvati kreiran objekat i ponuditi ga implementaciji kontrolera.

Jedna takva implementacija kontrolera je sledeća:

```java
public class GetFooController extends BaseController {
	public String onGet() {
		final var foo = this.activeAccount.getFoo()
		// ...
		return foo;
	}
}
```

Sve je OK? Ne baš.

## Kada apstrakcija to nije

Zažmurićemo na besmileno nasleđivanje. Ono što se ne vidi je sledeće: `activeAccount` se popunjava kodom koji koristi sistemski data source, a kontroler koristi drugi data source vezan za sam nalog. Oba koda koji barataju sa data source imaju uključen keš koji se invalidira nakon minut ili na upit koji radi promenu.

Problem je u sledećem toku:

+ korisnik pravi izmenu podatka kroz account data source,
+ poziva se gornji kontroler,
+ sistemski data source ne očitava izmenu i vraća keširano stanje.

Rešenje vlasnika koda je da programer bude svestan šta radi i da eksplicitno u kontroleru, u baš ovom slučaju, učita aktivan nalog koristeći account data source.

To rešava problem. Ali takvo rešenje nije programiranje.

## Apstrakcija je

Apstrakcija je ukljanjanje nepotrebih viškova informacija na mestu korišćenja. Jedan pojam može imati više apstrakcija, zavisno od mesta/načina upotrebe.

Kada se jednom ustanovi, apstrakcija ima granice koje se NE smeju narušavati. _Narušene apstrakcije uvode nedoumicu_. Time gube vrednost zbog kojih su uvedene. Apstrkacija koja ne sakriva dovoljno je bezvredna.

U gornjem primeru `activeAccount` je apstrakcija koja predstavlja aktuelan aktivan nalog u okrugu (boundaries) kontrolera. Programer se na tom mestu ne bavi time kako je apstrakcija implementirana (tj. kako je vrednost dobavljena.) Programera zanima samo upotreba apstrakcije.

Svaki put kada se uspostavlja apstrakcija, mora se odlučiti čemu služi, šta sakriva i dokle traje (boundary). Apstrakcija mora da ima jasnu svrhu koja NE sadrži kondicionale (ako, onda, inače). Apstrakcija je imutabilna.

(Deo mene ne prihvata da poveruje da je primer stvaran.)

## Kako vežbamo apstrakciju?

Ovo je pitanje koje često postavljam. Učimo algoritme, gubimo sate na tupavim podešavanjima raznih klauda, učimo prevrtanje binarnih stabala... a kako učimo apstrakciju - možda najvažniju komponentu softverskog razvoja?

Zamisli troje vrata. Sigurno si ih zamislio jedna do drugih, zar ne? Ali mogu biti i jedna iza drugih. Mogu biti i troje vrata na kamionu. Ili na kuhinjskoj polici. Ili vrata od veš mašina. Eto zanimljive igre: daš početnu apstrakciju i zamisliš sve konkretizacije.

Možda moderna umetnost može da pomogne? Kada si poslednji put priuštio sebi takav izvor apstrakcije?

Apstrakcija je mač sa dve oštrice. Pojednostavljenje uklanja detalje. Detalji su neophodni za implementaciju. Apstrakcija je neophodna za razumevanje i komunikaciju.

p.s. Najbolji način da učimo apstrakciju za koji znam je teorija kategorija. Firma koja vrednuje razvoj svojih inženjera (ne programera), nudi takvu obuku. Dok je ne pronađemo, lutamo poput Diogena iz Sinope i pabirčimo šta možemo umesto spavanja. Alal nam vera.

Idemo dalje.
