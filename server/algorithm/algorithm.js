import Sqlite from '../db/connect.js';

async function getAllJournalsAndUsers() {
  return await db.all(
    // eslint-disable-next-line max-len
    'SELECT * FROM LearningJournal j INNER JOIN User u ON u.Journal_id = j.Journal_id',
  );
}

async function calculateJournalSimilarity(journal1, journal2) {
  if (journal1 === journal2) {
    return 0.0;
  }

  let score = 0.0;
  if (journal1.LevelOfStudy === journal2.LevelOfStudy)
    score += 0.2;
  if (journal1.UniversityCourse === journal2.UniversityCourse)
    score += 0.5;
  if (journal1.University === journal2.University)
    score += 0.1;

  const SQL = 'SELECT Module_Name FROM JournalModule WHERE Journal_id = ?';
  const modules1 = (await db.all(
    SQL, [journal1.Journal_id],
  )).map(m => m.Module_Name);

  const modules2 = (await db.all(
    SQL, [journal2.Journal_id],
  )).map(m => m.Module_Name);

  for (const module of modules1) {
    if (modules2.includes(module)) {
      score += 0.2;
    }
  }

  return score;
}

async function getSimilarJournals(journalID) {
  const journals = await getAllJournalsAndUsers();
  const userJournal = journals.find(j => j.Journal_id === journalID);
  const similarities = journals.map(async(j) => (
    {
      journalID: j.Journal_id,
      userID: j.User_id,
      score: await calculateJournalSimilarity(userJournal, j),
    }
  ));
  return await Promise.all(similarities);
}

var db = null;
function initialiseDBConnection() {
  db = new Sqlite();
  db.connect();
}

export async function getRecommendedArtifacts(userID) {
  initialiseDBConnection();

  const scaleRating = (val) => (val - 2.5) / 2.5;

  const journalID = (await db.get(
    'SELECT Journal_id FROM User WHERE User_id=?',
    [userID],
  )).Journal_id;
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
