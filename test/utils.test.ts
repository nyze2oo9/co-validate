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
    const utilsToTest = new Utils(new Options({ allowEmpty: true }));
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
        en: 'test',
      },
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
        en: 'test',
      },
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
      en: 'english message',
    })).to.equal(true);
  });
  it('should return true if value is a min/max value with error message', () => {
    expect(utils.isMinOrMaxWithSpecificErrorMessage({
      value: 1,
      message: 'message',
    })).to.equal(true);
    expect(utils.isMinOrMaxWithSpecificErrorMessage({
      value: 1,
      message: {
        de: 'german message',
        en: 'english message',
      },
    })).to.equal(true);
  });
  it('should return false if value is not a min/max value with error message', () => {
    expect(utils.isMinOrMaxWithSpecificErrorMessage({
      value: true,
      message: 'message',
    })).to.equal(false);
    expect(utils.isMinOrMaxWithSpecificErrorMessage({
      value: 'test',
      message: {
        de: 'german message',
        en: 'english message',
      },
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
      message: 'message',
    })).to.equal(true);
    expect(utils.isRequiredWithSpecificErrorMessage({
      value: false,
      message: {
        de: 'german message',
        en: 'english message',
      },
    })).to.equal(true);
  });
  it('should return false if value is not a required value with error message', () => {
    expect(utils.isRequiredWithSpecificErrorMessage({
      value: 1,
      message: 'message',
    })).to.equal(false);
    expect(utils.isRequiredWithSpecificErrorMessage({
      value: 'test',
      message: {
        de: 'german message',
        en: 'english message',
      },
    })).to.equal(false);
    expect(utils.isRequiredWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return true if value is a valid valid_values array', () => {
    expect(utils.isValidValuesArray([1, 2, 3])).to.equal(true);
    expect(utils.isValidValuesArray(['test', 'test2', 'test3'])).to.equal(true);
    expect(utils.isValidValuesArray([true])).to.equal(true);
    expect(utils.isValidValuesArray([true, 1, 'test'])).to.equal(true);
  });
  it('should return false if value isn\'t a valid valid_values array', () => {
    expect(utils.isValidValuesArray(true)).to.equal(false);
    // expect(utils.isValidValuesArray(undefined)).to.equal(false);
    expect(utils.isValidValuesArray({})).to.equal(false);
    expect(utils.isValidValuesArray([true, 1, 'test', {}])).to.equal(false);
  });
  it('should return true if value is a valid_value value with error message', () => {
    expect(utils.isValidValuesWithSpecificErrorMessage({
      value: [true, 1, 'a'],
      message: 'message',
    })).to.equal(true);
    expect(utils.isValidValuesWithSpecificErrorMessage({
      value: [true, 1, 'a'],
      message: {
        de: 'german message',
        en: 'english message',
      },
    })).to.equal(true);
  });
  it('should return false if value is not a valid_value value with error message', () => {
    expect(utils.isValidValuesWithSpecificErrorMessage({
      value: [true, 1, 'test', {}],
      message: 'message',
    })).to.equal(false);
    expect(utils.isValidValuesWithSpecificErrorMessage({
      value: 'test',
      message: {
        de: 'german message',
        en: 'english message',
      },
    })).to.equal(false);
    // expect(utils.isValidValuesWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return true if value is an array', () => {
    const utilsToTest = new Utils(new Options({ allowEmpty: true }));
    expect(utilsToTest.isArray([])).to.equal(true);
    expect(utils.isArray([1, 'test'])).to.equal(true);
  });
  it('should return false if value is an empty array', () => {
    expect(utils.isArray([])).to.equal(false);
    expect(utils.isArray([])).to.equal(false);
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
      message: 'message',
    })).to.equal(true);
    expect(utils.isRegExpWithSpecificErrorMessage({
      value: /ab+c/i,
      message: {
        de: 'german message',
        en: 'english message',
      },
    })).to.equal(true);
  });
  it('should return false if value is not a regexp value with error message', () => {
    expect(utils.isRegExpWithSpecificErrorMessage({
      value: '/ab+c/i',
      message: 'message',
    })).to.equal(false);
    expect(utils.isRegExpWithSpecificErrorMessage({
      value: '/ab+c/i',
      message: {
        de: 'german message',
        en: 'english message',
      },
    })).to.equal(false);
    // expect(utils.isValidValuesWithSpecificErrorMessage({})).to.equal(false);
  });
  it('should return false if value is set', () => {
    expect(utils.isNil(false)).to.equal(false);
  });
  it('should return true if value isn\'t set', () => {
    expect(utils.isNil(undefined)).to.equal(true);
  });
  it('should return rest when navigate thru path', () => {
    const testObject = {
      test1: {
        test2: {
          test3: 'test',
        },
      },
    };
    const testPath = ['test1', 'test2', 'test3'];
    expect(utils.getValue(testPath, testObject)).to.equal('test');
  });
  it('should return true if it\'s not NaN and allowNaN is false', () => {
    expect(utils.checkNaNBasedOnOptions(1)).to.equal(true);
  });
  it('should return true if it\'s not NaN and allowNaN is true', () => {
    const utilsToTest = new Utils(new Options({ allowNaN: true }));
    expect(utilsToTest.checkNaNBasedOnOptions(1)).to.equal(true);
  });
  it('should return false if NaN is set and allowNaN is false', () => {
    expect(utils.checkNaNBasedOnOptions(NaN)).to.equal(false);
  });
  it('should return true if NaN is set and allowNaN is true', () => {
    const utilsToTest = new Utils(new Options({ allowNaN: true }));
    expect(utilsToTest.checkNaNBasedOnOptions(NaN)).to.equal(true);
  });
  it('should return true if it\'s not Infinite and allowInfinite is false', () => {
    expect(utils.checkInfiteBasedOnOptions(1)).to.equal(true);
  });
  it('should return true if it\'s not Infinite and allowInfinite is true', () => {
    const utilsToTest = new Utils(new Options({ allowInfinite: true }));
    expect(utilsToTest.checkInfiteBasedOnOptions(1)).to.equal(true);
  });
  it('should return false if Infinite is set and allowInfinite is false', () => {
    expect(utils.checkInfiteBasedOnOptions(Number.POSITIVE_INFINITY)).to.equal(false);
    expect(utils.checkInfiteBasedOnOptions(Number.NEGATIVE_INFINITY)).to.equal(false);
  });
  it('should return true if Infinite is set and allowInfinite is true', () => {
    const utilsToTest = new Utils(new Options({ allowInfinite: true }));
    expect(utilsToTest.checkInfiteBasedOnOptions(Number.POSITIVE_INFINITY)).to.equal(true);
    expect(utilsToTest.checkInfiteBasedOnOptions(Number.NEGATIVE_INFINITY)).to.equal(true);
  });
  it('should return false if value is NaN and AllowNaN is false', () => {
    expect(utils.isNumber(NaN)).to.equal(false);
  });
  it('should return true if value is NaN and AllowNaN is true', () => {
    const utilsToTest = new Utils(new Options({ allowNaN: true }));
    expect(utilsToTest.isNumber(NaN)).to.equal(true);
  });
  it('should return false if value is Infinite and allowInfinite is false', () => {
    expect(utils.isNumber(Number.POSITIVE_INFINITY)).to.equal(false);
    expect(utils.isNumber(Number.NEGATIVE_INFINITY)).to.equal(false);
  });
  it('should return false if value is Infinite and allowInfinite is false', () => {
    const utilsToTest = new Utils(new Options({ allowInfinite: true }));
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
    const utilsToTest = new Utils(new Options({ allowEmpty: true }));
    expect(utilsToTest.checkEmptyStringBasedOnOptions('')).to.equal(true);
  });
  it('should return false if value is an empty string and allowEmpty is false', () => {
    expect(utils.isString('')).to.equal(false);
  });
  it('should return true if value is an empty string and allowEmpty is true', () => {
    const utilsToTest = new Utils(new Options({ allowEmpty: true }));
    expect(utilsToTest.isString('')).to.equal(true);
  });
  it('should return true if value matches a specific regExp', () => {
    expect(utils.checkRegExp(/Hello/g, 'Hello World')).to.equal(true);
  });
  it('should return false if value isn\'t matching a specific regExp', () => {
    expect(utils.checkRegExp(/Hello/g, 'Hell World')).to.equal(false);
  });
  it('should return true if value is included in a validValues Array', () => {
    expect(utils.checkValidValue([1, 2], 1)).to.equal(true);
  });
  it('should return false if value isn\'t included in a validValues Array', () => {
    expect(utils.checkValidValue([1, 2], 3)).to.equal(false);
  });
  it('should return true if value is required and set', () => {
    expect(utils.checkRequired(true, 1)).to.equal(true);
    expect(utils.checkRequired(false, undefined)).to.equal(true);
  });
  it('should return false if value is required but not set', () => {
    expect(utils.checkRequired(true, undefined)).to.equal(false);
  });
  it('should return true if value is higher or equal then min', () => {
    expect(utils.checkNumberLength({ min: 1 }, 1)).to.equal(true);
    expect(utils.checkNumberLength({ min: 1 }, 2)).to.equal(true);
  });
  it('should return false if value is less then min', () => {
    expect(utils.checkNumberLength({ min: 1 }, 0)).to.equal(false);
  });
  it('should return true if value is less or equal then max', () => {
    expect(utils.checkNumberLength({ max: 2 }, 1)).to.equal(true);
    expect(utils.checkNumberLength({ max: 2 }, 2)).to.equal(true);
  });
  it('should return false if value is higher then max', () => {
    expect(utils.checkNumberLength({ max: 2 }, 3)).to.equal(false);
  });
  it('should return true if the length of the supplied string is longer or equal min', () => {
    expect(utils.checkStringLength({ min: 1 }, 't')).to.equal(true);
    expect(utils.checkStringLength({ min: 1 }, 'test')).to.equal(true);
  });
  it('should return false if the length of the supplied string isn\' longer or equal min', () => {
    expect(utils.checkStringLength({ min: 5 }, 'test')).to.equal(false);
  });
  it('should return true if the length of the supplied string is less or equal max', () => {
    expect(utils.checkStringLength({ max: 4 }, 'tes')).to.equal(true);
    expect(utils.checkStringLength({ max: 4 }, 'test')).to.equal(true);
  });
  it('should return false if the length of the supplied string isn\'t less or equal max', () => {
    expect(utils.checkStringLength({ max: 2 }, 'test')).to.equal(false);
  });
  it('should return true if the length of the supplied array is longer or equal min', () => {
    expect(utils.checkArrayLength({ min: 1 }, [1])).to.equal(true);
    expect(utils.checkArrayLength({ min: 1 }, [1, 2])).to.equal(true);
  });
  it('should return false if the length of the supplied array isn\' longer or equal min', () => {
    expect(utils.checkArrayLength({ min: 5 }, [1, 2, 3, 4])).to.equal(false);
  });
  it('should return true if the length of the supplied array is less or equal max', () => {
    expect(utils.checkArrayLength({ max: 4 }, [1, 2, 3])).to.equal(true);
    expect(utils.checkArrayLength({ max: 4 }, [1, 2, 3, 4])).to.equal(true);
  });
  it('should return false if the length of the supplied array isn\'t less or equal max', () => {
    expect(utils.checkArrayLength({ max: 2 }, [1, 2, 3, 4])).to.equal(false);
  });
  it('should return true if supplied parameter matched the interface IMaxObject', () => {
    expect((<any>utils).instanceOfMaxObject({ max: 2 })).to.equal(true);
  });
  it('should return false if supplied parameter isn\'t matching the interface IMaxObject', () => {
    expect((<any>utils).instanceOfMaxObject({ min: 2 })).to.equal(false);
  });
  it('should return true if supplied parameter matched the interface IMinObject', () => {
    expect((<any>utils).instanceOfMinObject({ min: 2 })).to.equal(true);
  });
  it('should return false if supplied parameter isn\'t matching the interface IMinObject', () => {
    expect((<any>utils).instanceOfMinObject({ max: 2 })).to.equal(false);
  });
  it('testing checkLengthProperty', () => {
    expect((utils).checkLengthProperty({ min: 2 }, 2)).to.equal(true);
    expect((utils).checkLengthProperty({ max: 2 }, 2)).to.equal(true);
    expect((utils).checkLengthProperty({ min: 2 }, 1)).to.equal(false);
    expect((utils).checkLengthProperty({ max: 2 }, 3)).to.equal(false);
    expect((utils).checkLengthProperty({ min: 2 }, 'te')).to.equal(true);
    expect((utils).checkLengthProperty({ max: 2 }, 'te')).to.equal(true);
    expect((utils).checkLengthProperty({ min: 2 }, 't')).to.equal(false);
    expect((utils).checkLengthProperty({ max: 2 }, 'tes')).to.equal(false);
    expect((utils).checkLengthProperty({ min: 2 }, [1, 2])).to.equal(true);
    expect((utils).checkLengthProperty({ max: 2 }, [1, 2])).to.equal(true);
    expect((utils).checkLengthProperty({ min: 2 }, [1])).to.equal(false);
    expect((utils).checkLengthProperty({ max: 2 }, [1, 2, 3])).to.equal(false);
    expect((utils).checkLengthProperty({ min: 2 }, true)).to.equal(false);
    expect((utils).checkLengthProperty({ max: 2 }, true)).to.equal(false);
  });
  it('should return first index of array true', () => {
    const fullPath = ['test1', { array: true }];
    const entry = '0';
    expect(utils.getFirstIndex(fullPath, entry)).to.eql(1);
  });
  it('should return -1, because there is no occurence of array true', () => {
    const fullPath = ['test1', '0'];
    const entry = '0';
    expect(utils.getFirstIndex(fullPath, entry)).to.eql(-1);
  });
  it('should return first array lengths', () => {
    const fullPath = ['test1', { array: true }, 'test2', { array: true }];
    const index = 1;
    const toTest = {
      test1: [
        {
          test2: [
            {
              testdeep: 'test',
            },
            {
              testdeep: 'test',
            },
          ],
          test3: 1,
        },
        {
          test2: [
            {
              testdeep: 'test',
            },
            {
              testdeep: 'test',
            },
          ],
          test3: 2,
        },
        {
          test2: [
            {
              testdeep: 'test',
            },
          ],
          test3: 3,
        },
      ], 
    };

    expect(utils.getLength({
      fullPath,
      index,
      variableToValidate: toTest,
    })).to.equal(3);
  });
  it('should return last array lengths', () => {
    const fullPath = ['test1', '1', 'test2', { array: true }];
    const index = 3;
    const toTest = {
      test1: [
        {
          test2: [
            {
              testdeep: 'test',
            },
            {
              testdeep: 'test',
            },
          ],
          test3: 1,
        },
        {
          test2: [
            {
              testdeep: 'test',
            },
            {
              testdeep: 'test',
            },
            {
              testdeep: 'test',
            },
          ],
          test3: 2,
        },
        {
          test2: [
            {
              testdeep: 'test',
            },
          ],
          test3: 3,
        },
      ], 
    };

    expect(utils.getLength({
      fullPath,
      index,
      variableToValidate: toTest,
    })).to.equal(3);
  });
  it('should return 1 when it can\'t find value', () => {
    const fullPath = ['test1', '1', 'test2', { array: true }];
    const index = 3;
    const toTest = {
      test1: [
        {
          test3: 1,
        },
        {
          test3: 2,
        },
        {
          test3: 3,
        },
      ], 
    };

    expect(utils.getLength({
      fullPath,
      index,
      variableToValidate: toTest,
    })).to.equal(1);
  });
  it('should return true, because array is a valid (string|number)[]', () => {
    const array1 = ['test1', 1, 'test2', 2];
    expect(utils.isStringOrNumberArray(array1)).to.equal(true);
    const array2 = [0, 1, 3, 2];
    expect(utils.isStringOrNumberArray(array2)).to.equal(true);
    const array3 = ['test1', 'test2'];
    expect(utils.isStringOrNumberArray(array3)).to.equal(true);
  });
});
