import { ContextType } from "../../lib/ContextType"


const categoryList = async (__: any, { }: any, ctx: ContextType) => {
  const knex = await ctx.knex
  const categories = await knex('categories').orderBy('id', 'desc');
  return categories.map(x => {
    return {
      ...x,
      name: x.name,
      userId: x.user_id
    }
  })
}

const createCategory = async (__: any, { data }: any, ctx: ContextType) => {
  const knex = await ctx.knex
  const userId = (await ctx.auth.getUser()).id
  await knex('categories').insert({
    name: data.name,
    user_id: Number(userId)
  })
  return true
}


export const CategoryResolver = {
  Query: {
    categoryList
  },
  Mutation: {
    createCategory
  }
}