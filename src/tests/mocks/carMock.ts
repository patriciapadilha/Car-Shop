import { ICar } from '../../interfaces/ICar';

const carMock:ICar = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
};

const carMockWithId:ICar & { _id:string } = {
	_id: "4edd40c86762e0fb12000003",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
};

const carMockArray:ICar[] & { _id:string }[] = [
  {
	  _id: "4edd40c86762e0fb12000003",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
  },
  {
	  _id: "4edd40c86762e0fb12000004",
    model: "Fusca",
    year: 1966,
    color: "amarela",
    buyValue: 3500,
    doorsQty: 2,
    seatsQty: 2,
  },
];

const carMockForChange:ICar = {
	model: "Ferrari Maranello",
    year: 1963,
    color: "red Ferrari",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
};

const carMockForChangeWithId:ICar & { _id:string } = {
	_id: "4edd40c86762e0fb12000003",
	model: "Ferrari Maranello",
    year: 1963,
    color: "red Ferrari",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
};

export {
	carMock,
  carMockArray,
	carMockWithId,
	carMockForChange,
	carMockForChangeWithId,
};