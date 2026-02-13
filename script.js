let total = 0;
const carrito = document.getElementById("carrito");
const mensajeVacio = document.getElementById("mensaje-vacio");
const totalTexto = document.getElementById("total");
const contador = document.getElementById("contador");
const nota = document.getElementById("nota");
let cantidad = 0;

const botones = document.querySelectorAll(".helado button");

botones.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const helado = this.parentElement;
        const nombre = helado.querySelector("h3").textContent;
        const precioTexto = helado.querySelector("p").textContent;
        const precio = parseFloat(precioTexto.replace("Precio: $", ""));

        total += precio;
mensajeVacio.style.display = "none";
cantidad++;
contador.textContent = cantidad + " productos en tu pedido";

        carrito.insertAdjacentHTML("beforeend", `<p>${nombre} - $${precio.toFixed(2)}</p>`);
        totalTexto.textContent = "Total: $" + total.toFixed(2);
    });
});

const finalizar = document.getElementById("finalizar");
const vaciar = document.getElementById("vaciar");
finalizar.addEventListener("click", function() {
    if (total === 0) {
        alert("Tu carrito está vacío 😅");
        return;
    }

    let mensaje = "Hola, quiero pedir:%0A";

    const items = carrito.querySelectorAll("p");
    items.forEach(function(item) {
        mensaje += item.textContent + "%0A";
    });

    mensaje += "%0ATotal: $" + total.toFixed(2);

    if (nota.value.trim() !== "") {
        mensaje += "%0A%0A📝 Nota: " + nota.value;
    }

    const numero = "50765217752";
    let url;

    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        url = "whatsapp://send?phone=" + numero + "&text=" + mensaje;
    } else {
        url = "https://web.whatsapp.com/send?phone=" + numero + "&text=" + mensaje;
    }

    window.open(url, "_blank");
});

vaciar.addEventListener("click", function() {
    carrito.innerHTML = "";
    total = 0;
    cantidad = 0;
    contador.textContent = "0 productos en tu pedido";
    totalTexto.textContent = "Total: $0.00";
    mensajeVacio.style.display = "block";
});