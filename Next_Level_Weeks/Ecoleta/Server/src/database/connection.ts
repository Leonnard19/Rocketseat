import knex from 'knex';
import path from 'path'; //une os caminhos a + b => a/b

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
});

export default connection;
