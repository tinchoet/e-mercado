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
  console.log(typeof totalprod)
  for (let i = 0; i < totales.length; i++) {
    totalprod += parseFloat(totales[i].innerHTML);
    console.log(typeof totalprod) 
  }
  document.getElementById("subtotal").innerHTML = "$ " + totalprod.toFixed(2);
}



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
  localStorage.removeItem(carritoD)
  carrito = carritoD
  renderizarCarrito();
}
let carrito = JSON.parse (localStorage.getItem("carrito"));
document.addEventListener("DOMContentLoaded", () => {
  const carritoCont = document.getElementById("lista");
 
  
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
    <td><input type="number" id="inputCarrito" min="0" value="1" class="cant" onchange="recalcular();"></td>
    <td id="ress">${productocompra.articles[0].currency} <span class="res">${productocompra.articles[0].unitCost}</span></td></tr>
    `
    let carrito2 = document.getElementById("lista2");
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
