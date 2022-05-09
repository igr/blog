---
title: "LoD, Paperboy & ISCAN"
date: 2022-05-10T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - kvalitet
  - LoD
  - primer
  - iscan
---

Dimitrijev (po "naški":) zakon govori o razdvajanju apstrakcija i labavom uvezivanju komponenti koda. Jedna je od programerskih praksi koja gotovo bez izuzetka rezultuje boljim kodom - bar kodom sa značajno manje bagova, kako su pokazala istraživanja do kojih sam došao.

Da začinim stvari, upotrebiću priručni alat [ISCAN](https://github.com/igr/color-code/blob/main/doc/iscan.md) za analizu koda tokom njegove transformacije od lošeg ka boljem; primer se tiče **LoD**. Ako niste čuli za **ISCAN** do sada - odahnite; reč je o metodi analize koda koju koristim kratko vreme. Cilj mi da stvorim nekakvu brzu, priručnu (pen-n-paper) analizu koja bi dala _nedvosmileni_ uvid da neki fragment koda nije ili jeste okej.

<!--more-->

Zadatak je sledeći: raznosač novina naplaćuje svoju uslugu.

## Impl #1

Kod je sledeći:

```kt
data class Wallet(var cash : Int)
data class Customer(val name : String, val wallet : Wallet)

class Paperboy {
  private var collectedAmount: Int = 0
  fun collectMoney(customer : Customer, dueAmount: Int) {
    if (customer.wallet.cash < dueAmount) {
      throw IllegalStateException("Insufficient funds")
    }
    customer.wallet.cash -= dueAmount
    collectedAmount += dueAmount
  }
}
```

**ISCAN** analiza:

```text
PAPERBOY
--------
* 🟥 collectedAmount
* 🟧 collectMoney
arg:
  - [collectedAmount]
  - Customer
  - Int
out:
  - [collectedAmount]
inv:
  - customer (R)
  - wallet (R/W)
  - [this] (R/W)
use:
  - wallet
  - cash
  - [collectedAmount]
```

U pitanju je OOP dizajn: mešaju se stanja i funkcije. Metoda `collectMoney` je ACTION, jer ima implicitni argument `collectedAmount` koji je ujedno i implicitni izlaz.

Važnije, smeta direktan upis u `wallet`. Narušava se **LoD**. `Paperboy` ne treba da uopšte zna _kako_ `customer` čuva novac.

## Impl #2

Pokušamo da rešimo problem delegacijom:

```kt
data class Customer(val name: String, private val wallet: Wallet) {
  var cash: Int
    get() = wallet.cash
    set(value) {wallet.cash = value}
}

class Paperboy {
  private var collectedAmount: Int = 0
  fun collectMoney(customer : Customer, dueAmount: Int) {
    if (customer.cash < dueAmount) {
      throw IllegalStateException("Insufficient funds")
    }
    customer.cash -= dueAmount
    collectedAmount += dueAmount
  }
}
```

**ISCAN** analiza:

```text
CUSTOMER
---------
* 🟦 wallet
* 🟥 cash

PAPERBOY
--------
* 🟥 collectedAmount
* 🟧 collectMoney
arg:
  - [collectedAmount]
  - Customer
  - Int
out:
  - [collectedAmount]
inv:
  - customer (R/W)
  - [this] (R/W)
use:
  - cash
  - [collectedAmount]
```

Ova implementacija zna da rasplamsa raspravu oko **LoD**. Ako se delegat-properti posmatra kao metoda, faktički ne narušavamo zakon. No, metode propertija nisu zapravo biznis metode klase. One su samo oblik implementacije propertija. Ne treba izjednačavati properti metode sa biznis metodama klase. Propertiji su podaci, biznis metod je ponašanje: nije isto.

U analizi nema mesta različitim tumačenjima: direktno utičemo na stanje `customer` instance. To nije okej. Takođe, koristimo `cash`, što je opet upliv u privatnost klase `Customer` - očekujemo da nam daje informaciju o svom stanju (koliko ima novca), što nas se ne tiče.

## Impl #3

Delegiramo ponašanje, a ne stanje. To je način razrešavanja narušenog **LoD**.

```kt
data class Wallet(private var cash: Int) {
  fun withdraw(amount : Int) : Int {
    if (amount > cash) {
      throw IllegalArgumentException("Insufficient funds")
    }
    cash -= amount
    return amount
  }
}
data class Customer(val name: String, private val wallet: Wallet) {
  fun pay(amount: Int): Int {
    return wallet.withdraw(amount)
  }
}
class Paperboy {
  var collectedAmount: Int = 0
  fun collectMoney(customer: Customer, dueAmount: Int) {
    collectedAmount += customer.pay(dueAmount)
  }
}
```

**ISCAN** analiza:

```text
WALLET
------
* 🟥 cash
* 🟧 withdraw
arg: amount
out: amount
inv: [this]
use: [cash]

CUSTOMER
--------
* 🟦 wallet
* 🟧 pay
arg: amount
out: amount
inv:
  - wallet (I)

PAPERBOY
--------
* 🟥 collectedAmount
* 🟧 collectMoney
arg:
  - [this]
  - Customer
  - amount
out:
  - [collectedAmount]
inv:
  - customer (I)
  - [this] (R/W)
use:
  - [collectedAmount]
```

Zamenili smo sva čitanja i promene stanja `(R/W)` u `Paperboy` sa pozivima odgovarajućih biznis metoda. **LoD** je ispoštovan.

OOP, pak, uzima danak. Zašto `Paperboy` uopšte procesira `Customer`-a? Da li treba obratno: `Customer` da plati `Paperboy`-a?

Enkapsulacija u OOP je za\*ebana stvar. Počinjem misliti da rešava nešto nije problem, već nedostatak jezika. Drugi put više o tome. Sada, aktivnost plaćanja je _biznis relacija_ dve strane, podjednako uključene u proces.

## Impl #4

Otklon od OOP:

```kt
data class WalletX(val cash: Int)
data class CustomerX(val name: String, val wallet: WalletX)
data class PaperboyX(val name: String, val wallet: WalletX)
data class PayingContext(var customer: CustomerX, var paperboy: PaperboyX)

fun takeMoneyFromWallet(wallet: WalletX, dueAmount: Int): WalletX {
  if (dueAmount > wallet.cash) {
    throw Exception("Not enough money")
  }
  return WalletX(wallet.cash - dueAmount)
}
fun addMoneyToWallet(wallet: WalletX, amount: Int): WalletX {
  return WalletX(wallet.cash + amount)
}
fun collectMoney(customer: CustomerX, paperboy: PaperboyX, dueAmount: Int): PayingContext {
  val updatedCustomer = takeMoneyFromWallet(customer.wallet, dueAmount)
    .let { customer.copy(wallet = it) }
  val updatedPaperboy = addMoneyToWallet(paperboy.wallet, dueAmount)
    .let { paperboy.copy(wallet = it) }

  return PayingContext(updatedCustomer, updatedPaperboy)
}
```

**ISCAN** analiza:

```text
* 🟦 WalletX, CustomerX, PaperboyX, PayingContext
* 🟨 takeMoneyFromWallet
arg: WalletX, amount
out: WalletX
inv: wallet (R/C)
use: cash
* 🟨 addMoneyToWallet
arg: WalletX, amount
out: WalletX
inv: wallet (R/C)
use: cash
* 🟨 collectMoney
arg: Customer, Paperboy, Int
out: PayingContext
inv:
  - takeMoneyFromWallet (I)
  - addMoneyToWallet (I)
  - customer (R/C)
  - paperboy (R/C)
  - PayingContext(C)
use:
  - wallet
```

Prvo, rešili smo se STATE, ostale su samo imutabilne DATA.

Čiste funkcije `takeMoneyFromWallet` i `addMoneyToWallet` su okej. Rade samo sa `wallet` i kešom. Nema curenja apstrakcija.

Funkcija `collectMoney` je takođe čista, ali nije okej. Radi previše toga, kreira nekoliko objekata. Takođe operiše sa `wallet`; što ponovo narušava **LoD**.

## Impl #5

Pročišćenje:

```kt
fun charge(customer: CustomerX, amount: Int): CustomerX {
  return takeMoneyFromWallet(customer.wallet, amount)
    .let { customer.copy(wallet = it) }
}
fun receiveMoney(paperboy: PaperboyX, amount: Int): PaperboyX {
  return addMoneyToWallet(paperboy.wallet, amount)
    .let { paperboy.copy(wallet = it) }
}
fun collectMoney(customer: CustomerX, paperboy: PaperboyX, dueAmount: Int): PayingContext {
  return PayingContext(
    customer = charge(customer, dueAmount),
    paperboy = receiveMoney(paperboy, dueAmount)
  )
}
```

**ISCAN** analiza (samo novog dela):

```text
* 🟨 charge
arg: Customer, amount
out: Customer
inv:
  - takeMoneyFromWallet (I)
  - customer (R/C)
* 🟨 receiveMoney
arg: Paperboy, amount
out: Paperboy
inv:
  - addMoneyToWallet (I)
  - paperboy (R/C)
* 🟨 collectMoney
arg: Customer, Paperboy, Int
out: PayingContext
inv:
  - charge (I)
  - receiveMoney (I)
  - PayingContext(C)
```

Sada je sve zeleno ✅. Funkcije su čiste. Apstrakcija ostaje fokusirana, ne preliva se. **LoD** zadovoljen.
