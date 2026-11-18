document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formContacto");
    const contenedorResumen = document.getElementById("resumenContacto");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        limpiarErrores();
        contenedorResumen.textContent = "";

        const inputNombre = document.getElementById("nombreContacto");
        const inputEmail = document.getElementById("emailContacto");
        const inputAsunto = document.getElementById("asuntoContacto");
        const inputMensaje = document.getElementById("mensajeContacto");

        const nombre = inputNombre.value.trim();
        const email = inputEmail.value.trim();
        const asunto = inputAsunto.value.trim();
        const mensaje = inputMensaje.value.trim();

        const asuntosValidos = ["Información sobre cursos", "Duda sobre matrículas", "Incidencia técnica", "Otro motivo"];
        let ok = true;

        if (nombre === "") {
            mostrarError(inputNombre, "error-nombreContacto", "El nombre es obligatorio.");
            ok = false;
        } else if (nombre.length < 2) {
            mostrarError(inputNombre, "error-nombreContacto", "El nombre debe tener al menos 2 caracteres.");
            ok = false;
        }

         const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            mostrarError(inputEmail, "error-emailContacto", "El correo electrónico es obligatorio.");
            ok = false;
        } else if (!regexEmail.test(email)) {
            mostrarError(inputEmail, "error-emailContacto", "Introduce un correo electrónico con formato válido (ejemplo@dominio.com).");
            ok = false;
        }

        if(asunto === ""){
            mostrarError(inputAsunto, "error-asuntoContacto", "Se debe seleccionar un asunto para la consulta.");
            ok = false;
        } else if(!asuntosValidos.includes(asunto)) {
            mostrarError(inputAsunto, "error-asuntoContacto", "Se debe seleccionar un asunto válido para la consulta.");
            ok = false;
        }

        if(mensaje === ""){
            mostrarError(inputMensaje, "error-mensajeContacto", "Se debe incluir un mensaje");
            ok = false;
        } else if(mensaje.length < 2){
            mostrarError(inputMensaje, "error-mensajeCOntacto", "El mensaje debe contener al menos caracteres");
            ok = false;
        } else if(mensaje.length > 1000){
            mostrarError(inputMensaje, "error-mensajeCOntacto", "El mensaje no puede exceder 1000 caracteres");
            ok = false;
        }

        if(ok){
            mostrarConfirmacionDOM(nombre, email);
            formulario.reset();
        }
    });
    
    function mostrarError(inputElemento, idDivError, mensaje) {
        inputElemento.classList.add("is-invalid"); 
        const divError = document.getElementById(idDivError);
        divError.textContent = mensaje;
    }

    function limpiarErrores() {
        const inputs = formulario.querySelectorAll(".form-control");
        inputs.forEach((input) => input.classList.remove("is-invalid"));

        const mensajesError = formulario.querySelectorAll(".invalid-feedback");
        mensajesError.forEach((div) => (div.textContent = ""));
    }

    function mostrarConfirmacionDOM(nombre, email){
        const alerta = document.createElement("div");
        alerta.className = "alert, alert-success";
        alerta.setAttribute("role", "alert");

        const titulo = document.createElement("h2");
        titulo.className = "h5 fw-bold mb-2";
        titulo.textContent = `Se ha enviado correctamente el mensaje con nombre ${nombre} y email ${email}`;

        alerta.appendChild(titulo);

        contenedorResumen.appendChild(alerta);
    }
});