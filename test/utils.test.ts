import * as chai from 'chai';
import { Utils } from '../src/entities/utils';
import { Options } from '../src/entities/options';
import { SchemaConfigEntry } from '../src/entities/schema-config-entry';

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
    const unresolvedfullPath = ['test1', { array: true }, 'test2', { array: true }];
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
      unresolvedfullPath,
      index,
      variableToValidate: toTest,
    })).to.equal(3);
  });
  it('should return last array lengths', () => {
    const unresolvedfullPath = ['test1', '1', 'test2', { array: true }];
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
      unresolvedfullPath,
      index,
      variableToValidate: toTest,
    })).to.equal(3);
  });
  it('should return 1 when it can\'t find value', () => {
    const unresolvedfullPath = ['test1', '1', 'test2', { array: true }];
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
      unresolvedfullPath,
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
  it('should return false, because array isn\'t a valid (string|number)[]', () => {
    const array = ['test1', { array : true }, 'test2', 2];
    expect(utils.isStringOrNumberArray(array)).to.equal(false);
  });
  it('should only copy the reference of the object and both object should contain the same type value', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.type = 'string';
    const newSchemaConfigEntry = schemaConfigEntry;
    newSchemaConfigEntry.type = 'number';
    expect(schemaConfigEntry.type).to.eql('number');
    expect(newSchemaConfigEntry.type).to.eql('number');
  });
  it('should return complete cloned schema config entry class with values only (type)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.unresolvedfullPath = ['test1', 'test2', 0];
    schemaConfigEntry.type = 'string';
    schemaConfigEntry.required = true;
    schemaConfigEntry.min = 4;
    schemaConfigEntry.max = 64;
    schemaConfigEntry.message = 'test message';

    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    expect(newSchemaConfigEntry.unresolvedfullPath).to.eql(['test1', 'test2', 0]);
    expect(newSchemaConfigEntry.type).to.eql('string');
    expect(newSchemaConfigEntry.required).to.eql(true);
    expect(newSchemaConfigEntry.min).to.eql(4);
    expect(newSchemaConfigEntry.max).to.eql(64);
    expect(newSchemaConfigEntry.message).to.eql('test message');
  });
  it('should return complete cloned schema config entry class with values only (regExp)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.unresolvedfullPath = ['test1', 'test2', 0];
    schemaConfigEntry.regExp = /ab/i;

    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    expect(newSchemaConfigEntry.unresolvedfullPath).to.eql(['test1', 'test2', 0]);
    expect(newSchemaConfigEntry.regExp).to.eql(/ab/i);
  });
  it('should return complete cloned schema config entry class with values only (validValues)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.unresolvedfullPath = ['test1', 'test2', 0];
    schemaConfigEntry.validValues = [1,2,3];

    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    expect(newSchemaConfigEntry.unresolvedfullPath).to.eql(['test1', 'test2', 0]);
    expect(newSchemaConfigEntry.validValues).to.eql([1,2,3]);
  });
  it('should return complete cloned schema config entry class with values only (nested)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.unresolvedfullPath = ['test1', 'test2', 0];
    schemaConfigEntry.nested = [
      {
        test1: {
          type: 'string',
        },
      },
    ];

    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    expect(newSchemaConfigEntry.unresolvedfullPath).to.eql(['test1', 'test2', 0]);
    expect(newSchemaConfigEntry.nested).to.eql([
      {
        test1: {
          type: 'string',
        },
      },
    ]);
  });
  it('should return complete cloned schema config entry class with simple value and mesages', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.unresolvedfullPath = ['test1', 'test2', 0];
    schemaConfigEntry.type = {
      value: 'string',
      message: 'test message',
    };
    schemaConfigEntry.required = {
      value: true,
      message: 'test message',
    };
    schemaConfigEntry.min = {
      value: 4,
      message: 'test message',
    };
    schemaConfigEntry.max = {
      value: 64,
      message: 'test message',
    };
    
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    expect(newSchemaConfigEntry.unresolvedfullPath).to.eql(['test1', 'test2', 0]);
    expect(newSchemaConfigEntry.type).to.eql({
      value: 'string',
      message: 'test message',
    });
    expect(newSchemaConfigEntry.required).to.eql({
      value: true,
      message: 'test message',
    });
    expect(newSchemaConfigEntry.min).to.eql({
      value: 4,
      message: 'test message',
    });
    expect(newSchemaConfigEntry.max).to.eql({
      value: 64,
      message: 'test message',
    });
  });
  it('should return complete cloned schema config entry class with simple value and mesages (regExp)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.unresolvedfullPath = ['test1', 'test2', 0];
    schemaConfigEntry.regExp = {
      value: /ab/i,
      message: 'test message',
    };

    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    expect(newSchemaConfigEntry.unresolvedfullPath).to.eql(['test1', 'test2', 0]);
    expect(newSchemaConfigEntry.regExp).to.eql({
      value: /ab/i,
      message: 'test message',
    });
  });
  it('should return complete cloned schema config entry class with simple value and mesages (validValues)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.unresolvedfullPath = ['test1', 'test2', 0];
    schemaConfigEntry.validValues = {
      value: [1,2,3],
      message: 'test message',
    };

    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    expect(newSchemaConfigEntry.unresolvedfullPath).to.eql(['test1', 'test2', 0]);
    expect(newSchemaConfigEntry.validValues).to.eql({
      value: [1,2,3],
      message: 'test message',
    });
  });
  it('should return complete cloned schema config entry class with complex value and mesages', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.unresolvedfullPath = ['test1', 'test2', 0];
    schemaConfigEntry.type = {
      value: 'string',
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    };
    schemaConfigEntry.required = {
      value: true,
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    };
    schemaConfigEntry.min = {
      value: 4,
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    };
    schemaConfigEntry.max = {
      value: 64,
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    };
    
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    expect(newSchemaConfigEntry.unresolvedfullPath).to.eql(['test1', 'test2', 0]);
    expect(newSchemaConfigEntry.type).to.eql({
      value: 'string',
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    });
    expect(newSchemaConfigEntry.required).to.eql({
      value: true,
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    });
    expect(newSchemaConfigEntry.min).to.eql({
      value: 4,
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    });
    expect(newSchemaConfigEntry.max).to.eql({
      value: 64,
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    });
  });
  it('should return complete cloned schema config entry class with complex value and mesages (regExp)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.unresolvedfullPath = ['test1', 'test2', 0];
    schemaConfigEntry.regExp = {
      value: /ab/i,
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    };

    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    expect(newSchemaConfigEntry.unresolvedfullPath).to.eql(['test1', 'test2', 0]);
    expect(newSchemaConfigEntry.regExp).to.eql({
      value: /ab/i,
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    });
  });
  it('should return complete cloned schema config entry class with complex value and mesages (validValues)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.unresolvedfullPath = ['test1', 'test2', 0];
    schemaConfigEntry.validValues = {
      value: [1,2,3],
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    };

    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    expect(newSchemaConfigEntry.unresolvedfullPath).to.eql(['test1', 'test2', 0]);
    expect(newSchemaConfigEntry.validValues).to.eql({
      value: [1,2,3],
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    });
  });
  it('should return cloned schema config entry class (property: type as a string)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.type = 'string';
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.type = 'number';
    expect(schemaConfigEntry.type).to.eql('string');
    expect(newSchemaConfigEntry.type).to.eql('number');
  });
  it('should return cloned schema config entry class (property: type as a type with normal error message)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.type = {
      value: 'string',
      message: 'first error message',
    };
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.type = {
      value: 'number',
      message: 'second error message',
    };
    expect(schemaConfigEntry.type).to.eql({
      value: 'string',
      message: 'first error message',
    });
    expect(newSchemaConfigEntry.type).to.eql({
      value: 'number',
      message: 'second error message',
    });
  });
  it('should return cloned schema config entry class (property: type as a type with multi error message)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.type = {
      value: 'string',
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    };
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.type = {
      value: 'number',
      message: {
        de: 'second german error message',
        en: 'second english error message',
      },
    };
    expect(schemaConfigEntry.type).to.eql({
      value: 'string',
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    });
    expect(newSchemaConfigEntry.type).to.eql({
      value: 'number',
      message: {
        de: 'second german error message',
        en: 'second english error message',
      },
    });
  });
  it('should return cloned schema config entry class (property: regExp as a regExp)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.regExp = /ab+c/i;
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.regExp = /ab/i;
    expect(schemaConfigEntry.regExp).to.eql(/ab+c/i);
    expect(newSchemaConfigEntry.regExp).to.eql(/ab/i);
  });
  it('should return cloned schema config entry class (property: regExp as a regExp with normal error message)',
     () => {
       const schemaConfigEntry = new SchemaConfigEntry(utils, {});
       schemaConfigEntry.regExp = {
         value: /ab+c/i,
         message: 'first error message',
       };
       const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
       newSchemaConfigEntry.regExp = {
         value: /ab/i,
         message: 'second error message',
       };
       expect(schemaConfigEntry.regExp).to.eql({
         value: /ab+c/i,
         message: 'first error message',
       });
       expect(newSchemaConfigEntry.regExp).to.eql({
         value: /ab/i,
         message: 'second error message',
       });
     });
  it('should return cloned schema config entry class (property: regExp as a regExp with multi error message)',
     () => {
       const schemaConfigEntry = new SchemaConfigEntry(utils, {});
       schemaConfigEntry.regExp = {
         value: /ab+c/i,
         message: {
           de: 'first german error message',
           en: 'first english error message',
         },
       };
       const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
       newSchemaConfigEntry.regExp = {
         value: /ab/i,
         message: {
           de: 'second german error message',
           en: 'second english error message',
         },
       };
       expect(schemaConfigEntry.regExp).to.eql({
         value: /ab+c/i,
         message: {
           de: 'first german error message',
           en: 'first english error message',
         },
       });
       expect(newSchemaConfigEntry.regExp).to.eql({
         value: /ab/i,
         message: {
           de: 'second german error message',
           en: 'second english error message',
         },
       });
     });
  it('should return cloned schema config entry class (property: validValues as a string)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.validValues = [1,2];
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.validValues = [3,4];
    expect(schemaConfigEntry.validValues).to.eql([1,2]);
    expect(newSchemaConfigEntry.validValues).to.eql([3,4]);
  });
  it('should return cloned schema config entry (property: validValues as a validValues with normal error message)',
     () => {
       const schemaConfigEntry = new SchemaConfigEntry(utils, {});
       schemaConfigEntry.validValues = {
         value: [1,2],
         message: 'first error message',
       };
       const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
       newSchemaConfigEntry.validValues = {
         value: [3,4],
         message: 'second error message',
       };
       expect(schemaConfigEntry.validValues).to.eql({
         value: [1,2],
         message: 'first error message',
       });
       expect(newSchemaConfigEntry.validValues).to.eql({
         value: [3,4],
         message: 'second error message',
       });
     });
  it('should return cloned schema config entry (property: validValues as a validValues with multi error message)',
     () => {
       const schemaConfigEntry = new SchemaConfigEntry(utils, {});
       schemaConfigEntry.validValues = {
         value: [1,2],
         message: {
           de: 'first german error message',
           en: 'first english error message',
         },
       };
       const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
       newSchemaConfigEntry.validValues = {
         value: [3,4],
         message: {
           de: 'second german error message',
           en: 'second english error message',
         },
       };
       expect(schemaConfigEntry.validValues).to.eql({
         value: [1,2],
         message: {
           de: 'first german error message',
           en: 'first english error message',
         },
       });
       expect(newSchemaConfigEntry.validValues).to.eql({
         value: [3,4],
         message: {
           de: 'second german error message',
           en: 'second english error message',
         },
       });
     });
  it('should return cloned schema config entry class (property: required as a string)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.required = true;
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.required = false;
    expect(schemaConfigEntry.required).to.eql(true);
    expect(newSchemaConfigEntry.required).to.eql(false);
  });
  it('should return cloned schema config entry class (property: required as a required with normal error message)',
     () => {
       const schemaConfigEntry = new SchemaConfigEntry(utils, {});
       schemaConfigEntry.required = {
         value: true,
         message: 'first error message',
       };
       const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
       newSchemaConfigEntry.required = {
         value: false,
         message: 'second error message',
       };
       expect(schemaConfigEntry.required).to.eql({
         value: true,
         message: 'first error message',
       });
       expect(newSchemaConfigEntry.required).to.eql({
         value: false,
         message: 'second error message',
       });
     });
  it('should return cloned schema config entry class (property: required as a required with multi error message)',
     () => {
       const schemaConfigEntry = new SchemaConfigEntry(utils, {});
       schemaConfigEntry.required = {
         value: true,
         message: {
           de: 'first german error message',
           en: 'first english error message',
         },
       };
       const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
       newSchemaConfigEntry.required = {
         value: false,
         message: {
           de: 'second german error message',
           en: 'second english error message',
         },
       };
       expect(schemaConfigEntry.required).to.eql({
         value: true,
         message: {
           de: 'first german error message',
           en: 'first english error message',
         },
       });
       expect(newSchemaConfigEntry.required).to.eql({
         value: false,
         message: {
           de: 'second german error message',
           en: 'second english error message',
         },
       });
     });
  it('should return cloned schema config entry class (property: min as a number)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.min = 1;
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.min = 2;
    expect(schemaConfigEntry.min).to.eql(1);
    expect(newSchemaConfigEntry.min).to.eql(2);
  });
  it('should return cloned schema config entry class (property: min as a min with normal error message)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.min = {
      value: 1,
      message: 'first error message',
    };
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.min = {
      value: 2,
      message: 'second error message',
    };
    expect(schemaConfigEntry.min).to.eql({
      value: 1,
      message: 'first error message',
    });
    expect(newSchemaConfigEntry.min).to.eql({
      value: 2,
      message: 'second error message',
    });
  });
  it('should return cloned schema config entry class (property: min as a min with multi error message)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.min = {
      value: 1,
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    };
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.min = {
      value: 2,
      message: {
        de: 'second german error message',
        en: 'second english error message',
      },
    };
    expect(schemaConfigEntry.min).to.eql({
      value: 1,
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    });
    expect(newSchemaConfigEntry.min).to.eql({
      value: 2,
      message: {
        de: 'second german error message',
        en: 'second english error message',
      },
    });
  });
  it('should return cloned schema config entry class (property: max as a number)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.max = 1;
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.max = 2;
    expect(schemaConfigEntry.max).to.eql(1);
    expect(newSchemaConfigEntry.max).to.eql(2);
  });
  it('should return cloned schema config entry class (property: max as a max with normal error message)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.max = {
      value: 1,
      message: 'first error message',
    };
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.max = {
      value: 2,
      message: 'second error message',
    };
    expect(schemaConfigEntry.max).to.eql({
      value: 1,
      message: 'first error message',
    });
    expect(newSchemaConfigEntry.max).to.eql({
      value: 2,
      message: 'second error message',
    });
  });
  it('should return cloned schema config entry class (property: max as a max with multi error message)', () => {
    const schemaConfigEntry = new SchemaConfigEntry(utils, {});
    schemaConfigEntry.max = {
      value: 1,
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    };
    const newSchemaConfigEntry = utils.cloneSchemaConfigEntryInstance(schemaConfigEntry);
    newSchemaConfigEntry.max = {
      value: 2,
      message: {
        de: 'second german error message',
        en: 'second english error message',
      },
    };
    expect(schemaConfigEntry.max).to.eql({
      value: 1,
      message: {
        de: 'first german error message',
        en: 'first english error message',
      },
    });
    expect(newSchemaConfigEntry.max).to.eql({
      value: 2,
      message: {
        de: 'second german error message',
        en: 'second english error message',
      },
    });
  });
});
