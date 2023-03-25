import * as sqlite from 'sqlite3';
import * as bcrypt from 'bcrypt';
const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database('./db/sqlite.db');
const saltRounds = 10;

export default class {
  static setupDbForDev() {
    db.serialize(function () {
      //   Drop Tables:
      const dropUsersTable = 'DROP TABLE IF EXISTS users';

      db.run(dropUsersTable);
      const dropItemsTable = 'DROP TABLE IF EXISTS items';

      db.run(dropItemsTable);

      // Create Tables:
      const createUsersTable = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT, password text)';

      db.run(createUsersTable);
      const createItemsTable =
        // eslint-disable-next-line max-len
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, salary NUMERIC, currency TEXT, department TEXT,  sub_department TEXT, on_contract BOOLEAN DEFAULT false)';

      db.run(createItemsTable);
      const password = '123';

      bcrypt.hash(password, saltRounds, function (err, hash) {
        const insertUsers = `INSERT INTO users (email, password) VALUES ('foo@bar.com', '${hash}');`;

        db.run(insertUsers);
      });
      const insertItems = `INSERT INTO items (name, salary, currency,department,sub_department,on_contract) VALUES
      ('Abhishek','145000','USD','Engineering','Platform', false),
      ('Anurag','90000','USD','Banking','Loan',true),
      ('Himani','240000','USD','Engineering','Platform', false),
      ('Yatendra','30','USD','Operations','CustomerOnboarding', false),
      ('Ragini','30','USD','Engineering','Platform', false),
      ('Nikhil','110000','USD','Engineering','Platform',true),
      ('Guljit','30','USD','Administration','Agriculture', false),
      ('Himanshu','70000','EUR','Operations','CustomerOnboarding', false),
      ('Anupam','200000000','INR','Engineering','Platform', false),
      ('Anup','200000000','INR','Engineering','NewPlatform', false);`;

      db.run(insertItems);
    });
  }

  static all(stmt, params) {
    return new Promise((res, rej) => {
      db.all(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }
  static get(stmt, params) {
    return new Promise((res, rej) => {
      db.get(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }

  static run(stmt, params) {
    return new Promise((res, rej) => {
      db.run(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }
}
