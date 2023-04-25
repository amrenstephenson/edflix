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
});
