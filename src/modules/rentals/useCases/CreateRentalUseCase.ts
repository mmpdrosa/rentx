import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { AppError } from '@shared/errors/AppError';

import { Rental } from '../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../repositories/IRentalsRepository';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

dayjs.extend(utc);

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentalHours = 24;

    const carUnavailable = await this.rentalsRepository.findRentedCar(car_id);

    if (carUnavailable) {
      throw new AppError('Car is unavailable.');
    }

    const userRental = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userRental) {
      throw new AppError('User already has a rental.');
    }

    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format();

    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, 'hours');

    if (compare < minimumRentalHours) {
      throw new AppError('The rent must be at least 24 hours long.');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
