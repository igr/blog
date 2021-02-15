---
title: "Dobar kod je onaj koji radi"
date: 2021-02-15T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - arhitektura
  - kvalitet
---

Nevažno je kakav je kod, u suštini. Ako radi ono što je predviđeno - to je sasvim dovoljno, zar ne?

<!--more-->

Zanimljivo - iako se ne slažem sa izrečenom tvrdnjom, nju ne možemo odbaciti. Da objasnim: moje neslaganje nije potiranje ovog stava, već to da ne može da bude i jedina metrika za kvalitet koda.

Ružan kod koji radi je vredniji (neuporedivo!) od najboljeg koda koji ne radi. Ali dobar kod koji radi je vredniji od ružnog koda koji radi identičnu stvar. I košta manje.

Tako je, ružan kod ima cenu. To pokazuje i istraživanje iz 2018. godine, koje su sprovele firme Stripe i Harris Poll - renomirana firma koja se bavi ispitivanjima mnjenja i analizom rezultata. Istraživanje kaže da nekih `40`-tak posto vremena programeri troše na loš kod i izgovor poznat pod nazivom "technical debt". Sumirano, cena lošeg koda je `85` milijardi dolara godišnje.

Ono što zameram ovakvim istraživanjima je da ne uključuju cenu dodatnih resursa potrebnih da se proizvede dobar kod, a koju treba odbiti od gornje sume. Jer, šta ako treba `50%` više vremena da se napravi dobar kod? Nije li onda razumnije ostaviti ga da bude ružan i akati se njime tih `40%` vremena?

Problem sa procenom uticaja lošeg koda je u različitim trenucima kada se ovaj uticaj meri: koštanje stvaranja nije u jasnoj srazmeri sa koštanjem efekta. Kada se meri _pre_ nego što se napiše, uticaj lošeg koda je zamaskiran resursima i trenutnim troškovima; čini se skupo ulagati u nešto što diretkno ne doprinosi cilju: kodu koji radi. Kada se meri _nakon_ što je kod napisan, stvari postaju konkretnije; te kako vreme prolazi tako i cena ružnog koda (efekta) raste.

## Šta je, uopšte, ružan kod?

Prvo pitanje, čiji odgovor prethodi ovoj diskusiji, mora biti baš to: šta je ružan kod? Moj odgovor bi bio:

> Ružan kod je onaj koji ne komunicira nameru drugom programeru.

Ovakav odgovor, iako jasan, je prilično apstraktan, nemerljiv. Ako je tako, šta bi onda mogli zaključiti? Treba li ulagati u dobar kod, ili je to samo mit?

Zaključak kome naginjem je da treba ulagati u _dobru_ **arhitekturu**. Kod može biti bolji ili lošiji, ali arhitetkura _mora_ biti izuzetna.
