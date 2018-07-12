import { IFullPath } from './schema';

export interface IError {
  fullPath: IFullPath;
  message: string;
}
