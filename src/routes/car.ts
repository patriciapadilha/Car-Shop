import { Router, Request, Response } from 'express';
import CarController from '../controllers/Car';
import CarModel from '../models/Car';
import CarService from '../services/Car';

const CarRoute = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

CarRoute.post('/cars', (req: Request, res: Response) =>
  carController.create(req, res));

CarRoute.get('/cars', (req: Request, res: Response) =>
  carController.read(req, res));  

CarRoute.get('/cars/:id', (req: Request, res: Response) =>
  carController.readOne(req, res));  

CarRoute.put('/cars/:id', (req: Request, res: Response) =>
  carController.update(req, res)); 

export default CarRoute;