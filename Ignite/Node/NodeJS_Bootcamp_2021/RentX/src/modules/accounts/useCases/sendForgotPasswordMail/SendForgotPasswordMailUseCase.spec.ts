import { sign } from 'jsonwebtoken';
import { DayjsDateProvider } from '../../../../shared/container/providers/dateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '191919',
      email: 'leo@email.com',
      name: 'leo',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('leo@email.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exist', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('non-existent@email.com')
    ).rejects.toEqual(new AppError('User does not exists.'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driver_license: '181818',
      email: 'leo2@email.com',
      name: 'leo dois',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('leo2@email.com');

    expect(generateTokenMail).toBeCalled();
  });
});
