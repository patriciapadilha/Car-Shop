import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

interface RequestCar extends Request {
  body: ICar
}

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: RequestCar, res: Response<ICar>) {
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;
    const results = await this._service.readOne(id);
    return res.status(200).json(results);
  }

  public async update(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;
    const results = await this._service.update(id, req.body);
    return res.status(200).json(results);
  }

  public async delete(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;
    const results = await this._service.delete(id);
    return res.status(204).json(results);
  }
}