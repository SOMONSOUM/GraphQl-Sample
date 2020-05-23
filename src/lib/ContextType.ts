import Knex = require("knex");
import { knex } from '../setting';

interface User {
  id?: number | 0;
  displayName?: string | null;
  phoneNumber?: string | null;
  createdAt?: string | null;
  role?: any | null;
}

export type ContextType = {
  knex: Knex,
  auth: HandlerAuth
}

export const context = async ({req}: any) => {

  let auth = {};

  if(req.query.token !== undefined){
    auth = new HandlerAuth(req.query.token);
  }

  return {
    knex,
    auth
  }
}

class HandlerAuth{

  private token: string;

  constructor(token: string){
    this.token = token
  }

  async getUser(): Promise<User>{
    const x = await knex('users')
              .innerJoin('user_role', 'users.id', 'user_role.user_id')
              .innerJoin('roles', 'user_role.role_id', 'roles.id')
              .where('access_token', '=', this.token).first();
    return {
      ...x,
      id: x.user_id,
      displayName: x.display_name,
      phoneNumber: x.phone_number,
      createdAt: x.created_at,
      role: { id: x.role_id, roleName: x.role_name }
    }
  }
}
