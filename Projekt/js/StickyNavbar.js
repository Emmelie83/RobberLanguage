/**
 * En klass med en "sticky" navigationsmeny när användaren skrollar och tar bort
 * densamma när användaren skrollar tillbaka högst upp på sidan.
 * Till min hjälp tog jag https://alvarotrigo.com/blog/sticky-navbar/
 * @author Emmelie Johansson
 */

class StickyNavbar {
    constructor() {
        // Hämtar elementens elementobjekt
        this.navbar = document.getElementById("navbar");
        this.siteHeading = document.getElementById("site_heading");
        // Hämtar avståndet mellan elementets övre del och viewportens övre del
        this.navPos = this.navbar.getBoundingClientRect().top;
        // Deklarerar en variabel för om menyn är sticky eller ej och initierar den till false
        this.isSticky = false;
    
        /* Funktion som undersöker om sidan har skrollats i Y-led eller inte och om menyn
        redan är sticky eller inte och som tillämpar olika klasser beroende på detta som
        gör menyn sticky eller inte */
        this.handleScroll = () => {
             // Hämtar hur många pixlar sidan har skrollats vertikalt
            let scrollPos = window.scrollY;
            /* Om sidan har skrollats vertikalt tillämpas klasserna "sticky"
             och "navbar_offset_margin" om dessa inte redan är tillämpade*/
            if (scrollPos > this.navPos && !this.isSticky) {
                this.navbar.classList.add("sticky");
                this.siteHeading.classList.add("navbar_offset_margin");
                // Menyn är nu sticky
                this.isSticky = true;
            /* Om menyn befinner sig högst upp i viewporten och menyn är sticky tas klasserna
            "sticky" och "navbar_offset_margin" bort */
            } else if (scrollPos <= this.navPos && this.isSticky) {
                this.navbar.classList.remove("sticky");
                this.siteHeading.classList.remove("navbar_offset_margin");
                // Menyn är inte längre sticky
                this.isSticky = false;
            }
        };
        // Funktionen handleScroll körs när användaren skrollar på sidan
      window.addEventListener("scroll", this.handleScroll);
    }
}
