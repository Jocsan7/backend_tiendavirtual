const { tbc_carrito_detalle, tbc_carritos, tbc_producto, Sequelize } = require('../models');

const { Op } = Sequelize;

module.exports = {
  create(req, res) {
    return tbc_carrito_detalle
      .create({
        precio_unitario: req.body.precio_unitario,
        cantidad: req.body.cantidad,
        id_carrito: req.body.id_carrito,
        id_producto: req.body.id_producto
      })
      .then((detalle) => res.status(201).send(detalle))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return tbc_carrito_detalle
      .findAll({
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
      .then((detalles) => res.status(200).send(detalles))
      .catch((error) => res.status(400).send(error));
  },

  getById(req, res) {
    return tbc_carrito_detalle
      .findByPk(req.params.id, {
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
      .then((detalle) => {
        if (!detalle) {
          return res.status(404).send({
            mensaje: 'Detalle de carrito no encontrado'
          });
        }

        return res.status(200).send(detalle);
      })
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    const termino = Number(req.params.termino);

    if (Number.isNaN(termino)) {
      return res.status(400).send({
        mensaje: 'El termino de busqueda debe ser numerico para carrito detalle'
      });
    }

    return tbc_carrito_detalle
      .findAll({
        where: {
          [Op.or]: [{ id: termino }, { id_carrito: termino }, { id_producto: termino }]
        },
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
      .then((detalles) => res.status(200).send(detalles))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return tbc_carrito_detalle
      .findByPk(req.params.id)
      .then((detalle) => {
        if (!detalle) {
          return res.status(404).send({
            mensaje: 'Detalle de carrito no encontrado'
          });
        }

        return detalle
          .update({
            precio_unitario: req.body.precio_unitario ?? detalle.precio_unitario,
            cantidad: req.body.cantidad ?? detalle.cantidad,
            id_carrito: req.body.id_carrito ?? detalle.id_carrito,
            id_producto: req.body.id_producto ?? detalle.id_producto
          })
          .then((detalleActualizado) => res.status(200).send(detalleActualizado));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return tbc_carrito_detalle
      .findByPk(req.params.id)
      .then((detalle) => {
        if (!detalle) {
          return res.status(404).send({
            mensaje: 'Detalle de carrito no encontrado'
          });
        }

        return detalle.destroy().then(() =>
          res.status(200).send({
            mensaje: 'Detalle de carrito eliminado correctamente'
          })
        );
      })
      .catch((error) => res.status(400).send(error));
  }
};
