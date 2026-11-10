document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formLogin");
    const contenedorResumen = document.getElementById("resumenLogin");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        limpiarErrores();
        contenedorResumen.textContent = "";

        const inputEmail = document.getElementById("email")
        const inputPassword = document.getElementById("password")

        const email = inputEmail.value.trim();
        const password = inputPassword.value.trim();

        let ok = true;

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            mostrarError(inputEmail, "error-email", "El correo electrónico es obligatorio.");
            ok = false;
        } else if (!regexEmail.test(email)) {
            mostrarError(inputEmail, "error-email", "Introduce un correo electrónico con formato válido (ejemplo@dominio.com).");
            ok = false;
        }

        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if (password === "") {
            mostrarError(inputPassword, "error-password", "Debes introducir una contraseña.");
            ok = false;
        } else if (!regexPassword.test(password)) {
            mostrarError(inputPassword, "error-password", "La contraseña debe tener al menos 8 caracteres e incluir letras y números.");
            ok = false;
        }

        if (ok) {
          mostrarMensajeExito(email);
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1200);
        }
    });

    function mostrarError(inputElemento, idDivError, mensaje) {
        inputElemento.classList.add("is-invalid"); // Clase de Bootstrap que pone el borde rojo y activa .invalid-feedback
        const divError = document.getElementById(idDivError);
        divError.textContent = mensaje;
    }

    function limpiarErrores() {
        const inputs = formulario.querySelectorAll(".form-control");
        inputs.forEach((input) => input.classList.remove("is-invalid"));

        const mensajesError = formulario.querySelectorAll(".invalid-feedback");
        mensajesError.forEach((div) => (div.textContent = ""));
    }

    function mostrarMensajeExito(email) {
        const alerta = document.createElement("div");
        alerta.className = "alert alert-success";
        alerta.setAttribute("role", "alert");
        alerta.textContent = `Sesión iniciada como ${email}. Redirigiendo a Inicio...`;
        contenedorResumen.appendChild(alerta);
    }
});