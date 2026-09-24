import './style.css'
import { productos } from './datos.js'

// Elemento donde se dibujan las tarjetas (lo creas en el Ejercicio 1)
const catalogo = document.getElementById('catalogo')


function mostrarProductos(lista) {


  catalogo.innerHTML = lista.map(p => `
    <article class="bg-white rounded-lg shadow p-4">
      <h3 class="font-bold text-lg">${p.nombre}</h3>
      <p class="text-gray-600">$${p.precio}</p>
      <button data-id="${p.id}" class="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Agregar</button>
    </article>
  `).join('')
}






mostrarProductos(productos)

// ------------------------------------------------------------
// EJERCICIO 3 — Armar el pedido
// El pedido es un arreglo con los productos que la persona va agregando.
// Pasos (detalle en el README):
//   1. Escucha el clic en el contenedor #catalogo (delegación de eventos).
//   2. Busca el producto por id con .find() y agrégalo con .push().
//   3. Dibuja el pedido con mostrarPedido() y calcula el total con .reduce().
//   4. Botón "Vaciar pedido".
// ------------------------------------------------------------
const pedido = []

// Escribe aquí tu código del Ejercicio 3

// ------------------------------------------------------------
// EJERCICIO 4 — Filtrar por categoría
// Botones de categoría que llamen a mostrarProductos() con
// productos.filter(...). El botón "Todos" muestra la lista completa.
// ------------------------------------------------------------

// Escribe aquí tu código del Ejercicio 4
