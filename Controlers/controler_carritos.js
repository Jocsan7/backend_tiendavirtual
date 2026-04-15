const { tbc_carritos, tbc_usuario, tbc_carrito_detalle, Sequelize } = require('../models');

const { Op } = Sequelize;

module.exports = {
  create(req, res) {
    return tbc_carritos
      .create({
        total: req.body.total,
        estado: req.body.estado,
        fecha_creacion: req.body.fecha_creacion,
        id_usuario: req.body.id_usuario
      })
      .then((carrito) => res.status(201).send(carrito))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return tbc_carritos
      .findAll({
        include: [
          {
            model: tbc_usuario,
            as: 'usuario'
          },
          {
            model: tbc_carrito_detalle,
            as: 'detalles'
          }
        ]
      })
      .then((carritos) => res.status(200).send(carritos))
      .catch((error) => res.status(400).send(error));
  },

  getById(req, res) {
    return tbc_carritos
      .findByPk(req.params.id, {
        include: [
          {
            model: tbc_usuario,
            as: 'usuario'
          },
          {
            model: tbc_carrito_detalle,
            as: 'detalles'
          }
        ]
      })
      .then((carrito) => {
        if (!carrito) {
          return res.status(404).send({
            mensaje: 'Carrito no encontrado'
          });
        }

        return res.status(200).send(carrito);
      })
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    const termino = req.params.termino;
    const terminoNumerico = Number(termino);

    return tbc_carritos
      .findAll({
        where: {
          [Op.or]: [
            { estado: { [Op.like]: `%${termino}%` } },
            ...(Number.isNaN(terminoNumerico)
              ? []
              : [{ id_usuario: terminoNumerico }, { id: terminoNumerico }])
          ]
        },
        include: [
          {
            model: tbc_usuario,
            as: 'usuario'
          },
          {
            model: tbc_carrito_detalle,
            as: 'detalles'
          }
        ]
      })
      .then((carritos) => res.status(200).send(carritos))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return tbc_carritos
      .findByPk(req.params.id)
      .then((carrito) => {
        if (!carrito) {
          return res.status(404).send({
            mensaje: 'Carrito no encontrado'
          });
        }

        return carrito
          .update({
            total: req.body.total ?? carrito.total,
            estado: req.body.estado ?? carrito.estado,
            fecha_creacion: req.body.fecha_creacion ?? carrito.fecha_creacion,
            id_usuario: req.body.id_usuario ?? carrito.id_usuario
          })
          .then((carritoActualizado) => res.status(200).send(carritoActualizado));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return tbc_carritos
      .findByPk(req.params.id)
      .then((carrito) => {
        if (!carrito) {
          return res.status(404).send({
            mensaje: 'Carrito no encontrado'
          });
        }

        return carrito.destroy().then(() =>
          res.status(200).send({
            mensaje: 'Carrito eliminado correctamente'
          })
        );
      })
      .catch((error) => res.status(400).send(error));
  }
};
