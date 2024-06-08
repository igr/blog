---
title: "Dobar kod je onaj koji radi"
date: 2021-02-15T01:07:03+00:00
slug: dobar-kod-je-onaj-koji-radi
description: >
  Nevažno je kakav je kod, u suštini. Ako radi ono što je predviđeno - to je sasvim dovoljno, zar ne?
---

Nevažno je kakav je kod, u suštini. Ako radi ono što je predviđeno - to je sasvim dovoljno, zar ne?

Zanimljivo - iako se ne slažem sa izrečenom tvrdnjom, nju ne možemo odbaciti. Da objasnim: moje neslaganje nije potiranje ovog stava, već to da ne može da bude i jedina metrika za kvalitet koda.

Ružan kod koji radi je vredniji (neuporedivo!) od najboljeg koda koji ne radi. Ali dobar kod koji radi je vredniji od ružnog koda koji radi identičnu stvar. I košta manje.

Tako je, ružan kod ima cenu. To pokazuje i istraživanje iz 2018. godine, koje su sprovele firme Stripe i Harris Poll - renomirana firma koja se bavi ispitivanjima mnjenja i analizom rezultata. Istraživanje kaže da nekih `40`-tak posto vremena programeri troše na loš kod i izgovor poznat pod nazivom "technical debt". Sumirano, cena lošeg koda je `85` milijardi dolara godišnje.

Ono što zameram ovakvim istraživanjima je da ne uključuju cenu dodatnih resursa potrebnih da se proizvede dobar kod, a koju treba odbiti od gornje sume. Jer, šta ako treba `50%` više vremena da se napravi dobar kod? Nije li onda razumnije ostaviti ga da bude ružan i akati se njime tih `40%` vremena?

Problem sa procenom uticaja lošeg koda je u različitim trenucima kada se ovaj uticaj meri: koštanje stvaranja nije u jasnoj srazmeri sa koštanjem efekta. Kada se meri _pre_ nego što se napiše, uticaj lošeg koda je zamaskiran resursima i trenutnim troškovima; čini se skupo ulagati u nešto što diretkno ne doprinosi cilju: kodu koji radi. Kada se meri _nakon_ što je kod napisan, stvari postaju konkretnije; te kako vreme prolazi tako i cena ružnog koda (efekta) raste.

Tako da: što je više ponovne interakcije sa kodom, to je cena njegove ružnoće veća.

## Teorija razbijenog prozora

Ima jedan pojavni oblik ružnog koda koji nalazim posebno važnim. Naime, postoji kriminološka teorija koja govori o širenju vandalizma. Glasi ovako: ako na zgradi postoji jedan polomljeni prozor, velika je šansa da će vandali razbiti i ostale prozore.

Ova teorija se pokazuje na primeru smeća i prirode: ukoliko neko baci smeće na čistu livadu i niko ga ne pokupi, ljudi će početi da tu bacaju smeće. Otuda pravilo izviđača da se kamp-mesto ostavi u istom ili boljem stanju nego je zatečeno.

Ista teorija se može primeniti na razvoj softvera: ružan kod pravi mesta za novi ružan kod. Ružan kod pravi pozitivnu povratnu spregu i nastavlja sa degradacijom kvaliteta.
