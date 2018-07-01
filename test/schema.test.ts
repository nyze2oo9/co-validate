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
        path: ['test1'],
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
           path: ['test1'],
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
           path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1', 'test2'],
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
        path: ['test1'],
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
           path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
           path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
           path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
           path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
           path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
        path: ['test1'],
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
});

