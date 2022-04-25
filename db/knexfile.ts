// Update with your config settings.
import { Knex } from 'knex'
const config = {

    client: "pg",
    connection: {
      host: "greenroad.cb4m46wpa5bl.us-east-2.rds.amazonaws.com",
      port: 5432,
      user: "postgres",
      password: "Toronto92"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
};

export default config;