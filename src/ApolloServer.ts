import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql/AppSchema';
import { context } from './lib/ContextType';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});