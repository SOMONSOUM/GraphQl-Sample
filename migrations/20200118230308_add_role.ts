import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  if(!await knex.schema.hasTable('roles')){
    return await knex.schema.createTable('roles', function(table){
      table.increments();
      table.string('role_name');
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
  }
}


export async function down(knex: Knex): Promise<any> {
}

