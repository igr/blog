---
title: "Kako ređaš parametre, tako misliš"
date: 2024-07-11T01:06:08+00:00
slug: "kako-redjas-parametre-tako-mislis"
description: >
  Funkcije i metode pravimo svaki dan. Postoji li dogovor oko imenovanja? Oko redosleda parametara?
---

Funkcije i metode pravimo svaki dan. Postoji li dogovor oko imenovanja? Oko redosleda parametara?

Kako bi deklarisali funkciju `filter` koja prolazi kolekciju i filtrira je koristeći lambda predikat:

```plaintext
A) filter(predikatFn, kolekcija)
B) filter(kolekcija, predikatFn)
```
?

Kako bi deklarisali funkciju `repeat` koja ponavlja argument određen broj puta?

```plaintext
A) repeat(brojPonavljanja, vrednost)
B) repeat(vrednost, brojPonavljanja)
```
?

## Pravila

Funkcije koje _menjaju stanje_ se imenuju prelaznim glagolom i objektom: `reserveBook`, `takeTask`, `sendMoney`.

Funkcije koje su _čiste_ ili _ne menjaju stanje_ se imenuju kao imenica (sa pridevima): `recentBooks`, `tasks`.

(Ovo bi bio CQRS za imenovanje funkcija :)

Dalje, ne treba dodavati imena parametara u naziv funkcije; za to nam služe tipovi parametara (koristimo domenske tipove, zar ne?)

Šta je sa parametrima funkcija? Da li je važan njihov redosled?

Da. U pristojnim programskim jezicima _currying_ je jednostavna tehnika kojom se funkcija sa više parametara svodi na funkcije sa manje parametara predefinisanim argumentima. Ako imamo to na umu, onda je redosled parametara sledeći: `<konfiguracija>, <podaci>`. Drugim rečima, parametri se dele u dve grupe: u prvoj su konfiguracije ("kako funkcija radi"), u drugoj su podaci nad kojima funkcija radi ("na šta treba primeniti funkciju".) Parametri su poređani po stabilnosti: od više stabilnih do manje stabilnih.

Odgovor na gornja pitanja je `A`. Lambda je konfiguracija, definiše **kako** nešto radi. Kolekcija je podatak na koji **primenjujemo** funkciju. Broj ponavljanja je konfiguracija. Vrednost za ponavljanje je podatak.

Što je parametar važniji i što se više menja, to treba da je "desnije" u potpisu funkcije.

U slučaju rekurzije, upotrebljeni parametar treba da je poslednji.

Ukoliko postoje dva zavisna parametra, `foo` zavisi od `bar`, onda `foo` treba da je pre `bar`.

---

Nije (mi) važno da li ćete usvojiti ova pravila ili ne. Važnije je da postoji bilo kakav smisleni rezon ukoliko mislite drugačije - da izbegnemo "više volim" i "navikao sam" i "svi tako rade" argumente.

Na primer, u Kotlinu se trude da lambda uvek bude poslednji parametar, kako bi se mogla pisati van zagrada: u slučaju kada lambda nije trivijalna (kratka) teško bi se uočavao njen kraj i sledeći argument. To je posledica opsesije da sve bude inline. Ako lambda nije trivijalna, zašto na bi bila izdvojena?

Čest je slučaj (Python, Rust) da se argumenti sa podrazumevanim vrednostima stavljaju na kraj, kako bi se mogli izostaviti. Šta to štedimo podrazumevanim argumentima? Zašto nisu enkapsulirane u drugu funkciju?

Šta je od navedenog samo sintaksna prečica, a šta razumno pravilo?
