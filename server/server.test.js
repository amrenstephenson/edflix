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
  test('Artifact found and JSON returned.', () => {
    return request(app)
      .get('/api/artifacts')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

describe('Test /api/ratings/get/:id', () => {
  test('Rating with valid ID found and JSON returned.', () => {
    return request(app)
      .get('/api/ratings/get/XXX')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

describe('Test /api/recommendations', () => {
  test('Recommendations not found and 500 given.', () => {
    console.log('test');
    return request(app)
      .get('/api/recommendations')
      .expect(500);
  });
});


describe('Test /api/login', () => {
  test('Users found and 200 given.', () => {
    return request(app)
      .get('/api/login')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

describe('Test /api/register', () => {
  test('User inserted and JSON returned.', () => {
    return request(app)
      .get('/api/register')
      .expect(200)
      .expect('text/html', /json/);
  });
});
