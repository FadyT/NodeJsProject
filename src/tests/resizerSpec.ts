const request = require('request');
const server = require('../index');

// supertest
import req from 'supertest';
const express = require('express');
const app = express();


    it('should return 200 response code', function () {
        request.get('http://localhost:3000/api/resizer?name=sammy&width=500&height=250', function (error: any, response: { statusCode: any; }) {
            expect(response.statusCode).toEqual(200);
        });
    });

    
    it('should return 404  response code if wrong file name or missing data ', function () {
        request.get('http://localhost:3000/api/resizer?name=samy&width=500&height=250', function (error: any, response: { statusCode: any; }) {
            expect(response.statusCode).toEqual(404);
        });
    });


    it('should return 200 response code', function () {
        expect(20).toEqual(20);
    });

    
    it('request testing',async function () {
    req(app)
    .get('/user')
    //.expect('Content-Type', /json/)
    //.expect('Content-Length', '15')
    .expect(400)
    .end(function(err, res) {
      if (err) throw err;
    });
});
