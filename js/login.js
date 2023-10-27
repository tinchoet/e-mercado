
document.addEventListener("DOMContentLoaded", function () {

  const email = document.getElementById('email');
  const pass = document.getElementById('password');
  const showPasswordBtn = document.getElementById("showPasswordBtn");


  // escucha el boton y ejecuta validar
  addEventListener("submit", function validar() {
    event.preventDefault();
    // si el campo email es vacio
    if (email.value === "") {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error...',
        text: 'Ingrese su email',
      });
      // si el campo contraseña es vacio
    } else if (pass.value === "") {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error...',
        text: 'Ingrese su contraseña',
      });
    } else {
      // si ambos estan llenos
      // almacena en sessionStorage que el usuario ha iniciado sesión
      //DESAFIATE
      sessionStorage.setItem('loggedIn', 'true');
      //redirige al index
      window.location.href = "index.html";
    }
  })

  
  let loggeo = document.getElementById("btn")
  loggeo.addEventListener("click", ()=>{
    let email1 = document.getElementById("email").value;

    localStorage.setItem("EmailPersona", email1);

  })

  // Mostrar contraseña
  showPasswordBtn.addEventListener("click", function () {
    // verifica que sea contraseña
      if (pass.type === "password") {
        //lo cambia a texto para poder verla
          pass.type = "text";
      } else {
          pass.type = "password";
      }
  });

})





