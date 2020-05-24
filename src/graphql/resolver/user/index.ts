import { ContextType } from "../../../lib/ContextType";
import { Formatter } from "../../../lib/Formatter";
import { CreateUserResolver } from './CreateUserResolver';
import { LoginUserResolver } from "./LoginUserResolver";
import { ChangePasswordResolver } from "./ChangePasswordResolver";
import { UpdateUserResolver } from "./UpdateUserResolver";

const userList = async (_: any, { }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const items = await knex('users')
                .innerJoin('user_role', 'users.id', 'user_role.user_id')
                .innerJoin('roles', 'user_role.role_id', 'roles.id');
  
  return items.map(x => {
    return {
      ...x,
      displayName: x.display_name,
      phoneNumber: x.phone_number,
      createdAt: new Formatter('YYYY-MM-DD hh:mm:ss').value(x.created_at),
      role: {
        id: x.role_id,
        roleName: x.role_name
      }
    }
  })
}

const me = async (_: any, { }: any, ctx: ContextType) => {
  const me = await ctx.auth.getUser();
  return me;
}

export const UserResolver = {
  Query: {
    userList,
    me
  },
  Mutation: {
    createUser: CreateUserResolver,
    loginUser: LoginUserResolver,
    changePassword: ChangePasswordResolver,
    updateUser: UpdateUserResolver
  }
}