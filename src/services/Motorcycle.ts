import { IModel } from '../interfaces/IModel';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';
import { ErrorTypes } from '../utils/errors.catalog';

class MotocycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._motorcycle.create(obj);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    const motocycle = await this._motorcycle.readOne(_id);
    if (!motocycle) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return motocycle;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.readOne(_id);
    return this._motorcycle.update(_id, obj);
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    await this.readOne(_id);
    return this._motorcycle.delete(_id);
  }
}

export default MotocycleService;