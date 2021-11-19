import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailables(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    return this.cars.filter(car => {
      if (
        car.available &&
        ((!brand && !category_id && !name) ||
          car.brand === brand ||
          car.category_id === category_id ||
          car.name === name)
      ) {
        return car;
      }

      return null;
    });
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex(car => car.id === id);

    this.cars[carIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
