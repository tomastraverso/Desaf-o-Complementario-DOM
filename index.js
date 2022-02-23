//Saludar y mostrar el usuario en el doc (ok)
//Mostrar los productos disponibles, y agregar un botón que sirva para agregar al carrito.
//Agregar funcionalidad al botón para que sume el producto al carrito (todavía no se hacerlo)
//Mostrar productos del carrito en el documento.
//Mostrar precio total
let productoSeleccionado;

class Producto {
  constructor(id, nombre, precio, idbtn) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.idbtn = idbtn;
  }
}

const producto1 = new Producto(1, "Grasa", 500, 1);
const producto2 = new Producto(2, "Desengrasante", 1000, 2);
const producto3 = new Producto(3, "Aceite", 750, 3);
const producto4 = new Producto(4, "Refrigerante", 800, 4);

const productos = [producto1, producto2, producto3];

const carrito = [];

const usuario = document.getElementById("usuario");
//Saludo usuario
const saludar = () => {
  alert("Bienvenido al Mercado");
  let nombre = prompt("Ingrese su nombre");
  if (nombre.length === 0 || nombre === " ") {
    alert("Nombre inválido.");
  } else {
    usuario.innerHTML = `<h1>Bienvenido ${nombre.toUpperCase()}</h1>`;
  }
};

let divProducto = document.getElementById("producto");

productos.forEach((productoEnArray) => {
  divProducto.innerHTML += `
  <div id="${productoEnArray.id}"></div>
    <p className="nombreProducto">Nombre: ${productoEnArray.nombre}</p>
    <p className="precioProducto">Precio: $${productoEnArray.precio}</p>
    <button id="btn" class="btn">Agregar al carrito</button>
  `;
});

const consultarProducto = () => {
  let texto = "";
  for (let p of productos) {
    texto += `${p.id}) ${p.nombre}\n\n`;
  }

  let producto = parseInt(prompt(`Que producto llevara?\n ${texto}`));
  while (isNaN(producto) || producto < 1 || producto > 4) {
    producto = parseInt(prompt(`Que producto llevara?\n ${texto}`));
  }
  return producto;
};

const llevarProducto = () => {
  let buscarProducto = productos.find(
    (element) => element.id === productoSeleccionado
  );

  let existe = carrito.some((element) => element.id === buscarProducto.id);
  console.log(existe);

  if (existe) {
    carrito.map((element) => {
      if (element.id === buscarProducto.id) {
        element.cantidad++; //Suma cantidad y no se duplica en el array.
        return element;
      } else {
        return element;
      }
    });
  } else {
    buscarProducto.cantidad = 1;
    carrito.push(buscarProducto);
  }

  let seguir = confirm("Desea llevar otro producto?");
  if (seguir) {
    productoSeleccionado = consultarProducto();
    llevarProducto();
  }
};

let divCarrito = document.getElementById("carrito");
const mostrarProductos = () => {
  carrito.forEach((productoEnArray) => {
    divCarrito.innerHTML += `
  <div id="${productoEnArray.id}"></div>
    <p className="nombreProducto">Nombre: ${productoEnArray.nombre}</p>
    <p className="precioProducto">Precio: $${productoEnArray.precio}</p>
  `;
  });
};

const calcularTotal = () => {
  let total = carrito.reduce((acc, ite) => acc + ite.cantidad * ite.precio, 0);
  document.body.innerHTML += `<div class="cajaTotal"><h3>TOTAL $${total}</h3></div>`;
};

saludar();
productoSeleccionado = consultarProducto();
llevarProducto();
mostrarProductos();
calcularTotal();
cobrarServicio();
