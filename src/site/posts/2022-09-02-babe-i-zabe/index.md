---
title: "Babe & Žabe"
date: 2022-09-22T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - programiranje
  - tipovi
---

Osuću drvlje i kamenje; upozoreni ste na vreme.

<!--more-->

Tipovi postoje s razlogom. U prirodi ne postoji veličina koja nema svoj tip. Vrednost sama za sebe ne znači ništa; potreban je apstraktni odmak da bi imalo smisla. `2 + 2 = 4` je zapravo _generalizacija_: dve para `nečega` jesu četiri komada. Zapisano nekakvom kompjuterskom sintaksom: `2:Any + 2:Any = 4:Any`.

Zamisli sada skup baba: `Set<Baba>`. Da li možeš da mu pridodaš `Žaba`? Samo ako skup promeni tip u `Set<Any>`. U suprotnom, babe i žabe ne možemo mešati.

To podseća na ono šta je uskliknuo Ujko Bob, tokom posete našim krajevima:

> Babe i žabe ne možemo mešati!

Nastavljam ovaj trivijalan primer: da li bi više voleli da imate `1,000,000:Any` ili `100:Euro`? Da li bi detetu pre dali `1:BigMek` (bljak) ili `1:Any`? Da li bi za iste novce pre kupio `1:Any` ili `1:Auto`? Kada odeš bolestan doktoru, da li staneš u `Red<Any>` ili `Red<Pacijent>`? (Inače, eto zgodnog zapleta za rijaliti šou!)

Ne treba puno kognitivne moći da bi se zaključilo da su milion zrnaca peska, žilet, jabuka i red na kiosku mogući pogrešni odgovori za generalne tipove. Za neke slučajeve bi bilo i neodgovorno tako postupiti.

Zamisli sada da programiraš softver za avio industriju. Nešto u vezi kontrole letenja složenih mašinerija, poznatijih pod nazivom "avion". Da li bi bio miran da takav softver dozvoljava da se babe i žabe mešaju, a da se greška uoči u run-time, dakle, tokom leta aviona? NASA ima 125 miliona dolara odgovora na pitanje mešanja jedinica, koliko je koštao izgubljeni Marsov orbiter, nek mu je laka tama Kosmosa kojim besiljno plovi.

Nije izrekao Bob, ali misli tako:

> Softverski sistem koji nema jake tipove je neodgovoran.

Ovim sam efektivno prozvao više od polovine (prema TIOBE statistici iz 2022.) onih koji sebe nazivaju progamerima, a kucaju po NeštoSkriptu, Pajtonu, Rubiju, PHP... Samo jako:)

## Tipovi postoje s razlogom

Izvinjavam se na učestanom ponavljanju - izgleda da su neki koncepti teški za razumevanje, te ih moramo prolaziti iznova, polako i uporno.

Pošto postoje različita tumačenja termina, hajde da se poravnamo. Postoje dve dimenzije uvezanosti tipova:

+ Statički vs Dinamički - statička provera je za vreme kompajliranja, dinamička u runtime.
+ Jaka vs Slaba - slaba tipska veza podrazumeva implicitnu konverziju tipova, dok jaka veza očekuje da konverzija bude eksplicitna.

U daljem tekstu, sve jezike koji nisu jaki i statički nazivam skriptaškim. Ovo je isključivo zbog jednostavnosti, a i mudro izbegavam da izazovem gnev programerskih frakcija; ispostavlja se da odanost programskom ekosistemu često definiše programere.

A sada nešto sasvim drugačije: koji je jedan od važnijih zadataka softverskog razvoja? Da proizvedemo kod koji će u run-time raditi što približnije korisničkim zahtevima i što ispravnije. Uvećanje na poslednji deo: "što ispravnije". To znači da programeri trebaju da učine _sve što je u njihovoj moći_ da proizvedu kod koji radi kako treba, pre nego što on zaista bude pušten u produkciju. Testiranje, na primer, je jedna od praksi koja se izvršava u pre-run-time. Zanimljivo, većina se slaže da je testiranje "dobra stvar". A kako testiramo da nismo pomešali babe i žabe? Smisli ljudi pre 100 godina nešto što se zove kompajliranje: proces koji ne samo što pretvara tekst u kod, već radi i kojekakve provere koda.

