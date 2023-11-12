

document.addEventListener("DOMContentLoaded", function () {

    if(!sessionStorage.getItem('loggedIn')) {
    
        // si no es asi, redirige a login hasta que sea true
        window.location.href = 'login.html';
    }

    let nombre = document.querySelector("#txtNombre");
    let apellido = document.querySelector("#txtApellido");
    let email = document.getElementById("txtEmail");
    let segundoNombre = document.querySelector("#txtSegundoNombre");
    let segundoApellido = document.querySelector("#txtSegundoApellido");
    let telefono = document.querySelector("#txtTelefono");
    let imagen = document.querySelector("#imgPerfil");
    let imagenInput = document.querySelector("#imgPerfil");
    let imagenContainer = document.querySelector("#imagenContainer");

    mostrarImagen(imagenInput, imagenContainer);

    console.log(imagen)
    mostrarImagen(imagen)
    
    if (localStorage.getItem("imagen")) {
        let imagenSrc = JSON.parse(localStorage.getItem("imagen"));
        imagenContainer.innerHTML = `<img src="${imagenSrc}" alt="Imagen de perfil">`;
    }
    if (localStorage.getItem("nombre")){
        nombre.value = JSON.parse(localStorage.getItem("nombre"))
        
    }
    if (localStorage.getItem("apellido")){
        apellido.value = JSON.parse(localStorage.getItem("apellido"))
        
    }
    if (localStorage.getItem("EmailPersona")){
        email.value = localStorage.getItem("EmailPersona")
        
    }
    if (localStorage.getItem("validarSegundoNombre")){
        segundoNombre.value = JSON.parse(localStorage.getItem("validarSegundoNombre"))
        
    }
    if (localStorage.getItem("validarSegundoApellido")){
        segundoApellido.value = JSON.parse(localStorage.getItem("validarSegundoApellido"))
        
    }
    if (localStorage.getItem("validarTelefono")){
        telefono.value = JSON.parse(localStorage.getItem("validarTelefono"))
        
    }
    if (localStorage.getItem("imagen")){
        console.log(imagen)
        imagen = JSON.parse(localStorage.getItem("imagen"))
        let prev = document.getElementById("imgPerfil")
        console.log(imagen)
        prev.innerHTML += `<img src="${imagen}"></img>`
    }
    
    
    




    let contenidoIndex = localStorage.getItem("EmailPersona");
    let emailPersona = document.getElementById("emailPersona");
    const navlink = document.getElementsByClassName("nav-link")

    navlink.innerHTML = emailPersona
    emailPersona.innerHTML = `Perfil: ${contenidoIndex}`;


    const btnValidar = document.getElementById("btnValidar")
    btnValidar.addEventListener("click", () => {
        
            let nombre = document.querySelector("#txtNombre").value;
            let apellido = document.querySelector("#txtApellido").value;
            let email = document.getElementById("txtEmail").value;
            let segundoNombre = document.querySelector("#txtSegundoNombre").value;
            let segundoApellido = document.querySelector("#txtSegundoApellido").value;
            let telefono = document.querySelector("#txtTelefono").value;
            let imagen = document.querySelector("#imgPerfil").value;

        if (nombre.trim() == "" || apellido.trim() == "" || email.trim() == ""){
            return Swal.fire("Campos Nombre, Apellido y Email deben estar completos!");

        }
        if (imagenInput.files && imagenInput.files[0]) {
            let subirFoto = new FileReader();

            subirFoto.onload = function (e) {
                // Mostrar la imagen antes de guardarla en el localStorage
                imagenContainer.innerHTML = '<img src="' + e.target.result + '" alt="Imagen de perfil">';
                localStorage.setItem("imagen", JSON.stringify(e.target.result));
            };

            subirFoto.readAsDataURL(imagenInput.files[0]);
        }

        
        localStorage.setItem("nombre", JSON.stringify(nombre))
        localStorage.setItem("apellido", JSON.stringify(apellido))
        localStorage.setItem("emailPersona", JSON.stringify(email))

        if (segundoNombre){
            console.log("validacion")
            localStorage.setItem("validarSegundoNombre", JSON.stringify(segundoNombre))
        }
        if(segundoApellido){

            localStorage.setItem("validarSegundoApellido", JSON.stringify(segundoApellido))
        }
        if(telefono){
            localStorage.setItem("validarTelefono", JSON.stringify(telefono))
        }
        if(imagen){
            localStorage.setItem("imagen", JSON.stringify(imagen))
        }


        return Swal.fire("Cambios completados");
    })

})

function mostrarImagen(input, container) {
    if (input.files && input.files[0]) {
        let subirFoto = new FileReader();

        subirFoto.onload = function (e) {
            container.innerHTML = '<img src="' + e.target.result + '" alt="Imagen de perfil">';
        };

        subirFoto.readAsDataURL(input.files[0]);
    }
}