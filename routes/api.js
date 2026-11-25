import { Router } from "express";
import { listarCursos } from "../services/cursosService.js";

const router = Router();

router.get("/cursos", async (req, res) => {
    try {
        const cursos = await listarCursos();
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({
            error: "No se pudo obtener el listado de cursos."
        });
    }
});

export default router;