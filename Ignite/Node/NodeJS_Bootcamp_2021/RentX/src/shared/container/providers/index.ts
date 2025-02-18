import { container } from 'tsyringe';

import { DayjsDateProvider } from './dateProvider/implementations/DayjsDateProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';

import { IDateProvider } from './dateProvider/IDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';

container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider);

container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider());

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk]
);
