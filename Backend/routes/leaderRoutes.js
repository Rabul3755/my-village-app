import express from 'express';

import {getLeaders,
  getLeader,
  createLeader} from "../controllers/leaderController.js"


const LeaderRouter = express.Router();

LeaderRouter.route('/')
  .get(getLeaders)
  .post(createLeader);

LeaderRouter.route('/:id')
  .get(getLeader);

export default LeaderRouter;