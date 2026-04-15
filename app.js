const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const categoriaController = require('./Controlers/controler_categoria');
const usuarioController = require('./Controlers/controler_usuario');
const productoController = require('./Controlers/controler_producto');
const carritosController = require('./Controlers/controler_carritos');
const carritoDetalleController = require('./Controlers/controler_carrito_detalle');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) =>
  res.status(200).send({
    menssage: 'Bienvenido a mi API de tienda virtual'
  })
);

app.post('/categorias', categoriaController.create);
app.get('/categorias', categoriaController.list);
app.get('/categorias/buscar/:termino', categoriaController.find);
app.get('/categorias/:id', categoriaController.getById);
app.put('/categorias/:id', categoriaController.update);
app.delete('/categorias/:id', categoriaController.delete);

app.post('/usuarios', usuarioController.create);
app.get('/usuarios', usuarioController.list);
app.get('/usuarios/buscar/:termino', usuarioController.find);
app.get('/usuarios/:id', usuarioController.getById);
app.put('/usuarios/:id', usuarioController.update);
app.delete('/usuarios/:id', usuarioController.delete);

app.post('/productos', productoController.create);
app.get('/productos', productoController.list);
app.get('/productos/buscar/:termino', productoController.find);
app.get('/productos/:id', productoController.getById);
app.put('/productos/:id', productoController.update);
app.delete('/productos/:id', productoController.delete);

app.post('/carritos', carritosController.create);
app.get('/carritos', carritosController.list);
app.get('/carritos/buscar/:termino', carritosController.find);
app.get('/carritos/:id', carritosController.getById);
app.put('/carritos/:id', carritosController.update);
app.delete('/carritos/:id', carritosController.delete);

app.post('/carrito-detalles', carritoDetalleController.create);
app.get('/carrito-detalles', carritoDetalleController.list);
app.get('/carrito-detalles/buscar/:termino', carritoDetalleController.find);
app.get('/carrito-detalles/:id', carritoDetalleController.getById);
app.put('/carrito-detalles/:id', carritoDetalleController.update);
app.delete('/carrito-detalles/:id', carritoDetalleController.delete);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;
