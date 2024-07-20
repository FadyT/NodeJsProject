import  Express  from "express";

const app = Express();
const port = 3000; 

app.get('/api' , (req ,res )=>{
  res.send("Api Page !");
})

app.listen(port , ()=> {
  console.log(`Server Started at port : ${port} !`);

})