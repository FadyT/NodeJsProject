import express from 'express';
import resizer from './api/Resizer';

const routes = express.Router();

routes.use('/resizer', resizer);

routes.get('/', (req, res) => {
  res.send('Main api route !');
});

export default routes;
