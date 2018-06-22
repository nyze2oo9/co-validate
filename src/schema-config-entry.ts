import {
  Type, ITypeValueWithSpecificErrorMessage, IStringValueWithSpecificErrorMessage,
  IRegExpValueWithSpecificErrorMessage, IArrayValueWithSpecificErrorMessage,
  IBooleanValueWithSpecificErrorMessage, INumberValueWithSpecificErrorMessage,
  IMessageEntry, ISchemaConfig, valid_values, type, reg_exp, required, min, max, message, RegExpValue, ValidValues,
} from './interfaces/schema';
import { Utils } from './utils';

export class SchemaConfigEntry {
  private _fullPath: string[];
	public get fullPath(): string[] {
		return this._fullPath;
	}
	public set fullPath(value: string[]) {
		this._fullPath = value;
	}


  private _type?: type;
  public get type(): type | undefined {
    return this._type;
  }
  public set type(value: type | undefined) {
    if (value !== undefined) {
      if (Utils.areAllValuesSet(value, this.validValues)) {
        throw new Error('type and valid_values can\'t be set both');
      }
      if (Utils.areAllValuesSet(value, this.nested)) {
        throw new Error('type and nested can\'t be set both');
      }
      if (!Utils.isType(value) && !Utils.isTypeWithSpecificErrorMessage(value)) {
        throw new Error('type is invalid');
      }
      const typeValue = Utils.isTypeWithSpecificErrorMessage(value) ? (<ITypeValueWithSpecificErrorMessage>value).value : <Type>value;
      if (Utils.isSet(this.regExp)) {
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
      if (Utils.areAllValuesSet(value, this.validValues)) {
        throw new Error('RegExp pattern and valid_values can\'t be set both');
      }
      if (Utils.areAllValuesSet(value, this.min, this.max) || Utils.areAllValuesSet(value, this.min) || Utils.areAllValuesSet(value, this.max)) {
        throw new Error('RegExp and length properties can\'t be set both');
      }
      if (Utils.areAllValuesSet(value, this.nested)) {
        throw new Error('RegExp and nested can\'t be set both');
      }
      if (Utils.isSet(this.typeValue) && this.typeValue !== 'string') {
        throw new Error('RegExp just can be tested on strings');
      }
      if (!Utils.isRegExp(value) && !Utils.isRegExpWithSpecificErrorMessage(value)) {
        throw new Error('RegExp pattern is invalid');
      }
      this._regExp = value;
      this._regExpValue = Utils.isRegExpWithSpecificErrorMessage(this._regExp) ? (<IRegExpValueWithSpecificErrorMessage>this._regExp).value : <RegExp>this._regExp;
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
      if (Utils.areAllValuesSet(value, this.type)) {
        throw new Error('Valid_values and type can\'t be set both');
      }
      if (Utils.areAllValuesSet(value, this.regExp)) {
        throw new Error('Valid_values and regExp pattern can\'t be set both');
      }
      if (Utils.areAllValuesSet(value, this.min, this.max) || Utils.areAllValuesSet(value, this.min) || Utils.areAllValuesSet(value, this.max)) {
        throw new Error('Valid_values and length properties can\'t be set both');
      }
      if (Utils.areAllValuesSet(value, this.nested)) {
        throw new Error('Valid_values and nested can\'t be set both');
      }
      if (!Utils.isValidValuesArray(value) && !Utils.isValidValuesWithSpecificErrorMessage(value)) {
        throw new Error('valid_values is invalid');
      }
      this._validValues = value;
      this._validValuesValue = Utils.isValidValuesWithSpecificErrorMessage(this._validValues) ? (<IArrayValueWithSpecificErrorMessage>this._validValues).value : <ValidValues>this._validValues;
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
      if (!Utils.isBoolean(value) && !Utils.isRequiredWithSpecificErrorMessage(value)) {
        throw new Error('required is invalid');
      }
      this._required = value;
      this._requiredValue = Utils.isRequiredWithSpecificErrorMessage(this._required) ? (<IBooleanValueWithSpecificErrorMessage>this._required).value : <boolean>this._required;
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
      if (Utils.isSet(this.typeValue) && !Utils.isValidTypeWithLengthProperties(this.typeValue)) {
        throw new Error('Invalid type when usgin length properties');
      }
      if (Utils.areAllValuesSet(value, this.regExp)) {
        throw new Error('min and regExp pattern can\'t be set both');
      }
      if (Utils.areAllValuesSet(value, this.validValues)) {
        throw new Error('min and validValues can\'t be set both');
      }
      if (Utils.areAllValuesSet(value, this.nested)) {
        throw new Error('min and nested can\'t be set both');
      }
      if (!Utils.isInteger(value) && !Utils.isMinOrMaxWithSpecificErrorMessage(value)) {
        throw new Error('min needs to be numbers');
      }
      const minValue = Utils.isMinOrMaxWithSpecificErrorMessage(value) ? (<INumberValueWithSpecificErrorMessage>value).value : <number>value;
      if (minValue > this.maxValue) {
        throw new Error('min need to be lower than max');
      }
      this._min = value;
      this._minValue = minValue
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
      if (Utils.isSet(this.typeValue) && !Utils.isValidTypeWithLengthProperties(this.typeValue)) {
        throw new Error('Invalid type when usgin length properties');
      }
      if (Utils.areAllValuesSet(value, this.regExp)) {
        throw new Error('max and regExp pattern can\'t be set both');
      }
      if (Utils.areAllValuesSet(value, this.validValues)) {
        throw new Error('max and validValues can\'t be set both');
      }
      if (Utils.areAllValuesSet(value, this.nested)) {
        throw new Error('max and nested can\'t be set both');
      }
      if (!Utils.isInteger(value) && !Utils.isMinOrMaxWithSpecificErrorMessage(value)) {
        throw new Error('max needs to be numbers');
      }
      const maxValue = Utils.isMinOrMaxWithSpecificErrorMessage(value) ? (<INumberValueWithSpecificErrorMessage>value).value : <number>value;
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
      if (!Utils.isMessage(value)) {
        throw new Error('message is not a valid message string or message object');
      }
      this._message = value;
    }
  }

  private _nested?: ISchemaConfig;

  public get nested(): ISchemaConfig | undefined {
    return this._nested;
  }
  public set nested(value: ISchemaConfig | undefined) {
    if (value !== undefined) {
      if (Utils.areAllValuesSet(value, this.type)) {
        throw new Error('nested and type can\'t be set both');
      }
      if (Utils.areAllValuesSet(value, this.regExp)) {
        throw new Error('nested and regExp pattern can\'t be set both');
      }
      if (Utils.areAllValuesSet(value, this.validValues)) {
        throw new Error('nested and validValues can\'t be set both');
      }
      //@TODO how to specify lengths of arrays
      if (Utils.areAllValuesSet(value, this.min, this.max) || Utils.areAllValuesSet(value, this.min) || Utils.areAllValuesSet(value, this.max)) {
        throw new Error('nested and length properties can\'t be set both');
      }
      this._nested = value;
    }
  }
}
