const temaOscuro = () => {
  console.log("Tema oscuro activado");
  document.querySelector("body").setAttribute("data-bs-theme", "dark");
  document.querySelector("#dl-icon").setAttribute("class", "bi bi-sun-fill");

  localStorage.setItem("modoPreferido", "oscuro");
};

const temaClaro = () => {
  console.log("Tema claro activado");
  document.querySelector("body").setAttribute("data-bs-theme", "light");
  document.querySelector("#dl-icon").setAttribute("class", "bi bi-moon-fill");

  localStorage.setItem("modoPreferido", "claro");
};

const cambiarTema = () => {
  console.log("Cambio de tema");
  if (document.querySelector("body").getAttribute("data-bs-theme") === "light") {
    temaOscuro();
  } else {
    temaClaro();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const modoPreferido = localStorage.getItem("modoPreferido"); // Obtiene el modo preferido
  if (modoPreferido === "oscuro") {
    temaOscuro();
  } else {
    temaClaro();
  }
});
