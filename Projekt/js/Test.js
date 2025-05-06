/**
 * En klass som gör att användaren kan testa sina kunskaper i rövarspråket. Programmet slumpar
 * fram sex fraser på rövarspråket som användaren ska översätta till vanlig svenska.
 * När testet är gjort får användaren ett omdöme och ett antal guldpengar motsvarande 
 * antalet rätt. Om användaren inte hade något rätt visas en bild på en krabba.
 *
 * @author Emmelie Johansson
 */

class Test {
    constructor() {
        //En lista med fraser på rövarspråket (kan byggas ut utan problem)
        this.testArray = [
            "ʃoʃu ʃoʃukoka ʃoʃömomänon",
            "lolanondodkokrorabobboba",
            "Lolanondod i sosikoktote",
            "Alollole momanon popå dodäkokkok",
            "Fofemomtotonon gogasostotaror popå dodödod momanonsos kokisostota",
            "Hohejoj okok hohå okok enon foflolasoskoka momedod roromom",
            "Gogå popå poplolanonkokanon",
            "Jojagog momåsostote momatota mominon popapopegogojoja",
            "Hohisossosa sosegogelol",
            "Kokasostota anonkokaror",
            "Dodetot kokloliaror i ʃoʃägoggogetot",
            "Momitottot totroräbobenon äror sosnonygoggogarore änon doditottot"
        ];

        //En lista med motsvarande fraser på vanlig svenska
        this.correctArray = [
            "Sju sjuka sjömän",
            "landkrabba",
            "Land i sikte",
            "Alle man på däck",
            "Femton gastar på död mans kista",
            "Hej och hå och en flaska med rom",
            "Gå på plankan",
            "Jag måste mata min papegoja",
            "Hissa segel",
            "Kasta ankar",
            "Det kliar i skägget",
            "Mitt träben är snyggare än ditt"
        ];

        // Hämtar elementens elementobjekt
        this.buttonStartTest = document.getElementById("button_start_test");
        this.buttonAnswer = document.getElementById("button_answer");
        this.question = document.getElementById("question");
        this.answer = document.getElementById("answer");
        this.testIntro = document.getElementById("test_intro");
        this.questionNumber = document.getElementById("question_number");
        this.testAction = document.getElementById("test_action");
        this.testResultText = document.getElementById("test_result_text");
        this.coins = document.getElementById("test_result_coins");
        
        // Deklarerar och initierar variabler
        this.count = 0;
        this.wins = 0;
        this.index = 0;
        this.numberArray = [];
        
        //Funktioner som körs när användaren trycker på start- respektive svarsknappen
        this.buttonStartTest.addEventListener("click", () => this.buttonStartTestHandler());
        this.buttonAnswer.addEventListener("click", () => this.buttonAnswerHandler());
    }

    /* Funktion som slumpmässigt hämtar sex olika tal i ett intervall motsvarande listornas
    * index (i det här fallet alltså 0 till 11 -- men om listorna byggs på med fraser ändras
    * intervallet).
    * @return numberArray - en lista med sex framslumpade tal
    */
    getNumbers() {
        // En ny lista skapas
        const numberArray = [];
        let i = 0;

        while (i < 6) {
            const number = Math.floor(Math.random() * this.testArray.length);
            // Talet läggs endast till den nya listan om det inte har slumpats fram förut
            if (!numberArray.includes(number)) {
                numberArray.push(number);
                i++;
            }
        }
        // Listan med sex tal returneras
        return numberArray;
    }

  
/* Funktion som körs när användaren trycker på start-knappen.
*/
    buttonStartTestHandler() {
        // Om testet har körts tidigare nollställs testresultatet ...
        this.testResultText.innerHTML = "";
        // ... liksom bilderna tas bort
        this.coins.innerHTML = "";
        // Introtexten döljs ... 
        this.testIntro.style.display = "none";
        // ... liksom startknappen
        this.buttonStartTest.style.display = "none";
        // Själva testet visas
        this.testAction.style.display = "block";

        // Numren motsvarande listornas index hämtas
        this.numberArray = this.getNumbers();
        this.count = 0;
        this.wins = 0;
        // Första indexet för listorna tas fram
        this.index = this.numberArray[this.count];
        // Första frasen visas
        this.question.innerHTML = this.testArray[this.index];
        // Text skrivs ut
        this.questionNumber.innerHTML = "Fråga 1";
        // Svarsrutan nollställs
        this.answer.value = "";
    }

    /* Funktion som körs när användaren trycker på svara-knappen.
    */
    buttonAnswerHandler() {
        // Hämtar användarens svar
        const guess = this.answer.value;
        /* Kontrollerar om svaret överensstämmer med frasen i svarslistan (ingen hänsyn
        tas till stor eller liten bokstav) */
        if (guess.toLowerCase() === this.correctArray[this.index].toLowerCase()) {
            // Om svaret är rätt ökar wins med 1
            this.wins++;
        }
        // Räknaren ökar med 1
        this.count++;
        // Loopar så länge som count är mindre än sex
        if (this.count < 6) {
            // Hämtar index från listan med tal
            this.index = this.numberArray[this.count];
            // Skriver ut vilken fråga det rör sig om
            this.questionNumber.innerHTML = "Fråga " + (this.count + 1);
            // Skriver ut den fras som finns på det index som hämtats
            this.question.innerHTML = this.testArray[this.index];
            // Nollställer svarsrutan
            this.answer.value = "";
        // Efter sex frågor skrivs resultatet ut
        } else {
            // Först skrivs ett omdöme ut
            if (this.wins === 0) {
                this.testResultText.innerHTML = "Arrrrg. Dig borde man nästan kölhala!";
            } else if (this.wins === 1) {
                this.testResultText.innerHTML = "Ojdå, du får nog öva lite!";
            } else if (this.wins <= 3) {
                this.testResultText.innerHTML = "Helt ok.";
            } else if (this.wins <= 5) {
                this.testResultText.innerHTML = "Bra jobbat!";
            } else {
                this.testResultText.innerHTML = "Alldeles utmärkt!";
            }
            // Sedan hur många rätt användaren fick
            this.testResultText.innerHTML +=
            "<br> Du fick " + this.wins + " rätt av 6 ";
            /* Om användaren fick 0 rätt kallas hen för landkrabba och en bild på en 
            krabba visas*/
            if (this.wins === 0) {
                this.testResultText.innerHTML += "din landkrabba.";
                this.coins.innerHTML +=
                '<img id="crab" src="pictures/crab.png" alt="En krabba">';
            }
            // Vid fler än 0 rätt visas guldmynt motsvarande antalet rätt svar
            for (let i = 0; i < this.wins; i++) {
                this.coins.innerHTML +=
                '<img id="coin" src="pictures/coin.png" alt="Ett guldmynt">';
            }
            // Själva testet döljs
            this.testAction.style.display = "none";
            // Startknappen visas
            this.buttonStartTest.style.display = "block";
            // Texten på startknappen ändras
            this.buttonStartTest.innerText = "Börja om";
        }
    }
}