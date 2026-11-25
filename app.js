import express from 'express';
import path from 'path'; //estos dos son nativos de node
import { fileURLToPath } from 'url'; 
import cursosRouter from './routes/cursos.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url); //esto es para que funcione independientemente del OS
const __dirname = path.dirname(__filename); //nos interesa solo la direccion

app.use(express.json()); //traducir a json
app.use(express.urlencoded({ extended: true })); //formularios HTML
app.use(express.static(path.join(__dirname, 'public'))); //navegador sabe donde esta public/

app.use('/api/cursos', cursosRouter); //rutas api rest

app.use((req, res) => {
    res.status(404).json({ error: 'Recurso o ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error('Error inesperado:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});