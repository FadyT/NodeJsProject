import  Express  from "express";
import { access, constants } from 'node:fs';
import { bool } from "sharp";


const resizer = Express.Router();
const sharp = require("sharp");


function checkFileExist (path: String): boolean{
  
      // Check if the file exists in the current directory.
      const file = `${process.cwd()}${path}`;
      access(file, constants.F_OK, (check) => {
        if(check != null){
          return false;
        }else{
          return true;
        }
      });
      return false;

}

async function resizeImage(w : Number ,  h : Number, picName : String , res :any) {

    
    try {
    //if(process.cwd() +'/src/images/resized/sammy-resized.png)
    await sharp(`./src/images/${picName}.png`)
      .resize({
        width: w,
        height: h
      })
      .toFile(`./src/images/resized/${picName}-resized.png`);
      console.log("resized image saved !");
      res.sendFile(process.cwd() +`/src/images/resized/${picName}-resized.png`);
  } catch (error) {
    //console.log(error);
    res.send("<p>File Not Found please check the name </p>");
    console.log("File not Found !");
  }
}


resizer.get('/' , (req , res ) =>{
      let fileExist:boolean = false;

      // Check if the file exists in the current directory.
      if(checkFileExist(`${process.cwd()}/src/images/resized/${req.query.name}-resized.png`)){
        console.log("file already exists ");
        res.sendFile(process.cwd() +`/src/images/resized/${req.query.name}-resized.png`);
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