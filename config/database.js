const parse = require("pg-connection-string").parse;
const config = parse(
  process.env.DATABASE_URL ||
    "postgres://jordi:jordiirawan@localhost:5432/aceedb"
);
module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    debug: false,
  },
});
