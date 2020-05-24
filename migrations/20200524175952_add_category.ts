import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  if(!await knex.schema.hasTable('categories')){
    return await knex.schema.createTable('categories', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('user_id').notNullable()
      table.timestamps(true, true)
    })
  }
}


export async function down(knex: Knex): Promise<any> {
}

