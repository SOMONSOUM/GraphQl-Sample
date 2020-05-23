import fs from 'fs';
import { gql } from 'apollo-server';

export function SchemeLoader() {
  const files = fs.readdirSync(__dirname + "/schema");
  const schema = [];
  for (const file of files) {
    schema.push(gql`${fs.readFileSync(__dirname + "/schema/" + file)}`);
  }
  return schema;
}
