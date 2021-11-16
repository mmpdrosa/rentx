import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController =
  new CreateCarSpecificationController();

carsRoutes.post(
  '/',
  ensureAthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/:id/specifications',
  ensureAthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle
);

export { carsRoutes };
