---
title: "Otpor OOP: Nasleđivanje"
date: 2018-12-16T15:00:00+00:00
slug: otpor-oop-nasledjivanje
categories:
  - Razvoj
tags:
  - razvoj
  - programiranje
  - oop
  - nasleđivanje
---

Svaka knjiga koja uči moderne programerske jezike veliča OOP. Na fakultetima je OOP temelj zdravog i modernog načina pisanja koda. Bez OOP se nikako ne može; tako su nas učili.

Biću brutalan sada: OOP je jedna od najlošijih stvari koja se desila programiranju. OOP je nezasluženo dobio mesto na tronu principa programiranja, jer smo dozlaboga lenji. I što duže vrtim kod pod prstima, to više žalim što OOP nije ostao samo napomena na margini.

<!--more-->

Sledi niz članaka na ovu temu.

## Nasleđivanje

Nasleđivanje deluje tako _prirodno_. Primer iz udžbenika koji se neprekidno ponavlja: `Shape` koji može biti `Rectangle`, `Sqaure`, `Circle`... i suština koju rešavamo: _resue_ ponašanja. Treba mi `Circle`, ali u boji - pa hajde da ga nasledimo u `ColorCircle`.

Pre nego što krenemo dalje: da li je `Square` specijalni slušaj `Rectangle`, te ga treba naslediti? Ili `Rectangle` treba da ima `isSquare()` kojim saopštava da je kvadrat? Kada `Square` treba da postane tip?

Dobro, sada nam treba `ColorCircle` na drugom projektu. Ček, pa sa njim dobijam i `Circle`. A tu je i `Shape`! Stani, tu je i gomila klasa koje `Circle` i `Shape` koriste: `Point`, `Color`, `Gradient`... Sve pomalo liči na situaciju kada ti na nedeljni ručak dođe draga i cela njena rodbina pride.

Joe Armstrong je to opisao ovako:

> The problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle.

Ma šta on zna, samo je stvorio [Erlang](https://www.erlang.org).

Dobro, kažete vi, ne treba praviti duboke hijerarhije. Ako je tako, gde je granica dubine nasleđivanja?

Aj ne tupi, kažete vi, idi na taj Oblak sa koga si pao.

Oki-doki, uzvraćam i dajem vam dijamante. Evo, imamo `Animal` koga nasleđuju `Bird` i `Horse`. Nešto u poslednje vreme koristim mitologiju u primerima, pa mi zatrebao `Pegasus`, koji je ujedno i `Horse` i `Bird`. Šta činiti?? Sledeći primer je iz knjiga: `Device` koji je ujedno i `Printer` i `Scanner` je `Copier`. Sve su to primeri višestrukog nasleđivanja, koje je potpuno razumno. Kako ga onda rešavamo u OOP?

Jednostavno: mnogi jezici ga _ne_ podržavaju. Jednostavno, ne radi se to. Nemoj da _reuse_ klase nasleđivanjem u ovakvim slučajevima.

Idemo dalje. Nasleđivanje obećava da podklase treba da budu sve specifičnije. Šta onda radimo u slučajevima kada one mogu zameniti mesta? Primer je hijerarhija kategorija; najlakše ju je posmatrati kao drajv: imamo foldere za svaki `Projekat`, a u njima podfolder `Marketing`. No isto tako smo mogli da imamo folder `Marketing` sa podfolderima za svaki `Projekat`. Šta je od ova dva bolje?

Idemo dalje. Nasleđivanje obećava da ne moramo da znamo implementacije klasa koje nasleđujemo. Divan primer:

```java
public class Array<T> {
    private ArrayList<T> a = new ArrayList<>();
    public void add(T element) {
        a.add(element);
    }
    public void addAll(T[] elements) {
        for (int i = 0; i < elements.length; ++i) {
            a.add(elements[i]);		// *
        }
    }
}
```

Nasledi ovu klasu tako da ujedno brojiš i koliko ima elemenata u nizu:

```java
public class ArrayEx<T> extends Array<T> {
    private int count = 0;
    @Override
    public void add(T element) {
        super.add(element);
        count++;
    }
    @Override
    public void addAll(T elements[]) {
        super.addAll(elements);
        count += elements.length;
    }
}
```

Sve OK do sada? Super.

Sada u izvornoj klasi izmeni red označen zvezdicom: umesto da direktno dodaješ u niz, upotrebi postojeću metodu `add()`. Šta se dešava sa `ArrayEx`? Oooooo... da. Izgleda da moramo znati kako radi podklasa da bi je nasledili kako treba.

Idemo dalje. Nasleđivanje je, uz instanciranje klasa, jedno od najčvršćih veza koje postoje u kodu. U vreme mikroservisa kada se `loose-coupling` visoko ceni, mi i dalje tvrdokorno jako uvezujemo ponašanja klasa. Nemoguće je dinamički naslediti klase, osim ako se ne igramo bajtkodom. Ono što smo nasledili ostaje tako do kraja.

## Otpor nasleđivanju!

Nasleđivanje je koncept koji ima previše nedostataka da bi mu se toliko pridavalo značaja. Šta više, trebalo bi ga toliko marginalizovati da postane tek samo napomena. Nažalost, današnji jezici su uglavnom OOP orijentisani, što znači da imaju sve da učine nasleđivanje lakim za korišćenje; i mi to prihvatamo zdravo za gotovo. Ponavljanje čini da se važnost nasleđivanja uvreži u našem podsvesnom umu, te posle par godina (fakulteta, posla) mi i ne umemo da razmišljamo na drugačiji način. Zato:

Otpor nasleđivanju!