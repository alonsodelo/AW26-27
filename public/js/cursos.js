document.addEventListener("DOMContentLoaded", () => {
    const cursosIniciales = [
    { id: 1, nombre: "Estudiar mogollon de programar", categoria: "Programación", duracion: 40, plazas: 12 },
    { id: 2, nombre: "Diseño de una web rosa muy fea", categoria: "Diseño", duracion: 25, plazas: 0 }, 
    { id: 3, nombre: "Sistemas de bases de datos", categoria: "Sistemas", duracion: 30, plazas: 8 }
    ];

    
    function guardarCursos() {
        try {
            localStorage.setItem("cursos", JSON.stringify(cursos));
        } catch (e) {
            console.warn("No se pudieron guardar los cursos:", e);
        }
    }

    let cursos = cursosIniciales;
    try {
        const datosGuardados = localStorage.getItem("cursos");
        if (datosGuardados) {
            cursos = JSON.parse(datosGuardados);
        }
    } catch (e) {
        console.warn("Error al leer localStorage, se usan los cursos iniciales:", e);
    }
   
    guardarCursos();

    let siguienteId = cursos.length > 0 ? Math.max(...cursos.map(c => c.id)) + 1 : 1;

    const contenedorCursos = document.getElementById("contenedorCursos");
    const contadorCursos = document.getElementById("contadorCursos");
    const buscador = document.getElementById("buscadorCursos");
    const formulario = document.getElementById("formNuevoCurso");
    const errorFormulario = document.getElementById("errorFormularioCurso");
    const btnFiltroPlazas = document.getElementById("btnFiltroPlazas");
    let filtroPlazasActual = localStorage.getItem("filtroPlazas") || "todas";

    renderizarCursos(cursos);
    function renderizarCursos(listaCursos) {
        contenedorCursos.textContent = "";

        contadorCursos.textContent = `${listaCursos.length} ${listaCursos.length === 1 ? "curso visible" : "cursos visibles"}`;

        if (listaCursos.length === 0) {
            const avisoVacio = document.createElement("p");
            avisoVacio.className = "text-muted";
            avisoVacio.textContent = "No existe ningun curso con ese nombre";
            contenedorCursos.appendChild(avisoVacio);
            return;
        }

        listaCursos.forEach((curso) => {
            const estaCompleto = curso.plazas === 0;

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

            const infoCategoria = document.createElement("p");
            infoCategoria.className = "card-text mb-1";
            infoCategoria.textContent = `Categoría: ${curso.categoria}`;

            const infoDuracion = document.createElement("p");
            infoDuracion.className = "card-text mb-1";
            infoDuracion.textContent = `Duración: ${curso.duracion} horas`;

            const infoPlazas = document.createElement("p");
            infoPlazas.className = estaCompleto ? "card-text text-danger fw-bold mb-3" : "card-text mb-3";
            infoPlazas.textContent = `Plazas disponibles: ${curso.plazas}`;

            const zonaBotones = document.createElement("div");
            zonaBotones.className = "mt-auto d-flex gap-2";

            const btnMatricular = document.createElement("button");
            btnMatricular.type = "button";
            btnMatricular.className = "btn btn-curso btn-sm";
            btnMatricular.textContent = estaCompleto ? "Sin plazas" : "Matricularse";
            btnMatricular.disabled = estaCompleto;

            const btnEliminar = document.createElement("button");
            btnEliminar.type = "button";
            btnEliminar.className = "btn btn-outline-danger btn-sm ms-auto";
            btnEliminar.textContent = "Eliminar";
            btnEliminar.addEventListener("click", () => {
                eliminarCurso(curso.id);
            });

            zonaBotones.appendChild(btnMatricular);
            zonaBotones.appendChild(btnEliminar);

            cuerpo.appendChild(titulo);
            cuerpo.appendChild(infoCategoria);
            cuerpo.appendChild(infoDuracion);
            cuerpo.appendChild(infoPlazas);
            cuerpo.appendChild(zonaBotones);

            tarjeta.appendChild(cuerpo);
            columna.appendChild(tarjeta);
            contenedorCursos.appendChild(columna);
        });
    }

    function actualizarVista() {
        const textoBusqueda = buscador.value.trim().toLowerCase();

        const cursosFiltrados = cursos.filter((curso) => {
            let ok = true;
            switch (filtroPlazasActual){
                case "disponibles":
                 ok = curso.plazas > 0;
                 break;

                case "completos":
                 ok = curso.plazas === 0;
                 break;        
            }
            return ok && curso.nombre.toLowerCase().includes(textoBusqueda)
        });

        renderizarCursos(cursosFiltrados);
    }

    buscador.addEventListener("input", actualizarVista);

    function eliminarCurso(idCurso) {
        cursos = cursos.filter((curso) => curso.id !== idCurso);
        guardarCursos();
        actualizarVista();
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        errorFormulario.textContent = "";

        const nombre = document.getElementById("nombreCurso").value.trim();
        const categoria = document.getElementById("categoriaCurso").value.trim();
        const duracion = Number(document.getElementById("duracionCurso").value);
        const plazas = Number(document.getElementById("plazasCurso").value);

        if (nombre === "" || categoria === "" || isNaN(duracion) || duracion < 1 || isNaN(plazas) || plazas < 0) {
            errorFormulario.textContent = "Todos los campos tienen que tener algún valor válido";
            return;
        }

        const nuevoCurso = {
            id: siguienteId++,
            nombre: nombre,
            categoria: categoria,
            duracion: duracion,
            plazas: plazas
        };

        cursos.push(nuevoCurso);
        guardarCursos();
        formulario.reset();
        actualizarVista();
    });

    document.querySelectorAll("#menuPlazas .dropdown-item").forEach((option) => {
        option.addEventListener("click", () => {
            filtroPlazasActual = option.dataset.valor;
            localStorage.setItem("filtroPlazas", filtroPlazasActual);
            document.getElementById("btnFiltroPlazas").textContent = option.textContent;
            actualizarVista();
        }) 
    })
    actualizarVista();
});