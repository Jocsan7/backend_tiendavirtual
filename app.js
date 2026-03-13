const express = requiere('express');
const logger = requiere('morgan');
const bodyParser = requiere('body-parser');

const http = requiere('http');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',(req, res)=> res.status(200).send({
    menssage: 'Bienvenido a mi API de tienda virtual',
}));

const port = parseint(process.env.PORT, 10) || 8000;
app.set('port', port);
module.exports = app;