---
title: "2119"
date: 2023-04-05T01:07:03+00:00
slug: "2119"
description: >
  Pazi kako govoriš, ostvariće se.
---

Pazi kako govoriš, ostvariće se.

Postoji dobra praksa koju gledam da uključim u projekte koje radim. Reč je o sintaksi jezika. Govornog, ne programskog.

[RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) definiše desetak ključnih reči koje se često nalaze u specifikacijama: MUST, SHOULD, MAY... Kada je na snazi RFC, ključne reči se pišu velikim slovima kako bi naglasili da pratimo specifikaciju.

Dobro je imati ovakvu definiciju pri ruci. Ne zato što ne znamo šta reči znače, već kao podsetnik za ispravnu upotrebu. Ima smisla da RFC 2119 bude jedan od ADR; jezik projekta je takođe njegova arhitektura.

----

Ključne reči iz RFC 2119 se odlično preslikavaju na role u projektu ili firmi. Imaju različitu težinu zavisno od konteksta u kome su upotrebljene.

Izvršna pozicija je ta koja "seče" odluke. Ovakva rola bi trebalo da emituje MUST govor. Na konkretna pitanja se nedvosmisleno odgovara. Slično važi i za rolu na kojoj je odgovornost za deo posla: na njoj je da odredi šta je MUST za učiniti. Ovde nema mesta za SHOULD/MAY nedoumice! Ukoliko je nešto zaista nejasno, rola bi trebalo da istraži zašto je tako. Svaka nedoumica ostavlja mesta nejasnoći i nesigurnosti, koje se preslikavaju na implementaciju.

Strana na kojoj nije odgovornost je ta koja predlaže. Takav govor je SHOULD/MAY govor. U tom kontekstu te ključne reči naglašavaju znalački predlog, adekvatnu mogućnost.

---

MUST nije naređenje. To je eksplicitno naglašavanje, potvrda i podsetnik da je kontrola odluke na mestu.

SHOULD nije neznanje. Ono je upravo deljenje znanja, dobavljanje resursa za odgovor, obaveštavanje.

Zanimljivo, RFC 2119 se divno preslikava na sledeći moj stav: mora (ha!) postojati i MUST i SHOULD u projektu. Drugim rečima, mora postojati [odgovornost](https://oblac.rs/opasna-rec-po-tim/):

> The team is the extreme ownership and generous trust.

U okruženju u kome svi sve rade, nema MUST.

## Čega nema, o tome se priča

Postojanje RFC 2119 takođe dovodi u pitanje potrebu za kurtoaznim šumom u poslovnoj komunikaciji. Fokus bi trebalo da je na preciznosti i uklanjanju šuma. Čemu onda kurtoazija? Da li smo uvređeni ukoliko nismo "sendvič" tretirani? Zašto je direktnost problem?

Tim u kome vlada psihološka sigurnost nema potrebe da je naglašava. Kada nečega nema, onda se, pak, trudimo da to neprestano adresiramo. Kada emitujemo, na primer: "mi vrednujemo svakoga", više govorimo o nedostatku vrednovanja. Svaki dualni koncept (rat-mir, ljubav-neljubav, dobro-loše...) prestaje da postoji kada prevagne jedna strana. Ne postoji dan, ako nema noći.
