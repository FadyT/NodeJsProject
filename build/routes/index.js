"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Resizer_1 = __importDefault(require("./api/Resizer"));
const routes = express_1.default.Router();
routes.use('/resizer', Resizer_1.default);
routes.get('/', (req, res) => {
    res.send("Main api route !");
});
exports.default = routes;
