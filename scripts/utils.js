// Calculo el total de huespedes seleccionados
export function obtenerTotalHuespedes(adultos, ninos) {
    return adultos + ninos;
}

// Filtra las estancias por ciudades y por capacidad maxima de huespedes
export function filtrarEstancias(stays, ciudadSeleccionada, totalHuespedes) {
    return stays.filter(estancia => {
        const cumpleCiudad =
            ciudadSeleccionada === "" ||
            estancia.city.toLowerCase() === ciudadSeleccionada.toLowerCase();

        const cumpleHuespedes = estancia.maxGuests >= totalHuespedes;

        return cumpleCiudad && cumpleHuespedes;
    });
}

// Devuelve el texto que se muestra por el filtro de huespedes
export function formatearTextoHuespedes(totalHuespedes) {
    return totalHuespedes === 0 ? "Add guests" : `${totalHuespedes} guests`;
}

// Devuelve el texto que se muestra para el filtro de ubicacion
export function formatearTextoUbicacion(ciudad) {
    return ciudad === "" ? "Add location" : `${ciudad}, Finland`;
}