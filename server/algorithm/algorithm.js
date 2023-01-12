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

  const choose = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const unis = ['Durham', 'Oxford', 'Lancaster', 'Warwick', 'Bath'];
  const courses = ['Computer Science', 'Physics', 'Maths', 'Engineering'];
  const topics = [
    'Artificial Intelligence',
    'Capstone',
    'Data Science',
    'IBM Automation',
    'IBM Cloud',
  ];

  const NUSERS = 100;
  for (let i = 0; i < NUSERS; i++) {
    await db.exec('BEGIN TRANSACTION');

    const topic = choose(topics);

    // TODO: why is ProfilePicture an INTEGER?? AND it is misspelled!
    let user = {
      User_name: `FakeUser_${i}_${topic}`,
      Email: `fake_${i}.fake@gmail.com`,
      Password: 'password1',
      ProfliePicture: 0,
    };

    let journal = {
      LevelOfStudy: 1 + Math.floor(Math.random() * 4),
      UniversityCourse: choose(courses),
      University: choose(unis),
      JournalURL: null,
    };

    // eslint-disable-next-line max-len
    journal.Journal_id = (await insertObject('LearningJournal', journal)).lastID;
    user.Journal_id = journal.Journal_id;
    user.User_id = (await insertObject('User', user)).lastID;

    const n_ratings = 3 + Math.floor(Math.random() * 6);
    let rated = [];
    for (let j = 0; j < n_ratings; j++) {
      const { Artifact_id } = await db.get(
        // eslint-disable-next-line max-len
        'SELECT Artifact_id FROM Artifact WHERE Topic=? ORDER BY RANDOM() LIMIT 1',
        [topic],
      );
      if (rated.includes(Artifact_id))
        continue;

      rated.push(Artifact_id);

      let rating = {
        User_id: user.User_id,
        Artifact_id: Artifact_id,
        Value: 3 + Math.floor(Math.random() * 3),
      };
      await insertObject('Rating', rating);
    }

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
