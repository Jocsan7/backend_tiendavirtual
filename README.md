# backend_tiendavirtual

API REST para una tienda virtual con Express, Sequelize y MySQL.

## Requisitos

- Node.js y npm
- MySQL en ejecucion

## Instalacion

```bash
npm install
```

Si quieres usar la CLI de Sequelize en este proyecto, ya quedo instalada localmente:

```bash
npm run sequelize -- --help
```

## Configuracion

1. Crea tu archivo `.env` a partir de `.env.example`.
2. Ajusta las variables segun tu instancia local de MySQL.

Variables esperadas:

```env
PORT=8000
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USER=root
DB_PASSWORD=
DB_NAME=db_tienda_virtual
DB_NAME_TEST=db_tienda_virtual_test
```

## Ejecucion

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

## Migraciones

Ejecutar migraciones:

```bash
npm run db:migrate
```

Revertir la ultima migracion:

```bash
npm run db:migrate:undo
```

## Notas

- `dotenv` es la dependencia correcta para leer variables de entorno.
- `dot` y `env` no eran necesarias; fueron agregadas por error al ejecutar `npm install dot env`.
- El comando correcto para la CLI es `npm install --save-dev sequelize-cli`.
