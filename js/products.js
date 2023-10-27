const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PRICE_ASC = "PrecioAsc";
const ORDER_BY_PRICE_DESC = "PrecioDesc";
const ORDER_BY_SOLD_COUNT = "Vendidos";

let ProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

function sortProducts(criteria, array) {
    let result = [];

    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort((a, b) => b.name.localeCompare(a.name));
    } else if (criteria === ORDER_BY_PRICE_ASC) {
        result = array.sort((a, b) => a.cost - b.cost);
    } else if (criteria === ORDER_BY_PRICE_DESC) {
        result = array.sort((a, b) => b.cost - a.cost);
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort((a, b) => b.soldCount - a.soldCount);
    }

    return result;
}

function showProductsList(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
        <div class="imgcard1">
            <div class="product-card cardproduct ">
                <div class="img cardproduct">
                    <img class="padd" src="${product.image}" alt="product image">
                </div>
                <div class="info padd cardproduct">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Precio: ${product.cost} ${product.currency}</p>
                    <p>Vendidos: ${product.soldCount}</p>
                    <button class="select cardproduct1" onclick="selectProduct(${product.id})">Seleccionar</button>
                </div>
            </div>
            </div>`;
    }

    document.getElementById("products-container").innerHTML = htmlContentToAppend;
}

function selectProduct(productId) {
    localStorage.setItem("selectedProduct", productId);
    window.location.href = "product-info.html";
}


function filterProductsByPrice(products, min, max) {
    return products.filter(product => {
        if (min !== undefined && product.cost < min) {
            return false;
        }
        if (max !== undefined && product.cost > max) {
            return false;
        }
        return true;
    });
}

function sortAndShowProducts(sortCriteria) {
    currentSortCriteria = sortCriteria;
    let filteredProducts = filterProductsByPrice(ProductsArray, minPrice, maxPrice);
    let sortedAndFilteredProducts = sortProducts(currentSortCriteria, filteredProducts);
    showProductsList(sortedAndFilteredProducts);
}

document.addEventListener("DOMContentLoaded", function (e) {
    let contenidoIndex = localStorage.getItem("EmailPersona");
    let emailPersona = document.getElementById("emailPersona");
    emailPersona.innerHTML = `Perfil: ${contenidoIndex}`;

    let categoriaSeleccionadaId = localStorage.getItem("catID");
    if (categoriaSeleccionadaId !== null) {
        let url = `https://japceibal.github.io/emercado-api/cats_products/${categoriaSeleccionadaId}.json`;

        getJSONData(url).then(function (resultObj) {
            if (resultObj.status === "ok") {
                ProductsArray = resultObj.data.products;
                showProductsList(ProductsArray);
            }
        });
    }



    // CAMBIOS
    document.getElementById("sortAscPrice").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PRICE_ASC);
    });

    document.getElementById("sortDescPrice").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PRICE_DESC);
    });
    document.getElementById("sortDescBySoldCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;

        if (minPrice !== "" && !isNaN(minPrice)) {
            minPrice = parseFloat(minPrice);
        } else {
            minPrice = undefined;
        }

        if (maxPrice !== "" && !isNaN(maxPrice)) {
            maxPrice = parseFloat(maxPrice);
        } else {
            maxPrice = undefined;
        }

        sortAndShowProducts(currentSortCriteria);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        minPrice = undefined;
        maxPrice = undefined;
        sortAndShowProducts(currentSortCriteria);
    });

    document.getElementById("letterSearch").addEventListener("input", function () {
        let searchLetter = this.value.toLowerCase();
        let filteredProducts = ProductsArray.filter(function (product) {
            return product.name.toLowerCase().startsWith(searchLetter);
        });

        // Aplica filtros y ordenamientos actuales antes de mostrar los productos
        let sortedAndFilteredProducts = sortProducts(currentSortCriteria, filterProductsByPrice(filteredProducts, minPrice, maxPrice));
        showProductsList(sortedAndFilteredProducts);
    });

    sortAndShowProducts(ORDER_ASC_BY_NAME);
});