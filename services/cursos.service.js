import { query } from '../db/mariadb.js';

export async function listarCursos() {
    const sql = `
        SELECT 
            c.id_curso,
            c.nombre,
            c.fecha_inicio,
            c.fecha_fin,
            c.plazas,
            c.estado,
            c.horario,
            d.especialidad,
            d.nombre AS docente,
            a.nombre AS aula,
            a.edificio
        FROM cursos AS c
        JOIN docentes AS d ON d.id_docente = c.id_docente
        JOIN aulas AS a ON a.id_aula = c.id_aula
        ORDER BY c.id_curso ASC
    `;
    return await query(sql);
}