"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/api', index_1.default);
app.use(express_1.default.static("./src/images"));
app.listen(port, () => {
    console.log(`Server Started at port : ${port} !`);
});
function func(i) {
    return i * i;
}
exports.default = func;
