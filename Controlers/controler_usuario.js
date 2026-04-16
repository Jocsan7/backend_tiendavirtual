const jwt = require('jsonwebtoken');
const { tbc_usuario, tbc_carritos, Sequelize } = require('../models');

const { Op } = Sequelize;

module.exports = {
  login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        mensaje: 'Debes enviar email y password'
      });
    }

    return tbc_usuario
      .findOne({
        where: {
          email
        }
      })
      .then((usuario) => {
        if (!usuario || usuario.password !== password) {
          return res.status(401).send({
            mensaje: 'Credenciales incorrectas'
          });
        }

        const token = jwt.sign(
          {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol
          },
          process.env.JWT_SECRET || 'clave_practica_login',
          {
            expiresIn: '2h'
          }
        );

        return res.status(200).send({
          token
        });
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    return tbc_usuario
      .create({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        password: req.body.password,
        rol: req.body.rol,
        fecha_registro: req.body.fecha_registro
      })
      .then((usuario) => res.status(201).send(usuario))
      .catch((error) => res.status(400).send(error));
  },

  list(_, res) {
    return tbc_usuario
      .findAll({
        include: [
          {
            model: tbc_carritos,
            as: 'carritos'
          }
        ]
      })
      .then((usuarios) => res.status(200).send(usuarios))
      .catch((error) => res.status(400).send(error));
  },

  getById(req, res) {
    return tbc_usuario
      .findByPk(req.params.id, {
        include: [
          {
            model: tbc_carritos,
            as: 'carritos'
          }
        ]
      })
      .then((usuario) => {
        if (!usuario) {
          return res.status(404).send({
            mensaje: 'Usuario no encontrado'
          });
        }

        return res.status(200).send(usuario);
      })
      .catch((error) => res.status(400).send(error));
  },

  find(req, res) {
    const termino = req.params.termino;

    return tbc_usuario
      .findAll({
        where: {
          [Op.or]: [
            { nombre: { [Op.like]: `%${termino}%` } },
            { direccion: { [Op.like]: `%${termino}%` } },
            { telefono: { [Op.like]: `%${termino}%` } },
            { email: { [Op.like]: `%${termino}%` } },
            { rol: { [Op.like]: `%${termino}%` } }
          ]
        },
        include: [
          {
            model: tbc_carritos,
            as: 'carritos'
          }
        ]
      })
      .then((usuarios) => res.status(200).send(usuarios))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return tbc_usuario
      .findByPk(req.params.id)
      .then((usuario) => {
        if (!usuario) {
          return res.status(404).send({
            mensaje: 'Usuario no encontrado'
          });
        }

        return usuario
          .update({
            nombre: req.body.nombre ?? usuario.nombre,
            direccion: req.body.direccion ?? usuario.direccion,
            telefono: req.body.telefono ?? usuario.telefono,
            email: req.body.email ?? usuario.email,
            password: req.body.password ?? usuario.password,
            rol: req.body.rol ?? usuario.rol,
            fecha_registro: req.body.fecha_registro ?? usuario.fecha_registro
          })
          .then((usuarioActualizado) => res.status(200).send(usuarioActualizado));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return tbc_usuario
      .findByPk(req.params.id)
      .then((usuario) => {
        if (!usuario) {
          return res.status(404).send({
            mensaje: 'Usuario no encontrado'
          });
        }

        return usuario.destroy().then(() =>
          res.status(200).send({
            mensaje: 'Usuario eliminado correctamente'
          })
        );
      })
      .catch((error) => res.status(400).send(error));
  }
};
