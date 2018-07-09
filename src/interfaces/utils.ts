import { SchemaConfigEntry } from '../entities/schema-config-entry';
import { IFullPath } from './schema';

export interface IGetNewSchemaConfigEntries {
  schemaConfigEntry: SchemaConfigEntry;
  index: number;
  pathEntry: string;
}

export interface IGetAllLengthsFromEnd {
  fullPath: IFullPath;
  index: number;
  variableToValidate: any;
}

export interface IGetNestedLengths {
  Lenghts: string[];
}
