module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "0.0.0.0"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "aceedb"),
      user: env("DATABASE_USERNAME", "jordi"),
      password: env("DATABASE_PASSWORD", "jordiirawan"),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});