Zašto onda ne upošljavamo sve što možemo zarad odgovornog, ispravnijeg koda? Zašto smo toliko opsednuti skriptolikim, dinamičnim jezicima?

Neko će potegnuti odogovor na stranu čitljivosti, bolje sintakse i drugih šećera. Sve je to OK dok si tinejdžer. Čitljivost ponajmanje dolazi od sintakse. Da, neke stvari su lepše i ružnije među programskim jezicima, ali sveukupno gledano ne čine ceo projekat manje ili više čitljivijim. Jedna od najvećih gluposti je izgovor da sintaksa liči na govorni (engleski) jezik - druže, mi programiramo, ne pišemo fikciju. Ako ne možeš naučiti 20-tak keyworda koliko svaki jezik poseduje, onda je bolje da se baviš nečim drugim.

Neko će potegnuti na stranu da sasvim lepo piše kod i u NeštoSkriptu. Sigurno je tako. Pisao sam i ja blistav kod u asembleru. Sve je to OK dok si tinejdžer. Programiranje nije pisanje koda, već komunikacija kroz kod sa drugim programerima. Ako tvoj kod dozvoljava mešanja baba i žaba, ne znači da ih ti mešaš, već da će neko tamo drugi nekada to sigurno učiniti - ma kakav da je razlog. Znamo da je hitnja sve više opravdani izgovor za sistematsko silovanja koda; eto nama žaba među babama.

Neko će potegnuti da su alternative teške, a razvoj je sporiji. Tako je, razvoj jeste sporiji: više toga osiguravaš u pre-run-time vremenu. Šta je tu problem? Sigurnost ili Brzina, Kijanu ili Sandra, izaberi jedno. Samo - prevario sam te. Brzina razvoja u skriptaškim jezicima je veća samo na početku i u Hello World projektima. Stvari se menjaju malo kasnije. Često samo odlazak koda do dev enviromenta na kome ga tek možemo isprobati traje neuporedivo duže: tri sitne ispravke u Rubiju su poslodavca koštale 6 sati programerovog vremena dok je uzastopce puštao kod na dev. Svi srećni i zadovoljni.

Ponoviću ono što nazivam "Pre-run-time teorema":

> Svaki rad na kodu u pre-run-time je najvažnija aktivnost razvoja softvera.

Budi odgovoran!

## Nije sve u kompajleru

Naravno, nije samo do jezika i kompajlera. Ako je svaki tip u tvom kodu `String` i `Map<?,?>`, onda si efektivno oslabio jake tipove. Ponavljam se: svi tipovi u modelima bi trebalo da su domenski tipovi. Dakle, ne ovo:

```java
class Book {
  String id;
  String title;
  Int year;
}
```

već:

```java
class Book {
  BookId id;
  BookTitle title;
  PublishedYear year;
}
```

Da, gomila domenskih tipova je samo wrapper (ne alias!) oko običnih, generalnih tipova prisutnih u jeziku; to je sasvim OK.

Kompajleri mogu koliko mogu. Nema razloga da na tome ostane. Zašto ne bi generisali kod, uveli provere koje nisu samo testovi funkcionisanja? Šta je sa tipovima podataka eksternih fajlova? Na primer, JSON je `Map<Any,Any>` tip. Naučeni smo da parsiramo JSON u runtime i da ga mapiramo (refleksijom) u objekte. Međutim, u velikom broju slučajeva naš JSON ima strukturu! Zašto je i ne definišemo, pa generišemo kod koji radi parsiranje samo po šemi, čime drastično ubrzavamo parsiranje u runtime (merio, jer sam iskodirao jedan od [bržih JSON parsera](https://json.jodd.org)), plus ne ostavljamo mesta grešci.

Toliko toga može da se uradi u pre-run-time.

## Nije flame war

Nije mi ideja da pokrenem lavinu ostrašćenih komentara i diskusija. Brine me nerazuman trend popularnosti skriptaških jezika. Toliko puta sam učestvovao u trivijalnim problemima koji su svi redom bili toliko skupi (usled vremena provedenog na pronalaženje i ispravljanje problema), da ne vidim racionalni razlog zašto bi nastavljali da podržavamo takve neodgovorne programerske ekosisteme.

Osim ako nisu programerski ekosistemi, što nas čini ne-programerima. Već babama ili žabama.

👵 & 🐸