import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'AAA-0000',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: '',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a new car with an existing license plate', async () => {
    await createCarUseCase.execute({
      name: 'Car Error 1',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'AAA-0000',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: '',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Car Error 2',
        description: 'Car Description',
        daily_rate: 100,
        license_plate: 'AAA-0000',
        fine_amount: 60,
        brand: 'Car Brand',
        category_id: '',
      })
    ).rejects.toEqual(new AppError('Car already exists.'));
  });

  it('Should be able to create a new car with available as true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'BBB-1111',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: '',
    });

    expect(car.available).toBe(true);
  });
});
