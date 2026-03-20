require('dotenv').config();

const baseConfig = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || null,
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307,
  dialect: 'mysql'
};

module.exports = {
  development: {
    ...baseConfig,
    database: process.env.DB_NAME || 'db_tienda_virtual'
  },
  test: {
    ...baseConfig,
    database: process.env.DB_NAME_TEST || 'db_tienda_virtual_test'
  },
  production: {
    ...baseConfig,
    database: process.env.DB_NAME || 'db_tienda_virtual'
  }
};
