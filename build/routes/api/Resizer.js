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
const resizerTestRoute = express_1.default.Router();
const sharp = require("sharp");
function checkFileExist(path) {
    // Check if the file exists in the current directory.
    const file = `${process.cwd()}${path}`;
    (0, node_fs_1.access)(file, node_fs_1.constants.F_OK, (check) => {
        if (check != null) {
            return false;
        }
        else {
            return true;
        }
    });
    return false;
}
function resizeImage(w, h, picName, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!picName || !w || !h) {
                throw new Error("missing data");
            }
            //if(process.cwd() +'/src/images/resized/sammy-resized.png)
            yield sharp(`./src/images/${picName}.png`)
                .resize({
                width: w,
                height: h
            })
                .toFile(`./src/images/resized/${picName}-resized.png`);
            console.log("resized image saved !");
            res.sendFile(process.cwd() + `/src/images/resized/${picName}-resized.png`);
        }
        catch (error) {
            //console.log(error);
            if (error == "Error: missing data") {
                res.send("<p>please enter image name , width & height </p>");
            }
            else {
                res.send("<p>File Not Found please check the name </p>");
            }
            console.log("File not Found ! " + error);
        }
    });
}
resizer.get('/', (req, res) => {
    let fileExist = false;
    // Check if the file exists in the current directory.
    if (checkFileExist(`${process.cwd()}/src/images/resized/${req.query.name}-resized.png`)) {
        console.log("file already exists ");
        res.sendFile(process.cwd() + `/src/images/resized/${req.query.name}-resized.png`);
    }
    else {
        console.log("resized file not found ");
        resizeImage(Number(req.query.width), Number(req.query.height), String(req.query.name), res);
    }
    console.log(`req is ${req.url} + name is ${req.query.name} + width : ${req.query.width} + height : ${req.query.height} `);
    var fullUrl = req.protocol + '://' + req.get('host'); //+ req.originalUrl;
    console.log(fullUrl + "" + process.cwd() + '/src/images/resized/sammy-resized.png');
    //res.send(`<img src="${fullUrl}/src/images/resized/${req.query.name}-resized.jpg" alt="${req.query.name}">`);
    //res.send(`<img src="./src/images/resized/sammy-resized.png" alt="${req.query.name}">`);
    //res.sendFile(process.cwd() +'/src/images/sammy-resized.png');
});
exports.default = resizer;
