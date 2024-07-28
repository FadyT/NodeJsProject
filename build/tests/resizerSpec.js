"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app = require('../index');
const request = (0, supertest_1.default)(app);
it('should return 200 response code', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield request.get('/api/resizer?name=samy&width=500&height=250');
        expect(response.status).toEqual(400);
    });
});
describe('Server', () => {
    describe('REST API', () => {
        it('Data payload', (done) => {
            (0, supertest_1.default)(app)
                .get('/api/resizer?name=sammy&width=500&height=250')
                .expect(200)
                .expect('Content-Type', 'image/png')
                .end((error) => (error ? done.fail(error) : done()));
        });
    });
});
