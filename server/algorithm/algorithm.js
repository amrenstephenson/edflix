import Sqlite from '../db/connect.js';
import fs from 'fs';
import { runInContainer, createExampleUsers } from './container.js';

async function getAllJournalsAndUsers() {
  return await db.all(
    // eslint-disable-next-line max-len
    'SELECT * FROM LearningJournal j INNER JOIN User u ON u.Journal_id = j.Journal_id',
  );
}

function calculateJournalSimilarity(journal1, journal2) {
  if (journal1 === journal2) {
    return 0.0;
  }

  // TODO: improve
  let score = 0.0;
  if (journal1.LevelOfStudy === journal2.LevelOfStudy)
    score += 0.2;
  if (journal1.UniversityCourse === journal2.UniversityCourse)
    score += 0.5;
  if (journal1.University === journal2.University)
    score += 0.1;
  // TODO: use journal's module list
  return score;
}

async function getSimilarJournals(journalID) {
  const journals = await getAllJournalsAndUsers();
  const userJournal = journals.find(j => j.Journal_id === journalID);
  const similarities = journals.map(j => (
    {
      journalID: j.Journal_id,
      userID: j.User_id,
      score: calculateJournalSimilarity(userJournal, j),
    }
  ));
  return similarities;
}

var db = null;
function initialiseDBConnection() {
  db = new Sqlite();
  db.connect();
}

async function getRecommendedArtifacts(userID) {
  if (!db) {
    initialiseDBConnection();
  }

  const journalID = (await db.get(
    'SELECT Journal_id FROM User WHERE User_id=?',
    [userID],
  )).Journal_id;

  const scaleRating = (val) => (val - 2.5) / 2.5;

  const similarJournals = await getSimilarJournals(journalID);

  let artifactScores = {};
  for (const otherJournal of similarJournals) {
    const otherUserRatings = await db.all(
      'SELECT * FROM Rating WHERE User_id=?', [otherJournal.userID],
    );
    for (const rating of otherUserRatings) {
      const oldScore = artifactScores[rating.Artifact_id] || 0.0;

      artifactScores[rating.Artifact_id] =
        oldScore + otherJournal.score * scaleRating(rating.Value);
    }
  }
  db.close();

  return Object.entries(artifactScores).sort((a, b) => (
    a[1] < b[1] ? 1 : -1
  ));
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
