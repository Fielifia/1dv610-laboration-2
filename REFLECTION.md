# Reflektion: Laboration 2 – Skriv en modul, inte en app

<!--
    Komplettera filen och lämna in den tillsammans med din Merge Request.
    Du får skriva på svenska eller engelska.
-->

## 1. Namngivning

| Namn | Förklaring | Reflektion och regler från Clean Code |
| ---- | ---------- | -------------------------------------- |
| `Validation` | Klassen ansvarar för att hålla ihop valideringen av flera fält och skapa ett resultat. | Namnet beskriver tydligt vad klassen representerar och är ett substantiv, vilket stämmer med Clean-Code-principen att klasser ska ha namn som beskriver vad de är. |
| `ValidationError` | Representerar ett fel som uppstår när en regel inte uppfylls. | Namnet är tydligt och specifikt. Det hade varit mindre tydligt att bara kalla klassen `Error`, eftersom det inte hade framgått att det handlar om ett valideringsfel. |
| `identifier` | Identifierar ett fält inom en `Validation`. | Jag tycker att `identifier` är bättre än exempelvis `name`, eftersom värdet används som en identifierare för fältet och även motsvarar nyckeln i formulärdatan. |
| `errorMessage` | Innehåller meddelandet som ska visas när en regel inte uppfylls. | Namnet beskriver både vad värdet är och vad det används till. Det följer principen att namn ska avslöja intentionen. |
| `fields` | Innehåller de fält som har lagts till i en `Validation`. | Namnet är enkelt och tydligt och beskriver vad variabeln innehållet utan onödig information. |


*Upptäckte du någon brist i din egen namngivning när du läste kapitlet om namngivning? Höll du med
om alla "reglerna", eller finns det någon du ifrågasätter?*

Svar:

Jag upptäckte framför allt att bra namn blir extra viktiga när koden ska användas av andra programmerare. I början var det lätt att använda korta namn som känns självklara när man själv skriver koden, men som inte säger lika mycket när någon annan ska förstå den.

Jag håller med om principen att namn ska vara tydliga och beskriva sin avsikt. Jag tycker också att namn på klasser, metoder och variabler bör vara konsekventa så att man kan förstå hur de hänger ihop. Samtidigt tycker jag inte att ett namn alltid behöver vara så kort som möjligt. `requiredRuleInstance` är exempelvis längre än `Rule`, men i det sammanhanget tycker jag att det längre namnet gör koden lättare att förstå.

Planeringen jag gjorde innan implementationen påverkade namngivningen positivt. Genom att först skriva ner och analysera vilka klasser och delar modulen skulle bestå av blev det lättare att fundera över vad de faktiskt representerade och därför vilka namn som passade.

Jag märkte också att det är lättare att bedöma namngivning i efterhand än medan man skriver koden. När strukturen på modulen blev tydligare blev det också lättare att se vilka namn som faktiskt beskrev ansvar och beteende.

## 2. Funktioner

| Metodnamn | Länk eller kod | Antal rader (ej ws) | Reflektion |
| --------- | --------------- | -------------------- | ---------- |
| `Validation.validate()` | `src/Validation.js` | 29 | Metoden har flera ansvarsområden eftersom den både hanterar tomma värden, hittar `RequiredRule`, kör regler och skapar fel. Jag försökte ändå hålla ansvaret inom själva valideringsflödet. |
| `Validation.addField()` | `src/Validation.js` | 6 | Metoden har ett tydligt ansvar: kontrollera att identifieraren är unik och lägga till fältet. Den är liten och lätt att förstå. |
| `Validation.removeField()` | `src/Validation.js` | 6 | Metoden gör en sak och har ett tydligt namn. Den returnerar inget extra resultat när fältet inte finns, vilket gör användningen enkel. |
| `Field.addRule()` | `src/Field.js` | 6 | Metoden kontrollerar att samma regeltyp inte läggs till flera gånger och lägger sedan till regeln. Jag tycker att namnet beskriver exakt vad metoden gör. |
| `Result – constructor` | `src/Result.js` | 4 | Konstruktorn initierar resultatets status och lista över fel. Den är liten och har ett tydligt ansvar. |


*Upptäckte du någon brist i hur du tidigare skrivit funktioner/metoder när du läste kapitlet om
funktioner? Höll du med om alla "reglerna", eller finns det någon du ifrågasätter?*

Svar:

Jag upptäckte framför allt hur lätt en metod kan börja göra flera saker när funktionaliteten växer. Det tydligaste exemplet i min kod är `Validation.validate()`. Den behöver hantera hela valideringsflödet och är därför betydligt längre än de flesta andra metoder.

