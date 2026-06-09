export function obtenerTotalHuespedes(adultos, ninos) {
    return adultos + ninos;
}

export function filtrarEstancias(stays, ciudadSeleccionada, totalHuespedes) {
    return stays.filter(estancia => {
        const cumpleCiudad =
            ciudadSeleccionada === "" ||
            estancia.city.toLowerCase() === ciudadSeleccionada.toLowerCase();

        const cumpleHuespedes = estancia.maxGuests >= totalHuespedes;

        return cumpleCiudad && cumpleHuespedes;
    });
}

export function formatearTextoHuespedes(totalHuespedes) {
    return totalHuespedes === 0 ? "Add guests" : `${totalHuespedes} guests`;
}

export function formatearTextoUbicacion(ciudad) {
    return ciudad === "" ? "Add location" : `${ciudad}, Finland`;
}