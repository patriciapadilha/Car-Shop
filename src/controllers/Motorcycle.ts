import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

interface RequestCar extends Request {
  body: IMotorcycle
}

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(req: RequestCar, res: Response<IMotorcycle>) {
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async read(req: Request, res: Response<IMotorcycle[]>) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;
    const results = await this._service.readOne(id);
    return res.status(200).json(results);
  }

  public async update(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;
    const results = await this._service.update(id, req.body);
    return res.status(200).json(results);
  }

  public async delete(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;
    const results = await this._service.delete(id);
    return res.status(204).json(results);
  }
}