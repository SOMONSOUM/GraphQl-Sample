import { ContextType } from "../../../lib/ContextType";

export const UpdateUserResolver = async (_: any, { ID, data }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  let dataInput: any = {
    display_name: data.displayName,
    phone_number: data.phoneNumber,
    picture: data.picture,
    username: data.username
  }
  
  if (data.username === '' || data.username === undefined) {
    dataInput = {
      display_name: data.displayName,
      phone_number: data.phoneNumber,
      picture: data.picture
    }
  }
  
  if (await (await knex('users').where('username', '=', data.username)).length <= 0) {
    await knex('users').update(dataInput).where('id', '=', ID);
    await knex('user_role').update({ role_id: data.roleID }).where('user_id', '=', ID);
  }
  else throw 'username alredy exist';
  
  return true;
}