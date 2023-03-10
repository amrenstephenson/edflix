import fs from 'fs';
import Sqlite from './connect.js';

export async function runInContainer(f) {
  await setupContainer();
  try {
    await f();
  } catch (e) {
    console.error(e);
  }
  await cleanupContainer();
}

export async function setupContainer() {
  fs.copyFileSync('./server/db/Edflix.db', './server/db/Edflix.backup.db');
}

export async function cleanupContainer() {
  fs.copyFileSync('./server/db/Edflix.db', './server/db/Edflix.tmp.db');
  fs.copyFileSync('./server/db/Edflix.backup.db', './server/db/Edflix.db');
  fs.unlinkSync('./server/db/Edflix.backup.db');
}

async function deleteExampleUsers(db) {
  const exampleUsers = await db.all(
    'SELECT * FROM User WHERE User_name LIKE ?', ['FakeUser%'],
  );
  for (const user of exampleUsers) {
    await db.exec('BEGIN TRANSACTION');

    await db.run('DELETE FROM User WHERE User_id=?', [user.User_id]);
    await db.run('DELETE FROM Rating WHERE User_id=?', [user.User_id]);
    await db.run(
      'DELETE FROM LearningJournal WHERE Journal_id=?', [user.Journal_id],
    );

    await db.exec('COMMIT TRANSACTION');
  }
}

export async function createExampleUsers() {
  const db = new Sqlite();
  db.connect();

  await deleteExampleUsers(db);

  const choose = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const userTypes = [
    {
      courses: ['Computer Science'],
      topics: ['IBM Cloud', 'IBM Security', 'Red Hat Academy'],
      modules: [
        'Networks and Systems',
        'Theory of Computation',
        'Software Engineering',
        'Programming',
      ],
    },
    {
      courses: ['Mathematics', 'Computer Science'],
      topics: ['Data Science', 'Capstone'],
      modules: [
        'Data Science',
        'Analysis',
      ],
    },
    {
      courses: ['Mathematics', 'Computer Science'],
      topics: ['Artificial Intelligence'],
      modules: [
        'Artificial Intelligence',
        'Machine Learning',
        'Deep Learning',
      ],
    },
    {
      courses: ['Physics', 'Mathematics', 'Engineering'],
      topics: ['IBM Quantum', 'IBM Engineering'],
      modules: [
        'Quantum Computing',
        'Quantum Mechanics',
        'Analysis',
      ],
    },
    {
      courses: ['International Business', 'Economics', 'Accounting'],
      topics: ['IBM Z'],
      modules: [
        'Economics',
        'Finance',
        'Business',
      ],
    },
  ];


  const unis = ['Durham', 'Oxford', 'Lancaster', 'Warwick', 'Bath'];

  const NUSERS = 500;
  for (let i = 0; i < NUSERS; i++) {
    await db.exec('BEGIN TRANSACTION');

    const userType = choose(userTypes);

    let user = {
      User_name: `FakeUser_${i}`,
      Email: `fake_${i}.fake@gmail.com`,
      Password: 'password1',
      ProfilePicture: null,
    };

    let journal = {
      LevelOfStudy: 1 + Math.floor(Math.random() * 4),
      UniversityCourse: choose(userType.courses),
      University: choose(unis),
      JournalURL: null,
    };

    // eslint-disable-next-line max-len
    journal.Journal_id = (await db.insertObject('LearningJournal', journal)).lastID;
    user.Journal_id = journal.Journal_id;
    user.User_id = (await db.insertObject('User', user)).lastID;

    const n_ratings = 3 + Math.floor(Math.random() * 6);
    let rated = [];
    for (let j = 0; j < n_ratings; j++) {
      const { Artifact_id } = await db.get(
        // eslint-disable-next-line max-len
        'SELECT Artifact_id FROM Artifact WHERE Topic=? ORDER BY RANDOM() LIMIT 1',
        [choose(userType.topics)],
      );
      if (rated.includes(Artifact_id))
        continue;

      rated.push(Artifact_id);

      let rating = {
        User_id: user.User_id,
        Artifact_id: Artifact_id,
        Value: 3 + Math.floor(Math.random() * 3),
      };
      await db.insertObject('Rating', rating);
    }

    for (const module of userType.modules) {
      await db.insertObject('JournalModule', {
        Journal_id: journal.Journal_id,
        Module_Name: module,
      });
    }

    db.exec('COMMIT TRANSACTION');
  }

  db.close();
}
