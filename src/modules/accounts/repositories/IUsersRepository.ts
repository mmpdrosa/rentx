import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
