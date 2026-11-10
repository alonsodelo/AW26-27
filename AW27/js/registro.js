document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formRegistro");
    const contenedorResumen = document.getElementById("resumenConfirmacion");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        limpiarErrores();
        contenedorResumen.textContent = "";

        const inputNombre = document.getElementById("nombre");
        const inputApellidos = document.getElementById("apellidos")
        const inputEmail = document.getElementById("email")
        const inputPassword = document.getElementById("password")
        const inputPasswordConfirm = document.getElementById("confirmarPassword")
    
        const nombre = inputNombre.value.trim();
        const apellidos = inputApellidos.value.trim();
        const email = inputEmail.value.trim();
        const password = inputPassword.value.trim();
        const passwordConfirm = inputPasswordConfirm.value.trim();

        let ok = true;

        if (nombre === "") {
            mostrarError(inputNombre, "error-nombre", "El nombre es obligatorio.");
            ok = false;
        } else if (nombre.length < 2) {
            mostrarError(inputNombre, "error-nombre", "El nombre debe tener al menos 2 caracteres.");
            ok = false;
        }

        if (apellidos === "") {
            mostrarError(inputApellidos, "error-apellidos", "Los apellidos son obligatorios.");
            ok = false;
        } else if (apellidos.length < 2) {
            mostrarError(inputApellidos, "error-apellidos", "Los apellidos deben tener al menos 2 caracteres.");
            ok = false;
        }

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

        if (passwordConfirm === "") {
            mostrarError(inputPasswordConfirm, "error-passwordConfirm", "Debes confirmar la contraseña.");
            ok = false;
        } else if (password !== passwordConfirm) {
            mostrarError(inputPasswordConfirm, "error-passwordConfirm", "Las contraseñas no coinciden.");
            ok = false;
        }

        if (ok) {
            mostrarConfirmacionDOM(nombre, apellidos, email);
            formulario.reset(); // Opcional: limpia las cajas tras registrarse con éxito
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

    function mostrarConfirmacionDOM(nombre, apellidos, email) {
        const alerta = document.createElement("div");
        alerta.className = "alert alert-success";
        alerta.setAttribute("role", "alert");

        const titulo = document.createElement("h2");
        titulo.className = "h5 fw-bold mb-2";
        titulo.textContent = "Se ha registrado el usuario correctamente";

        alerta.appendChild(titulo);

        contenedorResumen.appendChild(alerta);
    }
});