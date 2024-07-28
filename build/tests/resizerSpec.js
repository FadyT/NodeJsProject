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
const Resizer_1 = __importDefault(require("../routes/api/Resizer"));
const app = require('../index');
const node_fs_1 = __importDefault(require("node:fs"));
const request = (0, supertest_1.default)(app);
let name = "sammy";
let width = 500;
let height = 250;
describe("check if img exist delete it and check if generated after  ", function () {
    let x = 20;
    const path = `${process.cwd()}/src/images/resized/${name}-resized-${width}X${height}.png`;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        if (node_fs_1.default.existsSync(path)) {
            console.log(path + 'The path exists. ************');
            yield node_fs_1.default.unlink(path, (err) => {
                if (err) {
                    console.log(`ERORR : ${err} -------------------- `);
                }
                console.log(`${path} deleted --------------------`);
            });
        }
        else {
            console.log(path + "The path doesn't exist.************");
        }
        x = 25;
        console.log("number changed to " + x);
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        console.log("number was " + x);
        x = 50;
        console.log("and changed to " + x);
        let fileExist = yield node_fs_1.default.existsSync(path);
        expect(fileExist).toEqual(true);
    }));
    it('should return 200 response code', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get(`/api/resizer?name=${name}&width=${width}&height=${height}`);
            expect(response.status).toEqual(200);
        });
    });
    it('check if it throw error', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.get(`/api/resizer?name=${name}&width=${width}&height=${height}`);
            expect(() => __awaiter(this, void 0, void 0, function* () {
                yield Resizer_1.default.resizeImage(500, 250, "sammy");
            })).not.toThrow();
        });
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
