---
title: "Mex"
date: 2024-09-19T01:06:08+00:00
slug: "mex"
description: "Dat je niz celih brojeva. Pronađi najmanji broj koji nedostaje u poretku vrednosti niza."
---

Dat je niz celih brojeva dužine `N`. Pronađi najmanji broj koji nedostaje u poretku vrednosti niza.

Primer: za niz `[4,-1,0,3]` rešenje je `1`.

## Petljanje

Verovatno prvo rešenje na koje pomislimo:

+ odredimo minimum niza `min`,
+ počevši od `x = min + 1`, tražimo da li se vrednost `x` nalazi u nizu,
+ ako se `x` pronađe, inkrementiramo ga i ponavljamo,
+ ako se `x` ne pronađe, znači da nedostaje, pa je ujedno i rešenje.

(Jednostavnosti radi ne bavim se graničnim slučajevima.)

Vremenska kompleksnost algoritma je `O(n^2)` (petlja u petlji), a prostorna kompleksnost je `O(n)`.

## Pogledavanje

Drugačije rešenje je sledeće:

+ odredimo `min` i `max` niza,
+ alociramo fleg-niz (`boolean` tip elementa) dužine `max - min + 1`,
+ za svaki element ulaznog niza markiramo odgovarajući fleg sa `true`,
+ konačno, prođemo fleg-niz do prvog `false` - njemu pripadajuću vrednost je rešenje.

Drugim rečima: odredimo _raspon_ vrednosti sadržan u ulaznom nizu. Za ceo raspon vrednosti formiramo fleg-niz koji označava da li se određena vrednost pojavljuje ili ne. Na kraju pronađemo prvi fleg koji nije setovan i on nam označava vrednost rešenja.

Primer. Za ulaz `[4,-1,0,3]` formiramo fleg-niz: `[f, f, f, f, f, f]` koji je mapiran na vrednosti: `[-1, 0, 1, 2, 3, 4]`. Potom markiramo postojeće vrednosti: `[t, t, f, f, t, t]`. Preostale nemarkirane vrednosti su one koje nedostaje u nizu.

Vremenska kompleksnost je `O(n)`. Prostorna kompleksnost je... pojma nemam. Ona ne zavisi od broja elemenata `N`, pa bi trebalo da je `O(1)`. Jasno, ova mera nam ne govori puno, jer ulazni niz sa samo dva elementa: `[MIN_INT, MAX_INT]` lako obezvredi program, alocirajući silnu nepotrebnu memoriju.

Ovo je ujedno i deo koji mi smeta kada pričamo o kompleksnosti. Čemu metrika koja nije precizna? U matematici, `Big-Oh` predstavlja limitirajuće ponašanje funkcije kada joj argumenti teže beskonačnosti ili nekoj već vrednosti. Razumem nameru preuzimanja ove metrike za potrebe softverskog inženjerstva, no ne mislim da je potpuno "legla" kako treba. Ili možda je to dovoljno za nekakvu klasifikaciju zarad "ugrubog" poređenja? Ne bih da odbacim, naravno, ono što piše u mudrijaškim knjigama; no što više prolazi vreme, to više cenim _preciznost_.

Kako bilo, utrošak prostora se može redukovati (!?) na `O(n)` korišćenjem kakvog `unordered_set`, koji pamti samo vrednosti niza. Time se narušava kompleksnost izvršavanja na `O(log(n))`.

Ček! C++ referentni priručnik ukazuje da je kompleksnost lookup-a funkcije linearna, `O(1)`. Tačnije, da je _prosečna_ upotreba lookupa (i inserata) linearna. Razumem, takav je slučaj sa svim lepo hash-ovanim ključevima. Ali, šta znači "prosečna"? Zar se ne gleda najgori slučaj?

Da li je samo meni ovakvo rezonovanje zbunjujuće?

## Mex

Zadatak se može rešiti na jedan baš elegantan način. Rešenje krasi linearna kompleksnost `O(n)`, bez dodatnog utroška memorije. Reč je o algoritmu koji se naziva "Mex". Prenosim rešenje u celosti:


