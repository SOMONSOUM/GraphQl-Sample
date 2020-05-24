import { ContextType } from "../../lib/ContextType"

const postList = async (__: any, { }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const posts = await knex('posts').orderBy('id', 'desc');
  return posts.map(x => {
    return {
      ...x,
      title: x.title,
      content: x.content,
      categoryId: x.category_id,
      userId: x.user_id
    }
  });

}

const createPost = async (__: any, { data }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const userId = (await ctx.auth.getUser()).id;
  await knex('posts').insert({
    title: data.title,
    content: data.content,
    category_id: data.category_id,
    user_id: Number(userId)
  })
  return true
}

const post = async (__: any, { id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const post = knex('posts').where('id', "=", id).first()
  return post
}

const updatePost = async (__: any, { id, data }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const userId = (await ctx.auth.getUser()).id;
  await knex('posts').update({
    title: data.title,
    content: data.content,
    category_id: data.category_id,
    user_id: Number(userId)
  }).where('id', "=", id)
  return true
}

const deletePost = async (__: any, { id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  await knex('posts').delete().where('id', "=", id)
  return true
}

export const PostResolver = {
  Query: {
    postList,
    post
  },
  Mutation: {
    createPost,
    updatePost,
    deletePost
  }
}