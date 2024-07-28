import  Express  from "express";
import { access, constants } from 'node:fs';
import { bool } from "sharp";
const { unlink } = require('node:fs/promises');


const resizer = Express.Router();
const sharp = require("sharp");

async function resizeImage(w : Number ,  h : Number, picName : String , res : Express.Response) {

    
    try {
    if(!picName || !w || !h){
      throw new Error("missing data");
    }
    //if(process.cwd() +'/src/images/resized/sammy-resized.png)
    await sharp(`./src/images/${picName}.png`)
      .resize({
        width: w,
        height: h
      })
      .toFile(`./src/images/resized/${picName}-resized-${w}X${h}.png`);
      console.log("resized image saved !");
      res.sendFile(process.cwd() +`/src/images/resized/${picName}-resized-${w}X${h}.png`);
  } 
  
  catch (error) {
    if(error == "Error: missing data"){
    console.log("Can't generate image ");
    console.log("Data is missing !");

    res.send("<p>please enter image name , width & height </p>");
    }else{
      res.send("<p>File Not Found please check the name </p>");
    }
    console.log("File not Found ! " + error);
  }
}


resizer.get('/' , (req , res ) =>{

      // resized image file full path
      const file = `${process.cwd()}/src/images/resized/${req.query.name}-resized-${req.query.width}X${req.query.height}.png`;
      console.log(`looking for image at ${file}`);
      access(file, constants.F_OK, (check) => {
        if(check == null){
          console.log("Image found ...");
          console.log("loading it from memory ");
          res.sendFile(process.cwd() +`/src/images/resized/${req.query.name}-resized-${req.query.width}X${req.query.height}.png`);
        }else{
          console.log("Image not found ...");
          console.log("Generating image ");
          resizeImage(Number(req.query.width) ,Number( req.query.height ) ,String( req.query.name) , res);
        }
      });

  return res.statusCode;
})
export default resizer;

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