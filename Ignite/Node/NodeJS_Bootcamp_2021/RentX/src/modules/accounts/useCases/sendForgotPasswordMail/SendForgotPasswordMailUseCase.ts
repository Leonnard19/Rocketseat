import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';
import { IDateProvider } from '../../../../shared/container/providers/dateProvider/IDateProvider';
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository') private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') private dateProvider: IDateProvider,
    @inject('EtherealMailProvider') private mailProvider: IMailProvider
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    );

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = uuidV4();

    const expiration_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expiration_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_EMAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath);
  }
}

export { SendForgotPasswordMailUseCase };
