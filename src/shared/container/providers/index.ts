import { container } from 'tsyringe';

import { DayjsDateProvider } from './DateProvider/DayjsDateProvider';
import { IDateProvider } from './DateProvider/IDateProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
);
