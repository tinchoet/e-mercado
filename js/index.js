document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103); //DESAFIATE
        window.location = "products.html"
    });

    // verifica si el valor es true
    if(!sessionStorage.getItem('loggedIn')) {
    
        // si no es asi, redirige a login hasta que sea true
        window.location.href = 'login.html';
    }

    let contenidoIndex = localStorage.getItem("EmailPersona");
    let emailPersona = document.getElementById("emailPersona");
    emailPersona.innerHTML = `Perfil: ${contenidoIndex}`;

});