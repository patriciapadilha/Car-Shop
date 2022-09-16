import * as sinon from 'sinon';
import chai from 'chai';
import MotorcycleModel from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../utils/errors.catalog';
import {
	motorcycleMock,
    motorcycleMockArray,
	motorcycleMockWithId,
	motorcycleMockForChange,
	motorcycleMockForChangeWithId,
} from '../../mocks/motorcycleMock';

const { expect } = chai;


describe('Motorcycle Model', () => {
	const motorcycleModel = new MotorcycleModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
        sinon.stub(Model, 'find').resolves(motorcycleMockArray);
		sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
		sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockForChangeWithId);
        sinon.stub(Model, 'findByIdAndRemove').resolves(motorcycleMockForChangeWithId);
	});

	after(() => {
		sinon.restore();
	})

	describe('function create', () => {
		it('successfully created', async () => {
			const newMotorcycle = await motorcycleModel.create(motorcycleMock);
			expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
		});
	});

    describe('function read', () => {
		it('successfully found', async () => {
			const motorcycleFound = await motorcycleModel.read();
			expect(motorcycleFound).to.be.deep.equal(motorcycleMockArray);
		});
	});

	describe('function readOne', () => {
		it('successfully found', async () => {
			const motorcycleFound = await motorcycleModel.readOne('4edd40c86762e0fb12000003');
			expect(motorcycleFound).to.be.deep.equal(motorcycleMockWithId);
		});

		it('_id not found', async () => {
			try {
				await motorcycleModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
	
	describe('function update', () => {
		it('successfully changed', async () => {
			const motorcycleChanged = await motorcycleModel.update('4edd40c86762e0fb12000003', motorcycleMockForChange);
			expect(motorcycleChanged).to.be.deep.equal(motorcycleMockForChangeWithId);
		});
	
		it('_id not found to change', async () => {
			try {
				await motorcycleModel.update('123ERRADO', motorcycleMockForChange);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});

    describe('function delete', () => {
		it('successfully removed', async () => {
			const motorcycleRemoved = await motorcycleModel.delete('4edd40c86762e0fb12000003');
			expect(motorcycleRemoved).to.be.deep.equal(motorcycleMockForChangeWithId);
		});
	
		it('_id not found to remove', async () => {
			try {
				await motorcycleModel.delete('123ERRADO');
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
	
});