```cpp
int findMissingElement(const vector<int>& vector)
{
    // find max and min
    int min = vector[0];
    for (int i = 1; i < vector.size(); ++i)
    {
        if (vector[i] < min)
        {
            min = vector[i];
        }
    }

    // create aux vector of the same size
    vector<int> aux(vector.size());

    // copy elements to form aux vector
    // with only positive ints
    for (int i = 0; i < vector.size(); ++i)
    {
        aux.at(i) = vector.at(i) - min;
    }

    // mex algorithm
    int i = 0;
    const int N = aux.size();
    while (i < N)
    {
        if (aux.at(i) < N and aux.at(aux.at(i)) != aux.at(i))
        {
            // swap A[A[i]] and A[i]
            const int aai = aux.at(aux.at(i));
            const int ai = aux.at(i);
            aux.at(ai) = ai;
            aux.at(i) = aai;
        }
        else
        {
            i++;
        }
    }

    // locate result
    i = 0;
    while (i < N)
    {
        if (aux.at(i) != i)
        {
            return i + min;
        }
        i++;
    }
    return N + min;
}
```

Ideja je sledeća: ulazni niz se prvo "translira" u niz pozitivnih brojeva koji počinje od `0`. U idealnom slučaju, svi brojevi su prisutni, samo nisu na svojim mestima. Ako niz sadrži vrednost koja je veća od dužine novog niza, znači da nedostaje neki broj. Algoritam kreće da zamenjuje elemente sa ciljem da proveri da li je `aux[i] == i`, slično nekakvom _in-place_ sortiranju.

## Gde si ovo prepisao!?

Kod jesam sam napisao, ali rešenje nisam - pronašao sam ga na vikipediji. Ovo je jedan od onih algoritama koji se koriste u teoriji igara, a koji je dobio ime po "minimum excludant" (mex) operaciji. U teoriji igara, mex operacija predstavlja najmanji broj koji nije prisutan u skupu brojeva.

Do poslednjeg rešenja verovatno ne bih došao ni da mi život zavisi od toga. Što je okej, jer se najmanje bavimo algoritmikom; a i verovatnoća da će mi staviti oružje na čelo i zahtevati da smislim algoritam je baš mala, bar do sledećeg razgovora za posao. Fokus softverskog inženjerstva je nekakva (neprestana) dekompozicija i potom kompozicija sistema do dovoljno dobrog rešenja. Za algoritmiku su potrebne druge veštine.

Koje bi to bile veštine? TDD.

---

Ha, upecali ste se ;) Ma batalimo volšebne pseudo-prakse, kakvi bakrači!

Zanimljivo mi je da u algoritamskom razmišljanju postoje nekakvi obrasci koji se ponavljaju i čine sastavne delove (_building blocks_) rešenja. Maštam da je moguće doći do elegantnog rešenja problema primenom i spajanjem takvih obrazaca.

Dobar deo rezonovanja je u sagledavanju informacija koju podaci drže, direktno ili indirektno.

U prvom rešenju informacija da li se vrednost sadrži u nizu se svaki put _izračunava_. U pitanju je _statička_ informacija u kontekstu funkcije; te repetativna, ponavljajuća izračunavanja je moguće zameniti preračunatom vrednošću - esencijalno lookup tabelom. Ova transformacija rešenja je već dobro poznata, ništa novo. Ali bi bilo lepo nekako je formalno opisati. Treće rešenje je već izazovno. Moja razmišljanja, pre nego što sam kukavički potražio rešenja, su krenula na sledeću stranu: šta sve od _informacija_ mogu da izvučem? Tako sam uzimao u obzir sledeće:

+ razlike između susednih vrednosti niza,
+ niz sa sledećim (`a[i]+1`) elementima, jer neko od njih nedostaje,
+ da li je element niza van razmatranja (veći od broja elemenata),
+ sortiranje, s tim što sam ga posmatrao kao atomski korak i u tome pogrešio.

Nisam razmišljao o translaciji niza, niti korišćenju indeksa kao dopunske informacije; eto novih rezonskih "blokova."

Dalje, svaki blok bi imao svoju "cenu." Broj operacija sa memorijom su konačne: čitaš, pitaš, upisuješ. Svaki blok bi imao svoje ocene kompleksnosti po svakoj od ovih operacija.

Da li postoji formalan način da se prestavi jedinični blok takvog rezonovanja? Ili je to već programski jezik za sebe? Da li je moguće napraviti nekakav _DSL_ za algoritamsko razmišljanje? Ne znam. Znam da programski jezici znaju da imaju neke zamke u detaljima koji nisu bitne za algoritam.

Kako bilo, način kako učimo o algoritmima je naivan. Učimo ih kao nekakve recepte, magične formule, a ne kao kombinjuće obrasce.

Idemo dalje.
