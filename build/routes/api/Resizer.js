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
const { unlink } = require('node:fs/promises');
const resizer = express_1.default.Router();
const sharp = require("sharp");
function resizeImage(w, h, picName) {
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
                .toFile(`./src/images/resized/${picName}-resized-${w}X${h}.png`);
            console.log("resized image saved !");
        }
        catch (error) {
            if (error == "Error: missing data") {
                console.log("Can't generate image ");
                console.log("Data is missing !");
                console.log("File not Found ! " + error);
            }
        }
    });
}
resizer.get('/', (req, res) => {
    // resized image file full path
    const file = `${process.cwd()}/src/images/resized/${req.query.name}-resized-${req.query.width}X${req.query.height}.png`;
    console.log(`looking for image at ${file}`);
    (0, node_fs_1.access)(file, node_fs_1.constants.F_OK, (check) => __awaiter(void 0, void 0, void 0, function* () {
        if (check == null) {
            console.log("Image found ...");
            console.log("loading it from memory ");
            res.sendFile(process.cwd() + `/src/images/resized/${req.query.name}-resized-${req.query.width}X${req.query.height}.png`);
        }
        else {
            console.log("Image not found ...");
            console.log("Generating image ");
            yield resizeImage(Number(req.query.width), Number(req.query.height), String(req.query.name));
            res.sendFile(process.cwd() + `/src/images/resized/${req.query.name}-resized-${req.query.width}X${req.query.height}.png`);
        }
    }));
    return res.statusCode;
});
exports.default = { resizer, resizeImage };
/*
function checkFileExist(path:String) : boolean {
  const file = `${process.cwd()}${path}`;
  let exist:boolean = false;
  access(file, constants.F_OK, (check) => {
    if(check == null){
      console.log("Image found ...");
      console.log("loading it from memory ");
      exist = true;
    }else{
      console.log("Image not found ...");
      console.log("Generating image ");
      exist = false;
    }
  });
  return exist;
}

async function unlinkFile (path:String) {
  try {
    await unlink(path);
    console.log(`successfully deleted ${path}`);
  } catch (error) {
    console.error('there was an error:', error);
  }
};


module.exports = {
  resizeImage,
  checkFileExist,
  unlinkFile
}*/ 
