import { ContextType } from "../../../lib/ContextType";
import hash from 'password-hash';

export const LoginUserResolver = async (_: any, {username, password}: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const items = await knex('users').where('username', '=', username).first();
  
  if(items === undefined) return 'invalid username';

  if(hash.verify(password, items.password)){
    return items.access_token;
  }
  else {
    return 'invalid password';
  }
}