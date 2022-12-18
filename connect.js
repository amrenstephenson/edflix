const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./Edflix.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the Edflix SQlite database.');
});
db.serialize(() => {
  db.each(`SELECT Artifact_id as id,
                    Artifact_Name as name
             FROM Artifact`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + '\t' + row.name);
  });
});
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

