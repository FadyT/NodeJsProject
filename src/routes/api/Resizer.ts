import  Express  from "express";
import { access, constants } from 'node:fs';
import { bool } from "sharp";


const resizer = Express.Router();
const sharp = require("sharp");



async function resizeImage(w : Number ,  h : Number, picName : String , res :any) {


    try {
    //if(process.cwd() +'/src/images/resized/sammy-resized.png)
    await sharp(`./src/images/${picName}.png`)
      .resize({
        width: w,
        height: h
      })
      .toFile(`./src/images/resized/${picName}.png`);
      console.log("resized image saved !");
      res.sendFile(process.cwd() +`/src/images/resized/${picName}.png`);
  } catch (error) {
    console.log(error);
  }
}


resizer.get('/' , (req , res ) =>{
      let fileExist:boolean = false;

      // Check if the file exists in the current directory.
      const file = `${process.cwd()}/src/images/resized/sammy-resized.png`;
      access(file, constants.F_OK, (check) => {
        if(check != null){
          fileExist = false;
        }else{
          fileExist = true;
        }
      });

      if(fileExist){
        console.log("file already exists ");
        res.sendFile(process.cwd() +`/src/images/resized/${req.query.name}.png`);
      }else{
        console.log("file not found ");
        resizeImage(Number(req.query.width) ,Number( req.query.height ) ,String( req.query.name) , res);
      }


      
  console.log(`req is ${req.url} + name is ${req.query.name} + width : ${req.query.width} + height : ${req.query.height} `);
  var fullUrl = req.protocol + '://' + req.get('host') ;//+ req.originalUrl;
  console.log(fullUrl +"" + process.cwd() +'/src/images/resized/sammy-resized.png');
  //res.send(`<img src="${fullUrl}/src/images/resized/${req.query.name}-resized.jpg" alt="${req.query.name}">`);
  //res.send(`<img src="./src/images/resized/sammy-resized.png" alt="${req.query.name}">`);
  //res.sendFile(process.cwd() +'/src/images/sammy-resized.png');

})

export default resizer;