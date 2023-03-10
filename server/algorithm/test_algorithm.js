import fs from 'fs';
import { runInContainer, createExampleUsers } from '../db/container.js';
import { getRecommendedArtifacts } from './algorithm.js';

function main() {
  // run in "container" so we aren't working on the live database
  const TMP_PATH = './server/db/Edflix.tmp.db';
  runInContainer(async function() {
    /*if (!fs.existsSync(TMP_PATH))
      await createExampleUsers();
    else
      fs.copyFileSync(TMP_PATH, './server/db/Edflix.db');*/
    await createExampleUsers();

    const USER_ID = 103;
    const recommendations = await getRecommendedArtifacts(USER_ID);
    console.log(recommendations);
  });
}

main();
