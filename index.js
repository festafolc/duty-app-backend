require('dotenv').config();
const geocoder = require('./helpers/geocoder');
const Server = require('./server');

const server = new Server();
const res = async () => {
    const location = await geocoder.geocode('36 Rua Sao Caetano Lisboa Portugal');
    console.log(location);
}
res();
server.listen();