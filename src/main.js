import './style.css'
import { productos } from './datos.js'

// Arreglos para el Ejercicio 6
const pedidosRegistrados = [];
const ESTADOS = ['Pendiente', 'En preparación', 'Entregado'];

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

const pedido = []

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

const formCliente = document.getElementById('form-cliente');
const inputNombre = document.getElementById('nombre');
const inputTelefono = document.getElementById('telefono');
const inputCorreo = document.getElementById('correo');

const errorNombre = document.getElementById('error-nombre');
const errorTelefono = document.getElementById('error-telefono');
const errorCorreo = document.getElementById('error-correo');
const errorPedido = document.getElementById('error-pedido');
const regexTelefono = /^\d{10}$/;
const regexCorreo = /^\S+@\S+\.\S+$/;

formCliente.addEventListener('submit', (evento) => {
  evento.preventDefault();

  let hayErrores = false;

  if (inputNombre.value.trim() === '') {
    errorNombre.classList.remove('hidden');
    inputNombre.classList.add('border-red-600');
    hayErrores = true;
  } else {
    errorNombre.classList.add('hidden');
    inputNombre.classList.remove('border-red-600');
  }

  if (!regexTelefono.test(inputTelefono.value)) {
    errorTelefono.classList.remove('hidden');
    inputTelefono.classList.add('border-red-600');
    hayErrores = true;
  } else {
    errorTelefono.classList.add('hidden');
    inputTelefono.classList.remove('border-red-600');
  }

  if (!regexCorreo.test(inputCorreo.value)) {
    errorCorreo.classList.remove('hidden');
    inputCorreo.classList.add('border-red-600');
    hayErrores = true;
  } else {
    errorCorreo.classList.add('hidden');
    inputCorreo.classList.remove('border-red-600');
  }

  if (pedido.length === 0) {
    errorPedido.classList.remove('hidden');
    hayErrores = true;
  } else {
    errorPedido.classList.add('hidden');
  }

  if (!hayErrores) {
    const totalPedido = pedido.reduce((suma, prod) => suma + prod.precio, 0);
    const nuevoPedido = {
      id: Date.now(),
      cliente: {
        nombre: inputNombre.value.trim(),
        telefono: inputTelefono.value.trim(),
        correo: inputCorreo.value.trim()
      },
      productos: [...pedido], 
      total: totalPedido,
      estado: 'Pendiente'
    };

    pedidosRegistrados.push(nuevoPedido);
    pedido.length = 0;
    mostrarPedido();
    formCliente.reset();
    
    if (inputBuscarCliente) inputBuscarCliente.value = '';
    mostrarPedidosRegistrados();
  }
});

const COLORES = {
  'Pendiente': 'bg-yellow-100 border-yellow-400',
  'En preparación': 'bg-blue-100 border-blue-400',
  'Entregado': 'bg-green-100 border-green-400'
};

const contenedorPedidos = document.getElementById('pedidos-registrados');
const inputBuscarCliente = document.getElementById('buscar-cliente');

function mostrarPedidosRegistrados(lista = pedidosRegistrados) {
  if (!contenedorPedidos) return;

  if (lista.length === 0) {
    contenedorPedidos.innerHTML = `
      <p class="text-gray-500 italic col-span-full">No se encontraron pedidos que coincidan con la búsqueda.</p>
    `;
    return;
  }

  contenedorPedidos.innerHTML = lista.map(p => {
    const esEntregado = p.estado === 'Entregado';
    const claseColor = COLORES[p.estado] || 'bg-white border-gray-300';

    return `
      <article class="p-4 rounded-lg border-2 shadow ${claseColor}">
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-bold text-lg">${p.cliente.nombre}</h3>
          <span class="text-xs font-semibold uppercase px-2 py-1 rounded bg-white border">
            ${p.estado}
          </span>
        </div>

        <p class="text-sm text-gray-700"><strong>Tel:</strong> ${p.cliente.telefono}</p>
        <p class="text-sm text-gray-700 mb-2"><strong>Correo:</strong> ${p.cliente.correo}</p>

        <p class="font-semibold text-sm mt-2">Productos:</p>
        <ul class="list-disc list-inside text-sm text-gray-600 mb-2">
          ${p.productos.map(prod => `<li>${prod.nombre} -$${prod.precio}</li>`).join('')}
        </ul>

        <p class="font-bold text-md mb-3">Total: $${p.total}</p>

        ${!esEntregado ? `
          <button data-avanzar="${p.id}" class="w-full bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold py-1.5 px-3 rounded">
            Avanzar estado
          </button>
        ` : ''}
      </article>
    `;
  }).join('');
}

if (inputBuscarCliente) {
  inputBuscarCliente.addEventListener('input', (evento) => {
    const texto = evento.target.value.toLowerCase().trim();

    const pedidosFiltrados = pedidosRegistrados.filter(p => 
      p.cliente.nombre.toLowerCase().includes(texto)
    );

    mostrarPedidosRegistrados(pedidosFiltrados);
  });
}

if (contenedorPedidos) {
  contenedorPedidos.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button[data-avanzar]');
    if (!boton) return;

    const idPedido = Number(boton.dataset.avanzar);
    const pedidoEncontrado = pedidosRegistrados.find(p => p.id === idPedido);

    if (pedidoEncontrado) {
      const indiceActual = ESTADOS.indexOf(pedidoEncontrado.estado);
      if (indiceActual < ESTADOS.length - 1) {
        pedidoEncontrado.estado = ESTADOS[indiceActual + 1];
        
        const texto = inputBuscarCliente ? inputBuscarCliente.value.toLowerCase().trim() : '';
        const pedidosFiltrados = pedidosRegistrados.filter(p => 
          p.cliente.nombre.toLowerCase().includes(texto)
        );
        mostrarPedidosRegistrados(pedidosFiltrados);
      }
    }
  });
}