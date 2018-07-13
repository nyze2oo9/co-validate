import { SchemaConfigEntry } from '../entities/schema-config-entry';

export interface ISchemaConfigEntry {
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
export type valid_values = ValidValues | IArrayValueWithSpecificErrorMessage;
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

export type IPropertyWithSpecificErrorMessage = ITypeValueWithSpecificErrorMessage | IRegExpValueWithSpecificErrorMessage |
IArrayValueWithSpecificErrorMessage | IBooleanValueWithSpecificErrorMessage | INumberValueWithSpecificErrorMessage;

export interface ITypeValueWithSpecificErrorMessage {
  value: Type;
  message: string | IMessageEntry;
}

export interface IRegExpValueWithSpecificErrorMessage {
  value: RegExp;
  message: string | IMessageEntry;
}

export interface IArrayValueWithSpecificErrorMessage {
  value: ValidValues;
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

export type SchemaConfigEntries = [IUnresolvedFullPathEntry, ISchemaConfigEntry, number][];

export type addNestedToSchemaConfigEntriesWithIndexParams = {
  nested: ISchemaConfig | ISchemaConfig[];
  index: number;
  schemaConfigEntriesWithIndex: SchemaConfigEntries;
};

export interface IArrayKey {
  array: boolean;
}

export type IUnresolvedFullPath = IUnresolvedFullPathEntry[];
export type IUnresolvedFullPathEntry = string | number | IArrayKey;

export type IFullPath = IFullPathEntry[];
export type IFullPathEntry = string | number;
