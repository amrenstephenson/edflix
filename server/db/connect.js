import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();

class Sqlite {
  constructor() {
    this.db = null;
  }

  connect(path = './server/db/Edflix.db') {
    return new Promise((resolve, reject) => {
      this.db = new sqlite.Database(path, (err) => {
        if (err == null) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  run(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err === null) {
          resolve(this);
        } else {
          reject(err);
        }
      });
    });
  }

  exec(sql) {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => {
        if (err === null) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  get(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  all(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  insertObject(table, obj) {
    const cols = Object.keys(obj).join(',');
    const placeholders = Object.keys(obj).fill('?').join(',');
    return this.run(
      `INSERT INTO ${table} (${cols})
       VALUES (${placeholders})`,
      Object.values(obj),
    );
  }

  close() {
    this.db.close();
  }

}

export default Sqlite;
