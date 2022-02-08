const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/router');

db('mongodb+srv://jbSmarData:4XBjRN6Ku-B4%40p3@cluster0.6pif9.mongodb.net/test');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

socket.connect(server);

router(app);

app.use('/app', express.static('public'));

server.listen(3000, function () {
    console.log('La aplicacion esta escuchando en http://localhost:3000');
});
