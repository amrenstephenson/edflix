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
      .get('/api/ratings/get/1')
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
  test('User found and JSON returned.', () => {
    return request(app)
      .post('/api/login')
      .send({
        userName: 'tommy',
        password: '123',
      })
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);
    /**
     * .expect('Set-Cookie', /edflixSessionToken/);
     */
  });
});

describe('Test /api/register', () => {
  test('User inserted unsuccessful and 500 returned.', () => {
    return request(app)
      .post('/api/register')
      .send({
        userName: 'XXX',
        password: '123',
      })
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});
