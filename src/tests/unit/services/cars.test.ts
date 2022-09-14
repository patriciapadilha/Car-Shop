import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { ErrorTypes } from '../../../utils/errors.catalog';
import { ZodError } from 'zod';
import {
	carMock,
    carMockArray,
	carMockWithId,
	carMockForChange,
	carMockForChangeWithId,
} from '../../mocks/carMock';

const { expect } = chai;

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null)
			.onCall(2).resolves(carMockWithId)
		sinon.stub(carModel, 'update').resolves(carMockWithId)
		sinon.stub(carModel, 'read').resolves(carMockArray)
		sinon.stub(carModel, 'delete').resolves(carMockWithId)
	});

	after(() => {
		sinon.restore()
	});

	describe('function create', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('Function readOne', () => {
		it('Success', async () => {
			const carFound = await carService.readOne(carMockWithId._id);

			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.readOne(carMockWithId._id);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Function read', () => {
		it('Success', async () => {
			const carsFound = await carService.read();

			expect(carsFound).to.be.deep.equal(carMockArray);
		});
	});

	describe('function Update', () => {
		it('Success', async () => {
			const car = await carService.update('4edd40c86762e0fb12000003', carMock);
			expect(car).to.be.deep.equal(carMockWithId);
		});

	});

	// describe('function delete', () => {
	// 	it('Success', async () => {
	// 		const car = await carService.delete(carMockWithId._id);
	// 		expect(car).to.be.deep.equal(carMockWithId);
	// 	});
	// });

});