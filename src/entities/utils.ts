import { IOptions } from './../interfaces/options';
import { DEFAULT_OPTIONS } from './../constants/default';
import { Options } from './options';
import { Type, ValidValues, IMinOrMax, IMinObject, IMaxObject, IMessageEntry, IWithMessage, ILength, IUnresolvedFullPath, ISchemaConfigEntry, IFullPath, ITypeValueWithSpecificErrorMessage, IPropertyWithSpecificErrorMessage } from '../interfaces/schema';
import { SchemaConfigEntry } from './schema-config-entry';
import { IGetNewSchemaConfigEntries, IGetAllLengthsFromEnd, ICloneSchemaConfigEntryProperty, CloneSchemaConfigEntryKeys } from '../interfaces/utils';

export class Utils {
  private static _options: Options = new Options(DEFAULT_OPTIONS);
  static get options(): Options {
    return Utils._options;
  }
  static set options(options: Options) {
    Utils._options = options;
  }

  static isSchemaConfigEntryNeeded(schemaConfigEntry: ISchemaConfigEntry) {
    const neededKeys = ['type', 'regExp', 'validValues', 'required', 'min', 'max'];
    return Object.keys(schemaConfigEntry).some(key => neededKeys.includes(key));
  }

  static getNewSchemaConfigEntry(params: IGetNewSchemaConfigEntries): SchemaConfigEntry {
    const { schemaConfigEntry, index, pathEntry } = params;
    const newSchemaConfigEntry = Utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.unresolvedfullPath[index] = pathEntry;
    return newSchemaConfigEntry;
  }

  static getLength(params: IGetAllLengthsFromEnd): number {
    const { unresolvedfullPath, index, variableToValidate } = params;
    const path = unresolvedfullPath.slice(0, index);
    if (Utils.isStringOrNumberArray(path)) {
      const value = Utils.getValue(variableToValidate, path);
      if (!Utils.isNil(value) && Utils.isArray(value)) {
        return value.length;
      }
    }
    return 1;
  }

  static getValue(variableToValidate: any, path: IFullPath) {
    let value = variableToValidate;
    for (const pathEntry of path) {
      if (Utils.isNil(value)) {
        return undefined;
      }
      value = value[pathEntry];
    }
    return value;
  }

  static getFirstIndex(unresolvedfullPath: IUnresolvedFullPath, entry: string): number {
    for (let i = 0; i < unresolvedfullPath.length; i += 1) {
      const entry = unresolvedfullPath[i];
      if (!Utils.isString(entry) && !Utils.isNumber(entry) && entry.array === true) {
        return i;
      }
    }
    return -1;
  }

  static cloneSchemaConfigEntryInstance(schemaConfigEntry: SchemaConfigEntry): SchemaConfigEntry {
    const newSchemaConfigEntry = new SchemaConfigEntry();
    if (!Utils.isNil(schemaConfigEntry.unresolvedfullPath)) {
      newSchemaConfigEntry.unresolvedfullPath = schemaConfigEntry.unresolvedfullPath.slice(0);
    }
    const keys : CloneSchemaConfigEntryKeys[] = ['type', 'regExp', 'validValues', 'required', 'min', 'max'];
    for (const key of keys) {
      Utils.cloneSchemaConfigEntryProperty({
        schemaConfigEntry,
        newSchemaConfigEntry,
        propertyKey: key,
      });
    }
    if (!Utils.isNil(schemaConfigEntry.message)) {
      newSchemaConfigEntry.message = JSON.parse(JSON.stringify(schemaConfigEntry.message));
    }
    if (!Utils.isNil(schemaConfigEntry.nested)) {
      newSchemaConfigEntry.nested = JSON.parse(JSON.stringify(schemaConfigEntry.nested));
    }
    return newSchemaConfigEntry;
  }

  static cloneSchemaConfigEntryProperty(params: ICloneSchemaConfigEntryProperty) {
    const { schemaConfigEntry, newSchemaConfigEntry, propertyKey } = params;
    const property = schemaConfigEntry[propertyKey];
    let newProperty = newSchemaConfigEntry[propertyKey];
    if (!Utils.isNil(property)) {
      if (!Utils.isPropertyWithSpecificErrorMessage(property)) {
        newProperty = Utils.isValueType(property) ? property : property.slice(0);
      }
      if (Utils.isPropertyWithSpecificErrorMessage(property)) {
        newProperty = <IPropertyWithSpecificErrorMessage>{};
        newProperty.value = Utils.isValueType(property.value) ? property.value : property.value.slice(0);
        newProperty.message = Utils.isMessageObject(property.message) ? Object.assign({}, property.message) :
         property.message;
      }
    }
    newSchemaConfigEntry[propertyKey] = newProperty;
  }

  static isValueType(value: any): value is boolean | number | string | RegExp {
    return Utils.isBoolean(value) || Utils.isNumber(value) || Utils.isType(value) || Utils.isRegExp(value);
  }

