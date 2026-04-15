const { tbc_categorias, tbc_producto, Sequelize } = require('../models');

const { Op } = Sequelize;

module.exports = {
  create(req, res) {
    return tbc_categorias
      .create({
        nombre: req.body.nombre
      })
      .then((categoria) => res.status(201).send(categoria))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return tbc_categorias
      .findAll({
        include: [
          {
            model: tbc_producto,
            as: 'productos'
          }
        ]
      })
      .then((categorias) => res.status(200).send(categorias))
      .catch((error) => res.status(400).send(error));
  },

  getById(req, res) {
    return tbc_categorias
      .findByPk(req.params.id, {
        include: [
          {
            model: tbc_producto,
            as: 'productos'
          }
        ]
      })
      .then((categoria) => {
        if (!categoria) {
          return res.status(404).send({
            mensaje: 'Categoria no encontrada'
          });
        }

        return res.status(200).send(categoria);
      })
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    return tbc_categorias
      .findAll({
        where: {
          nombre: {
            [Op.like]: `%${req.params.termino}%`
          }
        },
        include: [
          {
            model: tbc_producto,
            as: 'productos'
          }
        ]
      })
      .then((categorias) => res.status(200).send(categorias))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return tbc_categorias
      .findByPk(req.params.id)
      .then((categoria) => {
        if (!categoria) {
          return res.status(404).send({
            mensaje: 'Categoria no encontrada'
          });
        }

        return categoria
          .update({
            nombre: req.body.nombre ?? categoria.nombre
          })
          .then((categoriaActualizada) => res.status(200).send(categoriaActualizada));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return tbc_categorias
      .findByPk(req.params.id)
      .then((categoria) => {
        if (!categoria) {
          return res.status(404).send({
            mensaje: 'Categoria no encontrada'
          });
        }

        return categoria.destroy().then(() =>
          res.status(200).send({
            mensaje: 'Categoria eliminada correctamente'
          })
        );
      })
      .catch((error) => res.status(400).send(error));
  }
};
