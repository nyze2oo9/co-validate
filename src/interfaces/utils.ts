import { SchemaConfigEntry } from '../entities/schema-config-entry';
import { IUnresolvedFullPath, ISchemaConfigEntry } from './schema';

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

export interface ICloneSchemaConfigEntryProperty {
  schemaConfigEntry: SchemaConfigEntry;
  newSchemaConfigEntry: SchemaConfigEntry;
  propertyKey: CloneSchemaConfigEntryKeys;
}

export type CloneSchemaConfigEntryKeys = 'type' | 'regExp' | 'validValues' | 'required' | 'min' | 'max';
