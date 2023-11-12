function recalcular() {
  let cantidades = document.getElementsByClassName("cant");
  let precios = document.getElementsByClassName("precio");
  let resultados = document.getElementsByClassName("res");
  var total = 0;

  for (let i = 0; i < precios.length; i++) {
    total = parseFloat (parseFloat(cantidades[i].value) * parseFloat((precios[i].innerHTML))).toFixed(2);
    resultados[i].innerHTML = parseFloat(parseFloat(cantidades[i].value) * parseFloat(precios[i].innerHTML)).toFixed(2);
  }
   
  let totales = document.getElementsByClassName("res");
  var totalprod = 0;
  for (let i = 0; i < totales.length; i++) {
    totalprod += parseFloat(totales[i].innerHTML);
  }
  document.getElementById("subtotal").innerHTML = totalprod.toFixed(2);

  if(document.getElementById("Premium").checked) {
    let costoProductos = document.getElementById("subtotal").innerHTML;
    let envio = parseFloat(costoProductos)*0.15
    document.getElementById("costoenvio").innerHTML = envio.toFixed(2); 
    let costofinal = envio+parseFloat(costoProductos)
    document.getElementById("costofinal").innerHTML = " " + costofinal.toFixed(2);
  }
  if(document.getElementById("Express").checked) {
    let costoProductos = document.getElementById("subtotal").innerHTML;
    let envio = parseFloat(costoProductos)*0.07
    document.getElementById("costoenvio").innerHTML = envio.toFixed(2); 
    let costofinal = envio+parseFloat(costoProductos)
    document.getElementById("costofinal").innerHTML = " " + costofinal.toFixed(2);
  }
  if(document.getElementById("Standard").checked) {
    let costoProductos = document.getElementById("subtotal").innerHTML;
    let envio = parseFloat(costoProductos)*0.05
    document.getElementById("costoenvio").innerHTML = envio.toFixed(2); 
    let costofinal = envio+parseFloat(costoProductos)
    document.getElementById("costofinal").innerHTML = " " + costofinal.toFixed(2);
  }
}

// costos de envío y total final
document.getElementById("Premium").addEventListener("click", ()=>{
  let costoProductos = document.getElementById("subtotal").innerHTML;
  let envio = parseFloat(costoProductos)*0.15
  document.getElementById("costoenvio").innerHTML = envio.toFixed(2); 
  let costofinal = envio+parseFloat(costoProductos)
  document.getElementById("costofinal").innerHTML = " " + costofinal.toFixed(2);
})
document.getElementById("Express").addEventListener("click", ()=>{
  let costoProductos = document.getElementById("subtotal").innerHTML;
  let envio = parseFloat(costoProductos)*0.07
  document.getElementById("costoenvio").innerHTML = envio.toFixed(2); 
  let costofinal = envio+parseFloat(costoProductos)
  document.getElementById("costofinal").innerHTML = " " + costofinal.toFixed(2);
})
document.getElementById("Standard").addEventListener("click", ()=>{
  let costoProductos = document.getElementById("subtotal").innerHTML;
  let envio = parseFloat(costoProductos)*0.05
  document.getElementById("costoenvio").innerHTML = envio.toFixed(2); 
  let costofinal = envio+parseFloat(costoProductos)
  document.getElementById("costofinal").innerHTML = " " + costofinal.toFixed(2);
})


let carrito2 = document.getElementById("lista2");
function renderizarCarrito() {

  carrito2.innerHTML = '';

  carrito.map((el)=>{
    carrito2.innerHTML += `
    <tr><td><img src=${el.images[0]} width="100px"></img></td>
    <td id="nombreCarrito">${el.name} </td>
    <td>${el.currency}<span class="precio"> ${el.cost}</span></td>
    <td><input type="number" id="inputCarrito" min="0" value="1" class="cant" onchange="recalcular()"></td>
    <td id="ress">${el.currency} <span class="res">${el.cost}</span>
    <button onclick="eliminarDelCarrito(${el.id})">Eliminar</button></td>
    </tr><br/>
    `;
  })

};
function eliminarDelCarrito(id) {
  


  let carritoD = carrito.filter(elem => elem.id != id)
  console.log("CXKLnds")
  localStorage.setItem("carrito", JSON.stringify(carritoD))
  carrito = carritoD
  renderizarCarrito();
}
let carrito = JSON.parse (localStorage.getItem("carrito"));
document.addEventListener("DOMContentLoaded", () => {
  const carritoCont = document.getElementById("lista");
  let contenidoIndex = localStorage.getItem("EmailPersona");
  let emailPersona = document.getElementById("emailPersona");
  emailPersona.innerHTML = `Perfil: ${contenidoIndex}`;
  
  const URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
  ////
    

  
    
////
  fetch(URL)
    .then((response) => response.json())
    .then((productocompra) => {
      carritoCont.innerHTML += `
    <tr><td><img src=${productocompra.articles[0].image} width="100px"></img></td>
    <td id="nombreCarrito">${productocompra.articles[0].name} </td>
    <td>${productocompra.articles[0].currency}<span class="precio"> ${productocompra.articles[0].unitCost}</span></td>
    <td><input type="number" id="inputCarrito" min="0" value="0" class="cant" onchange="recalcular();"></td>
    <td id="ress">${productocompra.articles[0].currency} <span class="res">${productocompra.articles[0].unitCost}</span></td></tr>
    `
    let carrito2 = document.getElementById("lista2");
    function numeroAleatorioEnRango(min, max) {
      return Math.random() * (max - min) + min;
    }
    carrito.map((el)=>{
    el.id = numeroAleatorioEnRango(1,10000)
    carrito2.innerHTML += `
    <tr><td><img src=${el.images[0]} width="100px"></img></td>
    <td id="nombreCarrito">${el.name} </td>
    <td>${el.currency}<span class="precio"> ${el.cost}</span></td>
    <td><input type="number" id="inputCarrito" min="0" value="0" class="cant" onchange="recalcular()"></td>
    <td id="ress">${el.currency} <span class="res">${el.cost}</span>
    <button onclick="eliminarDelCarrito(${el.id})">Eliminar</button></td>
    </tr><br/>
    `;
  })

  recalcular();


    const limpiar = document.getElementById("limpiarProd")

    limpiar.addEventListener("click", ()=>{
      localStorage.removeItem("carrito")
      
      carrito2.innerHTML = ` `
      let carritoCont = document.getElementById("lista");
      carritoCont.innerHTML = ` `
    })
  
})
})

