/* AQUI FICARÁ A CONEXÃO AO BANCO DE DADOS */
import * as sqlite3 from 'sqlite3';
import * as path from 'path';

// Importing the migrations
import creatingTableUser from './migrations/creating-table-user';

// Importing/adding the seeds
// import Insert from './seeds/inserting-name-email-password';

// const { insert } = new Insert();
// const admin = new Insert().adminInserted;
// const user = new Insert().userInserted;

// Creating a db (database) or locating it in path
const DBSOURCE = path.resolve(__dirname, 'db.sqlite');

// Making the connection and some queries
const db = new sqlite3.Database(DBSOURCE, err => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    // Creating the table users
    db.run(creatingTableUser, _err => {
      if (_err) {
        console.log('Table already exist');
      } else {
        // Inserting data
        // db.run(insert, admin);
        // db.run(insert, user);
        console.log('Table created');
      }
    });
  }
});

// Exporting the db
export default db;
