
// ========================================
// ELEMENTOS
// ========================================

const bookElement = document.getElementById("book");
const pageCounter = document.getElementById("pageCounter");

const previousButton = document.getElementById("previousPage");
const nextButton = document.getElementById("nextPage");


// ========================================
// CONFIGURACIÓN DEL LIBRO
// ========================================

const pageFlip = new St.PageFlip(bookElement, {

    width: 480,
    height: 620,

    size: "stretch",

    minWidth: 280,
    maxWidth: 960,

    minHeight: 360,
    maxHeight: 800,

    drawShadow: true,
    flippingTime: 950,

    // Permitir formato vertical en celulares
    usePortrait: true,

    startPage: 0,

    autoSize: true,

    maxShadowOpacity: 0.35,

    showCover: true,

    // Permitir interacción táctil
    mobileScrollSupport: true,

    clickEventForward: true,

    useMouseEvents: true

});


// ========================================
// CARGAR LAS PÁGINAS
// ========================================

const paginas = document.querySelectorAll("#book .page");

pageFlip.loadFromHTML(paginas);


// ========================================
// ACTUALIZAR CONTROLES
// ========================================

function updateControls() {

    const current = pageFlip.getCurrentPageIndex();

    const total = pageFlip.getPageCount();

    if (current === 0) {

        pageCounter.textContent = "Portada";

    } else if (current >= total - 1) {

        pageCounter.textContent = "Final del álbum";

    } else {

        pageCounter.textContent =
            `Página ${current + 1} de ${total}`;

    }

    previousButton.disabled = current === 0;

    nextButton.disabled = current >= total - 1;

}


// ========================================
// EVENTOS DEL LIBRO
// ========================================

pageFlip.on("flip", updateControls);

pageFlip.on("init", updateControls);


// ========================================
// BOTÓN PÁGINA ANTERIOR
// ========================================

previousButton.addEventListener("click", () => {

    pageFlip.flipPrev();

});


// ========================================
// BOTÓN PÁGINA SIGUIENTE
// ========================================

nextButton.addEventListener("click", () => {

    pageFlip.flipNext();

});


// ========================================
// ACTUALIZAR AL INICIAR
// ========================================

updateControls();
