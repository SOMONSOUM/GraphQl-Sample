import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    if(!await knex.schema.hasTable('posts')){
        return await knex.schema.createTable('posts', function(table){
          table.increments();
          table.string('title');
          table.string('content');
          table.timestamps(true, true)
        })
      }
}


export async function down(knex: Knex): Promise<any> {
}

