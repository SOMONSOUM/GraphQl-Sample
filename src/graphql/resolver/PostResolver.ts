import { ContextType } from "../../lib/ContextType"

const postList = async (__: any, { }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const posts = await knex('posts').orderBy('id', 'desc');
  const categories = await knex('categories').whereIn('id', posts.map(x => x.category_id));
  const items: any[] = [];

  posts.map(x => {
    const category = categories.filter(y => y.id === x.category_id)
    items.push({
      ...x,
      title: x.title,
      content: x.content,
      categories: category,
      userId: x.user_id
    })
  })

  return items;

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