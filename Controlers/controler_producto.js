const { tbc_producto, tbc_categorias, tbc_carrito_detalle, Sequelize } = require('../models');

const { Op } = Sequelize;

module.exports = {
  create(req, res) {
    return tbc_producto
      .create({
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        id_categoria: req.body.id_categoria
      })
      .then((producto) => res.status(201).send(producto))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return tbc_producto
      .findAll({
        include: [
          {
            model: tbc_categorias,
            as: 'categoria'
          },
          {
            model: tbc_carrito_detalle,
            as: 'detalles_carrito'
          }
        ]
      })
      .then((productos) => res.status(200).send(productos))
      .catch((error) => res.status(400).send(error));
  },

  getById(req, res) {
    return tbc_producto
      .findByPk(req.params.id, {
        include: [
          {
            model: tbc_categorias,
            as: 'categoria'
          },
          {
            model: tbc_carrito_detalle,
            as: 'detalles_carrito'
          }
        ]
      })
      .then((producto) => {
        if (!producto) {
          return res.status(404).send({
            mensaje: 'Producto no encontrado'
          });
        }

        return res.status(200).send(producto);
      })
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    const termino = req.params.termino;
    const terminoNumerico = Number(termino);

    return tbc_producto
      .findAll({
        where: {
          [Op.or]: [
            { descripcion: { [Op.like]: `%${termino}%` } },
            ...(Number.isNaN(terminoNumerico) ? [] : [{ id_categoria: terminoNumerico }])
          ]
        },
        include: [
          {
            model: tbc_categorias,
            as: 'categoria'
          },
          {
            model: tbc_carrito_detalle,
            as: 'detalles_carrito'
          }
        ]
      })
      .then((productos) => res.status(200).send(productos))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return tbc_producto
      .findByPk(req.params.id)
      .then((producto) => {
        if (!producto) {
          return res.status(404).send({
            mensaje: 'Producto no encontrado'
          });
        }

        return producto
          .update({
            descripcion: req.body.descripcion ?? producto.descripcion,
            precio: req.body.precio ?? producto.precio,
            stock: req.body.stock ?? producto.stock,
            id_categoria: req.body.id_categoria ?? producto.id_categoria
          })
          .then((productoActualizado) => res.status(200).send(productoActualizado));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return tbc_producto
      .findByPk(req.params.id)
      .then((producto) => {
        if (!producto) {
          return res.status(404).send({
            mensaje: 'Producto no encontrado'
          });
        }

        return producto.destroy().then(() =>
          res.status(200).send({
            mensaje: 'Producto eliminado correctamente'
          })
        );
      })
      .catch((error) => res.status(400).send(error));
  }
};
