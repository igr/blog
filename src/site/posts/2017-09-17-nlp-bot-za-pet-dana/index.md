---
title: NLP bot za pet dana
date: 2017-09-17T09:53:22+00:00
slug: nlp-bot-za-pet-dana
categories:
  - Razvoj
tag:
  - analiza
  - bot
  - java
  - klasifikacija
  - nlp
  - razvoj
  - stanford
  - tekst
  - weka
---

U porastu je broj servisa koji nude neki način obrade unetog teksta i jednostavan način pripreme tj. programiranja odgovora; što se često koristi za izradu botova. Međutim, odlučio sam da ih zanemarim i zaronim dublje u [NLP](https://en.wikipedia.org/wiki/Neuro-linguistic_programming), te pokušam da iskodiran... nešto smisleno. Kao, na primer, bota koji crpi znanje iz tekstualnog fajla i daje odgovore na pitanja u vezi teksta. Za pet dana. Jednostavno, zar ne?

<!--more-->

Pre nego što nastavim: nisam nikakav ekspert za NLP i siguran sam da ima stvari koje nisam razumeo, niti ih ovde ispravno predstavljam. Ako nekome zbog ovog teksta padne mačka sa terase ili počne da sanja elektronske ovce, tja.

## Svaki početak je... lak

Pošto je vremenski rok kratak, problemu sam pristupio inženjerski: pokušaću da za kratko vreme dođem do dovoljno dobrog rezultata; pažljivo birajući čemu mogu da se posvetim više, a šta jednostavno moram da zanemarim.

Ispostavilo se da je početak iznenađujuće lak. Naime, postoji priličan broj zrelih NLP toolikita: [OpenNLP](https://opennlp.apache.org), [Stanford NLP](https://nlp.stanford.edu/index.shtml), [LingPipe](http://alias-i.com/lingpipe/index.html), [GATE](https://gate.ac.uk)... Izabrao sam Stanfordov: pisan je u Javi, aktivno se razvija, a čini mi se da je veliki broj Python biblioteka upravo zasnovan na ovom toolkitu.

Šta je Stanford NLP? Pojednostavljeno, to je Java bibiloteka koja parsira tekst (engleski, ali i drugi jezici su donekle podržani) i izvodi analizu rečenica i reči od kojih se tekst sastoji. Analiziranjem teksta se rečenicama i rečima pripisuju tkzv. _anotacije_ - meta-podaci vezani za konkretnu analizu. Drugim rečima, uzmeš tekst, propustiš ga kroz NLP i dobiješ skup rečenica i reči označenih anotacijama.

Kakve sve analize možemo zahtevati od NLP toolikita? Evo nekih:

  * _tokenizacija_ - određivanje rečenica i reči (tokena) od kojih se sastoji tekst.
  * _pos_ - određivanje tkzv. POS (_Part-Of-Speech_) taga. Svakom tokenu se pridružuje POS tag, koji opisuje službu reči u rečenici: glagol, imenica, simbol, zamenica, pridev...
  * _lemma_ - pojednostavljivanje reči (tokena) svođenjem na njem osnovni oblik; na pr. množina se pretvara u jedninu, prošlo vreme u sadrašnje itd.
  * _ner_ - još jedan tag (_NamedEntity_); ovaj se bavi semantikom reči. Određuje da li je reč neko ime, brojčana vrednost ili vremenska odrednica.
  * _sentiment_ - opisuje kakav je prizvuk reči: neutralan, negativan ili pozitivan.

Ovo je deo svih analiza teksta koji se mogu obaviti, ceo spisak tkzv. anotatora se [može naći na zvaničnom sajtu](https://stanfordnlp.github.io/CoreNLP/annotators.html).

Rad sa Stanford NLP bibliotekom i aktiviranje željenih anotatora je vrlo jednostavno:

```java
Properties props = new Properties();
props.setProperty("annotators", "tokenize, ssplit, pos, lemma, ner, parse, dcoref");
StanfordCoreNLP pipeline = new StanfordCoreNLP(props);

String text = "...";
Annotation document = new Annotation(text);

// izvrši sve anotatore na tekstu
pipeline.annotate(document);
```

Sada kada sam našao moćan alat za analizu teksta, podelio sam problem na sledeće celine:

  * analiza teksta - očigledno, Stanford NLP toolikit prilično rešava ovaj problem,
  * analiza ulaza tj. pitanja i njegova _klasifikacija_; razumevanje pitanja,
  * pronalaženje adekvatnih rečenica iz teksta koje najviše odgovaraju pitanju.

## Weka i klasifikacija

Klasifikacija u NLP znači pripisivanje jedne od predefinisanih klasa analiziranoj rečenici ili reči. Jedna od klasifikacija ulazne rečenice je određivanje da li je ona pitanje (_question_), izraz (_expression_) ili tvrdnja (_assertion_). Program za odgovore bi trebalo da se drugačije ponaša i odgovara za svaku od ovih klasa ulaznog teksta.

Da bi implementirali ovakvu klasifikaciju, u NLP se koristi _data-mining_. Pisanja determinističkih pravila za određivanje kategorija je često nemoguće ili je nepraktično. Umesto toga se definiše tkzv. klasifajer (_classifier_) koji se _trenira_ pripremljenim skupom podataka dovoljno velikim dok ne počne da daje rezultate sa zadovoljavajućom tačnošću. Stanford NLP nudi mogućnost pravljenja klasifajera, međutim (ovo sada već postaje simptomatično), izabrao sam da koristim moćan [Weka data-mining toolkit](http://www.cs.waikato.ac.nz/ml/weka/).

Za svaku klasifikaciju je potrebno imati pripremljen data set već utvrđenih klasifikacija. Svaka od klasifikacija je uvezana sa skupom parametara (karakteristika, atributa) izvedenih iz prirode onoga šta se klasifikuje. Primer koji se često koristi je klasifikacija cvetova na osnovu [Iris data seta](https://en.wikipedia.org/wiki/Iris_flower_data_set). Ovaj data set sadrži 150 instanci (redova) cvetova; cvet je opisan sa 4 karakteristike (dimenzije latica i čašice) i oznakom jedne od tri klase kojoj cvet Irisa pripada. Kada Weka učita ove podatke, tj. kada se model istrenira, moguće je uraditi klasifikaciju novog primerka cveta samo na osnovu ulaznih parametera, tj. njegovih dimenzija.

Laički rečeno, klasifajer treniramo da ga "naučimo" vezama između ulaza (parametri) i rezultata (klasa). Jednom naučen, klasifajer primenjuje naučeno "znanje" na nove ulazne podatke da bi ih (manje-više) uspešno klasifikovao. Očigledno, da bi klasifikacija radila potrebno je da uopšte postoji korelacija ulaznih parametara i klasa. I to je deo gde Weka pomaže, pružajući pomoć u analizi data setova i korelacija korišćenjem raznih statističkih algoritama.

Da se vratim na problem: za klasifikaciju vrste rečenice potrebno je izabrati ulazne parametre koji bi bili u korelaciji sa klasama. Problem nije nov, [ovaj naučni rad](https://www.cs.utah.edu/~riloff/pdfs/emnlp11-speechacts.pdf) predlaže sledeći set ulaznih parametara:

  * dužina rečenice,
  * broj imenica,
  * da li se rečenica završava imenicom ili pridevom,
  * da li rečenica počinje glagolom,
  * broj `Wh` reči (upitnih reči u engleskom jeziku).

Svi ovi parametre se dobijaju analizom teksta Stanford NLP bibliotekom. Nadalje je lako. Našao sam ili napravio data set rečenica za svaku od klasifikaciju, a onda napravio program da sve to analizira i konačno napravi finalni dataset spreman za Weku, tekstualni `arff` fajl. Jednom napravljen, finalni fajl se učitava u program, trenira se model i nadalje klasifikacija radi.

### Klasifikujemo i dalje

Druga klasifikacija koju sam radio je za tipove pitanja i njihovu semantiku. [Postoji klasifikacija](http://cogcomp.org/Data/QA/QC/definition.html) po tome na šta se pitanje odnosi, kao i [trening data setovi](http://cogcomp.org/Data/QA/QC/) sa već klasifikovanim pitanjima. Međutim, nisam našao nikakav smislen set ulaznih parametara sa kojim bih toliko detaljno trenirao Weka model, pa sam klasifikaciju pitanja sveo na 6 glavnih kategorija, a za ulazne parametre uzeo sledeće:

  * kojom reči počinje pitanje,
  * koji je POS te reči,
  * koji je POS sledeće reči,
  * i koji je POS korene reči u semantičkom grafu - to bi trebalo da je ‘najvažnija’ reč drva.

Ovo nije potkrepljeno nekim naučnim dokazom da postoji korelacija; tako da ovde ima još dosta prostora za unapređenje.

## Odgovaranje

Najteži deo je upravo pronalaženje pravog odgovora. Sada kada imam svu potrebnu analizu i teksta i pitanja, konačno mogu da se bacim na suštinu aplikacije. Nažalost, nisam našao neki dovoljno jednostavni primer ili naučni rad koji bi mi ovde pomogao. Pošto se rok bližio, rešio sam probam da poredim pitanje sa svakom rečenicom teksta, odredim nekakav koeficijent "sličnosti" - koliko rečenica odgovara pitanju i na kraju izaberem najbolje kandidate za odgovor. Evo šta sam sve poredio.

**Bag-Of-Words**: Stanford NLP biblioteka može da izdvoji set važnih reči iz rečenice, odvajajući ih of tkzv. _stop-words_ i sličnih reči koje ne doprinose značenju rečenice (semantika). Ako pitanje i rečenica sadrže iste reči, verovatnoća je da se bave sličnom temom.

**Triplets**: jedna od analiza rečenice je određivanje tkzv. tripleta: subjekat, objekat i glagol. Ovim se rečenica praktično svodi na triple koji određuje značenje. Poređem tripleta pitanja i rečenice, prilično može da se nagovesti da li rečenica odgovara pitanju!

**Keywords** & **word distance**: nastavlja se na premisu Bag-Of-Words. Prvi korak je da se iz teksta izdvoje ključne reči (_keywords_). Stanford NLP ne daje ovu mogućnost, verovatno pošto ne postoji jasna definicija šta je to zapravo ključna reč. To bi mogle biti reči iz tripleta, na primer; no pristupio sam (opet!) malo drugačije. Kako bilo, izdvajanje ključnih reči i nije toliki problem. Međutim, za razliku od ranije, sada želim da ih uporedim na neki pametniji način, a ne samo da poredim da li su njihove leme isti stringovi.

I za poređenje sličnosti značenja reči postoji rešenje! Prinston univerzitet održava poznatu [WordNet](https://wordnet.princeton.edu/wordnet/) leksičku bazu engleskog jezika, dostupnu svima. Jedna od stvari koja se može uraditi pomoću ove baze je da se "izmere" reči i njihova sličnost. Laički, moguće je napisati funkciju koja poredi dve reči i vraća koeficijent koliko su one semantički slične. Ovakvim poređenjem po značaju možemo pronaći vezu između različitih reči, a koje imaju slično značenje. Tako sam i poredio ključne reči.

**Tripleti**, opet. Ovaj put računam triplete i njihovu zavisnost uz pomoć WordNeta. Zapravo, izračunavam više koeficijenata: frekfenciju lema, poredim pojedinačno objekte, pa zatim poredim parove objekat-subjekat, sinonime, antonime... Daleko da sam smislio sve ovo, ali bar razumem šta se dešava:) Rezultat je realan broj koji je suma svih koeficijenata i predstavlja meru koliko se rečenica i pitanje poklapaju.

Na kraju sve ove rezultate poređenja množim težinskim koeficijentima (koje sam potpuno proizvoljno i nenaučno izabrao) i zbrajam u finalni skor. Sve rečenice teksta se ovako ocene, sortiraju po skoru i izaberu tri koje najviše odgovaraju.

Evo primera kako program radi (za tekst o informacijama o kompaniji):

    > How many projects you have developed?
    We have more then 8000 projects.

    > What do you develop?
    We develop financial apps.
    We develop medical apps.

    > How many employees works in your company?
    We have 800 employees.

    > Where is your office?
    We are located in Novi Beograd.

    > In which countries you also work?
    We also have offices in Switzerland, Germany and Serbia.

    > What are you?
    We are a software engineering company.
    Internship is payed.
    We are located in Novi Beograd.


Okej, očigledno nije savršeno, ali je _iznenađujuće dovoljno dobro_. Kod je na [GitHub](https://github.com/igr/parlo).

## Kada bih imao još vremena...

NLP razvija zavisnost, bez šale, lako bih mogao da se ovime bavim duže vreme. Na kraju ovih pet dana imam puno ideja kuda bih dalje i kako bi se program mogao razvijati i fino podešavati.

  * Semantičko upoređivanje zasnovano na rečniku. Ako bi se formirao rečnik gde je svaka reč klasifikovana po značenju (na. pr: _time_: vreme, _cat_: životinja), mogli bi da poredimo pitanje i rečenice i po ovim klasama. Na neki način je slično WordNet upoređivanju sličnosti reči.
  * Dodavanje jednostavnih odgovora. Namerno sam izostavio jednostavna "pitanje-odgovor" mapiranja, jer je primena trivijalna. No ne znači da nije upotrebljivo. Imati ovakav data set je koristan za čavrljanja (_small talk_) sa botom, kada se ne traži konkretna informacija iz teksta.
  * Konstruisanje mreže rečenica koje se bave sličnim pojmovima. Kada korisnik pita za jedan pojam, traže se rečenice koje takođe govore o istoj klasi kojoj pripada pojam, pa odgovor može da sadrži više rečenica, a ne samo jednu, koje se prirodno nastavljaju jedna na drugu.
  * Provera korektnog unosa engleskih reči i ispravke čestih grešaka.
  * Izmena rečenice teksta da bude prilagođena pitanju. Na primer, kada neko pita tkzv. YES/NO pitanje, očekuje se eksplicitan odgovor.
  * Serviranje negaitvnih odgovora. Tekst pruža informacije o nečemu šta se radi. Potrebno je razumeti negaciju toga u kontekstu značenja rečenice i pružiti odgovor. Na primer, na pitanje "da li se bavite slikanjem?", bot bi trebalo da odgovori sa "Ne, ...", ako je u tekstu definisano da se bavimo programiranjem.
  * Značajno bolja klasifikacija pitanja na osnovu `Wh` reči. Detektovati pitanja koju se postavljaju na ovaj način.

Toliko za sada, vreme je da bota stavim na spavanje.
