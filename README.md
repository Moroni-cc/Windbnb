# Windbnb

Aplicación web inspirada en Windbnb para buscar estancias en Finlandia. Permite filtrar alojamientos por ciudad y cantidad de huéspedes usando una interfaz responsiva basada en el diseño del desafío original.

## Demo

https://windbnb-orcin-nu.vercel.app/

## Tecnologías

- HTML
- CSS
- TailwindCSS
- JavaScript Vanilla
- Vite

## Funcionalidades

- Listado dinámico de estancias.
- Filtrado por ciudad.
- Filtrado por número de huéspedes.
- Actualización de resultados en tiempo real al cambiar los filtros.
- Modal de búsqueda con selección de ubicación, adultos y niños.
- Diseño responsivo para móvil, tablet y escritorio.
- Consumo local de datos desde `stays.js`.
- Código organizado con módulos de JavaScript usando `import` y `export`.

## Estructura del proyecto

```txt
Windbnb/
├── images/
├── public/
├── scripts/
│   ├── main.js
│   ├── stays.js
│   └── utils.js
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── style.css
└── vite.config.js