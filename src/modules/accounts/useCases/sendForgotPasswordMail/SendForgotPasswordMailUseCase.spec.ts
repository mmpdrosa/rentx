import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('Should be able to send a forgot password mail to an user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      name: 'User Name 1',
      email: 'user1@rocketseat.com.br',
      password: '11111111',
      driver_license: '11111111111',
    });

    await sendForgotPasswordMailUseCase.execute('user1@rocketseat.com.br');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send a forgot password mail to a nonexisting user', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('user2@rocketseat.com.br')
    ).rejects.toEqual(new AppError('User not found.'));
  });

  it('Should be able to create an user token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    await usersRepositoryInMemory.create({
      name: 'User Name 3',
      email: 'user3@rocketseat.com.br',
      password: '33333333',
      driver_license: '33333333333',
    });

    await sendForgotPasswordMailUseCase.execute('user3@rocketseat.com.br');

    expect(generateTokenMail).toBeCalled();
  });
});
