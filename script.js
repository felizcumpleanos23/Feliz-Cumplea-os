


// ELEMENTOS
const sobre = document.getElementById("sobre");

const inicio = document.getElementById("inicio");
const carta = document.getElementById("carta");
const calendario = document.getElementById("calendario");

const btnCalendario = document.getElementById("btnCalendario");
const mesAnterior = document.getElementById("mesAnterior");
const mesSiguiente = document.getElementById("mesSiguiente");

const mesAnio = document.getElementById("mesAnio");
const diasCalendario = document.getElementById("diasCalendario");

const horaInput = document.getElementById("hora");
const fechaSeleccionada = document.getElementById("fechaSeleccionada");

const btnConfirmar = document.getElementById("btnConfirmar");
const mensajeError = document.getElementById("mensajeError");

const resultado = document.getElementById("resultado");

const fechaFinal = document.getElementById("fechaFinal");
const horaFinal = document.getElementById("horaFinal");



// VARIABLES DEL CALENDARIO
let mesActual = new Date().getMonth();
let anioActual = new Date().getFullYear();

let fechaElegida = null;


// CAMBIAR DE PANTALLA
function cambiarPantalla(pantalla) {

    inicio.classList.remove("activa");
    carta.classList.remove("activa");
    calendario.classList.remove("activa");

    pantalla.classList.add("activa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ABRIR SOBRE
sobre.addEventListener("click", () => {

    sobre.classList.add("abierto");

    setTimeout(() => {
        cambiarPantalla(carta);
    }, 800);

});


// IR AL CALENDARIO
btnCalendario.addEventListener("click", () => {

    cambiarPantalla(calendario);
    generarCalendario();

});


// GENERAR CALENDARIO
function generarCalendario() {

    diasCalendario.innerHTML = "";

    const nombresMeses = [
        "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    mesAnio.textContent =
        `${nombresMeses[mesActual]} ${anioActual}`;

    const primerDia =
        new Date(anioActual, mesActual, 1).getDay();

    const ultimoDia =
        new Date(anioActual, mesActual + 1, 0).getDate();


    // ESPACIOS ANTES DEL PRIMER DÍA
    for (let i = 0; i < primerDia; i++) {

        const espacio = document.createElement("div");

        espacio.classList.add("vacio");

        diasCalendario.appendChild(espacio);

    }


    // CREAR DÍAS DEL MES
    for (let dia = 1; dia <= ultimoDia; dia++) {

        const botonDia = document.createElement("button");

        botonDia.textContent = dia;
        botonDia.classList.add("dia");

        const fecha = new Date(
            anioActual,
            mesActual,
            dia
        );

        const hoy = new Date();

        const fechaComparacion = new Date(
            fecha.getFullYear(),
            fecha.getMonth(),
            fecha.getDate()
        );

        const hoyComparacion = new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            hoy.getDate()
        );


        // DESHABILITAR FECHAS PASADAS
        if (fechaComparacion < hoyComparacion) {

            botonDia.disabled = true;

        }


        // MARCAR FECHA SELECCIONADA
        if (
            fechaElegida &&
            fechaElegida.getDate() === dia &&
            fechaElegida.getMonth() === mesActual &&
            fechaElegida.getFullYear() === anioActual
        ) {

            botonDia.classList.add("seleccionado");

        }


        // SELECCIONAR DÍA
        botonDia.addEventListener("click", () => {

            fechaElegida = new Date(
                anioActual,
                mesActual,
                dia
            );

            fechaSeleccionada.textContent =
                "Día elegido: " +
                fechaElegida.toLocaleDateString("es-EC", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });

            mensajeError.textContent = "";

            generarCalendario();

        });

        diasCalendario.appendChild(botonDia);

    }

}


// MES ANTERIOR
mesAnterior.addEventListener("click", () => {

    mesActual--;

    if (mesActual < 0) {

        mesActual = 11;
        anioActual--;

    }

    generarCalendario();

});


// MES SIGUIENTE
mesSiguiente.addEventListener("click", () => {

    mesActual++;

    if (mesActual > 11) {

        mesActual = 0;
        anioActual++;

    }

    generarCalendario();

});


// CONFIRMAR FECHA Y HORA
btnConfirmar.addEventListener("click", () => {

    const horaElegida = horaInput.value;


    // COMPROBAR FECHA
    if (!fechaElegida) {

        mensajeError.textContent =
            "Por favor, selecciona primero un día en el calendario. ♡";

        return;

    }


    // COMPROBAR HORA
    if (!horaElegida) {

        mensajeError.textContent =
            "Ahora selecciona la hora de nuestra salida. ♡";

        return;

    }


    const [horas, minutos] =
        horaElegida.split(":").map(Number);


    const fechaHoraElegida = new Date(
        fechaElegida.getFullYear(),
        fechaElegida.getMonth(),
        fechaElegida.getDate(),
        horas,
        minutos
    );


    // COMPROBAR QUE SEA UNA FECHA FUTURA
    if (fechaHoraElegida <= new Date()) {

        mensajeError.textContent =
            "Por favor, selecciona una fecha y hora futuras. ♡";

        return;

    }


    // FORMATEAR FECHA
    const fechaBonita =
        fechaElegida.toLocaleDateString("es-EC", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });


    // FORMATEAR HORA
    const horaBonita =
        new Date(
            2000,
            0,
            1,
            horas,
            minutos
        ).toLocaleTimeString("es-EC", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });


    // MOSTRAR DATOS
    fechaFinal.textContent = fechaBonita;
    horaFinal.textContent = horaBonita;


    // MOSTRAR MENSAJE FINAL
    resultado.classList.add("mostrar");

    mensajeError.textContent = "";

    btnConfirmar.style.display = "none";


    // DESPLAZARSE HACIA EL RESULTADO
    resultado.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});



// CONTROL DE MÚSICA
const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");

if (musica && btnMusica) {
    btnMusica.addEventListener("click", async () => {
        try {
            if (musica.paused) {
                await musica.play();
                btnMusica.textContent = "♫ Música: Activada";
            } else {
                musica.pause();
                btnMusica.textContent = "♫ Música";
            }
        } catch (error) {
            console.error("No se pudo reproducir la música:", error);
        }
    });
}