  static checkLengthProperty(params: IMinOrMax, parameter: any): boolean {
    if (Utils.isNumber(parameter)) {
      return Utils.checkNumberLength(params, parameter);
    }
    if (Utils.isString(parameter)) {
      return Utils.checkStringLength(params, parameter);
    }
    if (Utils.isArray(parameter)) {
      return Utils.checkArrayLength(params, parameter);
    }
    return false;
  }

  private static instanceOfMinObject(object: any): object is IMinObject {
    return 'min' in object;
  }

  private static instanceOfMaxObject(object: any): object is IMaxObject {
    return 'max' in object;
  }

  static checkArrayLength(params: IMinOrMax, parameter: any[]): boolean {
    let result = false;
    if (Utils.instanceOfMinObject(params)) {
      result = parameter.length >= params.min;
    }
    if (Utils.instanceOfMaxObject(params)) {
      result = parameter.length <= params.max;
    }
    return result;
  }

  static checkStringLength(params: IMinOrMax, parameter: string): boolean {
    let result = false;
    if (Utils.instanceOfMinObject(params)) {
      result = parameter.length >= params.min;
    }
    if (Utils.instanceOfMaxObject(params)) {
      result = parameter.length <= params.max;
    }
    return result;
  }

  static checkNumberLength(params: IMinOrMax, parameter: number): boolean {
    let result = false;
    if (Utils.instanceOfMinObject(params)) {
      result = parameter >= params.min;
    }
    if (Utils.instanceOfMaxObject(params)) {
      result = parameter <= params.max;
    }
    return result;
  }

  static checkRequired(required: boolean, parameter: any): boolean {
    return !(required === true && parameter === undefined);
  }

  static checkValidValue(validValues: ValidValues, parameter: any): boolean {
    return validValues.includes(parameter);
  }

  static checkRegExp(regExp: RegExp, parameter: any): boolean {
    return new RegExp(regExp).test(parameter);
  }

