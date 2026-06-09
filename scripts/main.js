import { stays } from './stays.js';

import {
    obtenerTotalHuespedes,
    filtrarEstancias,
    formatearTextoHuespedes,
    formatearTextoUbicacion
} from './utils.js';

const gridStays = document.getElementById("grid-stays");
const contadorStays = document.getElementById("contador-stays");
const tituloStays = document.getElementById("titulo-stays");
const barBusquedaTrigger = document.getElementById("bar-busqueda-trigger");
const txtLocationBar = document.getElementById("txt-location-bar");
const txtGuestsBar = document.getElementById("txt-guests-bar");


const modalBusqueda = document.getElementById("modal-busqueda");
const modalOverlay = document.getElementById("modal-overlay");


const btnInputLocation = document.getElementById("btn-input-location");
const btnInputGuests = document.getElementById("btn-input-guests");
const inputLocation = document.getElementById("input-location");
const txtGuestsCount = document.getElementById("txt-guests-count");


const panelLocation = document.getElementById("panel-location");
const panelGuests = document.getElementById("panel-guests");


const btnAdultsMinus = document.getElementById("btn-adults-minus");
const btnAdultsPlus = document.getElementById("btn-adults-plus");
const lblAdults = document.getElementById("lbl-adults");


const btnKidsMinus = document.getElementById("btn-kids-minus");
const btnKidsPlus = document.getElementById("btn-kids-plus");
const lblKids = document.getElementById("lbl-kids");


const btnSearchSubmit = document.getElementById("btn-search-submit");

let ciudadSeleccionada = "";
let adultos = 0;
let ninos = 0;

const ciudadesDisponibles = [...new Set(stays.map(estancia => estancia.city))];

export function renderizarEstancias(listaEstancias) {
    gridStays.innerHTML = "";
    contadorStays.textContent = `${listaEstancias.length} stays`;

    if (listaEstancias.length === 0) {
        gridStays.innerHTML = `
            <div class="col-span-full text-center py-20 flex flex-col gap-2 justify-center items-center">
                <p class="text-xl font-bold text-[#333333]">No stays matches found.</p>
                <p class="text-sm text-gray-400">Try adjusting your location or adding fewer guests.</p>
            </div>
        `;
        return;
    }

    listaEstancias.forEach(estancia => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "flex flex-col gap-3 group cursor-pointer";
        tarjeta.innerHTML = `
            <div class="w-full aspect-4/3 rounded-3xl overflow-hidden bg-gray-100 shadow-sm">
                <img src="${estancia.photo}" alt="${estancia.title}" loading="lazy"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            </div>
            
            <div class="flex justify-between items-center text-sm mt-1">
                <div class="flex items-center gap-2">
                    ${estancia.superHost ? `
                        <span class="text-[10px] font-bold text-[#4f4f4f] uppercase border-2 border-[#4f4f4f] rounded-full px-2 py-0.5 tracking-wider">
                            Superhost
                        </span>
                    ` : ''}
                    <span class="text-[#828282] font-medium">
                        ${estancia.type} ${estancia.beds ? `. ${estancia.beds} beds` : ''}
                    </span>
                </div>
                <div class="flex items-center gap-1">
                    <img src="../images/icons/star.svg" alt="" class="w-3.5 h-3.5">
                    <span class="text-[#4f4f4f] font-semibold">${estancia.rating.toFixed(2)}</span>
                </div>
            </div>
            
            <h2 class="text-base font-semibold text-[#333333] line-clamp-1 group-hover:text-gray-500 transition-colors">
                ${estancia.title}
            </h2>
        `;
        gridStays.appendChild(tarjeta);
    });
}

function renderizarListaCiudades(filtroTexto = "") {
    panelLocation.innerHTML = "";

    const ciudadesFiltradas = ciudadesDisponibles.filter(ciudad =>
        ciudad.toLowerCase().includes(filtroTexto.toLowerCase())
    );

    ciudadesFiltradas.forEach(ciudad => {
        const botonCiudad = document.createElement("button");
        botonCiudad.className = "option-city flex items-center gap-3 text-[#4f4f4f] hover:text-[#333333] font-medium transition-colors text-left w-full";
        botonCiudad.setAttribute("data-city", ciudad);
        botonCiudad.innerHTML = `
            <span class="text-gray-400 text-lg leading-none">📍</span>
            <span>${ciudad}, Finland</span>
        `;

        botonCiudad.addEventListener("click", () => {
            ciudadSeleccionada = ciudad;
            inputLocation.value = `${ciudad}, Finland`;
            aplicarFiltros();
        });

        panelLocation.appendChild(botonCiudad);
    });
}

