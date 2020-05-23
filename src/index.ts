import { server } from './ApolloServer';
import { config } from 'dotenv';

config();

server.listen(process.env.PORT).then(({ url }: any) => {
  console.log('🚀 listen on ' + url);
})