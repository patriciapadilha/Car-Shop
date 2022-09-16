import { IMotorcycle } from '../../interfaces/IMotorcycle';

const motorcycleMock:IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
};

const motorcycleMockWithId:IMotorcycle & { _id:string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
};

const motorcycleMockArray:IMotorcycle[] & { _id:string }[] = [
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "red",
    buyValue: 3500,
    category: "Street",
    engineCapacity: 125
  },
  {
	  _id: "4edd40c86762e0fb12000004",
    model: "Honda CG Fan 160",
    year: 1999,
    color: "white",
    buyValue: 13500,
    category: "Street",
    engineCapacity: 160
  },
];

const motorcycleMockForChange:IMotorcycle = {
	model: "Honda CG Titan 125",
  year: 1963,
  color: "white",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
};

const motorcycleMockForChangeWithId:IMotorcycle & { _id:string } = {
	_id: "4edd40c86762e0fb12000003",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "white",
    buyValue: 3500,
    category: "Street",
    engineCapacity: 125
};

export {
	motorcycleMock,
  motorcycleMockArray,
	motorcycleMockWithId,
	motorcycleMockForChange,
	motorcycleMockForChangeWithId,
};