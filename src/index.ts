import  Express  from "express";
import routes from "./routes/index";

const app = Express();
const port = 3000; 

app.use('/api' , routes);
app.use(Express.static("./src/images"));

app.listen(port , ()=> {
  console.log(`Server Started at port : ${port} !`);
})