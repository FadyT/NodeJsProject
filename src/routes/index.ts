import express from 'express';
import resizer from './api/Resizer';

const routes = express.Router();

routes.use('/resizer', resizer.resizer);

routes.get('/', (req:express.Request, res:express.Response) : void => {
  res.send('Main api route !');
});

export default routes;
