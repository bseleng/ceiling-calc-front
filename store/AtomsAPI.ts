import { atomWithStorage } from 'jotai/utils';

import { IBaseDevURL as IBaseDevPort } from '../interfaces/APIInterfaces';

export const ABaseDevURL = atomWithStorage<IBaseDevPort>('baseDevPort', undefined);
