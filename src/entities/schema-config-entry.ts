import {
  Type, ITypeValueWithSpecificErrorMessage,
  IRegExpValueWithSpecificErrorMessage, IArrayValueWithSpecificErrorMessage,
  IBooleanValueWithSpecificErrorMessage, INumberValueWithSpecificErrorMessage,
  IMessageEntry, ISchemaConfig, valid_values, type, reg_exp, required, min, max, RegExpValue, ValidValues, SchemaConfigEntryProperty, message, ILength, IUnresolvedFullPath, IFullPath,
} from './../interfaces/schema';
import { Utils } from './utils';

export class SchemaConfigEntry {
  private utils: Utils;

  private _fullPath: IUnresolvedFullPath | IFullPath;
  public get fullPath(): IUnresolvedFullPath | IFullPath {
    return this._fullPath;
  }
  public set fullPath(value: IUnresolvedFullPath | IFullPath) {
    this._fullPath = value;
  }

  private _type?: type;
  public get type(): type | undefined {
    return this._type;
  }
  public set type(value: type | undefined) {
    if (value !== undefined) {
      if (this.utils.areAllValuesSet(value, this.validValues)) {
        throw new Error('type and valid_values can\'t be set both');
      }
      if (this.utils.areAllValuesSet(value, this.nested)) {
        throw new Error('type and nested can\'t be set both');
      }
      if (!this.utils.isType(value) && !this.utils.isTypeWithSpecificErrorMessage(value)) {
        throw new Error('type is invalid');
      }
      const typeValue = this.utils.isTypeWithSpecificErrorMessage(value) ? 
      (<ITypeValueWithSpecificErrorMessage>value).value : <Type>value;
      if (!this.utils.isNil(this.regExp)) {
        if (typeValue !== 'string') {
          throw new Error('RegExp just can be tested on strings');
        }
      }
      this._type = value;
      this._typeValue = typeValue;
    }
  }

  private _typeValue: Type;
  public get typeValue(): Type {

    return this._typeValue;
  }

  private _regExp?: reg_exp;
  public get regExp(): reg_exp | undefined {
    return this._regExp;
  }
  public set regExp(value: reg_exp | undefined) {
    if (value !== undefined) {
      if (this.utils.areAllValuesSet(value, this.validValues)) {
        throw new Error('RegExp pattern and valid_values can\'t be set both');
      }
      if (this.utils.areAllValuesSet(value, this.min, this.max) || this.utils.areAllValuesSet(value, this.min) || 
      this.utils.areAllValuesSet(value, this.max)) {
        throw new Error('RegExp and length properties can\'t be set both');
      }
      if (this.utils.areAllValuesSet(value, this.nested)) {
        throw new Error('RegExp and nested can\'t be set both');
      }
      if (!this.utils.isNil(this.typeValue) && this.typeValue !== 'string') {
        throw new Error('RegExp just can be tested on strings');
      }
      if (!this.utils.isRegExp(value) && !this.utils.isRegExpWithSpecificErrorMessage(value)) {
        throw new Error('RegExp pattern is invalid');
      }
      this._regExp = value;
      this._regExpValue = this.utils.isRegExpWithSpecificErrorMessage(this._regExp) ? 
      (<IRegExpValueWithSpecificErrorMessage>this._regExp).value : <RegExp>this._regExp;
    }
  }


  private _regExpValue: RegExpValue;
  public get regExpValue(): RegExpValue {

    return this._regExpValue;
  }

  private _validValues?: valid_values;
  public get validValues(): valid_values | undefined {
    return this._validValues;
  }
  public set validValues(value: valid_values | undefined) {
    if (value !== undefined) {
      if (this.utils.areAllValuesSet(value, this.type)) {
        throw new Error('Valid_values and type can\'t be set both');
      }
      if (this.utils.areAllValuesSet(value, this.regExp)) {
        throw new Error('Valid_values and regExp pattern can\'t be set both');
      }
      if (this.utils.areAllValuesSet(value, this.min, this.max) || this.utils.areAllValuesSet(value, this.min) || 
      this.utils.areAllValuesSet(value, this.max)) {
        throw new Error('Valid_values and length properties can\'t be set both');
      }
      if (this.utils.areAllValuesSet(value, this.nested)) {
        throw new Error('Valid_values and nested can\'t be set both');
      }
      if (!this.utils.isValidValuesArray(value) && !this.utils.isValidValuesWithSpecificErrorMessage(value)) {
        throw new Error('valid_values is invalid');
      }
      this._validValues = value;
      this._validValuesValue = this.utils.isValidValuesWithSpecificErrorMessage(this._validValues) ? 
      (<IArrayValueWithSpecificErrorMessage>this._validValues).value : <ValidValues>this._validValues;
    }
  }

  private _validValuesValue: ValidValues;
  public get validValuesValue(): ValidValues {

    return this._validValuesValue;
  }


  private _required?: required;
  public get required(): required | undefined {
    return this._required;
  }
  public set required(value: required | undefined) {
    if (value !== undefined) {
      if (!this.utils.isBoolean(value) && !this.utils.isRequiredWithSpecificErrorMessage(value)) {
        throw new Error('required is invalid');
      }
      this._required = value;
      this._requiredValue = this.utils.isRequiredWithSpecificErrorMessage(this._required) ? 
      (<IBooleanValueWithSpecificErrorMessage>this._required).value : <boolean>this._required;
    }
  }

  private _requiredValue: boolean;
  public get requiredValue(): boolean {

    return this._requiredValue;
  }

