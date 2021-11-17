import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/CreateRentalController';

import { ensureAthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post('/', ensureAthenticated, createRentalController.handle);

export { rentalRoutes };
