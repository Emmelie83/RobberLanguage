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
      this.cons = [
        "b", "B", "d", "D", "f", "F", "g", "G", "h", "H", "j", "J",
        "k", "K", "l", "L", "m", "M", "n", "N", "p", "P", "q", "Q",
        "r", "R", "s", "S", "t", "T", "v", "V", "w", "W", "z", "Z",
        "🦅", "🐥", "♛", "♚", "♜", "♝", "☠", "☃", "⚓", "⚓︎", "🎯", "🎯︎",
        "⚡", "⚡︎", "☢", "☣", "♞", "♘", "♟", "♙", "🔪", "🗡️"
        ];
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
        [/\soch/gi, " ok"],

        [/Ch/g, "🦅"],  
        [/ch/g, "🐥"],   

        [/Stj/g, "♛"],
        [/stj/g, "♚"],

        [/Tch/g, "♜"],
        [/tch/g, "♝"],

        [/Ssj/g, "☠"],
        [/ssj/g, "☃"],

        [/Sj/g, "⚓"],
        [/sj/g, "⚓︎"], 

        [/Tj/g, "🎯"],
        [/tj/g, "🎯︎"],

        [/Sch/g, "⚡"],
        [/sch/g, "⚡︎"],

        [/Sh/g, "☢"],
        [/sh/g, "☣"],

        [/Skj/g, "♞"],
        [/skj/g, "♘"],

        [/Kj/g, "♟"],
        [/kj/g, "♙"],

        [/Ske/g, "🔪e"],
        [/ske/g, "🗡️e"],
        [/Ski/g, "🔪i"],
        [/ski/g, "🗡️i"],
        [/Sky/g, "🔪y"],
        [/sky/g, "🗡️y"],
        [/Skä/g, "🔪ä"],
        [/skä/g, "🗡️ä"],
        [/Skö/g, "🔪ö"],
        [/skö/g, "🗡️ö"]
      ];
      
      this.reverseReplacements = [
        [/🦅/g, "Ch"],
        [/🐥/g, "ch"],

        [/♛/g, "Stj"],
        [/♚/g, "stj"],

        [/♜/g, "Tch"],
        [/♝/g, "tch"],

        [/☠/g, "Ssj"],
        [/☃/g, "ssj"],

        [/⚓/g, "Sj"],
        [/⚓︎/g, "sj"],

        [/🎯/g, "Tj"],
        [/🎯︎/g, "tj"],

        [/⚡/g, "Sch"],
        [/⚡︎/g, "sch"],

        [/☢/g, "Sh"],
        [/☣/g, "sh"],

        [/♞/g, "Skj"],
        [/♘/g, "skj"],

        [/♟/g, "Kj"],
        [/♙/g, "kj"],

        [/🔪e/g, "Ske"],
        [/🗡️e/g, "ske"],
        [/🔪i/g, "Ski"],
        [/🗡️i/g, "ski"],
        [/🔪y/g, "Sky"],
        [/🗡️y/g, "sky"],
        [/🔪ä/g, "Skä"],
        [/🗡️ä/g, "skä"],
        [/🔪ö/g, "Skö"],
        [/🗡️ö/g, "skö"]
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
  
    /* Funktion som tar hänsyn till vissa specialregler som gäller när c följs av vokal
    * @param textArr - lista med tecknen från den text som användaren matat in, fast med vissa
    * tecken utbytta enligt funktionen replace(text).
    * @return newTextArray - lista med tecknen från textArr fast med justeringar
    * gjorda för c då c följs av vokal
    */
    changeC(textArr) {
        const newTextArrWithIcons = [];
    
        for (let i = 0; i < textArr.length; i++) {
            const currentChar = textArr[i];
            const nextChar = textArr[i + 1];
            const previousChar = textArr[i - 1];
            if (currentChar === "C") {
                if (this.vowelSoft.includes(nextChar)) {
                    // C följd av mjuk vokal blir till S
                  newTextArrWithIcons.push("S");
                } else {
                    // C följd av hård vokal blir till K
                  newTextArrWithIcons.push("K");
                }
            } else if (currentChar === "c") {
                if (this.vowelSoft.includes(nextChar)) {
                    // c följd av mjuk vokal blir till s
                  newTextArrWithIcons.push("s");
                } else {
                    // c följd av hård vokal blir till k
                  newTextArrWithIcons.push("k");
                }
            } else {
                // För alla andra tecken görs ingen ändring
              newTextArrWithIcons.push(currentChar);
            }
        }
        // Den nya listan returneras
        return newTextArrWithIcons;
    }
    
    /* Funktion som översätter till rövarspråket
    * @param newTextArrWithIcons - lista med tecknen från den text som användaren matat in, fast med
    * vissa tecken utbytta enligt funktionen replace() och andra enligt funktionen 
    * changeC()
    * @return translatedTextArr - string med den översatta texten
    */
  translateTextWithIcons(newTextArrWithIcons) {
        let translatedText = "";
    for (const element of newTextArrWithIcons) {
            const currentChar = element;
      translatedText += currentChar;
            if (this.cons.includes(currentChar)) {
              translatedText += "o" + currentChar.toLowerCase();
            }
        }
      return translatedText;
  }
  
  reverse(translatedText) {
    let reversedText = translatedText;
    for (const [pattern, reverseReplacement] of this.reverseReplacements) {
      reversedText = reversedText.replace(pattern, reverseReplacement);
    }
    return reversedText;
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
        const newTextArr = this.changeC(textArr);
        const translatedText = this.translateTextWithIcons(newTextArr);
        const reversedText = this.reverse(translatedText)
        this.outputField.innerHTML = reversedText;
    }
}