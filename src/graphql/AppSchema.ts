import { CategoryResolver } from './resolver/CategoryResolver';
import { PostResolver } from './resolver/PostResolver';
import { SchemeLoader } from "./SchemaLoader";
import { RoleResolver } from "./resolver/RoleResolver";
import { UserResolver } from "./resolver/user";

export const typeDefs = SchemeLoader();

export const resolvers = [
  RoleResolver,
  UserResolver,
  PostResolver,
  CategoryResolver
]