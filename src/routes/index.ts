import express from 'express';
import students from './api/students';

const routes = express.Router();

routes.use('/students' , students);

routes.get('/' , (req ,res )=>{
    res.send("Main api route !");
})

export default routes;