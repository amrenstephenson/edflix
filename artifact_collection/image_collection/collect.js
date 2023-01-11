import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';
import { readFileSync, writeFileSync } from 'fs';
import _ from 'lodash';

async function collectImages(imagesNeeded, queries) {
  // the number of images we should collect for each query:
  const imagesPerQuery = Math.ceil(imagesNeeded / queries.length);

  // These keys must stay secret and cannot be included in the git repo
  const apiKeys = JSON.parse(readFileSync('./unsplash_keys.json'));

  const unsplash = createApi({
    accessKey: apiKeys['accessKey'],
    fetch: nodeFetch,
  });

  let results = [];

  // returns `true` if the image should be added to the array:
  function imageFilter(imgData, idx, images) {
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

  for (let queryIdx = 0; queryIdx < queries.length; queryIdx++) {
    const query = queries[queryIdx];
    const oldNumImages = results.length;

    // the number of images we should have collected by the end of the query:
    const imagesNeededForQuery = Math.min(
      imagesNeeded, (queryIdx + 1) * imagesPerQuery,
    );

    // keep collecting until we have enough images:
    for (let page = 1; results.length < imagesNeededForQuery; page++) {
      const result = await unsplash.search.getPhotos({
        query: query,
        page: page,
        perPage: 30,
        orientation: 'landscape',
        content_filter: 'high',
      });

      if (result.type === 'success') {
        // filter images we don't want to keep
        const newResults = result.response.results
          .filter(imageFilter)
          .map(cleanImageData);
        results.push(...newResults);

        // remove duplicates
        results = Array.from(new Set(results.map(a => a.id))).map(id => {
          return results.find(a => a.id === id);
        });

        // shrink results down to imagesNeededForQuery
        if (results.length > imagesNeededForQuery) {
          results = results.slice(0, imagesNeededForQuery);
        }

        // error out if we don't have enough API requests left:
        const remainingRequests = parseInt(
          result.originalResponse.headers.get('X-Ratelimit-Remaining'),
          10,
        );
        if (remainingRequests <= 10) {
          // eslint-disable-next-line max-len
          console.warn(`WARNING: Finished early due to too few remaining requests (${remainingRequests}). Please come back in an hour.`);
          return results;
        }
      } else {
        console.warn(`WARNING: Unsplash API returned ${result.type}.`);
        return null;
      }
    }

    // eslint-disable-next-line max-len
    console.log(`Collected ${results.length - oldNumImages} images for "${query}".`);
  }
  return results;
}

// the number of images we need total:
const imagesNeeded = 173;
// the queries to use:
const queries = ['programming', 'data', 'technology'];
const results = await collectImages(imagesNeeded, queries);

// save results:
if (results) {
  writeFileSync(
    'unsplash_images.json',
    JSON.stringify(results, null, 2),
  );
  console.log(`Successfully collected ${results.length} images!`);
} else {
  console.log('Failed to collect images.');
}
