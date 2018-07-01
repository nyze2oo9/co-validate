import { SchemaConfigEntry } from '../entities/schema-config-entry';

export interface ISchemaConfigEntry {
  fullPath?: string[];
  type?: type;
  reg_exp?: reg_exp;
  valid_values?: valid_values;
  required?: required;
  min?: min;
  max?: max;
  message?: message;
  nested?: ISchemaConfig;
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

export interface ISchemaConfig {
  [key: string]: ISchemaConfigEntry;
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

export type SchemaConfigEntries = [string, ISchemaConfigEntry, number][];

export type addNestedToSchemaConfigEntriesWithIndexParams = {
  nested: ISchemaConfig;
  index: number;
  schemaConfigEntriesWithIndex: SchemaConfigEntries;
};
