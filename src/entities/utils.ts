import { IOptions } from './../interfaces/options';
import { DEFAULT_OPTIONS } from './../constants/default';
import { Options } from './options';
import { Type, ValidValues, IMinOrMax, IMinObject, IMaxObject, IMessageEntry, IWithMessage } from '../interfaces/schema';

export class Utils {
  private _options: Options;
  public get options(): Options {
    return this._options;
  }

  constructor(options: Options = new Options(DEFAULT_OPTIONS)) {
    this._options = options;
  }

  checkLengthProperty(params: IMinOrMax, parameter: any): boolean {
    if (this.isNumber(parameter)) {
      return this.checkNumberLength(params, parameter);
    }
    if (this.isString(parameter)) {
      return this.checkStringLength(params, parameter);
    }
    if (this.isArray(parameter)) {
      return this.checkArrayLength(params, parameter);
    }
    return false;
  }

  private instanceOfMinObject(object: any): object is IMinObject {
    return 'min' in object;
  }

  private instanceOfMaxObject(object: any): object is IMaxObject {
    return 'max' in object;
  }

  checkArrayLength(params: IMinOrMax, parameter: any[]): boolean {
    let result = false;
    if (this.instanceOfMinObject(params)) {
      result = parameter.length >= params.min;
    }
    if (this.instanceOfMaxObject(params)) {
      result = parameter.length <= params.max;
    }
    return result;
  }

  checkStringLength(params: IMinOrMax, parameter: string): boolean {
    let result = false;
    if (this.instanceOfMinObject(params)) {
      result = parameter.length >= params.min;
    }
    if (this.instanceOfMaxObject(params)) {
      result = parameter.length <= params.max;
    }
    return result;
  }

  checkNumberLength(params: IMinOrMax, parameter: number): boolean {
    let result = false;
    if (this.instanceOfMinObject(params)) {
      result = parameter >= params.min;
    }
    if (this.instanceOfMaxObject(params)) {
      result = parameter <= params.max;
    }
    return result;
  }

  checkRequired(required: boolean, parameter: any): boolean {
    return !(required === true && parameter === undefined);
  }

  checkValidValue(validValues: ValidValues, parameter: any): boolean {
    return validValues.includes(parameter);
  }

  checkRegExp(regExp: RegExp, parameter: any): boolean {
    return new RegExp(regExp).test(parameter);
  }

