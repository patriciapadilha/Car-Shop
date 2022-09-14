import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../utils/errors.catalog';
import {
	carMock,
    carMockArray,
	carMockWithId,
	carMockForChange,
	carMockForChangeWithId,
} from '../../mocks/carMock';

const { expect } = chai;


describe('Car Model', () => {
	const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
        sinon.stub(Model, 'find').resolves(carMockArray);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
		sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForChangeWithId);
        sinon.stub(Model, 'findByIdAndRemove').resolves(carMockForChangeWithId);
	});

	after(() => {
		sinon.restore();
	})

	describe('function create', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

    describe('function read', () => {
		it('successfully found', async () => {
			const carFound = await carModel.read();
			expect(carFound).to.be.deep.equal(carMockArray);
		});
	});

	describe('function readOne', () => {
		it('successfully found', async () => {
			const carFound = await carModel.readOne('4edd40c86762e0fb12000003');
			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
	
	describe('function update', () => {
		it('successfully changed', async () => {
			const carChanged = await carModel.update('4edd40c86762e0fb12000003', carMockForChange);
			expect(carChanged).to.be.deep.equal(carMockForChangeWithId);
		});
	
		it('_id not found to change', async () => {
			try {
				await carModel.update('123ERRADO', carMockForChange);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

    describe('function delete', () => {
		it('successfully removed', async () => {
			const carRemoved = await carModel.delete('4edd40c86762e0fb12000003');
			expect(carRemoved).to.be.deep.equal(carMockForChangeWithId);
		});
	
		it('_id not found to remove', async () => {
			try {
				await carModel.delete('123ERRADO');
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
	
});