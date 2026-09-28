/* =========================================
   1. HÄMTA HTML-ELEMENTET
   ========================================= */
// Vi hämtar HTML-sektionen vi nyss gav ID:t "produkt-lista" och sparar den i en variabel
const productContainer = document.getElementById("produkt-lista");

/* =========================================
   2. FUNKTION FÖR ATT HÄMTA JSON-DATA
   ========================================= */
// Vi skapar en asynkron funktion (async) eftersom nätverksanrop tar lite tid att genomföra
async function getProducts() {
    // Vi använder 'try' för att testa koden, så att programmet inte kraschar om filen saknas
    try {
        // 'fetch' ber webbläsaren att läsa in "produkter.json". 'await' pausar koden tills filen är hittad.
        const response = await fetch("produkter.json");

        // Vi omvandlar (parsar) texten från JSON-filen till ett äkta JavaScript-objekt. Vi 'await' tills det är klart.
        const data = await response.json();

        // JSON-filen har en huvudlista som heter "produkter". Vi sparar den listan i en egen variabel.
        const productsArray = data.produkter;

        // Vi skickar vår färdiga lista med produkter till funktionen som ska rita ut dem på webbsidan
        renderProducts(productsArray);

    } catch (error) {
        // Om 'try'-blocket misslyckas (t.ex. stavfel i filnamnet) fångas felet upp här (catch)
        // Vi skriver ut ett felmeddelande i utvecklarkonsolen (F12) så att vi som utvecklare kan felsöka
        console.error("Ett fel uppstod när produkterna skulle hämtas:", error);
    }
}

/* =========================================
   3. FUNKTION FÖR ATT SKAPA HTML (RENDERA)
   ========================================= */
// Denna funktion tar emot vår lista (array) med produkter som argument
function renderProducts(products) {
    // Vi tömmer först vår <section> på all gammal HTML så att vi börjar med ett blankt papper
    productContainer.innerHTML = "";

    // Vi startar en loop (forEach) som går igenom varje enskild produkt i listan, en i taget
    products.forEach(function (produkt) {

        // För varje produkt skapar vi ett nytt, tomt HTML-element av typen <article> i datorns minne
        const articleElement = document.createElement("article");

        // Vi fyller vår <article> med HTML-kod och skjuter in produktens specifika data via variabler (${...})
        articleElement.innerHTML = `
            <!-- Vi hämtar sökvägen till bilden från JSON-filen och använder produktens namn som alt-text -->
            <img src="${produkt.bild}" alt="${produkt.namn}" />
            
            <!-- Vi skapar en rubrik (h2) där vi lägger in produktens namn -->
            <h2>${produkt.namn}</h2>
            
            <!-- Vi lägger in produktens beskrivning i en textparagraf (p) -->
            <p>${produkt.beskrivning}</p>
            
            <!-- Vi lägger in produktens pris och lägger till texten 'kr' manuellt efter siffran -->
            <p class="pris"><strong>Pris:</strong> ${produkt.pris} kr</p>
        `;

        // När vår <article> är färdigbyggd, stoppar vi in den (appendChild) i vår <section> på webbsidan
        productContainer.appendChild(articleElement);
    });
}

/* =========================================
   4. STARTA PROGRAMMET
   ========================================= */
// När JavaScript-filen laddas in av webbläsaren, ropar vi direkt på funktionen så att hela processen startar
getProducts();