import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';
import { readFileSync, writeFileSync } from 'fs';
import _ from 'lodash';

// These keys must stay secret and cannot be included in the git repo
const apiKeys = JSON.parse(readFileSync('./unsplash_keys.json'));

const unsplash = createApi({
  accessKey: apiKeys['accessKey'],
  fetch: nodeFetch,
});

// the number of images we need total:
const imagesNeeded = 180;
// the queries to use:
const queries = ['technology', 'programming', 'data'];
// the number of images we should collect for each query:
const imagesPerQuery = Math.ceil(imagesNeeded / queries.length);

// returns `true` if the image should be added to the array:
function imageFilter(imgData) {
  return !imgData.premium && imgData.width > imgData.height;
}

// cleans the data about an image before adding it to the array:
function cleanImageData(imgData) {
  const keys = [
    'id',
    'width',
    'height',
    'urls',
    'description',
    'alt_description',
    'color',
  ];
  return _.pick(imgData, keys);
}

let results = [];
for (const query of queries) {
  // the number of images we should have collected by the end of the query:
  const imagesNeededForQuery = Math.min(
    imagesNeeded, results.length + imagesPerQuery,
  );
  // keep collecting until we have enough images:
  for (let page = 1; results.length < imagesNeededForQuery; page++) {
    const result = await unsplash.search.getPhotos({
      query: query,
      page: page,
      perPage: Math.min(30, imagesNeededForQuery),
      orientation: 'landscape',
      content_filter: 'high',
    });
    if (result.type === 'success') {
      // filter images we don't want to keep
      results.push(...result.response.results
        .filter(imageFilter)
        .map(cleanImageData));

      // error out if we don't have enough API requests left:
      const remainingRequests = parseInt(
        result.originalResponse.headers.get('X-Ratelimit-Remaining'),
        10,
      );
      if (remainingRequests <= 10) {
        // eslint-disable-next-line max-len
        console.warn('WARNING: Finished early due to too few remaining requests. Please come back in an hour.');
        break;
      }
    }
  }
}

// save results:
writeFileSync(
  'unsplash_images.json',
  JSON.stringify(results, null, 2),
);
console.log(`Successfully collected ${results.length} images!`);
