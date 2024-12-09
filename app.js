import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import { obtenerFormulario, obtenerINFO, obtenerVariablesEntorno, obtenerLogin, obtenerEliminacion, obtenerContraseñas } from './controllers/ControladoresFront.js';

dotenv.config();

const app = express();

app.use(cors({
    origin:'*',
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

const __filName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filName);



app.use(express.static(path.join(__dirname, './frontend')));  // Ruta para archivos estáticos

app.set('view engine','ejs')
app.set('views', path.join(__dirname, './frontend/views'));  // Aquí s la clave para el error

const port = process.env.PUERTO;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/obtener-info", obtenerINFO);
app.get('/', obtenerFormulario);
app.get("/login", obtenerLogin);
app.get("/validar-contrasenas", obtenerContraseñas);
app.get("/variables", obtenerVariablesEntorno);
app.get("/eliminar-user", obtenerEliminacion);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
