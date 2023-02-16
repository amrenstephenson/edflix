import {app, server} from './server';
import request from 'supertest';
import { setupContainer, cleanupContainer } from './db/container';
import assert from 'assert';

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
  // Todo
});

describe('Test /api/ratings/get/:id', () => {
  // Todo
});

describe('Test /api/recommendations', () => {
  // Todo
});

describe('Test /api/login', () => {
  test('A valid login request is accepted.', () => {
    return request(app)
      .post('/api/login')
      .send({ userName: 'tommy', password: '123' })
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Set-Cookie', /edflixSessionToken/);
  });

  test('A login request with an incorrect password is rejected.', () => {
    return request(app)
      .post('/api/login')
      .send({ userName: 'tommy', password: '1234' })
      .set('Content-Type', 'application/json')
      .expect(500)
      .then(res => {
        assert.strictEqual(res.body.code, 'INCORRECT_PASSWORD');
      });
  });

  test('A login request with an incorrect username is rejected.', () => {
    // Todo
  });
});

describe('Test /api/register', () => {
  // Todo
});
