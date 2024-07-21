import  Express  from "express";

const students = Express.Router();

const sharp = require("sharp");

async function getMetadata() {
    try {
      const metadata = await sharp("sammy.png").metadata();
      console.log(metadata);
    } catch (error) {
      console.log(`An error occurred during processing: ${error}`);
    }
  }


students.get('/' , (req , res ) =>{
    getMetadata();
    res.send("Image resized !");
})

export default students;