"use strict";
const request = require('request');
const server = require('../index');
it('should return 200 response code', function () {
    request.get('http://localhost:3000/api/resizer?name=sammy&width=500&height=250', function (error, response) {
        expect(response.statusCode).toEqual(200);
    });
});
it('should return 404  response code if wrong file name or missing data ', function () {
    request.get('http://localhost:3000/api/resizer?name=sammy&width=500&height=250', function (error, response) {
        expect(response.statusCode).toEqual(404);
    });
});
