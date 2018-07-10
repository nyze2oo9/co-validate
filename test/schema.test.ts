import { expect } from 'chai';
import { Schema } from '../src/entities/schema';
import { ISchemaConfigEntry, ISchemaConfig } from '../src/interfaces/schema';
import { IOptions } from '../src/interfaces/options';

describe('Validation works', () => {
  it('should iterate nested object with depth first strategy', () => {
    const testSchema = new Schema({
      test1: {
        nested: {
          test2: {
            nested: {
              test3: {
                type: 'string',
              },
            },
          },
        },
      },
      test4: {
        type: 'string',
      },
      test5: {
        type: 'string',
      },
    });

    const keys: string[] = [];
    const pushKeysToArray = (key: string, value: ISchemaConfigEntry, fullPath: string[]) => {
      keys.push(key);
    };

    // cast to any to test private class methods
    (<any>testSchema).iterateObject(pushKeysToArray);

    expect(keys).to.eql(['test1', 'test2', 'test3', 'test4', 'test5']);
  });
  it('should return error message because value is not machting the type', () => {
    const testSchema = new Schema({
      test1: {
        type: 'string',
        message: 'error message',
      },
    });
    testSchema.validate({ test1: 1 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'error message', 
      }]);
  });
  it('should return fallback error message because valie is not machting type and there is no message specified', 
     () => {
       const testSchema = new Schema({
         test1: {
           type: 'string',
         },
       });
       testSchema.validate({ test1: 1 });
       expect(testSchema.validationErrorMessages).to.eql([
         { 
           fullPath: ['test1'],
           message: 'something went wrong', 
         }]);
     });
  it('should return error message because value is not maching the type. Error message should come from type object',
     () => {
       const testSchema = new Schema({
         test1: {
           type: {
             value: 'string',
             message: 'error message',
           },
         },
       });
       testSchema.validate({ test1: 1 });
       expect(testSchema.validationErrorMessages).to.eql([
         { 
           fullPath: ['test1'],
           message: 'error message', 
         }]);
     });
  it('should return german error message from type object, because value is not matching type', () => {
    const schema: ISchemaConfig = {
      test1: {
        type: {
          value: 'string',
          message: {
            de: 'german error message',
            en: 'english error message',
          },
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'de',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 1 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'german error message', 
      }]);
  });
  it('should return english error message from type object, because value is not matching type', () => {
    const schema: ISchemaConfig = {
      test1: {
        type: {
          value: 'string',
          message: {
            de: 'german error message',
            en: 'english error message',
          },
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'en',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 1 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'english error message', 
      }]);
  });
  it('should return german error message from message property, because value is not matching type', () => {
    const schema: ISchemaConfig = {
      test1: {
        type: 'string',
        message: {
          de: 'german error message',
          en: 'english error message',
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'de',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 1 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'german error message', 
      }]);
  });
  it('should return english error message from message property, becuse value is not matching type', () => {
    const schema: ISchemaConfig = {
      test1: {
        type: 'string',
        message: {
          de: 'german error message',
          en: 'english error message',
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'en',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 1 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'english error message', 
      }]);
  });
  it('should return error message from nested property', () => {
    const schema: ISchemaConfig = {
      test1: {
        nested: {
          test2: {
            type: {
              value: 'string',
              message: 'error message',
            },
          },
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'en',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: { test2 : 1 } });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1', 'test2'],
        message: 'error message',
      }]);
  });
  it('shouldn\'t return error messages because type is valid', () => {
    const testSchema = new Schema({
      test1: {
        type: 'string',
        message: 'error message',
      },
    });
    testSchema.validate({ test1: 'test' });
    expect(testSchema.validationErrorMessages).to.eql([]);
  });
  it('should return error message because value is not matchin regexp', () => {
    const testSchema = new Schema({
      test1: {
        reg_exp: /ab+c/i,
        message: 'error message',
      },
    });
    testSchema.validate({ test1: 'abd' });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'error message', 
      }]);
  });
  it('should return fallback error message because value is not matching regExp and there is no message specified', 
     () => {
       const testSchema = new Schema({
         test1: {
           reg_exp: /ab+c/i,
         },
       });
       testSchema.validate({ test1: 'abd' });
       expect(testSchema.validationErrorMessages).to.eql([
         { 
           fullPath: ['test1'],
           message: 'something went wrong', 
         }]);
     });
  it('should return error message from regExp object, because value is not matching regExp', () => {
    const testSchema = new Schema({
      test1: {
        reg_exp: {
          value: /ab+c/i,
          message: 'error message',
        },
      },
    });
    testSchema.validate({ test1: 'abd' });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'error message', 
      }]);
  });
  it('should return german error message from RegExp object, because value is not matching regExp', () => {
    const schema: ISchemaConfig = {
      test1: {
        reg_exp: {
          value: /ab+c/i,
          message: {
            de: 'german error message',
            en: 'english error message',
          },
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'de',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 'abd' });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'german error message', 
      }]);
  });
  it('should return german error message from message property, because value is not matching regExp', () => {
    const schema: ISchemaConfig = {
      test1: {
        reg_exp: /ab+c/i,
        message: {
          de: 'german error message',
          en: 'english error message',
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'de',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 'abd' });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'german error message', 
      }]);
  });
  it('shouldn\'t return error messages because value is matching regExp', () => {
    const testSchema = new Schema({
      test1: {
        reg_exp: /ab+c/i,
        message: 'error message',
      },
    });
    testSchema.validate({ test1: 'abc' });
    expect(testSchema.validationErrorMessages).to.eql([]);
  });
  it('should return error message, because value is not in validValues', () => {
    const testSchema = new Schema({
      test1: {
        valid_values: [1,2,3],
        message: 'error message',
      },
    });
    testSchema.validate({ test1: 4 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'error message', 
      }]);
  });
  it('should return fallback error message because value is not in validValues and there is no message specified', 
     () => {
       const testSchema = new Schema({
         test1: {
           valid_values: [1,2,3],
         },
       });
       testSchema.validate({ test1: 4 });
       expect(testSchema.validationErrorMessages).to.eql([
         { 
           fullPath: ['test1'],
           message: 'something went wrong', 
         }]);
     });
  it('should return error message from validValues object, because value is not in validValues', () => {
    const testSchema = new Schema({
      test1: {
        valid_values: {
          value: [1,2,3],
          message: 'error message',
        },
      },
    });
    testSchema.validate({ test1: 4 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'error message', 
      }]);
  });
  it('should return german error message from validValues object, because value is not in validValues', () => {
    const schema: ISchemaConfig = {
      test1: {
        valid_values: {
          value: [1,2,3],
          message: {
            de: 'german error message',
            en: 'english error message',
          },
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'de',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 4 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'german error message', 
      }]);
  });
  it('should return german error message from message property, because value is not in validValues', () => {
    const schema: ISchemaConfig = {
      test1: {
        valid_values: [1,2,3],
        message: {
          de: 'german error message',
          en: 'english error message',
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'de',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 4 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'german error message', 
      }]);
  });
  it('shouldn\'t return error messages because value is incluced by validValues', () => {
    const testSchema = new Schema({
      test1: {
        valid_values: [1,2,3],
        message: 'error message',
      },
    });
    testSchema.validate({ test1: 1 });
    expect(testSchema.validationErrorMessages).to.eql([]);
  });
  it('should return error message, because value is required and not set', () => {
    const testSchema = new Schema({
      test1: {
        required: true,
        message: 'error message',
      },
    });
    testSchema.validate({ test1: undefined });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'error message', 
      }]);
  });
  it('should return fallback error message, because value is required and not set and there is no message specified', 
     () => {
       const testSchema = new Schema({
         test1: {
           required: true,
         },
       });
       testSchema.validate({ test1: undefined });
       expect(testSchema.validationErrorMessages).to.eql([
         { 
           fullPath: ['test1'],
           message: 'something went wrong', 
         }]);
     });
  it('should return error message from required object, because value is required and not set', () => {
    const testSchema = new Schema({
      test1: {
        required: {
          value: true,
          message: 'error message',
        },
      },
    });
    testSchema.validate({ test1: undefined });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'error message', 
      }]);
  });
  it('should return german error message from required object, because value is required and not set', () => {
    const schema: ISchemaConfig = {
      test1: {
        required: {
          value: true,
          message: {
            de: 'german error message',
            en: 'english error message',
          },
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'de',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: undefined });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'german error message', 
      }]);
  });
  it('should return german error message from message property, because value is required and not set', () => {
    const schema: ISchemaConfig = {
      test1: {
        required: true,
        message: {
          de: 'german error message',
          en: 'english error message',
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'de',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: undefined });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'german error message', 
      }]);
  });
  it('shouldn\'t return error messages because value is required and set', () => {
    const testSchema = new Schema({
      test1: {
        required: true,
        message: 'error message',
      },
    });
    testSchema.validate({ test1: 1 });
    expect(testSchema.validationErrorMessages).to.eql([]);
  });
  it('should return error message, because value is lower than min', () => {
    const testSchema = new Schema({
      test1: {
        min: 2,
        message: 'error message',
      },
    });
    testSchema.validate({ test1: 1 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'error message', 
      }]);
  });
  it('should return fallback error message because value is lower than min and there is no message specified', 
     () => {
       const testSchema = new Schema({
         test1: {
           min: 2,
         },
       });
       testSchema.validate({ test1: 1 });
       expect(testSchema.validationErrorMessages).to.eql([
         { 
           fullPath: ['test1'],
           message: 'something went wrong', 
         }]);
     });
  it('should return error message from min object, because value is lower than min', () => {
    const testSchema = new Schema({
      test1: {
        min: {
          value: 2,
          message: 'error message',
        },
      },
    });
    testSchema.validate({ test1: 1 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'error message', 
      }]);
  });
  it('should return german error message from min object, because value is lower than min', () => {
    const schema: ISchemaConfig = {
      test1: {
        min: {
          value: 2,
          message: {
            de: 'german error message',
            en: 'english error message',
          },
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'de',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 1 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'german error message', 
      }]);
  });
  it('should return german error message from message property, because value is lower than min', () => {
    const schema: ISchemaConfig = {
      test1: {
        min: 2,
        message: {
          de: 'german error message',
          en: 'english error message',
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'de',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 1 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'german error message', 
      }]);
  });
  it('shouldn\'t return error messages, because value is higher then min', () => {
    const testSchema = new Schema({
      test1: {
        min: 2,
        message: 'error message',
      },
    });
    testSchema.validate({ test1: 3 });
    expect(testSchema.validationErrorMessages).to.eql([]);
  });
  it('should return error message, because value is higher then max', () => {
    const testSchema = new Schema({
      test1: {
        max: 2,
        message: 'error message',
      },
    });
    testSchema.validate({ test1: 3 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'error message', 
      }]);
  });
  it('should return fallback error message because value is higher than max and there is no message specified', 
     () => {
       const testSchema = new Schema({
         test1: {
           max: 2,
         },
       });
       testSchema.validate({ test1: 3 });
       expect(testSchema.validationErrorMessages).to.eql([
         { 
           fullPath: ['test1'],
           message: 'something went wrong', 
         }]);
     });
  it('should return error message from max object, because value is higher then max', () => {
    const testSchema = new Schema({
      test1: {
        max: {
          value: 2,
          message: 'error message',
        },
      },
    });
    testSchema.validate({ test1: 3 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'error message', 
      }]);
  });
  it('should return german error message from max object, because value is higher then max', () => {
    const schema: ISchemaConfig = {
      test1: {
        max: {
          value: 2,
          message: {
            de: 'german error message',
            en: 'english error message',
          },
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'de',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 3 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'german error message', 
      }]);
  });
  it('should return german error message from message property, because value is higher then max', () => {
    const schema: ISchemaConfig = {
      test1: {
        max: 2,
        message: {
          de: 'german error message',
          en: 'english error message',
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'de',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 3 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'german error message', 
      }]);
  });
  it('shouldn\'t return error messages, because value is lower then max', () => {
    const testSchema = new Schema({
      test1: {
        max: 2,
        message: 'error message',
      },
    });
    testSchema.validate({ test1: 1 });
    expect(testSchema.validationErrorMessages).to.eql([]);
  });
  it('shouldn\'t return error messages, because all objects in the array are valid', () => {
    const testSchema = new Schema({
      test1: {
        nested: [
          {
            test2: {
              nested: [
                {
                  testdeep: {
                    type: 'string',
                  },
                },
              ],
            },
            test3: {
              type: 'number',
            },
          },
        ],
      },
    });

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
            {
              testdeep: 'test',
            },
          ],
          test3: 3,
        },
      ], 
    };

    testSchema.validate(toTest);
    expect(testSchema.validationErrorMessages).to.eql([]);
  });
  it('should return error message, because second object in the array isn\'t valid', () => {
    const testSchema = new Schema({
      test1: {
        nested: [
          {
            test2: {
              nested: [
                {
                  testdeep: {
                    type: 'string',
                  },
                },
              ],
            },
            test3: {
              type: 'number',
            },
          },
        ],
      },
    });

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
              testdeep: 2,
            },
          ],
          test3: 2,
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
          test3: 3,
        },
      ], 
    };

    testSchema.validate(toTest);
    expect(testSchema.validationErrorMessages).to.eql([{
      fullPath: ['test1', '1', 'test2', '1', 'testdeep'],
      message: 'something went wrong',
    }]);
  });
  it('should distinguish between arrays and objects also with key 0', () => {
    const testSchema = new Schema({
      test1: {
        nested: [
          {
            test2: {
              nested: [
                {
                  testdeep: {
                    type: 'string',
                  },
                },
              ],
            },
            test3: {
              nested: {
                0: {
                  type: 'string',
                },
              },
            },
          },
        ],
      },
    });

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
          test3: {
            0: 'test',
          },
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
          test3: {
            0: 'test',
          },
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
          test3: {
            0: 'test',
          },
        },
      ], 
    };

    testSchema.validate(toTest);
    expect(testSchema.validationErrorMessages).to.eql([]);
  });
  it('it should be fine, that properties are not set that are not required', () => {
    const testSchema = new Schema({
      test1: {
        nested: [
          {
            test2: {
              nested: [
                {
                  notneeded1: {
                    type: 'string',
                  },
                  notneeded2: {
                    type: 'string',
                  },
                },
              ],
            },
            test3: {
              type: 'string',
              required: true,
            },
          },
        ],
      },
    });

    const toTest = {
      test1: [
        {
          test3: 'test',
        },
      ], 
    };

    testSchema.validate(toTest);
    expect(testSchema.validationErrorMessages).to.eql([]);
  });
  it('it shouldn\'t be fine, that properties are not set that are required', () => {
    const testSchema = new Schema({
      test1: {
        nested: [
          {
            test2: {
              nested: [
                {
                  notneeded1: {
                    type: 'string',
                  },
                  notneeded2: {
                    type: 'string',
                  },
                },
              ],
            },
            test3: {
              type: 'string',
              required: true,
            },
          },
        ],
      },
    });

    const toTest = {
      test1: [
        {
          test2: [
            {
              notneeded1: 'test',
              notneeded2: 'test',
            },
          ],
        },
      ], 
    };

    testSchema.validate(toTest);
    expect(testSchema.validationErrorMessages).to.eql([{
      fullPath: ['test1', '0', 'test3'],
      message: 'something went wrong',
    }]);
  });
  it('it shouldn\'t be fine, that properties are not set that are required in arrays', () => {
    const testSchema = new Schema({
      test1: {
        nested: [
          {
            test2: {
              nested: [
                {
                  needed: {
                    type: 'string',
                    required: true,
                  },
                  notneeded: {
                    type: 'string',
                  },
                },
              ],
            },
            test3: {
              type: 'string',
            },
          },
        ],
      },
    });

    const toTest = {
      test1: [
        {
          test3: 'test',
        },
      ], 
    };

    testSchema.validate(toTest);
    expect(testSchema.validationErrorMessages).to.eql([{
      fullPath: ['test1', '0', 'test2', '0', 'needed'],
      message: 'something went wrong',
    }]);
  });
  it('it should be fine, that properties are not set that are not required in arrays', () => {
    const testSchema = new Schema({
      test1: {
        nested: [
          {
            test2: {
              nested: [
                {
                  needed: {
                    type: 'string',
                    required: true,
                  },
                  notneeded: {
                    type: 'string',
                  },
                },
              ],
            },
            test3: {
              type: 'string',
            },
          },
        ],
      },
    });

    const toTest = {
      test1: [
        {
          test2: [
            {
              needed: 'test',
            },
            {
              notneeded: 'test',
              needed: 'test',
            },
          ],
        },
      ], 
    };

    testSchema.validate(toTest);
    expect(testSchema.validationErrorMessages).to.eql([]);
  });
  it('it should be fine, that properties are not set that are not required in arrays', () => {
    const message = 'schemaConfig needs to be an object';

    const errorFunction = () => {
      const testSchema = new Schema(<any>true);
    };

    expect(errorFunction).to.throw(message);
  });
  it('should return fallback error message, when there is no matching property in the message object', () => {
    const schema: ISchemaConfig = {
      test1: {
        type: 'string',
        message: {
          de: 'german error message',
          en: 'english error message',
        },
      },
    };

    const options: IOptions =  {
      countryCode: 'dee',
    };

    const testSchema = new Schema(schema, options);
    testSchema.validate({ test1: 3 });
    expect(testSchema.validationErrorMessages).to.eql([
      { 
        fullPath: ['test1'],
        message: 'something went wrong', 
      }]);
  });
});

