export interface ISchemaConfigEntry {
  type?: Type | ITypeValueWithSpecificErrorMessage;
  reg_exp?: string | RegExp | IStringValueWithSpecificErrorMessage |
  IRegExpValueWithSpecificErrorMessage;
  valid_values?: (boolean | number | string)[] | IArrayValueWithSpecificErrorMessage;
  required?: boolean | IBooleanValueWithSpecificErrorMessage;
  min?: number | INumberValueWithSpecificErrorMessage;
  max?: number | INumberValueWithSpecificErrorMessage;
  message?: string | IMessageEntry;
  nested?: ISchemaConfig;
}

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

export interface ISchemaConfig {
  [key: string]: ISchemaConfigEntry;
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
