import  Express  from "express";

const students = Express.Router();


students.get('/' , (req , res ) =>{

    res.send("Students Api !");
})

export default students;