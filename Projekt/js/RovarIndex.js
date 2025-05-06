/**
 * Indexfil som initierar programmets klasser.
 * @author Emmelie Johansson
 */

class RovarIndex {

    constructor() { 
        this.Translator = new Translator()
        this.Test = new Test()
        this.StickyNavbar = new StickyNavbar()
    }
}

const RovarApp = new RovarIndex()