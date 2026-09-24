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

catalogo.addEventListener('click', (evento) => {
const boton = evento.target.closest('button');
    if (!boton) return;
    const id = Number(boton.dataset.id);
    const productoEncontrado = productos.find(prod => prod.id === id);
    if (productoEncontrado) {
      pedido.push(productoEncontrado);
mostrarPedido();
    }
});


const listaPedido = document.getElementById('lista-pedido');
const totalElemento = document.getElementById('total');
function mostrarPedido() {
  listaPedido.innerHTML = pedido.map(prod => `
        <li class="flex justify-between py-2 border-b">
            <span>${prod.nombre}</span>
            <span class="font-semibold">$${prod.precio}</span>
        </li>
    `).join('');
    const total = pedido.reduce((suma, prod) => suma + prod.precio, 0);
    totalElemento.textContent = `Total: $${total}`;
}

const btnVaciar = document.getElementById('btn-vaciar');
btnVaciar.addEventListener('click', () => {
    pedido.length = 0; // Deja el arreglo vacío
    mostrarPedido();
    });








// ------------------------------------------------------------
// EJERCICIO 4 — Filtrar por categoría
// Botones de categoría que llamen a mostrarProductos() con
// productos.filter(...). El botón "Todos" muestra la lista completa.
// ------------------------------------------------------------

// Escribe aquí tu código del Ejercicio 4

const contenedorFiltros = document.getElementById('filtros');

contenedorFiltros.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button');
  if (!boton) return;

  const categoria = boton.dataset.categoria;

if (categoria === 'todos') {
    mostrarProductos(productos);
  } else {
    const productosFiltrados = productos.filter(p => p.categoria === categoria);
    mostrarProductos(productosFiltrados);
  }

  const todosLosBotones = contenedorFiltros.querySelectorAll('button');
  todosLosBotones.forEach(btn => {
    btn.className = "btn-filtro bg-white text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-200";
  });

  boton.className = "btn-filtro bg-blue-500 text-white px-4 py-2 rounded font-medium";
});
