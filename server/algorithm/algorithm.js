// import ContentBasedRecommender from 'content-based-recommender';
import Sqlite from '../db/connect.js';
import fs from 'fs';

/*
let usersRecommender = null;

async function buildUsersRecommender() {
  usersRecommender = new ContentBasedRecommender({
    minScore: 0.1,
    maxSimilarDocuments: 100,
  });
  const db = new Sqlite();
  db.connect();
  const journals = await db.all(
    'SELECT * FROM LearningJournal',
  );
  usersRecommender.train(journals);
  db.close();
}

async function getRecommendedArtifacts(userID) {
  // TODO: only run this when users changes
  await buildUsersRecommender();

  return [];
}
*/

async function runInContainer(f) {
  fs.copyFileSync('./server/db/Edflix.db', './server/db/Edflix.backup.db');
  try {
    await f();
  } catch (e) {
    console.error(e);
  }
  fs.copyFileSync('./server/db/Edflix.db', './server/db/Edflix.tmp.db');
  fs.copyFileSync('./server/db/Edflix.backup.db', './server/db/Edflix.db');
  fs.unlinkSync('./server/db/Edflix.backup.db');
}

async function createExampleUsers() {
  const db = new Sqlite();
  db.connect();

  async function insertObject(table, obj) {
    const cols = Object.keys(obj).join(',');
    const placeholders = Object.keys(obj).fill('?').join(',');
    return await db.run(
      `INSERT INTO ${table} (${cols}) VALUES (${placeholders})`,
      Object.values(obj),
    );
  }

  const NUSERS = 100;
  for (let i = 0; i < NUSERS; i++) {
    await db.exec('BEGIN TRANSACTION');

    // TODO: why is ProfilePicture an INTEGER?? AND it is misspelled!
    let user = {
      User_name: `FakeUser_${i}`,
      Email: `fake_${i}.fake@gmail.com`,
      Password: 'password1',
      ProfliePicture: 0,
    };

    let journal = {
      LevelOfStudy: 0,
      UniversityCourse: 'Computer Science',
      University: 'Durham University',
      JournalURL: null,
    };

    const lastID = await insertObject('LearningJournal', journal).lastID;
    user.Journal_id = lastID;
    await insertObject('User', user);

    db.exec('COMMIT TRANSACTION');
  }

  db.close();
}

function main() {
  runInContainer(async function() {
    await createExampleUsers();
  });
}

main();