function abrirModal() {
    modalBusqueda.classList.remove("invisible", "opacity-0");
    modalBusqueda.classList.add("visible", "opacity-100");
}

function cerrarModal() {
    modalBusqueda.classList.remove("visible", "opacity-100");
    modalBusqueda.classList.add("invisible", "opacity-0");
}

btnInputLocation.addEventListener("click", () => {
    panelLocation.classList.remove("hidden");
    panelGuests.classList.add("hidden");
});

btnInputGuests.addEventListener("click", () => {
    panelGuests.classList.remove("hidden");
    panelGuests.classList.add("flex");
    panelLocation.classList.add("hidden");
});

function actualizarTextosHuespedes() {
    const total = obtenerTotalHuespedes(adultos, ninos);

    txtGuestsCount.textContent = formatearTextoHuespedes(total);

    if (total === 0) {
        txtGuestsCount.classList.add("text-gray-400");
        txtGuestsCount.classList.remove("text-[#333333]");
    } else {
        txtGuestsCount.classList.remove("text-gray-400");
        txtGuestsCount.classList.add("text-[#333333]");
    }

    aplicarFiltros();
}

btnAdultsPlus.addEventListener("click", () => {
    adultos++;
    lblAdults.textContent = adultos;
    actualizarTextosHuespedes();
});

btnAdultsMinus.addEventListener("click", () => {
    if (adultos > 0) {
        adultos--;
        lblAdults.textContent = adultos;
        actualizarTextosHuespedes();
    }
});

btnKidsPlus.addEventListener("click", () => {
    ninos++;
    lblKids.textContent = ninos;
    actualizarTextosHuespedes();
});

btnKidsMinus.addEventListener("click", () => {
    if (ninos > 0) {
        ninos--;
        lblKids.textContent = ninos;
        actualizarTextosHuespedes();
    }
});

inputLocation.addEventListener("input", (e) => {
    const textoEscrito = e.target.value.trim();
    const ciudadEncontrada = ciudadesDisponibles.find(ciudad =>
        ciudad.toLowerCase() === textoEscrito.replace(", finland", "").toLowerCase()
    );

    ciudadSeleccionada = ciudadEncontrada || "";

    renderizarListaCiudades(textoEscrito);
    aplicarFiltros();
});

inputLocation.addEventListener("focus", () => {
    panelLocation.classList.remove("hidden");
    panelGuests.classList.add("hidden");
});

function aplicarFiltros() {
    const totalHuespedes = obtenerTotalHuespedes(adultos, ninos);
    const alojamientosFiltrados = filtrarEstancias(stays, ciudadSeleccionada, totalHuespedes);

    if (ciudadSeleccionada) {
        tituloStays.textContent = `Stays in ${ciudadSeleccionada}, Finland`;
        txtLocationBar.classList.add("text-[#333333]");
    } else {
        tituloStays.textContent = "Stays in Finland";
        txtLocationBar.classList.remove("text-[#333333]");
    }

    txtLocationBar.textContent = formatearTextoUbicacion(ciudadSeleccionada);
    txtGuestsBar.textContent = formatearTextoHuespedes(totalHuespedes);

    if (totalHuespedes > 0) {
        txtGuestsBar.classList.add("text-[#333333]");
    } else {
        txtGuestsBar.classList.remove("text-[#333333]");
    }

    renderizarEstancias(alojamientosFiltrados);
}

function ejecutarBusqueda() {
    aplicarFiltros();
    cerrarModal();
}

barBusquedaTrigger.addEventListener("click", abrirModal);
modalOverlay.addEventListener("click", cerrarModal);
btnSearchSubmit.addEventListener("click", ejecutarBusqueda);

aplicarFiltros();
renderizarListaCiudades();