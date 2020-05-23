import { ContextType } from "../../lib/ContextType"

const roleList = async (__: any, {}: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const items = await knex('roles').orderBy('id', 'desc');
  return items.map(x => {
    return {
      ...x,
      roleName: x.role_name
    }
  })
}

const createRole = async (__: any, { role }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  await knex('roles').insert({ role_name: role });
  return true;
}

export const RoleResolver = {
  Query: {
    roleList
  },
  Mutation: {
    createRole
  }
}