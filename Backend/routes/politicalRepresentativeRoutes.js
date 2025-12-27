import express from 'express';
import { getPoliticalRepresentatives,
  getPoliticalRepresentative} from '../controllers/politicalRepresentativeController.js'


const PoliticalRepresentativesRouter = express.Router();

PoliticalRepresentativesRouter.route('/')
  .get(getPoliticalRepresentatives);

PoliticalRepresentativesRouter.route('/:id')
  .get(getPoliticalRepresentative);

export default PoliticalRepresentativesRouter;