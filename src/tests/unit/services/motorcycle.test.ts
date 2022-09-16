import * as sinon from 'sinon';
import chai from 'chai';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import { ErrorTypes } from '../../../utils/errors.catalog';
import { ZodError } from 'zod';
import {
	motorcycleMock,
    motorcycleMockArray,
	motorcycleMockWithId,
	motorcycleMockForChange,
	motorcycleMockForChangeWithId,
} from '../../mocks/motorcycleMock';

const { expect } = chai;

describe('Motorcycle Service', () => {
	const motorcycleModel = new MotorcycleModel();
	const motorcycleService = new MotorcycleService(motorcycleModel);

	before(() => {
		sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
		sinon.stub(motorcycleModel, 'readOne')
			.onCall(0).resolves(motorcycleMockWithId)
			.onCall(1).resolves(null)
			.onCall(2).resolves(motorcycleMockWithId)
		sinon.stub(motorcycleModel, 'update').resolves(motorcycleMockForChangeWithId)
		sinon.stub(motorcycleModel, 'read').resolves(motorcycleMockArray)
		sinon.stub(motorcycleModel, 'delete').resolves(motorcycleMockWithId)
	});

	after(() => {
		sinon.restore()
	});

	describe('function create', () => {
		it('Success', async () => {
			const motorcycleCreated = await motorcycleService.create(motorcycleMock);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
			try {
				await motorcycleService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('Function readOne', () => {
		it('Success', async () => {
			const motorcycleFound = await motorcycleService.readOne(motorcycleMockWithId._id);

			expect(motorcycleFound).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
			try {
				await motorcycleService.readOne(motorcycleMockWithId._id);
			} catch (error: any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('Function read', () => {
		it('Success', async () => {
			const motorcyclesFound = await motorcycleService.read();

			expect(motorcyclesFound).to.be.deep.equal(motorcycleMockArray);
		});
	});

	describe('function Update', () => {
		it('Success', async () => {
			const motorcycle = await motorcycleService.update('4edd40c86762e0fb12000003', motorcycleMockForChange);
			expect(motorcycle).to.be.deep.equal(motorcycleMockForChangeWithId);
		});

	});
});