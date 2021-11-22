import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
  const dayPlus24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it('Should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Name 1',
      description: 'Car Description 1',
      daily_rate: 100,
      license_plate: 'AAA-1111',
      fine_amount: 60,
      brand: 'Car Brand 1',
      category_id: '1',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '1',
      car_id: car.id,
      expected_return_date: dayPlus24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if user has a open rental', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '2',
      user_id: '2',
      expected_return_date: dayPlus24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '2',
        car_id: '3',
        expected_return_date: dayPlus24Hours,
      })
    ).rejects.toEqual(new AppError('User already has a rental.'));
  });

  it('Should not be able to create a new rental if car is already rented', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '4',
      user_id: '3',
      expected_return_date: dayPlus24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '3',
        car_id: '4',
        expected_return_date: dayPlus24Hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable.'));
  });

  it('Should not be able to create a new rental if the return date is less than 24 hours', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '4',
        car_id: '5',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('The rent must be at least 24 hours long.'));
  });
});
