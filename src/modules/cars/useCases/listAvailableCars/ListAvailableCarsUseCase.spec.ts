import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car Description 1',
      daily_rate: 100,
      license_plate: 'AAA-1111',
      fine_amount: 100,
      brand: 'Car Brand 1',
      category_id: 'Category 1',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 2',
      description: 'Car Description 2',
      daily_rate: 100,
      license_plate: 'BBB-2222',
      fine_amount: 100,
      brand: 'Car Brand 2',
      category_id: 'Category 2',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car Brand 2',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 3',
      description: 'Car Description 3',
      daily_rate: 100,
      license_plate: 'CCC-3333',
      fine_amount: 100,
      brand: 'Car Brand 3',
      category_id: 'Category 3',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'Car 3' });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 4',
      description: 'Car Description 4',
      daily_rate: 100,
      license_plate: 'DDD-4444',
      fine_amount: 100,
      brand: 'Car Brand 4',
      category_id: 'Category 4',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'Category 4',
    });

    expect(cars).toEqual([car]);
  });
});
