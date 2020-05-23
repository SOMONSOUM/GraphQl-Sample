import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  if(!await knex.schema.hasTable('user_role')){
    return await knex.schema.createTable('user_role', function(table){
      table.integer('user_id').unsigned();
      table.integer('role_id').unsigned();
      table.primary(['user_id', 'role_id']);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  }
}


export async function down(knex: Knex): Promise<any> {
}
