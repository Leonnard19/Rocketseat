import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '../../../../modules/cars/useCases/listCars/ListCarsController';
import { UploadCarImageController } from '../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { categoriesRoutes } from './categories.routes';

import uploadConfig from '../../../../config/upload';
import multer from 'multer';

const carRoutes = Router();

const upload = multer(uploadConfig);

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

carRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);

carRoutes.get('/available', listCarsController.handle);

carRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImageController.handle
);

export { carRoutes };
