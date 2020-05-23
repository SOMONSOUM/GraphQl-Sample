import { ContextType } from "../../../lib/ContextType";
import hash from 'password-hash';
import { TokenGeneration } from "../../../lib/TokenGeneration";

export const CreateUserResolver = async (_: any, { data }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  if (await (await knex('users').where('username', '=', data.username)).length <= 0) {
    const user: any = await knex('users').insert({
      username: data.username,
      password: hash.generate(data.password),
      phone_number: data.phoneNumber,
      picture: data.picture,
      display_name: data.displayName,
      access_token: TokenGeneration() + "@" + data.displayName
    }).returning('id');
    await knex('user_role').insert({
      user_id: user[0],
      role_id: data.roleID
    });
    return true;
  }
  else{
    throw 'username already exist';
  }
}