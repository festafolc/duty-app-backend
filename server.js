const cors = require('cors');
const express = require('express');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //Rutas de la aplicación
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body en peticiones HTTP
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/', require('./routes/user'));
        this.app.use('/', require('./routes/login'));
        this.app.use('/', require('./routes/home'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

module.exports = Server;