  private _min?: min;
  public get min(): min | undefined {
    return this._min;
  }
  public set min(value: min | undefined) {
    if (value !== undefined) {
      if (!this.utils.isNil(this.typeValue) && !this.utils.isValidTypeWithLengthProperties(this.typeValue)) {
        throw new Error('Invalid type when using length properties');
      }
      if (this.utils.areAllValuesSet(value, this.regExp)) {
        throw new Error('min and regExp pattern can\'t be set both');
      }
      if (this.utils.areAllValuesSet(value, this.validValues)) {
        throw new Error('min and validValues can\'t be set both');
      }
      if (this.utils.areAllValuesSet(value, this.nested) && !this.utils.isArray(this.nested)) {
        throw new Error('min and nested can\'t be set both, when nested is an object');
      }
      if (!this.utils.isNumber(value) && !this.utils.isMinOrMaxWithSpecificErrorMessage(value)) {
        throw new Error('min needs to be numbers');
      }
      const minValue = this.utils.isMinOrMaxWithSpecificErrorMessage(value) ? 
      (<INumberValueWithSpecificErrorMessage>value).value : <number>value;
      if ((this.utils.isTypeWhichRequiresIntegerLength(this.typeValue) || this.utils.isArray(this.nested)) &&
       !this.utils.isInteger(minValue)) {
        throw new Error('for the current type or if nested is an array min needs to be an integer');
      }
      if (minValue > this.maxValue) {
        throw new Error('min need to be lower than max');
      }
      this._min = value;
      this._minValue = minValue;
    }
  }

  private _minValue: number;
  public get minValue(): number {
    return this._minValue;
  }

  private _max?: max;
  public get max(): max | undefined {
    return this._max;
  }
  public set max(value: max | undefined) {
    if (value !== undefined) {
      if (!this.utils.isNil(this.typeValue) && !this.utils.isValidTypeWithLengthProperties(this.typeValue)) {
        throw new Error('Invalid type when using length properties');
      }
      if (this.utils.areAllValuesSet(value, this.regExp)) {
        throw new Error('max and regExp pattern can\'t be set both');
      }
      if (this.utils.areAllValuesSet(value, this.validValues)) {
        throw new Error('max and validValues can\'t be set both');
      }
      if (this.utils.areAllValuesSet(value, this.nested) && !this.utils.isArray(this.nested)) {
        throw new Error('max and nested can\'t be set both, when nested is an object');
      }
      if (!this.utils.isNumber(value) && !this.utils.isMinOrMaxWithSpecificErrorMessage(value)) {
        throw new Error('max needs to be numbers');
      }
      const maxValue = this.utils.isMinOrMaxWithSpecificErrorMessage(value) ? 
      (<INumberValueWithSpecificErrorMessage>value).value : <number>value;
      if ((this.utils.isTypeWhichRequiresIntegerLength(this.typeValue) || this.utils.isArray(this.nested)) &&
      !this.utils.isInteger(maxValue)) {
        throw new Error('for the current type or if nested is an array max needs to be an integer');
      }
      if (this.minValue > maxValue) {
        throw new Error('min need to be lower than max');
      }
      this._max = value;
      this._maxValue = maxValue;
    }
  }

  private _maxValue: number;
  public get maxValue(): number {

    return this._maxValue;
  }

  private _message?: message;
  public get message(): message | undefined {
    return this._message;
  }
  public set message(value: message | undefined) {
    if (value !== undefined) {
      if (!this.utils.isMessage(value)) {
        throw new Error('message is not a valid message string or message object');
      }
      this._message = value;
    }
  }

  private _nested?: ISchemaConfig | ISchemaConfig[];

  public get nested(): ISchemaConfig | ISchemaConfig[] | undefined {
    return this._nested;
  }
  public set nested(value: ISchemaConfig | ISchemaConfig[] | undefined) {
    if (value !== undefined) {
      if (this.utils.areAllValuesSet(value, this.type)) {
        throw new Error('nested and type can\'t be set both');
      }
      if (this.utils.areAllValuesSet(value, this.regExp)) {
        throw new Error('nested and regExp pattern can\'t be set both');
      }
      if (this.utils.areAllValuesSet(value, this.validValues)) {
        throw new Error('nested and validValues can\'t be set both');
      }
      if ((this.utils.areAllValuesSet(value, this.min, this.max) || this.utils.areAllValuesSet(value, this.min) ||
       this.utils.areAllValuesSet(value, this.max)) && !this.utils.isArray(value)) {
        throw new Error('nested and length properties can\'t be set both, unless nested is an array');
      }
      if (!this.utils.isNil(this.min) && !this.utils.isInteger(this.minValue) || (!this.utils.isNil(this.max) 
      && !this.utils.isInteger(this.maxValue))) {
        throw new Error('If nested is an array, length properties need to be integers');
      }
      this._nested = value;
    }
  }

  constructor(utils: Utils) {
    this.utils = utils;
  }

  getErrorMessage(property: SchemaConfigEntryProperty) : string {
    if (this.utils.hasMessageProperty(property)) {
      return this.checkLanguageErrorMessage(property.message);
    }
    if (!this.utils.isNil(this.message)) {
      return this.checkLanguageErrorMessage(this.message);
    }
    return 'something went wrong';
  }

  checkLanguageErrorMessage(message: message) : string {
    if (this.utils.isString(message)) {
      return message;
    }
    const countryCode = this.utils.options.countryCode;
    if (this.utils.isMessageObject(message) && !this.utils.isNil(countryCode) 
    && !this.utils.isNil(message[countryCode])) {
      return message[countryCode];
    }
    return 'something went wrong';
  }
}