Jag håller med om principen att funktioner helst ska göra en sak och vara så små som det är rimligt. Samtidigt tycker jag att det finns situationer där en längre metod kan vara tydligare än att dela upp ett enkelt flöde i många små metoder. I `validate()` blir själva ordningen på valideringen viktig: först kontrolleras om fältet är tomt, sedan hanteras `RequiredRule`, och annars körs reglerna. Att se detta samlat gör flödet lättare för mig att följa.

Att planera klassernas och metodernas ansvar innan implementationen gjorde det lättare att tänka på vad varje metod faktiskt skulle ansvara för. Jag upplevde att det minskade risken för att en metod skulle börja göra flera olika saker.

Jag har också blivit mer uppmärksam på att metodnamn ska beskriva vad metoden gör och inte hur den gör det. `validate()`, `addField()` och `addRule` är exempel där användningen av modulen blir tydlig utan att programmeraren behöver känna till implementationen.

## 3. Din kodkvalitet

*Beskriv dina erfarenheter av att arbeta med din egen kodkvalitet i den här laborationen. Använd
vedertagna begrepp. (Cirka en halv sida.)*

Svar:

Att arbeta med kodkvalitet i den här laborationen gjorde att jag behövde tänka mer på koden som en produkt som någon annan programmerare ska kunna använda och förstå. I en vanlig app kan det vara lättare att fokusera på att funktionaliteten fungerar, men här behövde jag även tänka på bland annat ansvarsfördelning, läsbarhet, namngivning, återanvändbarhet och hur de olika delarna av modulen samarbetar.

Jag använde objektorientering genom att dela upp ansvaret mellan `Validation`, `Field`, `Rule`, `Result` och `ValidationError`. Det gjorde att de olika delarna fick tydligare ansvar. Reglerna ligger exempelvis i olika `Rule`-klasser istället för att valideringslogik ligger i en enda stor funktion.

En stor skillnad i mitt arbetssätt den här gången var att jag **planerade betydligt mer innan jag började implementera**. Jag analyserade problemet och planerade vilka klasser, metoder och relationer jag behövde. Jag upplevde att jag arbetade bättre på det sättet och att själva implementationen blev lättare när jag redan hade tänkt igenom strukturen innan jag började skriva koden.

Jag tycker också att det här är ett arbetssätt som jag gärna vill fortsätta utvecklas inom. Jag uppskattar själv tydlighet, struktur och att saker är organiserade på ett sätt som gör dem lätta att förstå. Därför känns det naturligt för mig att försöka skapa samma typ av tydlighet i den kod jag skriver. Jag upplever att planeringen inte bara hjälpte mig att hålla ordning på arbetet, utan också gjorde det lättare att upptäcka vad som faktiskt hörde hemma i modulen och vad som inte gjorde det.

Jag upptäckte samtidigt att det är svårt att avgöra kodkvalitet enbart genom att se om testerna passerar. Tester visar att beteendet fungerar för de fall som testats, men säger inte automatiskt att koden har bra struktur eller är lätt att underhålla. Därför har jag behövt granska exempelvis namn, metodernas storlek och hur klasserna samarbetar.

En sak jag blev mer medveten om är att enkelhet är viktig även när en lösning fungerar. Under arbetet har jag därför försökt undvika att lägga till funktionalitet som inte behövs för modulens ansvar. Jag tycker också att tydliga felmeddelanden och tydliga felobjekt gör modulen lättare för andra programmerare att använda.

## 4. Att skriva en modul

*Hur var det att skriva kod för andra programmerare istället för en app med egna slutanvändare?
Vad blev din USP, och ändrades den under arbetets gång?*

Svar:

Det var en skillnad att tänka på andra programmerare som målgrupp istället för slutanvändaren. Jag behövde framför allt tänka på vilket gränssnitt modulen skulle erbjuda och vad programmeraren skulle behöva göra själv respektive vad modulen skulle ansvara för.

Planeringen blev också viktig eftersom jag behövde tänka på modulen som något som skulle användas av andra programmerare. Genom att först analysera vilka delar som skulle ligga i modulen och hur de skulle samarbeta kunde jag tydligare skilja mellan modulens och Test-Appens ansvar.

Min USP blev att programmeraren ska kunna konfigurera vilka fält och regler som ska användas utan att behöva implementera själva valideringslogiken för varje formulär. Modulen tar emot formulärdata, kör de regler som programmeraren har konfigurerat och returnerar ett resultat med eventuella valideringsfel.

USP:n förändrades inte i grunden under arbetet, men den blev tydligare. Från början var fokus främst på att skapa olika valideringsregler. Under arbetet blev det tydligare att det viktigaste inte bara var antalet regler, utan att reglerna skulle kunna kombineras och användas genom en återanvändbar struktur med `Validation`, `Field`, `Rule` och `Result`.

