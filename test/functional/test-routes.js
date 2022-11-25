import chai from 'chai';
import request from 'supertest';

const expect = chai.expect;

import server from '../../server/server.js';

// example functional tests of routes
describe('GET /', () => {
  it('responds with homepage', () => {
    return request(server)
      .get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(404)
      .then(response => {
        expect(response.text).to.include(
          'Welcome to EDFLIX',
        );
      });
  });
});
