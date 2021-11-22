import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('Should be able to add new specifications to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'AAA-0000',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: '0',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Specification Name',
      description: 'Specification Description',
    });

    const specifications_id = [specification.id];

    const carSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(carSpecifications).toHaveProperty('specifications');
    expect(carSpecifications.specifications.length).toBe(1);
  });

  it('Should not be able to add new specifications ta an nonexistent car', async () => {
    const car_id = '1';
    const specifications_id = ['2', '3'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError('Car not found.'));
  });
});