// Bloquear método de pago no seleccionado
let numerotarjeta = document.getElementById("numerotarjeta")
let codigoseguridad = document.getElementById("codigoseguridad")
let vencimientotarjeta = document.getElementById("vencimientotarjeta")
let numerocuenta = document.getElementById("numerocuenta")
let pagotarjetaCredito = document.getElementById("pagotarjetaCredito")
let pagoTransferencia = document.getElementById("pagoTransferencia")

pagotarjetaCredito.addEventListener("change", function() {
    if (pagotarjetaCredito.checked) {
        numerotarjeta.disabled = false
        codigoseguridad.disabled = false
        vencimientotarjeta.disabled = false
        numerocuenta.disabled = true
    }
})

pagoTransferencia.addEventListener("change", function() {
    if (pagoTransferencia.checked) {
        numerotarjeta.disabled = true
        codigoseguridad.disabled = true
        vencimientotarjeta.disabled = true
        numerocuenta.disabled = false
    }
})

// // Cargar el tipo de pago a la página principal
// // let metodopagoelegido = document.querySelector('input[name="metodopago"]:checked');
// let formadepago = document.getElementsByClassName("metodopago")
// let pagoseleccionado = false;

document.getElementById("confirmarinfo").addEventListener("click", ()=>{
 
  const pago = document.getElementById("formapago")

    pago.innerText = 'Seleccionado';
  });


// Validación campos de compra
document.getElementById("btncomprar").addEventListener("click", ()=>{
  let calle = document.getElementById("calle").value
  let numero = document.getElementById("numero").value
  let esquina = document.getElementById("esquina").value
  let opcionesenvio = document.getElementsByName("envio")
  let envioseleccionado = false;
  for (var i = 0; i < opcionesenvio.length; i++) {
    if (opcionesenvio[i].checked) {
      envioseleccionado = true;
        break;
    }
}
let cantproductos = document.getElementsByClassName("cant")
let cantidades = false;
for (var i = 0; i < cantproductos.length; i++) {
  if (parseInt(cantproductos[i].value) === 0 || isNaN(parseInt(cantproductos[i].value))) {
    cantidades = true;
      break;
  }
}
let formadepago = document.getElementsByClassName("metodopago")
let pagoseleccionado = false;
  for (var i = 0; i < formadepago.length; i++) {
    if (formadepago[i].checked) {
      pagoseleccionado = true;
        break;
    }
}
let numerotarjeta = document.getElementById("numerotarjeta")
let codigoseguridad = document.getElementById("codigoseguridad")
let vencimientotarjeta = document.getElementById("vencimientotarjeta")
let numerocuenta = document.getElementById("numerocuenta")
let pagotarjetaCredito = document.getElementById("pagotarjetaCredito")
let pagoTransferencia = document.getElementById("pagoTransferencia")
  if (calle === "" || numero === "" || esquina === "" ) {
  alert("Por favor, completa la dirección de envío.")
} 
if (!envioseleccionado) {
  alert("Por favor, selecciona una opción de envío.");
}
if (cantidades) {
  alert("Por favor, revisa las cantidades de tus productos.");
}
if (!pagoseleccionado && formadepago.length > 1) {
  alert("Por favor, selecciona una forma de pago.");
}
if ((pagotarjetaCredito.checked && (numerotarjeta === "" || codigoseguridad === "" || vencimientotarjeta === "")) || ((pagoTransferencia.checked) && numerocuenta === "")) {
  alert("Por favor, revisa los datos de pago.");
}
else { 
  
  alert("Compra ingresada correctamente.")

}
})