import ContentBasedRecommender from 'content-based-recommender';
import Sqlite from '../db/connect.js';
import fs from 'fs';
import { runInContainer, createExampleUsers } from './container.js';

let journalsRecommender = null;

async function buildJournalsRecommender() {
  journalsRecommender = new ContentBasedRecommender({
    minScore: 0.1,
    maxSimilarDocuments: 100,
  });
  const db = new Sqlite();
  db.connect();
  const journals = await db.all(
    // eslint-disable-next-line max-len
    'SELECT Journal_id,LevelOfStudy,UniversityCourse,University FROM LearningJournal',
  );

  // DEBUG: currently only using course, should use custom algorithm
  journalsRecommender.train(journals.map((j) => {
    j.LevelOfStudy = j.LevelOfStudy.toString();
    return { id: j.Journal_id, content: j.UniversityCourse };
  }));
  db.close();
}

async function getRecommendedArtifacts(userID) {
  // TODO: only run this when users changes
  await buildJournalsRecommender();

  const db = new Sqlite();
  db.connect();
  const journalID = (await db.get(
    'SELECT Journal_id FROM User WHERE User_id=?',
    [userID],
  )).Journal_id;

  const scaleRating = (val) => (val - 2.5) / 2.5;

  const similarUsers = journalsRecommender.getSimilarDocuments(
    journalID.toString(), 0, 10,
  );

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