Jag behövde också tydligare avgränsa vad modulen inte skulle göra. Den ska exempelvis inte skapa formulärets UI eller bestämma hur felmeddelanden visas för slutanvändaren. Det ansvaret ligger hos applikationen som använder modulen.

## 5. Testning

*Vilket av testalternativen valde du, och varför? Vad var svårast att testa i din modul?*

Svar:

Jag började med att skriva tester för mig själv under implementationens gång för att kontrollera att de olika valideringsreglerna fungerade som de skulle. Det gjorde att jag kunde testa reglerna medan jag utvecklade dem och upptäcka problem.

Efter det skapade jag en liten Test-App, **Form Validation Playground**, för att testa modulen i en faktisk applikation. Där kunde jag se hur modulen fungerade tillsammans med ett formulär och hur valideringsresultatet kunde användas av applikationen. Jag valde att behålla Test-Appen även efter att jag bestämde mig för att använda automatiserade tester.

Som slutlig testlösning valde jag **automatiserade tester med JavaScript och Node.js**. Jag valde detta eftersom modulen består av valideringslogik och lämpar sig bra för automatiserade tester. Det går snabbt att köra testerna igen efter förändringar och resultatet blir tydligt när alla tester körs tillsammans. Jag har totalt 36 automatiserade tester och alla passerar.

**Den tidigare planeringen hjälpte även vid testningen**. När jag hade planerat vad modulen skulle göra och vilka beteenden och regler den skulle stödja blev det lättare att identifiera olika testfall, särskilt gränsfall och situationer där flera regler eller fält påverkar samma resultat.

Det svåraste var inte att testa att en enskild regel fungerar, utan att testa hur flera delar av modulen fungerar tillsammans. Exempelvis behövde jag testa att flera regler kan användas på samma fält, att flera fel kan samlas i samma `Result` och att ett tomt obligatoriskt fält bara ger ett fel från `RequiredRule` istället för att även försöka köra övriga regler.

Jag behövde också testa konfigurationsfel, exempelvis att samma fältidentifierare inte kan läggas till flera gånger och att samma regeltyp inte kan läggas till flera gånger på ett fält. Dessa tester gjorde att jag fick testa mer än bara de positiva fallen där all indata är korrekt.

## 6. AI-samarbete

*Använde du AI-assistenter (t.ex. ChatGPT, GitHub Copilot, Claude) annorlunda i den här
laborationen jämfört med laboration 1 — nu när uppgiften är en större, mer kvalitetskänslig modul
snarare än ett enkelt program? Var det till exempel till mer eller mindre hjälp vid design,
testning eller kodkvalitetsreflektionerna, eller valde du bort AI i delar där du använde det förra
gången?*

Svar:

Jag använde AI mer som ett diskussions- och granskningsverktyg än som en källa till färdig implementation. Eftersom laborationen handlar om att skriva en modul med fokus på kodkvalitet använde jag AI för att diskutera design, ansvarsfördelning mellan klasser, testfall och hur olika lösningar kunde påverka modulens återanvändbarhet.

AI var också ett stöd under analys- och planeringsfasen. Jag kunde exempelvis be om skelett och exempel på liknande lösningar för att få bättre förståelse för hur en viss typ av struktur kunde se ut. Jag bad då om exempel som var fristående från min egen kod och mitt eget problem, så att jag inte fick en färdig lösning utan exempel för att förstå principen och sedan själv analysera hur jag ville strukturera min egen modul.

Jag har även använt AI för att resonera kring min egen kod och upptäcka potentiella problem, exempelvis hur `Validation`, `Field`, `Rule` och `Result` borde samarbeta och vilka beteenden som borde testas. Det hjälpte mig framför att formulera frågor jag sedan kunde undersöka och lösa själv.

Samtidigt använde jag Google mycket under arbetet för att själv söka efter information, exempel på syntax och möjliga lösningar på specifika programmeringsproblem. I flera situationer valde jag medvetet att försöka hitta och förstå lösningen själv genom dokumentation, sökresultat och olika exempel, istället för att ta den snabbare vägen och fråga AI direkt. Det gjorde att jag fick träna mer på att själv söka information och avgöra vilka lösningar som var relevanta för mitt problem.

Jag valde att inte använda AI för att generera implementationen av modulen. Jag skrev själv koden och använde AI som stöd för förståelse, problemlösning och granskning. För mig blev detta särskilt viktigt i den här laborationen eftersom uppgiften inte bara bedömer hur koden fungerar, utan även hur den är strukturerad, namngiven, testad och dokumenterad.

Jämfört med laboration 1 upplevde jag därför att AI blev mer användbart för att diskutera och förstå design och kodkvalitet än för att direkt lösa programmeringsproblemen. Jag har därför fokuserat mycket på gränsen mellan att få hjälp att förstå en princip och att få en lösning på själva uppgiften.
