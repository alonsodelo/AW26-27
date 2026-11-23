document.addEventListener("DOMContentLoaded", () => {
    const menuUsuario = document.getElementById("menuUsuario");
    if (!menuUsuario) return;

    let sesionActiva = null;
    try {
        const datosGuardados = localStorage.getItem("sesionUsuario");
        if (datosGuardados) {
            sesionActiva = JSON.parse(datosGuardados);
        }
    } catch (e) {
        console.warn("Estado de sesión inválido, se usa sesión cerrada por defecto:", e);
        sesionActiva = null;
    }

    renderizarMenuUsuario(sesionActiva);

    function renderizarMenuUsuario(sesion) {
        menuUsuario.textContent = "";

        if (sesion && sesion.activa) {
            const liCuenta = document.createElement("li");
            liCuenta.className = "nav-item";
            const enlaceCuenta = document.createElement("a");
            enlaceCuenta.className = "nav-link";
            enlaceCuenta.href = "perfil.html";
            enlaceCuenta.textContent = "Sesión";
            liCuenta.appendChild(enlaceCuenta);

            const liCerrar = document.createElement("li");
            liCerrar.className = "nav-item";
            const enlaceCerrar = document.createElement("a");
            enlaceCerrar.className = "nav-link";
            enlaceCerrar.href = "#";
            enlaceCerrar.textContent = "Cerrar sesión";

            enlaceCerrar.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("sesionUsuario");
                window.location.href = "index.html";
            });

            liCerrar.appendChild(enlaceCerrar);
            menuUsuario.appendChild(liCuenta);
            menuUsuario.appendChild(liCerrar);

        } else {
            const liLogin = document.createElement("li");
            liLogin.className = "nav-item";
            const enlaceLogin = document.createElement("a");
            enlaceLogin.className = "nav-link";
            enlaceLogin.href = "login.html";
            enlaceLogin.textContent = "Iniciar sesión";
            liLogin.appendChild(enlaceLogin);

            const liRegistro = document.createElement("li");
            liRegistro.className = "nav-item";
            const enlaceRegistro = document.createElement("a");
            enlaceRegistro.className = "nav-link";
            enlaceRegistro.href = "registro.html";
            enlaceRegistro.textContent = "Registrarse";
            liRegistro.appendChild(enlaceRegistro);

            menuUsuario.appendChild(liLogin);
            menuUsuario.appendChild(liRegistro);
        }
    }
});