  checkType(type: Type, parameter: any): boolean {
    switch (type) {
      case 'boolean':
        return this.isBoolean(parameter);
      case 'number':
        return this.isNumber(parameter);
      case 'integer':
        return this.isInteger(parameter);
      case 'string':
        return this.isString(parameter);
      case 'boolean[]':
        return this.isBoolArray(parameter);
      case 'number[]':
        return this.isNumberArray(parameter);
      case 'integer[]':
        return this.isIntegerArray(parameter);
      case 'string[]':
        return this.isStringArray(parameter);
      case 'object':
        return this.isPlainObject(parameter);
      case 'array':
        return this.isArray(parameter);
      case 'mongo_id':
        return this.isMongoID(parameter);
      case 'email':
        return this.isEmail(parameter);
    }
  }
  isBoolArray(array: any): boolean {
    if (this.isArray(array) && array.length > 0) {
      for (const entry of array) {
        if (!this.isBoolean(entry)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  isNumberArray(array: any): boolean {
    if (this.isArray(array) && array.length > 0) {
      for (const entry of array) {
        if (!this.isNumber(entry)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  isIntegerArray(array: any): boolean {
    if (this.isArray(array) && array.length > 0) {
      for (const entry of array) {
        if (!this.isInteger(entry)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  isStringArray(array: any): boolean {
    if (this.isArray(array) && array.length > 0) {
      for (const entry of array) {
        if (!this.isString(entry)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  isMongoID(id: any): boolean {
    const mongoIdRegExp = new RegExp('^[0-9a-fA-F]{24}$');
    return mongoIdRegExp.test(id);
  }

  isEmail(email: string): boolean {
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegExp.test(email);
  }

  getValue(path: string[], object: any): any {
    let value = object;
    for (const pathEntry of path) {
      value = value[pathEntry];
    }
    return value;
  }
  isMessage(value: any): boolean {
    return this.isString(value) || this.isMessageObject(value);
  }
  isMinOrMaxWithSpecificErrorMessage(value: any): boolean {
    if (this.isPlainObject(value)) {
      if (this.isString(value.message)) {
        return (this.isInteger(value.value) && this.isString(value.message));
      }
      return (this.isInteger(value.value) && this.isMessageObject(value.message));
    }
    return false;
  }
  isValidTypeWithLengthProperties(value: string): boolean {
    const validTypes = ['number', 'integer', 'string', 'boolean[]', 'number[]', 'integer[]',
      'string[]', 'array'];
    return validTypes.includes(value);
  }

  isRequiredWithSpecificErrorMessage(value: any): boolean {
    if (this.isPlainObject(value)) {
      if (this.isString(value.message)) {
        return (this.isBoolean(value.value) && this.isString(value.message));
      }
      return (this.isBoolean(value.value) && this.isMessageObject(value.message));
    }
    return false;
  }

  isValidValuesArray(value: any): boolean {
    if (this.isArray(value)) {
      for (const validValue of value) {
        if (!this.isBoolean(validValue) && !this.isNumber(validValue) && 
        !this.isString(validValue)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  isValidValuesWithSpecificErrorMessage(value: any): boolean {
    if (this.isPlainObject(value)) {
      if (this.isString(value.message)) {
        return (this.isValidValuesArray(value.value) && this.isString(value.message));
      }
      return (this.isValidValuesArray(value.value) && this.isMessageObject(value.message));
    }
    return false;
  }

  isPlainObject(value: any): boolean {
    return (value !== null && typeof value === 'object'
      && this.getBaseTag(value) === '[object Object]') && this.checkEmptyJsBasedOnOptions(value);
  }

  checkEmptyJsBasedOnOptions(value: any): boolean {
    return !(Object.keys(value).length === 0 && !this._options.allowEmpty);
  }

  isArray(value: any): boolean {
    return value.constructor === Array && this.checkEmptyArrayBasedOnOptions(value);
  }

  checkEmptyArrayBasedOnOptions(value: any): boolean {
    return !(value.length === 0 && !this._options.allowEmpty);
  }

  isBoolean(value: any): boolean {
    return typeof (value) === 'boolean';
  }

  isNumber(value: any): boolean {
    return typeof (value) === 'number' && this.checkNaNBasedOnOptions(value) &&
     this.checkInfiteBasedOnOptions(value);
  }

  checkNaNBasedOnOptions(value: any): boolean {
    return !(isNaN(value) && !this._options.allowNaN);
  }

  checkInfiteBasedOnOptions(value: any): boolean {
    return !((value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY) &&
     !this._options.allowInfinite);
  }

  isInteger(value: any): boolean {
    return Number.isInteger(value);
  }

  isString(value: any): value is string {
    return (typeof value === 'string' || (typeof value === 'object' &&
     this.getBaseTag(value) === '[object String]')) && this.checkEmptyStringBasedOnOptions(value);
  }

  checkEmptyStringBasedOnOptions(value: any): boolean {
    return !(value === '' && !this._options.allowEmpty);
  }

  isRegExp(value: any): boolean {
    return typeof value === 'object' && this.getBaseTag(value) === '[object RegExp]';
  }

  isRegExpWithSpecificErrorMessage(value: any): boolean {
    if (this.isPlainObject(value)) {
      if (this.isString(value.message)) {
        return (this.isRegExp(value.value) && this.isString(value.message));
      }
      return (this.isRegExp(value.value) && this.isMessageObject(value.message));
    }
    return false;
  }

  isType(value: any): boolean {
    const validTypes = ['boolean', 'number', 'integer', 'string', 'boolean[]', 'number[]',
      'integer[]', 'string[]', 'object', 'array', 'mongo_id', 'email'];
    return validTypes.includes(value);
  }

  isTypeWithSpecificErrorMessage(value: any): boolean {
    if (this.isPlainObject(value)) {
      if (this.isString(value.message)) {
        return (this.isType(value.value) && this.isString(value.message));
      }
      return (this.isType(value.value) && this.isMessageObject(value.message));
    }
    return false;
  }

  isNil(value:any): value is null | undefined {
    return value === undefined || value === null;
  }

  areAllValuesSet(...args: any[]) {
    for (const arg of args) {
      if (typeof arg === 'undefined') {
        return false;
      }
    }
    return true;
  }

  isFilled(value: any): boolean {
    return Object.keys(value).length > 0;
  }

  isMessageObject(message: any): message is IMessageEntry  {
    if (this.isPlainObject(message) && this.isFilled(message)) {
      let result = true;
      const messageEntries = Object.entries(message);
      messageEntries.forEach((messageEntry) => {
        const [key, value] = messageEntry;
        if (!this.isString(key) || !this.isString(value)) {
          result = false;
        }
      });
      return result;
    }
    return false;
  }

  hasMessageProperty(property: any): property is IWithMessage {
    return !this.isNil(property.message);
  }

  private getBaseTag(value: any): string {
    return Object.prototype.toString.call(value);
  }
}
