import * as chai from 'chai';
import { Utils } from '../src/entities/utils';
import { Options } from '../src/entities/options';

const expect = chai.expect;

class Test {
  test: number;
  constructor(test: number) {
    this.test = test;
  }
}

const utils = new Utils();

describe('Utils', () => {
  it('should return true if the value is a plain object', () => {
    const utilsToTest = new Utils(new Options({allowEmpty: true}))
    expect(utilsToTest.isPlainObject({})).to.equal(true);
    expect(utils.isPlainObject({ test: 1 })).to.equal(true);
    expect(utilsToTest.isPlainObject(Object.create(null))).to.equal(true);
    expect(utils.isPlainObject(new Test(1))).to.equal(true);
  });
  it('should return false if the value isn‘t a plain object', () => {
    expect(utils.isPlainObject({})).to.equal(false);
    expect(utils.isPlainObject(Object.create(null))).to.equal(false);
    expect(utils.isPlainObject(1)).to.equal(false);
    expect(utils.isPlainObject(Number(1))).to.equal(false);
    expect(utils.isPlainObject(true)).to.equal(false);
    expect(utils.isPlainObject('test')).to.equal(false);
    expect(utils.isPlainObject([1, 2])).to.equal(false);
    expect(utils.isPlainObject(null)).to.equal(false);
    expect(utils.isPlainObject(undefined)).to.equal(false);
    const func = () => { console.log('test'); };
    expect(utils.isPlainObject(func)).to.equal(false);
    expect(utils.isPlainObject(Function)).to.equal(false);
  });
  it('should return true if the value is a string', () => {
    expect(utils.isString('test')).to.equal(true);
  });
  it('should return false if the value isn‘t a string', () => {
    expect(utils.isString(1)).to.equal(false);
    expect(utils.isString(undefined)).to.equal(false);
  });
  it('should return true if the value is a valid type string', () => {
    expect(utils.isType('number')).to.equal(true);
  });
  it('should return false if the value isn‘t a valid type string', () => {
    expect(utils.isType('numbre')).to.equal(false);
  });
  it('should return true if the value is a valid type with message object', () => {
    expect(utils.isTypeWithSpecificErrorMessage({
      value: 'number',
      message: 'test',
    })).to.equal(true);
    expect(utils.isTypeWithSpecificErrorMessage({
      value: 'number',
      message: {
        de: 'test',
        en: 'test'
      }
    })).to.equal(true);
  });
  it('should return false if the value isn‘t a valid type with message object', () => {
    expect(utils.isTypeWithSpecificErrorMessage({
      value: 'number1',
      message: 'test',
    })).to.equal(false);
    expect(utils.isTypeWithSpecificErrorMessage({
      value: 'stirng',
      message: {
        de: 'test',
        en: 'test'
      }
    })).to.equal(false);
    expect(utils.isTypeWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return true if the value is a valid message object', () => {
    expect(utils.isMessageObject({
      de: 'hallo',
      en: 'hello',
    })).to.equal(true);
  });
  it('should return false if the value isn‘t a valid message object', () => {
    expect(utils.isMessageObject({
      de: 'hallo',
      en: 1,
    })).to.equal(false);
    expect(utils.isMessageObject({})).to.equal(false);
    expect(utils.isMessageObject(true)).to.equal(false);
  });
  it('should return the base tag [object Object] if the value is an object', () => {
    expect((<any>utils).getBaseTag({
      de: 'hallo',
      en: 'hello',
    })).to.equal('[object Object]');
  });
  it('should return true if all values are set', () => {
    expect(utils.areAllValuesSet(true, 'test')).to.equal(true);
    expect(utils.areAllValuesSet({}, 'test', 1)).to.equal(true);
  });
  it('should return false if not all values are set', () => {
    expect(utils.areAllValuesSet(undefined, 'test')).to.equal(false);
    expect(utils.areAllValuesSet({}, undefined, 1)).to.equal(false);
  });
  it('should return true if value is a message', () => {
    expect(utils.isMessage('message')).to.equal(true);
    expect(utils.isMessage({
      de: 'german message',
      en: 'english message'
    })).to.equal(true);
  });
  it('should return true if value is a min/max value with error message', () => {
    expect(utils.isMinOrMaxWithSpecificErrorMessage({
      value: 1,
      message: 'message'
    })).to.equal(true);
    expect(utils.isMinOrMaxWithSpecificErrorMessage({
      value: 1,
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(true);
  });
  it('should return false if value is not a min/max value with error message', () => {
    expect(utils.isMinOrMaxWithSpecificErrorMessage({
      value: true,
      message: 'message'
    })).to.equal(false);
    expect(utils.isMinOrMaxWithSpecificErrorMessage({
      value: 'test',
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(false);
    expect(utils.isMinOrMaxWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return true if value is a valid type when length properties are set', () => {
    expect(utils.isValidTypeWithLengthProperties('number')).to.equal(true);
    expect(utils.isValidTypeWithLengthProperties('string')).to.equal(true);
  });
  it('should return true if value is a valid type when length properties are set', () => {
    expect(utils.isValidTypeWithLengthProperties('boolean')).to.equal(false);
  });
  it('should return true if value is a required value with error message', () => {
    expect(utils.isRequiredWithSpecificErrorMessage({
      value: true,
      message: 'message'
    })).to.equal(true);
    expect(utils.isRequiredWithSpecificErrorMessage({
      value: false,
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(true);
  });
  it('should return false if value is not a required value with error message', () => {
    expect(utils.isRequiredWithSpecificErrorMessage({
      value: 1,
      message: 'message'
    })).to.equal(false);
    expect(utils.isRequiredWithSpecificErrorMessage({
      value: 'test',
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(false);
    expect(utils.isRequiredWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return true if value is a valid valid_values array', () => {
    expect(utils.isValidValuesArray([1,2,3])).to.equal(true);
    expect(utils.isValidValuesArray(['test','test2','test3'])).to.equal(true);
    expect(utils.isValidValuesArray([true])).to.equal(true);
    expect(utils.isValidValuesArray([true,1,'test'])).to.equal(true);
  });
  it('should return false if value isn\'t a valid valid_values array', () => {
    expect(utils.isValidValuesArray(true)).to.equal(false);
    //expect(utils.isValidValuesArray(undefined)).to.equal(false);
    expect(utils.isValidValuesArray({})).to.equal(false);
    expect(utils.isValidValuesArray([true,1,'test', {}])).to.equal(false);
  });
  it('should return true if value is a valid_value value with error message', () => {
    expect(utils.isValidValuesWithSpecificErrorMessage({
      value: [true,1,'a'],
      message: 'message'
    })).to.equal(true);
    expect(utils.isValidValuesWithSpecificErrorMessage({
      value: [true,1,'a'],
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(true);
  });
  it('should return false if value is not a valid_value value with error message', () => {
    expect(utils.isValidValuesWithSpecificErrorMessage({
      value: [true,1,'test', {}],
      message: 'message'
    })).to.equal(false);
    expect(utils.isValidValuesWithSpecificErrorMessage({
      value: 'test',
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(false);
    //expect(utils.isValidValuesWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return true if value is an array', () => {
    const utilsToTest = new Utils(new Options({allowEmpty: true}))
    expect(utilsToTest.isArray([])).to.equal(true);
    expect(utilsToTest.isArray(new Array())).to.equal(true);
    expect(utils.isArray([1,'test'])).to.equal(true);
  });
  it('should return false if value is an empty array', () => {
    expect(utils.isArray([])).to.equal(false);
    expect(utils.isArray(new Array())).to.equal(false);
  });
  it('should return false if value isn\'t an array', () => {
    expect(utils.isArray({})).to.equal(false);
    expect(utils.isArray(true)).to.equal(false);
    expect(utils.isArray('test')).to.equal(false);
  });
  it('should return true if value is a boolean', () => {
    expect(utils.isBoolean(true)).to.equal(true);
    expect(utils.isBoolean(false)).to.equal(true);
  });
  it('should return false if value isn\'t a boolean', () => {
    expect(utils.isBoolean({})).to.equal(false);
    expect(utils.isBoolean(1)).to.equal(false);
    expect(utils.isBoolean('test')).to.equal(false);
  });
  it('should return true if value is a number', () => {
    expect(utils.isNumber(1)).to.equal(true);
    expect(utils.isNumber(1.3)).to.equal(true);
  });
  it('should return false if value isn\'t a number', () => {
    expect(utils.isNumber({})).to.equal(false);
    expect(utils.isNumber(true)).to.equal(false);
    expect(utils.isNumber('test')).to.equal(false);
  });
  it('should return true if value is a integer', () => {
    expect(utils.isInteger(1)).to.equal(true);
  });
  it('should return false if value isn\'t a integer', () => {
    expect(utils.isInteger(1.3)).to.equal(false);
  });
  it('should return true if value is a regexp', () => {
    expect(utils.isRegExp(/ab+c/i)).to.equal(true);
  });
  it('should return false if value isn\'t a regexp', () => {
    expect(utils.isRegExp('/ab+c/i')).to.equal(false);
  });
  it('should return true if value is a regexp value with error message', () => {
    expect(utils.isRegExpWithSpecificErrorMessage({
      value: /ab+c/i,
      message: 'message'
    })).to.equal(true);
    expect(utils.isRegExpWithSpecificErrorMessage({
      value: /ab+c/i,
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(true);
  });
  it('should return false if value is not a regexp value with error message', () => {
    expect(utils.isRegExpWithSpecificErrorMessage({
      value: '/ab+c/i',
      message: 'message'
    })).to.equal(false);
    expect(utils.isRegExpWithSpecificErrorMessage({
      value: '/ab+c/i',
      message: {
        de: 'german message',
        en: 'english message'
      }
    })).to.equal(false);
    //expect(utils.isValidValuesWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return true if value is set', () => {
    expect(utils.isSet(false)).to.equal(true);
  });
  it('should return false if value isn\'t set', () => {
    expect(utils.isSet(undefined)).to.equal(false);
  });
  it('should return rest when navigate thru path', () => {
    const testObject = {
      test1: {
        test2: {
          test3: 'test'
        }
      }
    }
    const testPath = ['test1', 'test2', 'test3']
    expect(utils.getValue(testPath, testObject)).to.equal('test');
  });
  it('should return true if it\'s not NaN and allowNaN is false', () => {
    expect(utils.checkNaNBasedOnOptions(1)).to.equal(true);
  }); 
  it('should return true if it\'s not NaN and allowNaN is true', () => {
    const utilsToTest = new Utils(new Options({allowNaN: true}))
    expect(utilsToTest.checkNaNBasedOnOptions(1)).to.equal(true);
  });
  it('should return false if NaN is set and allowNaN is false', () => {
    expect(utils.checkNaNBasedOnOptions(NaN)).to.equal(false);
  }); 
  it('should return true if NaN is set and allowNaN is true', () => {
    const utilsToTest = new Utils(new Options({allowNaN: true}))
    expect(utilsToTest.checkNaNBasedOnOptions(NaN)).to.equal(true);
  });
  it('should return true if it\'s not Infinite and allowInfinite is false', () => {
    expect(utils.checkInfiteBasedOnOptions(1)).to.equal(true);
  }); 
  it('should return true if it\'s not Infinite and allowInfinite is true', () => {
    const utilsToTest = new Utils(new Options({allowInfinite: true}))
    expect(utilsToTest.checkInfiteBasedOnOptions(1)).to.equal(true);
  });
  it('should return false if Infinite is set and allowInfinite is false', () => {
    expect(utils.checkInfiteBasedOnOptions(Number.POSITIVE_INFINITY)).to.equal(false);
    expect(utils.checkInfiteBasedOnOptions(Number.NEGATIVE_INFINITY)).to.equal(false);
  }); 
  it('should return true if Infinite is set and allowInfinite is true', () => {
    const utilsToTest = new Utils(new Options({allowInfinite: true}))
    expect(utilsToTest.checkInfiteBasedOnOptions(Number.POSITIVE_INFINITY)).to.equal(true);
    expect(utilsToTest.checkInfiteBasedOnOptions(Number.NEGATIVE_INFINITY)).to.equal(true);
  });
  it('should return false if value is NaN and AllowNaN is false', () => {
    expect(utils.isNumber(NaN)).to.equal(false);
  });
  it('should return true if value is NaN and AllowNaN is true', () => {
    const utilsToTest = new Utils(new Options({allowNaN: true}))
    expect(utilsToTest.isNumber(NaN)).to.equal(true);
  });
  it('should return false if value is Infinite and allowInfinite is false', () => {
    expect(utils.isNumber(Number.POSITIVE_INFINITY)).to.equal(false);
    expect(utils.isNumber(Number.NEGATIVE_INFINITY)).to.equal(false);
  });
  it('should return false if value is Infinite and allowInfinite is false', () => {
    const utilsToTest = new Utils(new Options({allowInfinite: true}))
    expect(utilsToTest.isNumber(Number.POSITIVE_INFINITY)).to.equal(true);
    expect(utilsToTest.isNumber(Number.NEGATIVE_INFINITY)).to.equal(true);
  });
  it('should return false if value is NaN and AllowNaN is false', () => {
    expect(utils.isInteger(NaN)).to.equal(false);
  });
  it('should return false if value is Infinite and allowInfinite is false', () => {
    expect(utils.isInteger(Number.POSITIVE_INFINITY)).to.equal(false);
    expect(utils.isInteger(Number.POSITIVE_INFINITY)).to.equal(false);
  });
  it('should return false if value is an empty string and allowEmpty is false', () => {
    expect(utils.checkEmptyStringBasedOnOptions('')).to.equal(false);
  });
  it('should return true if value is an empty string and allowEmpty is true', () => {
    const utilsToTest = new Utils(new Options({allowEmpty: true}))
    expect(utilsToTest.checkEmptyStringBasedOnOptions('')).to.equal(true);
  });
  it('should return false if value is an empty string and allowEmpty is false', () => {
    expect(utils.isString('')).to.equal(false);
  });
  it('should return true if value is an empty string and allowEmpty is true', () => {
    const utilsToTest = new Utils(new Options({allowEmpty: true}))
    expect(utilsToTest.isString('')).to.equal(true);
  });
});
