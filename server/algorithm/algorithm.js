import Sqlite from '../db/connect.js';
import fs from 'fs';
import { runInContainer, createExampleUsers } from './container.js';

async function getSimilarJournals(journalID) {
  return [];
}

async function getRecommendedArtifacts(userID) {
  const db = new Sqlite();
  db.connect();
  const journalID = (await db.get(
    'SELECT Journal_id FROM User WHERE User_id=?',
    [userID],
  )).Journal_id;

  const scaleRating = (val) => (val - 2.5) / 2.5;

  const similarUsers = await getSimilarJournals(journalID);

  let artifactScores = {};
  for (const otherUser of similarUsers) {
    const userRatings = await db.all(
      'SELECT * FROM Rating WHERE User_id=?', [otherUser.id],
    );
    for (const rating of userRatings) {
      const oldScore = (artifactScores[rating.Artifact_id] === undefined) ?
        0.0 :
        artifactScores[rating.Artifact_id];

      artifactScores[rating.Artifact_id] =
        oldScore + otherUser.score * scaleRating(rating.Value);
    }
  }
  db.close();

  return artifactScores;
}

function main() {
  const populateDB = false;
  runInContainer(async function() {
    if (populateDB)
      await createExampleUsers();
    else
      fs.copyFileSync('./server/db/Edflix.tmp.db', './server/db/Edflix.db');

    const recommendations = await getRecommendedArtifacts(19);
    console.log(recommendations);
  });
}

main();
