import { SchemaConfigEntry } from '../entities/schema-config-entry';

export interface ISchemaConfigEntry {
  fullPath?: (string | ILength)[];
  type?: type;
  regExp?: reg_exp;
  validValues?: valid_values;
  required?: required;
  min?: min;
  max?: max;
  message?: message;
  nested?: ISchemaConfig | ISchemaConfig[];
}

export type type = Type | ITypeValueWithSpecificErrorMessage;
export type reg_exp = RegExp | IRegExpValueWithSpecificErrorMessage;
export type valid_values = (boolean | number | string)[] | IArrayValueWithSpecificErrorMessage;
export type required = boolean | IBooleanValueWithSpecificErrorMessage;
export type min = number | INumberValueWithSpecificErrorMessage;
export type max = number | INumberValueWithSpecificErrorMessage;
export type message = string | IMessageEntry;

export type SchemaConfigEntryProperty = ISchemaConfigEntry[keyof ISchemaConfigEntry];

export type Type =
  'boolean'
  | 'number'
  | 'integer'
  | 'string'
  | 'boolean[]'
  | 'number[]'
  | 'integer[]'
  | 'string[]'
  | 'object'
  | 'array'
  | 'mongo_id'
  | 'email';

export type RegExpValue = RegExp;
export type ValidValues = (boolean | number | string)[];

export interface ILength {
  length: number;
}

export interface ISchemaConfig {
  [key: string]: ISchemaConfigEntry;
  [key: number]: ISchemaConfigEntry;
}

export interface ISchemaConfigValidated {
  [key: string]: SchemaConfigEntry;
}

export interface IMessageEntry {
  [key: string]: string;
}

export interface ITypeValueWithSpecificErrorMessage {
  value: Type;
  message: string | IMessageEntry;
}

export interface IRegExpValueWithSpecificErrorMessage {
  value: RegExp;
  message: string | IMessageEntry;
}

export interface IStringValueWithSpecificErrorMessage {
  value: string;
  message: string | IMessageEntry;
}

export interface IArrayValueWithSpecificErrorMessage {
  value: (boolean | number | string)[];
  message: string | IMessageEntry;
}

export interface IBooleanValueWithSpecificErrorMessage {
  value: boolean;
  message: string | IMessageEntry;
}

export interface INumberValueWithSpecificErrorMessage {
  value: number;
  message: string | IMessageEntry;
}

export type IMinOrMax = IMinObject | IMaxObject;

export interface IMinObject {
  min: number;
}

export interface IMaxObject {
  max: number;
}

export interface IWithMessage {
  message: IMessageEntry;
}

export type SchemaConfigEntries = [IFullPathEntry, ISchemaConfigEntry, number][];

export type addNestedToSchemaConfigEntriesWithIndexParams = {
  nested: ISchemaConfig | ISchemaConfig[];
  index: number;
  schemaConfigEntriesWithIndex: SchemaConfigEntries;
};

export interface IArrayKey {
  array: boolean;
}

export type IFullPath = (string | IArrayKey)[];
export type IFullPathEntry = string | IArrayKey;
