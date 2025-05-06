/**
 * En klass som gör att användaren kan översätta text från vanlig svenska till rövarspråket.
 * Användaren skriver eller kopierar in texten och trycker på knappen "Översätt".
 * @author Emmelie Johansson
 */
class Translator {
    constructor() {
        // Hämtar elementens elementobjekt
        this.inputField = document.getElementById("input_field");
        this.outputField = document.getElementById("output_field");
        this.buttonTranslate1 = document.getElementById("button_translate1");
        this.buttonTranslate2 = document.getElementById("button_translate2");
        // En array med alfabetets konsonanter, versala och gemena
        this.cons = ["b", "B", "d", "D", "f", "F", "g", "G", "h", "H", "j", "J", "k", "K",
            "l", "L", "m", "M", "n", "N", "p", "P", "q", "Q", "r", "R", "s", "S", "t", "T",
            "v", "V", "w", "W", "z", "Z", "ʃ"];
        // En array med alfabetets vokaler
        this.vowel = ["a", "A", "o", "O", "u", "U", "å", "Å", "e", "E", "i", "I", "y", "Y", "ä", "Ä", "ö", "Ö"];
        // En array med alfabetets hård"a vokaler
        this.vowelHard = ["a", "A", "o", "O", "u", "U", "å", "Å"];
        // En array med alfabetets mjuka vokaler
        this.vowelSoft = ["e", "E", "i", "I", "y", "Y", "ä", "Ä", "ö", "Ö"];

        /* Lista med tecken som byts ut. Enligt reglerna för rövarspråket ska "x" bli 
        till "ks", "ck" bli till "kk" och "och" bli till "ok". Sje- och tj-ljudet ska behandlas 
        som en konsonant, som här betecknas "ʃ". */
        this.replacements = [
            [/X/g, "Ks"],
            [/x/g, "ks"],
            // Ck förekommer aldrig i början av ord
            [/ck/gi, "kk"],
            [/Och\s/g, "Ok "],
            // Mellanslag före för att undvika ord som Loch i t.ex. Loch Ness
            [/\soch/gi, " ok"],
            [/Stj/gi, "ʃ"],
            [/Ssj/gi, "ʃ"],
            [/Sj/gi, "ʃ"],
            [/Tj/gi, "ʃ"],
            [/Tch/gi, "tʃ"],
            [/sch/gi, "ʃ"],
            [/Sch/gi, "ʃ"],
            [/Sh/gi, "ʃ"],
            [/Skj/gi, "ʃ"],
            [/Kj/gi, "ʃ"],
            [/Ske/gi, "ʃe"],
            [/Ski/gi, "ʃi"],
            [/Sky/gi, "ʃy"],
            [/Skä/gi, "ʃä"],
            [/Skö/gi, "ʃö"],
        ];
    
        /* Funktioner som körs när användaren trycker på knappen (knapp1 eller knapp2 visas 
        beroende på skärmstorlek) */
        this.buttonTranslate1.addEventListener("click", () => {
            this.translate();
        });
    
        this.buttonTranslate2.addEventListener("click", () => {
            this.translate();
        });
    }
  
    /* Funktion som byter ut tecken. 
    * @param text - text som användaren matat in
    * @return replacedText - texten med tecknen utbytta
    */
    replace(text) {
        let replacedText = text;
        for (const [pattern, replacement] of this.replacements) {
            replacedText = replacedText.replace(pattern, replacement);
        }
        return replacedText;
    }
  
    /* Funktion som tar hänsyn till vissa specialregler som gäller när c följs av vokal eller h
    * @param textArr - lista med tecknen från den text som användaren matat in, fast med vissa
    * tecken utbytta enligt funktionen replace(text).
    * @return newTextArray - lista med tecknen från textArr fast med justeringar
    * gjorda för c då c följs av vokal eller h
    */
    changeChandC(textArr) {
        const newTextArr = [];
    
        for (let i = 0; i < textArr.length; i++) {
            const currentChar = textArr[i];
            const nextChar = textArr[i + 1];
            const previousChar = textArr[i - 1];
            // Justeringar görs när c följs av h
            if (currentChar === "h" || currentChar === "H") {
                if ((previousChar === "C" || previousChar === "c") && this.vowel.includes(nextChar)) {
                    newTextArr.pop();
                    // c + h + vokal blir till ʃ
                    newTextArr.push("ʃ");
                } else if (previousChar === "C") {
                    newTextArr.pop();
                    // C + h blir till K
                    newTextArr.push("K");
                } else if (previousChar === "c") {
                    newTextArr.pop();
                    // c + h blir till k
                    newTextArr.push("k");
                } else {
                    // Om h inte föregås av c görs ingen ändring
                    newTextArr.push(currentChar);
                }
            // Justeringar görs när c följs av mjuk respektive hård vokal
            } else if (currentChar === "C") {
                if (this.vowelSoft.includes(nextChar)) {
                    // C följd av mjuk vokal blir till S
                    newTextArr.push("S");
                } else {
                    // C följd av hård vokal blir till K
                    newTextArr.push("K");
                }
            } else if (currentChar === "c") {
                if (this.vowelSoft.includes(nextChar)) {
                    // c följd av mjuk vokal blir till s
                    newTextArr.push("s");
                } else {
                    // c följd av hård vokal blir till k
                    newTextArr.push("k");
                }
            } else {
                // För alla andra tecken görs ingen ändring
                newTextArr.push(currentChar);
            }
        }
        // Den nya listan returneras
        return newTextArr;
    }
    
    /* Funktion som översätter till rövarspråket
    * @param newTextArr - lista med tecknen från den text som användaren matat in, fast med
    * vissa tecken utbytta enligt funktionen replace() och andra enligt funktionen 
    * changeChandC()
    * @return newText - string med den översatta texten
    */
    translateText(newTextArr) {
        let newText = "";
        for (const element of newTextArr) {
            const currentChar = element;
            newText += currentChar;
            if (this.cons.includes(currentChar)) {
                newText += "o" + currentChar.toLowerCase();
            }
        }
      return newText;
    }
  
    /* Funktion som hämtar den text som användaren matat in, kör funktionen replace(), 
    * delar upp strängen i tecken som sparas i en lista, kör funktionen changeChandC()
    * och funktionen translateText() och slutligen skriver ut den översatta texten i output-
    * fältet
    */
    translate() {
        const text = this.inputField.value;
        const replacedText = this.replace(text);
        const textArr = Array.from(replacedText);
        const newTextArr = this.changeChandC(textArr);
        const translatedText = this.translateText(newTextArr);
        this.outputField.innerHTML = translatedText;
    }
}