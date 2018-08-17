---
title: Kompozitni operatori OCaml-a
date: 2018-04-06T10:33:22+00:00
slug: kompozitni-operatori-ocaml
categories:
  - Razvoj
tags:
  - ocaml
  - operator
  - razvoj
---

U verziji 4 OCaml uvodi dva kompozitna operatora koja brzo nađu svoju primenu. Posebno je interesantno kako nešto tako jednostavno značajno doprinosi čitkijem kodu.

## @@

_Application operator_ je definisan kao:

```ocaml
val (@@) : ('a -> 'b) -> 'a -> 'b
```

Drugim rečima: `g @@ f @@ x` je ekvivalentno `g (f (x))`.

Ne, nije šala: operator je samo drugačiji oblik poziva funkcije. Čemu onda? Pregledniji kod.

Ugnježdeni pozivi nisu baš laki za praćenje - na svakoj zagradi pravimo mentalni iskorak i tražimo krajnju zagradu da bi odredili ‘oblast’ funkcije. Primer:

```ocaml
module StringMap = Map.Make(String);;
let m = StringMap.empty;;
let m = StringMap.(add "X" 1 (add "Y" 2 (add "Z" 3 m)));;
let m = StringMap.(add "A" 4 @@ add "B" 5 @@ add "C" 6 m);;
```

Poslednja dva reda dodaju elemente u mapu. Drugi način je očigledno pregledniji.

Da budem iskren, ovo neće biti operator koji ćete koristiti toliko često - ali zato sledeći hoćete!

## |>

_Reverse-application operator_ - već i ime nagoveštava - je definisan kao:

```ocaml
val (|>) : ‘a -> (‘a -> ‘b) -> ‘b
```

Drugim rečima: `x |> f |> g` je ekvivalentno: `g (f (x))`.

Ne, ni ovo nije šala - operator predstavlja inverzni oblik pozivanja funkcije. Čemu onda? Pa... služi upravo čemu i _pipe_ operator u linuksu: rezultat se prenosi kao argument sledećeg poziva. Ovim se prilično lepo ‘razvija’ niz ugnježdenih poziva; ne samo da je kod čitljiviji, već je i lakši za razumevanje.

Primer:

```ocaml
let put_key_values_into_a_list c map =
 StringMap.filter (fun key _ -> String.contains key c) map
 |> StringMap.bindings
 |> List.split
 |> snd
 ```

Ovo je funkcija koja filtrira mapu, zatim izvlači sve parove, razdvaja ih na dve liste, te vraća listu vrednosti. Uočava se moć ovakvog operatora: dobija se _fluent_ korišćenje i bez ikakvog dodatnog dizajna API-ja!

Divno je koliko su jednostavni ovi koncepti, a opet dalekosežni.