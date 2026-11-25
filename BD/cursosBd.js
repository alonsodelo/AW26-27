import mariadb from "mariadb";

const pool = mariadb.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "aw_practica",
    connectionLimit: 5
});

export async function obtenerCursosActivos() {
    let conn;
    try {
        conn = await pool.getConnection();
        const filas = await conn.query(`
            SELECT 
                c.id_curso,
                c.nombre,
                c.descripcion,
                c.fecha_inicio,
                c.fecha_fin,
                c.horario,
                c.plazas,
                c.imagen,
                c.estado,
                d.nombre AS docente,
                d.especialidad,
                a.nombre AS aula,
                a.edificio
            FROM cursos AS c
            JOIN docentes AS d ON d.id_docente = c.id_docente
            JOIN aulas AS a ON a.id_aula = c.id_aula
            WHERE c.estado = 'activo'
            ORDER BY c.id_curso ASC
        `);
        return filas;
    } finally {
        if (conn) conn.release();
    }
}