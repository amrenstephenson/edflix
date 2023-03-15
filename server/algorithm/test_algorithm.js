import { runInContainer, createExampleUsers } from '../db/container.js';
import { getRecommendedArtifacts } from './algorithm.js';

function main() {
  // run in "container" so we aren't working on the live database
  runInContainer(async function() {
    if (process.argv.includes('--create-users')) {
      await createExampleUsers();
    }

    const USER_ID = 103;
    const recommendations = await getRecommendedArtifacts(USER_ID);
    console.log(recommendations);
  });
}

main();
