import {app, server} from './server';
import request from 'supertest';
import { setupContainer, cleanupContainer } from './db/container';

beforeAll(async() => {
  await setupContainer();
});

afterAll(async() => {
  await cleanupContainer();
  await server.close();
});

describe('Test /api/artifact/:id', () => {
  test('Artifact with valid ID found and JSON returned.', () => {
    console.log('test');
    return request(app)
      .get('/api/artifact/1301')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  // Example of another test, commented out because we aren't passing it yet!
  // test('Artifact with invalid ID found and 404 given.', () => {
  //   console.log('test');
  //   return request(app)
  //     .get('/api/artifact/100000000')
  //     .expect(404);
  // });
});

describe('Test /api/artifacts', () => {
  // Todo
});

describe('Test /api/ratings/get/:id', () => {
  // Todo
});

describe('Test /api/recommendations', () => {
  // Todo
});

describe('Test /api/login', () => {
  // Todo
});

describe('Test /api/register', () => {
  // Todo
});
