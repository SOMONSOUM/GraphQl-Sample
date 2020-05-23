import { ContextType } from "../../../lib/ContextType";
import hash from 'password-hash';

export const ChangePasswordResolver = async (_: any, { oldPassword, newPassword }: any, ctx: ContextType) => {
  const auth = await ctx.auth.getUser();
  const knex = await ctx.knex;

  const user = await knex('users').where('id', '=', auth.id).first();

  if(hash.verify(oldPassword, user.password)){
    await knex('users').update({ password: hash.generate(newPassword) }).where('id', '=', auth.id);
  }
  else throw 'incorect old password';
  return true;
}