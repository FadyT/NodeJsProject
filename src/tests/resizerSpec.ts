import supertest from 'supertest';

const app = require('../index');
const request = supertest(app);

it('should return 200 response code', async function () {
  const response = await request.get(
    '/api/resizer?name=samy&width=500&height=250',
  );
  expect(response.status).toEqual(400);
});

describe('Server', () => {
  describe('REST API', () => {
    it('Data payload', (done) => {
      supertest(app)
        .get('/api/resizer?name=sammy&width=500&height=250')
        .expect(200)
        .expect('Content-Type', 'image/png')
        .end((error) => (error ? done.fail(error) : done()));
    });
  });
});
