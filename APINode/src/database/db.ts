import { Client, Pool } from "pg";

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'API_NODE',
    password: '@api_node',
    port: 5432,
  })

const db = new Pool(client);

export default db;