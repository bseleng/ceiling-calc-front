import { atomWithStorage } from 'jotai/utils';

import { IBaseDevPort as IBaseDevPort } from '../interfaces/APIInterfaces';

export const ABaseDevPort = atomWithStorage<IBaseDevPort>('baseDevPort', undefined);
