document.addEventListener("DOMContentLoaded", () => {
    let cursos = [];

    const contenedorCursos = document.getElementById("contenedorCursos");
    const contadorCursos = document.getElementById("contadorCursos");
    const buscador = document.getElementById("buscadorCursos");
    const formulario = document.getElementById("formNuevoCurso");
    const errorFormulario = document.getElementById("errorFormularioCurso");
    const btnFiltroPlazas = document.getElementById("btnFiltroPlazas");

    let filtroPlazasActual = localStorage.getItem("filtroPlazas") || "todas";
    let textoBusqueda = sessionStorage.getItem("busqueda") ?? "";

    if (buscador) {
        buscador.value = textoBusqueda;
    }

    function mostrarError(mensaje) {
        contenedorCursos.textContent = "";
        contadorCursos.textContent = "0 cursos visibles";

        const alerta = document.createElement("div");
        alerta.className = "alert alert-danger";
        alerta.setAttribute("role", "alert");
        alerta.textContent = mensaje;
        contenedorCursos.appendChild(alerta);
    }

    function renderizarCursos(listaCursos) {
        contenedorCursos.textContent = "";
        contadorCursos.textContent = `${listaCursos.length} ${listaCursos.length === 1 ? "curso visible" : "cursos visibles"}`;

        if (listaCursos.length === 0) {
            const avisoVacio = document.createElement("p");
            avisoVacio.className = "text-muted";
            avisoVacio.textContent = "No existe ningún curso que coincida con el filtro.";
            contenedorCursos.appendChild(avisoVacio);
            return;
        }

        listaCursos.forEach((curso) => {
            const estaCompleto = Number(curso.plazas) === 0;

            const columna = document.createElement("div");
            columna.className = "col-md-6 col-lg-4";

            const tarjeta = document.createElement("div");
            tarjeta.className = estaCompleto
                ? "card h-100 border-danger curso-completo"
                : "card h-100";

            const cuerpo = document.createElement("div");
            cuerpo.className = "card-body d-flex flex-column";

            const titulo = document.createElement("h3");
            titulo.className = "card-title h5";
            titulo.textContent = curso.nombre;

            if (estaCompleto) {
                const badgeCompleto = document.createElement("span");
                badgeCompleto.className = "badge bg-danger ms-2";
                badgeCompleto.textContent = "Completo";
                titulo.appendChild(badgeCompleto);
            }

            const infoEspecialidad = document.createElement("p");
            infoEspecialidad.className = "card-text mb-1";
            infoEspecialidad.textContent = `Área: ${curso.especialidad} · Docente: ${curso.docente}`;

            const infoAula = document.createElement("p");
            infoAula.className = "card-text mb-1";
            infoAula.textContent = `Aula: ${curso.aula} (${curso.edificio})`;

            const infoHorario = document.createElement("p");
            infoHorario.className = "card-text mb-1";
            infoHorario.textContent = `Horario: ${curso.horario || "Por determinar"}`;

            const infoPlazas = document.createElement("p");
            infoPlazas.className = estaCompleto ? "card-text text-danger fw-bold mb-3" : "card-text mb-3";
            infoPlazas.textContent = `Plazas ofertadas: ${curso.plazas}`;

            const zonaBotones = document.createElement("div");
            zonaBotones.className = "mt-auto d-flex gap-2";

            const btnMatricular = document.createElement("button");
            btnMatricular.type = "button";
            btnMatricular.className = "btn btn-curso btn-sm";
            btnMatricular.textContent = estaCompleto ? "Sin plazas" : "Matricularse";
            btnMatricular.disabled = estaCompleto;

            zonaBotones.appendChild(btnMatricular);

            cuerpo.appendChild(titulo);
            cuerpo.appendChild(infoEspecialidad);
            cuerpo.appendChild(infoAula);
            cuerpo.appendChild(infoHorario);
            cuerpo.appendChild(infoPlazas);
            cuerpo.appendChild(zonaBotones);

            tarjeta.appendChild(cuerpo);
            columna.appendChild(tarjeta);
            contenedorCursos.appendChild(columna);
        });
    }

    function actualizarVista() {
        textoBusqueda = sessionStorage.getItem("busqueda") ?? "";

        const cursosFiltrados = cursos.filter((curso) => {
            let ok = true;
            switch (filtroPlazasActual) {
                case "disponibles":
                    ok = Number(curso.plazas) > 0;
                    break;
                case "completos":
                    ok = Number(curso.plazas) === 0;
                    break;
            }
            return ok && curso.nombre.toLowerCase().includes(textoBusqueda);
        });

        renderizarCursos(cursosFiltrados);
    }

    fetch("/api/cursos")
        .then((r) => {
            if (!r.ok) throw new Error("Error HTTP");
            return r.json();
        })
        .then((datos) => {
            cursos = datos;
            actualizarVista();
        })
        .catch(() => {
            mostrarError("No se pudo cargar el catálogo de cursos desde el servidor.");
        });

    let temporizador;
    if (buscador) {
        buscador.addEventListener("input", () => {
            sessionStorage.setItem("busqueda", buscador.value.trim().toLowerCase());
            clearTimeout(temporizador);
            temporizador = setTimeout(() => {
                actualizarVista();
            }, 300);
        });
    }

    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            errorFormulario.textContent = "El alta persistente de cursos (POST /api/cursos) se habilitará en la entrega final.";
        });
    }

    document.querySelectorAll("#menuPlazas .dropdown-item").forEach((option) => {
        option.addEventListener("click", () => {
            filtroPlazasActual = option.dataset.valor;
            localStorage.setItem("filtroPlazas", filtroPlazasActual);
            if (btnFiltroPlazas) {
                btnFiltroPlazas.textContent = option.textContent;
            }
            actualizarVista();
        });
    });
});