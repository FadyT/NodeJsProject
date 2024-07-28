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
const express_1 = __importDefault(require("express"));
const node_fs_1 = require("node:fs");
const resizer = express_1.default.Router();
const sharp = require('sharp');
function resizeImage(w, h, picName, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!picName || !w || !h) {
                throw new Error('missing data');
            }
            //if(process.cwd() +'/src/images/resized/sammy-resized.png)
            yield sharp(`./src/images/${picName}.png`)
                .resize({
                width: w,
                height: h,
            })
                .toFile(`./src/images/resized/${picName}-resized-${w}X${h}.png`);
            console.log('resized image saved !');
            res.sendFile(process.cwd() + `/src/images/resized/${picName}-resized-${w}X${h}.png`);
        }
        catch (error) {
            if (error == 'Error: missing data') {
                console.log("Can't generate image ");
                console.log('Data is missing !');
                res.send('<p>please enter image name , width & height </p>');
            }
            else {
                res.send('<p>File Not Found please check the name </p>');
            }
            console.log('File not Found ! ' + error);
        }
    });
}
resizer.get('/', (req, res) => {
    // resized image file full path
    const file = `${process.cwd()}/src/images/resized/${req.query.name}-resized-${req.query.width}X${req.query.height}.png`;
    console.log(`looking for image at ${file}`);
    (0, node_fs_1.access)(file, node_fs_1.constants.F_OK, (check) => {
        if (check == null) {
            console.log('Image found ...');
            console.log('loading it from memory ');
            res.sendFile(process.cwd() +
                `/src/images/resized/${req.query.name}-resized-${req.query.width}X${req.query.height}.png`);
        }
        else {
            console.log('Image not found ...');
            console.log('Generating image ');
            resizeImage(Number(req.query.width), Number(req.query.height), String(req.query.name), res);
        }
    });
    return res.statusCode;
});
exports.default = resizer;
