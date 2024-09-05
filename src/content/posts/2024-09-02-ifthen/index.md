---
title: "IF IF THEN IF ELSE IF"
date: 2024-09-02T01:06:08+00:00
slug: "if-if-then-if-else-if"
description: "Ako pada kiša, nosim kišobran; ako ne pada, nosim naočare za sunce. Danas nosim oboje. Kakvo je vreme?"
---

U starom, nasleđenom kodu se potkrala greška. Možete li je pronaći?

```java
boolean hasHttp = false;
boolean hasHttps = false;
boolean hasHsts = false;

if ((hrs.getHasHttp() != null) && (hrs.getHasHttp())) {
    hasHttp = true;
    httpHosts++;
}

if (hrs.getHasHttps() != null) {
    httpsHosts++;
    if (hrs.getHasHttps()) {
        hasHttps = true;
        httpsHostsPresent++;
    } else {
        httpsHostsNone++;
    }
} else {
    httpsHostsUnknown++;
}


if (hasHttps) {
    if (hasHttp) {
        if (hrs.getHasHttpsRedirection() != null) {
            if (hrs.getHasHttpsRedirection()) {
                httpsRedirectionPresent++;
            } else {
                httpsRedirectionNone++;
            }
        } else {
            httpsRedirectionUnknown++;
        }
    } else {
        httpsRedirectionPresent++;
    }
} else {
    httpsRedirectionNotApplicable++;
}

if (httpsRedirectionPresent
	+ httpsRedirectionNone
	+ httpsRedirectionUnknown
	+ httpsRedirectionNotApplicable
	!= httpsHosts) // ERROR
```

Pre ili kasnije, ovako nešto se dogodi svima na ovaj ili onaj način; nećemo osuđivati kod, već iz njega učiti.

Odavno nameravam da pišem o `if` uslovu. Ono je inherentno kompleksan jer uvodi granjanje: jedan tok postaje dva. Razumevanje je time otežano. Mnoge greške se često pojavljuju zbog i oko `if` i prateće logike. Međutim, `if` mora postojati u programiranju: nema koda bez logičkog granjanja.

Dugo sam naginjao tome da je `if` problem. Logičko granjanje nam je tako _dostupno_: postoji u svakom jeziku na svetu, a uči se od prvog časa programiranja i algoritama. Zapravo, insistira se na njemu! Naučeni smo da uopšte ne razmišljamo o granjanju: to je alatka koju neštedemice trošimo i... završimo sa kodom sličnim gornjem. Postoje brojni načini kako da se smanji/uprosti korišćenje `if`: ne bi trebalo da imamo ugnježedene pitalice, kondicionalni blokovi bi trebalo da su kratki, a neretko možemo kombinovanjem funkcija ostvariti istu funkcionalnost, bez granjanja, itd.

Međutim, srž problema nije u `if`. Problem je u `boolean`. Reč je o _primitive obsession_ mirisu; u njegovom najekstremnijem obliku. Mnogo domenskih informacija ulivamo u jednostavno `true` i `false`. Samo jedan bit: `1` ili `0` u našim programima označava mnogo toga važnog za domen i odlučuje, ništa manje, na koju stranu se program kreće. "Samo" toliko.

Kao zagrižen borac protiv primitivizma i opsesija, smatram da `boolean` treba izbegavati. Zamenimo ih konkretnim tipovima. Isto kao što u kodu koristimo `BookId` i `Address` tipove, tako bitove treba zameniti odogovarajućim (algebarskim data) tipovima.

Ako nastavimo razmišljanje: problem je kada `boolean` služi da opiše _stanje_. Zamislite nekakav domen u kome se subjekat može naći u 3 stanja: recimo, lift, može biti u pokretu, zaustavljanjen ili isključen. Ako bi koristili `boolean` bit kao informaciju za svako stanje, dobijamo `2^3=8` nekakvih mogućih stanja, a kako je većina bez domenskog značenja, trebamo se dodatno brinuti da nam sistem ne završi u nekom od njih. Mnogo koda samo zarad pogrešnog načina praćenja stanja. Umesto bitova, trebalo bi da razmišljamo o konkretnim i _jednoznačnim_ tipovima/vrednostima. Kada već pričamo o stanjima, prirodno se nadovezujemo na mašinu stanja (_state machine_), tkzv. konačni automat. On se može predstaviti grafom mogućih stanja i prelazima između njih. Omogućuje da jasno vidimo stanja i dozvoljene putanje, a ne tek samo jedan bit. U primeru našeg lifta, ne možemo preći iz stanja "u pokretu" u "isključen", već moramo prvo stati, pa tek onda ga isključiti. Pisanje koda imajući na umu mašinu stanja je jasnije i sigurnije - sve i da ne koristimo nekakvu biblioteku za mašinu stanja (na čemu ne insistiram.)

Primitivni tipovi ne bi trebalo da služe za definisanje programskog _značenja_.

## A gde je greška?

Iz istog razloga zašto primitivne vredosti ne bi trebalo da imaju programsko značenje (semantiku), tako i `null` treba izbegavati. To je apsurdna i paradoksalna vrednost koja nema značenje, a ipak joj je dodeljeno (domensko) značenje: vrednost koja nije vrednost.

U gornjem kodu, kombinacija raspršavanja stanja po `boolean` varijablama i korišćenje `null` dovodi do greške. Postoji sledeća putanja:

+ `hrs.getHasHttps()` je `null`
+ `httpsHosts` se ne uvećava
+ `hasHttps` ostaje `false`
+ uvećava se `httpsRedirectionNotApplicable` u poslednjoj grani - iako ne bi trebalo,

što dovodi da leva strana jednačine bude veća od desne.

---

Ne znam kako bih ispravno napisao gornji kod. To je okej. Znam da bih vodio računa o sledećem:

+ promenio bih imenovanje, jer `http`, `https` i `hsts` izgledaju toliko slično,
+ sve promenljive koji imaju isti prefiks su kandidat za novi tip,
+ zamenio `null` sa enumom,
+ uveo tip za opis stanja redirekcije, umesto četiri `boolean` varijable,
+ kondicionalno brojanje bih zamenio predikatima,
+ na sve načine izbegao ugnježdene `if`.

Tek nakon ovih izmena bih mogao da počnem sa rezonovanjem kako bolje napisati samu funkcionalnost.

"Počisti, pa razmišljaj."

## Adendum

[Primeri refaktorisanja](https://gist.github.com/coka/f0458394b3b64cbbf8ffe2d1cf4db546) - autor [Bojan Čoka](https://www.linkedin.com/in/bcoka/)