  static checkType(type: Type, parameter: any): boolean {
    switch (type) {
      case 'boolean':
        return Utils.isBoolean(parameter);
      case 'number':
        return Utils.isNumber(parameter);
      case 'integer':
        return Utils.isInteger(parameter);
      case 'string':
        return Utils.isString(parameter);
      case 'boolean[]':
        return Utils.isBoolArray(parameter);
      case 'number[]':
        return Utils.isNumberArray(parameter);
      case 'integer[]':
        return Utils.isIntegerArray(parameter);
      case 'string[]':
        return Utils.isStringArray(parameter);
      case 'object':
        return Utils.isPlainObject(parameter);
      case 'array':
        return Utils.isArray(parameter);
      case 'mongo_id':
        return Utils.isMongoID(parameter);
      case 'email':
        return Utils.isEmail(parameter);
    }
  }
  static isBoolArray(array: any): boolean {
    if (Utils.isArray(array) && array.length > 0) {
      for (const entry of array) {
        if (!Utils.isBoolean(entry)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  static isNumberArray(array: any): boolean {
    if (Utils.isArray(array) && array.length > 0) {
      for (const entry of array) {
        if (!Utils.isNumber(entry)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  static isIntegerArray(array: any): boolean {
    if (Utils.isArray(array) && array.length > 0) {
      for (const entry of array) {
        if (!Utils.isInteger(entry)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  static isStringArray(array: any): array is string[] {
    if (Utils.isArray(array) && array.length > 0) {
      for (const entry of array) {
        if (!Utils.isString(entry)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  static isStringOrNumberArray(array: any): array is (string | number)[] {
    if (Utils.isArray(array) && array.length > 0) {
      for (const entry of array) {
        if (!Utils.isString(entry) && !Utils.isNumber(entry)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  static isMongoID(id: any): boolean {
    const mongoIdRegExp = new RegExp('^[0-9a-fA-F]{24}$');
    return mongoIdRegExp.test(id);
  }

  static isEmail(email: string): boolean {
    const emailRegExp = /\S+@\S+/;
    return emailRegExp.test(email);
  }

  static isMessage(value: any): boolean {
    return Utils.isString(value) || Utils.isMessageObject(value);
  }

  static isMinOrMaxWithSpecificErrorMessage(value: any): boolean {
    if (Utils.isPlainObject(value)) {
      if (Utils.isString(value.message)) {
        return (Utils.isNumber(value.value) && Utils.isString(value.message));
      }
      return (Utils.isNumber(value.value) && Utils.isMessageObject(value.message));
    }
    return false;
  }

  static isValidTypeWithLengthProperties(value: string): boolean {
    const validTypes = ['number', 'integer', 'string', 'boolean[]', 'number[]', 'integer[]',
      'string[]', 'array'];
    return validTypes.includes(value);
  }

  static isTypeWhichRequiresIntegerLength(value: string): boolean {
    const validTypes = ['integer', 'string', 'boolean[]', 'number[]', 'integer[]',
      'string[]', 'array'];
    return validTypes.includes(value);
  }

  static isRequiredWithSpecificErrorMessage(value: any): boolean {
    if (Utils.isPlainObject(value)) {
      if (Utils.isString(value.message)) {
        return (Utils.isBoolean(value.value) && Utils.isString(value.message));
      }
      return (Utils.isBoolean(value.value) && Utils.isMessageObject(value.message));
    }
    return false;
  }

  static isValidValuesArray(value: any): value is ValidValues {
    if (Utils.isArray(value)) {
      for (const validValue of value) {
        if (!Utils.isBoolean(validValue) && !Utils.isNumber(validValue) &&
          !Utils.isString(validValue)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  static isValidValuesWithSpecificErrorMessage(value: any): boolean {
    if (Utils.isPlainObject(value)) {
      if (Utils.isString(value.message)) {
        return (Utils.isValidValuesArray(value.value) && Utils.isString(value.message));
      }
      return (Utils.isValidValuesArray(value.value) && Utils.isMessageObject(value.message));
    }
    return false;
  }

  static isPlainObject(value: any): boolean {
    return (value !== null && typeof value === 'object'
      && Utils.getBaseTag(value) === '[object Object]') && Utils.checkEmptyJsBasedOnOptions(value);
  }

  static checkEmptyJsBasedOnOptions(value: any): boolean {
    return !(Object.keys(value).length === 0 && !Utils._options.allowEmpty);
  }

  static isArray(value: any): value is any[] {
    return value !== undefined && value.constructor === Array && Utils.checkEmptyArrayBasedOnOptions(value);
  }

  static checkEmptyArrayBasedOnOptions(value: any): boolean {
    return !(value.length === 0 && !Utils._options.allowEmpty);
  }

  static isBoolean(value: any): boolean {
    return typeof (value) === 'boolean';
  }

  static isNumber(value: any): value is number {
    return typeof (value) === 'number' && Utils.checkNaNBasedOnOptions(value) &&
      Utils.checkInfiteBasedOnOptions(value);
  }

  static checkNaNBasedOnOptions(value: any): boolean {
    return !(isNaN(value) && !Utils._options.allowNaN);
  }

  static checkInfiteBasedOnOptions(value: any): boolean {
    return !((value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY) &&
      !Utils._options.allowInfinite);
  }

  static isInteger(value: any): boolean {
    return Number.isInteger(value);
  }

  static isString(value: any): value is string {
    return (typeof value === 'string' || (typeof value === 'object' &&
      Utils.getBaseTag(value) === '[object String]')) && Utils.checkEmptyStringBasedOnOptions(value);
  }

  static checkEmptyStringBasedOnOptions(value: any): boolean {
    return !(value === '' && !Utils._options.allowEmpty);
  }

  static isRegExp(value: any): boolean {
    return typeof value === 'object' && Utils.getBaseTag(value) === '[object RegExp]';
  }

  static isRegExpWithSpecificErrorMessage(value: any): boolean {
    if (Utils.isPlainObject(value)) {
      if (Utils.isString(value.message)) {
        return (Utils.isRegExp(value.value) && Utils.isString(value.message));
      }
      return (Utils.isRegExp(value.value) && Utils.isMessageObject(value.message));
    }
    return false;
  }

  static isType(value: any): value is Type {
    const validTypes = ['boolean', 'number', 'integer', 'string', 'boolean[]', 'number[]',
      'integer[]', 'string[]', 'object', 'array', 'mongo_id', 'email'];
    return validTypes.includes(value);
  }

  static isPropertyWithSpecificErrorMessage(value: any): value is IPropertyWithSpecificErrorMessage {
    return Utils.isTypeWithSpecificErrorMessage(value) || Utils.isRegExpWithSpecificErrorMessage(value) ||
    Utils.isValidValuesWithSpecificErrorMessage(value) || Utils.isRequiredWithSpecificErrorMessage(value) ||
    Utils.isMinOrMaxWithSpecificErrorMessage(value);
  }

  static isTypeWithSpecificErrorMessage(value: any): value is ITypeValueWithSpecificErrorMessage {
    if (Utils.isPlainObject(value)) {
      if (Utils.isString(value.message)) {
        return (Utils.isType(value.value) && Utils.isString(value.message));
      }
      return (Utils.isType(value.value) && Utils.isMessageObject(value.message));
    }
    return false;
  }

  static isNil(value: any): value is null | undefined {
    return value === undefined || value === null;
  }

  static areAllValuesSet(...args: any[]) {
    for (const arg of args) {
      if (typeof arg === 'undefined') {
        return false;
      }
    }
    return true;
  }

  static isFilled(value: any): boolean {
    return Object.keys(value).length > 0;
  }

  static isMessageObject(message: any): message is IMessageEntry {
    if (Utils.isPlainObject(message) && Utils.isFilled(message)) {
      let result = true;
      const messageEntries = Object.entries(message);
      messageEntries.forEach((messageEntry) => {
        const [key, value] = messageEntry;
        if (!Utils.isString(key) || !Utils.isString(value)) {
          result = false;
        }
      });
      return result;
    }
    return false;
  }

  static hasMessageProperty(property: any): property is IWithMessage {
    return !Utils.isNil(property.message);
  }

  private static getBaseTag(value: any): string {
    return Object.prototype.toString.call(value);
  }
}
