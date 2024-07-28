import supertest from 'supertest';
const app = require('../index');
//const resizer = require('../routes/api/Resizer');
//import{ checkFileExist ,unlinkFile , request} from '../routes/api/Resizer.ts';
const request = supertest(app);



it('should return 200 response code', async function () {
  const response = await request.get(
    '/api/resizer?name=samy&width=500&height=250',
  );
  expect(response.status).toEqual(200);
});
/*
it('test if file exist', async function () {
  resizer.unlinkFile(`/src/images/resized/samy-resized-500X250.png`);
  const response = await request.get(
    '/api/resizer?name=samy&width=500&height=250',
  );
  const fileExist = resizer.checkFileExist(`/src/images/resized/samy-resized-500X250.png`);
  expect(fileExist).toEqual(true);
});*/

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
