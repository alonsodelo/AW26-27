import { obtenerCursosActivos } from "../BD/cursosBd.js";

export async function listarCursos() {
    try {
        const cursos = await obtenerCursosActivos();
        return cursos;
    } catch (error) {
        console.error("Error al consultar los cursos en MariaDB:", error.message);
        throw new Error("Error interno al obtener el catálogo de cursos");
    }
}