import supertest from 'supertest';
const app = require('../index');
import fs from 'node:fs';

const request = supertest(app);

let name:String = "sammy";
let width:number = 500;
let height:number = 250;



describe("check if img exist delete it and check if generated after  ", function() {
  let x = 20;
  const path = `${process.cwd()}/src/images/resized/${name}-resized-${width}X${height}.png`;

  beforeAll(async () => {
    if (fs.existsSync(path)){
      console.log(path + 'The path exists. ************'); 
       await fs.unlink(path, (err) => {
        if (err){
          console.log(`ERORR : ${err} -------------------- `)
        } 
        console.log(`${path} deleted --------------------`);
      }); 
    }else{
      console.log(path + "The path doesn't exist.************"); 
    }
    x = 25 ;
    console.log("number changed to " + x);
  })
  afterAll(async () => {
    console.log("number was " + x);
    x = 50 ;
    console.log("and changed to " + x);
    let fileExist = await fs.existsSync(path);
    expect(fileExist).toEqual(true);
  })
  
it('should return 200 response code', async function () {
  const response = await request.get(
    `/api/resizer?name=${name}&width=${width}&height=${height}`,
  );
  expect(response.status).toEqual(200);
  
});

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
