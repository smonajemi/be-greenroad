import {Knex} from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await knex.schema.createTable('users',(table) => {
        table.uuid('id')
            .notNullable()
            .primary()
            .unique()
            .defaultTo(knex.raw('uuid_generate_v4()'))

        table.string('user_name')
            .notNullable()
            .unique()
            
        table.string('first_name')
        table.string('last_name')
        table.string('password')

        table.boolean('is_deleted').defaultTo(false)

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.timestamp('deleted_at').defaultTo(null)

    })
}


export async function down(knex: Knex): Promise<any> {
    await  knex.schema.dropTable("users")
}

