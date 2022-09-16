import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const MotoMongooseSchema = new Schema<IMotorcycle>({
  status: Boolean,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

class Motorcycles extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycles', MotoMongooseSchema)) {
    super(model);
  }
}

export default Motorcycles;