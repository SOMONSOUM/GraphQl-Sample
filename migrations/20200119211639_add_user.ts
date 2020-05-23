import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  if(!await knex.schema.hasTable('users')){
    return await knex.schema.createTable('users', function(table){
      table.increments();
      table.string('display_name');
      table.string('phone_number');
      table.string('username');
      table.string('password');
      table.string('access_token');
      table.string('picture');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  }
}


export async function down(knex: Knex): Promise<any> {
}

