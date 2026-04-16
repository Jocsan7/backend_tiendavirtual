'use strict';

const now = new Date('2026-04-16T12:00:00.000Z');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('tbc_categorias', [
      { id: 1, nombre: 'Electronica', createdAt: now, updatedAt: now },
      { id: 2, nombre: 'Hogar', createdAt: now, updatedAt: now },
      { id: 3, nombre: 'Ropa', createdAt: now, updatedAt: now },
      { id: 4, nombre: 'Deportes', createdAt: now, updatedAt: now },
      { id: 5, nombre: 'Libros', createdAt: now, updatedAt: now }
    ]);

    await queryInterface.bulkInsert('tbc_usuarios', [
      {
        id: 1,
        nombre: 'Ana Lopez',
        direccion: 'Av. Reforma 101, Ciudad de Mexico',
        telefono: '5511111111',
        email: 'ana.lopez@tienda.com',
        password: 'admin123',
        rol: 'admin',
        fecha_registro: now,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        nombre: 'Bruno Perez',
        direccion: 'Calle Juarez 202, Guadalajara',
        telefono: '5522222222',
        email: 'bruno.perez@tienda.com',
        password: 'cliente123',
        rol: 'cliente',
        fecha_registro: now,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 3,
        nombre: 'Carla Ruiz',
        direccion: 'Blvd. Morelos 303, Monterrey',
        telefono: '5533333333',
        email: 'carla.ruiz@tienda.com',
        password: 'cliente123',
        rol: 'cliente',
        fecha_registro: now,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 4,
        nombre: 'Diego Torres',
        direccion: 'Av. Central 404, Puebla',
        telefono: '5544444444',
        email: 'diego.torres@tienda.com',
        password: 'admin456',
        rol: 'admin',
        fecha_registro: now,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 5,
        nombre: 'Elena Martinez',
        direccion: 'Calle Hidalgo 505, Merida',
        telefono: '5555555555',
        email: 'elena.martinez@tienda.com',
        password: 'cliente456',
        rol: 'cliente',
        fecha_registro: now,
        createdAt: now,
        updatedAt: now
      }
    ]);

    await queryInterface.bulkInsert('tbc_productos', [
      {
        id: 1,
        descripcion: 'Laptop Lenovo IdeaPad 16GB RAM',
        precio: 14999.99,
        stock: 10,
        id_categoria: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        descripcion: 'Licuadora Oster 3 velocidades',
        precio: 1299.50,
        stock: 25,
        id_categoria: 2,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 3,
        descripcion: 'Chamarra casual unisex azul',
        precio: 899.00,
        stock: 30,
        id_categoria: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 4,
        descripcion: 'Balon profesional de futbol',
        precio: 650.00,
        stock: 18,
        id_categoria: 4,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 5,
        descripcion: 'Libro Clean Code pasta blanda',
        precio: 720.00,
        stock: 40,
        id_categoria: 5,
        createdAt: now,
        updatedAt: now
      }
    ]);

    await queryInterface.bulkInsert('tbc_carritos', [
      {
        id: 1,
        total: 14999.99,
        estado: 'activo',
        fecha_creacion: now,
        id_usuario: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        total: 2599.00,
        estado: 'activo',
        fecha_creacion: now,
        id_usuario: 2,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 3,
        total: 1798.00,
        estado: 'pendiente',
        fecha_creacion: now,
        id_usuario: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 4,
        total: 1950.00,
        estado: 'pagado',
        fecha_creacion: now,
        id_usuario: 4,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 5,
        total: 2160.00,
        estado: 'activo',
        fecha_creacion: now,
        id_usuario: 5,
        createdAt: now,
        updatedAt: now
      }
    ]);

    await queryInterface.bulkInsert('tbc_carrito_detalles', [
      {
        id: 1,
        precio_unitario: 14999.99,
        cantidad: 1,
        id_carrito: 1,
        id_producto: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        precio_unitario: 1299.50,
        cantidad: 2,
        id_carrito: 2,
        id_producto: 2,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 3,
        precio_unitario: 899.00,
        cantidad: 2,
        id_carrito: 3,
        id_producto: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 4,
        precio_unitario: 650.00,
        cantidad: 3,
        id_carrito: 4,
        id_producto: 4,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 5,
        precio_unitario: 720.00,
        cantidad: 3,
        id_carrito: 5,
        id_producto: 5,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tbc_carrito_detalles', { id: [1, 2, 3, 4, 5] });
    await queryInterface.bulkDelete('tbc_carritos', { id: [1, 2, 3, 4, 5] });
    await queryInterface.bulkDelete('tbc_productos', { id: [1, 2, 3, 4, 5] });
    await queryInterface.bulkDelete('tbc_usuarios', { id: [1, 2, 3, 4, 5] });
    await queryInterface.bulkDelete('tbc_categorias', { id: [1, 2, 3, 4, 5] });
  }
};
