import * as chai from 'chai';
import { Utils } from '../src/utils';

const expect = chai.expect;

class Test {
  test: number;
  constructor(test: number) {
    this.test = test;
  }
}

describe('Utils', () => {
  it('should return true if the value is a plain object', () => {
    expect(Utils.isPlainObject({})).to.equal(true);
    expect(Utils.isPlainObject({ test: 1 })).to.equal(true);
    expect(Utils.isPlainObject(Object.create(null))).to.equal(true);
    expect(Utils.isPlainObject(new Test(1))).to.equal(true);
  });
  it('should return false if the value isn‘t a plain object', () => {
    expect(Utils.isPlainObject(1)).to.equal(false);
    expect(Utils.isPlainObject(Number(1))).to.equal(false);
    expect(Utils.isPlainObject(true)).to.equal(false);
    expect(Utils.isPlainObject('test')).to.equal(false);
    expect(Utils.isPlainObject([1, 2])).to.equal(false);
    expect(Utils.isPlainObject(null)).to.equal(false);
    expect(Utils.isPlainObject(undefined)).to.equal(false);
    const func = () => { console.log('test'); };
    expect(Utils.isPlainObject(func)).to.equal(false);
    expect(Utils.isPlainObject(Function)).to.equal(false);
  });
  it('should return true if the value is a string', () => {
    expect(Utils.isString('test')).to.equal(true);
  });
  it('should return false if the value isn‘t a string', () => {
    expect(Utils.isString(1)).to.equal(false);
    expect(Utils.isString(undefined)).to.equal(false);
  });
  it('should return true if the value is a valid type string', () => {
    expect(Utils.isType('number')).to.equal(true);
  });
  it('should return false if the value isn‘t a valid type string', () => {
    expect(Utils.isType('numbre')).to.equal(false);
  });
  it('should return true if the value is a valid type with message object', () => {
    expect(Utils.isTypeWithSpecificErrorMessage({
      value: 'number',
      message: 'test',
    })).to.equal(true);
    expect(Utils.isTypeWithSpecificErrorMessage({
      value: 'number',
      message: {
        de: 'test',
        en: 'test'
      }
    })).to.equal(true);
  });
  it('should return false if the value isn‘t a valid type with message object', () => {
    expect(Utils.isTypeWithSpecificErrorMessage({
      value: 'number1',
      message: 'test',
    })).to.equal(false);
    expect(Utils.isTypeWithSpecificErrorMessage({
      value: 'stirng',
      message: {
        de: 'test',
        en: 'test'
      }
    })).to.equal(false);
    expect(Utils.isTypeWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return true if the value is a valid message object', () => {
    expect(Utils.isMessageObject({
      de: 'hallo',
      en: 'hello',
    })).to.equal(true);
  });
  it('should return false if the value isn‘t a valid message object', () => {
    expect(Utils.isMessageObject({
      de: 'hallo',
      en: 1,
    })).to.equal(false);
    expect(Utils.isMessageObject({})).to.equal(false);
    expect(Utils.isMessageObject(true)).to.equal(false);
  });
  it('should return the base tag [object Object] if the value is an object', () => {
    expect((<any>Utils).getBaseTag({
      de: 'hallo',
      en: 'hello',
    })).to.equal('[object Object]');
  });
  it('should return true if all values are set', () => {
    expect(Utils.areAllValuesSet(true, 'test')).to.equal(true);
    expect(Utils.areAllValuesSet({}, 'test', 1)).to.equal(true);
  });
  it('should return false if not all values are set', () => {
    expect(Utils.areAllValuesSet(undefined, 'test')).to.equal(false);
    expect(Utils.areAllValuesSet({}, undefined, 1)).to.equal(false);
  });
  it('should return true if value is a message', () => {
    expect(Utils.isMessage('message')).to.equal(true);
    expect(Utils.isMessage({
      de: 'german message',
      en: 'english message'
    })).to.equal(true);
  });
  it('should return true if value is a min/max value with error message', () => {
    expect(Utils.isMinOrMaxWithSpecificErrorMessage({
      value: 1,
      message: 'message'
    })).to.equal(true);
    expect(Utils.isMinOrMaxWithSpecificErrorMessage({
      value: 1,
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(true);
  });
  it('should return false if value is not a min/max value with error message', () => {
    expect(Utils.isMinOrMaxWithSpecificErrorMessage({
      value: true,
      message: 'message'
    })).to.equal(false);
    expect(Utils.isMinOrMaxWithSpecificErrorMessage({
      value: 'test',
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(false);
    expect(Utils.isMinOrMaxWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return true if value is a valid type when length properties are set', () => {
    expect(Utils.isValidTypeWithLengthProperties('number')).to.equal(true);
    expect(Utils.isValidTypeWithLengthProperties('string')).to.equal(true);
  });
  it('should return true if value is a valid type when length properties are set', () => {
    expect(Utils.isValidTypeWithLengthProperties('boolean')).to.equal(false);
  });
  it('should return true if value is a required value with error message', () => {
    expect(Utils.isRequiredWithSpecificErrorMessage({
      value: true,
      message: 'message'
    })).to.equal(true);
    expect(Utils.isRequiredWithSpecificErrorMessage({
      value: false,
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(true);
  });
  it('should return false if value is not a required value with error message', () => {
    expect(Utils.isRequiredWithSpecificErrorMessage({
      value: 1,
      message: 'message'
    })).to.equal(false);
    expect(Utils.isRequiredWithSpecificErrorMessage({
      value: 'test',
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(false);
    expect(Utils.isRequiredWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return true if value is a valid valid_values array', () => {
    expect(Utils.isValidValuesArray([1,2,3])).to.equal(true);
    expect(Utils.isValidValuesArray(['test','test2','test3'])).to.equal(true);
    expect(Utils.isValidValuesArray([true])).to.equal(true);
    expect(Utils.isValidValuesArray([true,1,'test'])).to.equal(true);
  });
  it('should return false if value isn\'t a valid valid_values array', () => {
    expect(Utils.isValidValuesArray(true)).to.equal(false);
    //expect(Utils.isValidValuesArray(undefined)).to.equal(false);
    expect(Utils.isValidValuesArray({})).to.equal(false);
    expect(Utils.isValidValuesArray([true,1,'test', {}])).to.equal(false);
  });
  it('should return true if value is a valid_value value with error message', () => {
    expect(Utils.isValidValuesWithSpecificErrorMessage({
      value: [true,1,'a'],
      message: 'message'
    })).to.equal(true);
    expect(Utils.isValidValuesWithSpecificErrorMessage({
      value: [true,1,'a'],
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(true);
  });
  it('should return false if value is not a valid_value value with error message', () => {
    expect(Utils.isValidValuesWithSpecificErrorMessage({
      value: [true,1,'test', {}],
      message: 'message'
    })).to.equal(false);
    expect(Utils.isValidValuesWithSpecificErrorMessage({
      value: 'test',
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(false);
    //expect(Utils.isValidValuesWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return true if value is an array', () => {
    expect(Utils.isArray([])).to.equal(true);
    expect(Utils.isArray(new Array())).to.equal(true);
    expect(Utils.isArray([1,'test'])).to.equal(true);
  });
  it('should return false if value isn\'t an array', () => {
    expect(Utils.isArray({})).to.equal(false);
    expect(Utils.isArray(true)).to.equal(false);
    expect(Utils.isArray('test')).to.equal(false);
  });
  it('should return true if value is a boolean', () => {
    expect(Utils.isBoolean(true)).to.equal(true);
    expect(Utils.isBoolean(false)).to.equal(true);
  });
  it('should return false if value isn\'t a boolean', () => {
    expect(Utils.isBoolean({})).to.equal(false);
    expect(Utils.isBoolean(1)).to.equal(false);
    expect(Utils.isBoolean('test')).to.equal(false);
  });
  it('should return true if value is a number', () => {
    expect(Utils.isNumber(1)).to.equal(true);
    expect(Utils.isNumber(1.3)).to.equal(true);
  });
  it('should return false if value isn\'t a number', () => {
    expect(Utils.isNumber({})).to.equal(false);
    expect(Utils.isNumber(true)).to.equal(false);
    expect(Utils.isNumber('test')).to.equal(false);
  });
  it('should return true if value is a integer', () => {
    expect(Utils.isInteger(1)).to.equal(true);
  });
  it('should return false if value isn\'t a integer', () => {
    expect(Utils.isInteger(1.3)).to.equal(false);
  });
  it('should return true if value is a regexp', () => {
    expect(Utils.isRegExp(/ab+c/i)).to.equal(true);
  });
  it('should return false if value isn\'t a regexp', () => {
    expect(Utils.isRegExp('/ab+c/i')).to.equal(false);
  });
  it('should return true if value is a regexp value with error message', () => {
    expect(Utils.isRegExpWithSpecificErrorMessage({
      value: /ab+c/i,
      message: 'message'
    })).to.equal(true);
    expect(Utils.isRegExpWithSpecificErrorMessage({
      value: /ab+c/i,
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(true);
  });
  it('should return false if value is not a regexp value with error message', () => {
    expect(Utils.isRegExpWithSpecificErrorMessage({
      value: '/ab+c/i',
      message: 'message'
    })).to.equal(false);
    expect(Utils.isRegExpWithSpecificErrorMessage({
      value: '/ab+c/i',
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(false);
    //expect(Utils.isValidValuesWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return true if value is set', () => {
    expect(Utils.isSet(false)).to.equal(true);
  });
  it('should return false if value isn\'t set', () => {
    expect(Utils.isSet(undefined)).to.equal(false);
  });
});
