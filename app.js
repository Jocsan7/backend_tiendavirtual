require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const mysql = require('mysql2/promise');

const categoriaController = require('./Controlers/controler_categoria');
const usuarioController = require('./Controlers/controler_usuario');
const productoController = require('./Controlers/controler_producto');
const carritosController = require('./Controlers/controler_carritos');
const carritoDetalleController = require('./Controlers/controler_carrito_detalle');
const {
  tbc_categorias,
  tbc_usuario,
  tbc_producto,
  tbc_carritos,
  tbc_carrito_detalle,
  sequelize
} = require('./models');
const config = require('./config/config')[process.env.NODE_ENV || 'development'];

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/health', (_, res) =>
  res.status(200).send({
    mensaje: 'Servidor activo'
  })
);

async function obtenerDatosTablas() {
  const [categorias, usuarios, productos, carritos, carritoDetalles] = await Promise.all([
    tbc_categorias.findAll(),
    tbc_usuario.findAll(),
    tbc_producto.findAll({
      include: [
        {
          model: tbc_categorias,
          as: 'categoria'
        }
      ]
    }),
    tbc_carritos.findAll({
      include: [
        {
          model: tbc_usuario,
          as: 'usuario'
        }
      ]
    }),
    tbc_carrito_detalle.findAll({
      include: [
        {
          model: tbc_carritos,
          as: 'carrito'
        },
        {
          model: tbc_producto,
          as: 'producto'
        }
      ]
    })
  ]);

  return {
    categorias,
    usuarios,
    productos,
    carritos,
    carrito_detalles: carritoDetalles
  };
}

app.get('/', async (_, res) => {
  try {
    const datos = await obtenerDatosTablas();

    return res.status(200).send({
      mensaje: 'Bienvenido a mi API de tienda virtual',
      endpoints_principales: [
        '/categorias',
        '/usuarios',
        '/productos',
        '/carritos',
        '/carrito-detalles',
        '/datos-tablas'
      ],
      datos
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: 'No se pudieron obtener los datos de las tablas',
      error: error.message,
      sugerencia:
        'Revisa la configuracion de MySQL en tu archivo .env (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD y DB_NAME).'
    });
  }
});

app.get('/datos-tablas', async (_, res) => {
  try {
    const datos = await obtenerDatosTablas();
    return res.status(200).send(datos);
  } catch (error) {
    return res.status(500).send({
      mensaje: 'No se pudieron obtener los datos de las tablas',
      error: error.message,
      sugerencia:
        'Revisa la configuracion de MySQL en tu archivo .env (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD y DB_NAME).'
    });
  }
});

app.post('/categorias', categoriaController.create);
app.get('/categorias', categoriaController.list);
app.get('/categorias/buscar/:termino', categoriaController.find);
app.get('/categorias/:id', categoriaController.getById);
app.put('/categorias/:id', categoriaController.update);
app.delete('/categorias/:id', categoriaController.delete);

app.post('/usuarios', usuarioController.create);
app.post('/login', usuarioController.login);
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

async function inicializarBaseDeDatos() {
  const conexion = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password
  });

  await conexion.query(
    `CREATE DATABASE IF NOT EXISTS \`${config.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await conexion.end();

  await sequelize.authenticate();
  await sequelize.sync();
}

async function iniciarServidor() {
  try {
    await inicializarBaseDeDatos();
    server.listen(port, () => {
      console.log(`Servidor ejecutandose en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
  }
}

iniciarServidor();

module.exports = app;
