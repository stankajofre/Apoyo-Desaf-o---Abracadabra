// Importar Express
import express from 'express';
const app = express();
import path from 'path'




// Definir el puerto
const PORT = 3000;

// Middleware para servir archivos estáticos desde la carpeta 'assets'
const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, '/assets')))

// Arreglo de nombres de usuarios
const usuarios = ['Juan', 'Jocelyn', 'Astrid', 'Maria', 'Ignacia', 'Javier', 'Brian'];

// Ruta para devolver el arreglo de usuarios en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});
console.log
// Middleware para validar si el usuario existe en el arreglo
const validarUsuario = (req, res, next) => {
    const usuario = req.params.usuario;
    if (usuarios.includes(usuario)) {
        next(); // El usuario existe, continuar con la siguiente ruta
    } else {
        res.sendFile(__dirname + '/assets/who.jpeg'); // Devolver imagen "who.jpeg"
    }
};

// Ruta para jugar, que valida si el usuario existe
app.get('/abracadabra/juego/:usuario', validarUsuario, (req, res) => {
    res.send('¡Bienvenido al juego de magia!');
});

// Ruta para devolver la imagen del conejo o Voldemort
app.get('/abracadabra/conejo/:n', (req, res) => {
    const n = req.params.n;
    const randomNumber = Math.floor(Math.random() * 4) + 1; // Número aleatorio del 1 al 4
    if (n == randomNumber) {
        res.sendFile(__dirname + '/assets/conejo.png'); // Devolver imagen del conejo
    } else {
        res.sendFile(__dirname + '/assets/voldemort.png'); // Devolver imagen de Voldemort
    }
});

// Ruta genérica para manejar rutas no definidas
app.get('*', (req, res) => {
    res.send('Esta página no existe...');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});