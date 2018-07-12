import { SchemaConfigEntry } from '../entities/schema-config-entry';
import { IUnresolvedFullPath } from './schema';

export interface IGetNewSchemaConfigEntries {
  schemaConfigEntry: SchemaConfigEntry;
  index: number;
  pathEntry: number;
}

export interface IGetAllLengthsFromEnd {
  fullPath: IUnresolvedFullPath;
  index: number;
  variableToValidate: any;
}
