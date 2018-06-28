import * as chai from 'chai';
import { Schema } from '../src/entities/schema';
import { SchemaConfigEntry } from '../src/entities/schema-config-entry';

const expect = chai.expect;
describe('Config validation works', () => {
  it('should throw error setting type when valid_values is set', () => {
    const message = 'type and valid_values can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();

    schemaConfigEntry.validValues = [1, 2];

    const errorFunction = () => {
      schemaConfigEntry.type = 'string';
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error setting type when nested is set', () => {
    const message = 'type and nested can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();

    schemaConfigEntry.nested = {
      test: {
        type: 'string',
      },
    };

    const errorFunction = () => {
      schemaConfigEntry.type = 'string';
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting invalid type', () => {
    const message = 'type is invalid';

    const schemaConfigEntry = new SchemaConfigEntry();

    const errorFunction = () => {
      schemaConfigEntry.type = <any>'stirng';
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting invalid type with error message', () => {
    const message = 'type is invalid';

    const schemaConfigEntry = new SchemaConfigEntry();

    const errorFunction = () => {
      schemaConfigEntry.type = {
        value: <any>'stirng',
        message: {
          de: 'test',
        },
      };
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting invalid type with regExp', () => {
    const message = 'RegExp just can be tested on strings';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.regExp = /ab+c/i;

    const errorFunction = () => {
      schemaConfigEntry.type = 'number';
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set type and typeValue', () => {
    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.type = {
      value: 'string',
      message: 'error message',
    };

    expect(schemaConfigEntry.type).to.eql({
      value: 'string',
      message: 'error message',
    });
    expect(schemaConfigEntry.typeValue).to.equal('string');
  });
  it('should throw error when setting regExp with valid_values', () => {
    const message = 'RegExp pattern and valid_values can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.validValues = [1, 2];

    const errorFunction = () => {
      schemaConfigEntry.regExp = /ab+c/i;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting regExp with min', () => {
    const message = 'RegExp and length properties can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.min = 1;

    const errorFunction = () => {
      schemaConfigEntry.regExp = /ab+c/i;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting regExp with max', () => {
    const message = 'RegExp and length properties can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.max = 1;

    const errorFunction = () => {
      schemaConfigEntry.regExp = /ab+c/i;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting regExp with length properties', () => {
    const message = 'RegExp and length properties can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.min = 1;
    schemaConfigEntry.max = 1;

    const errorFunction = () => {
      schemaConfigEntry.regExp = /ab+c/i;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting regExp with nested property', () => {
    const message = 'RegExp and nested can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.nested = {
      test: {
        type: 'string',
      },
    };

    const errorFunction = () => {
      schemaConfigEntry.regExp = /ab+c/i;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting regExp with type property on number', () => {
    const message = 'RegExp just can be tested on strings';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.type = 'number';

    const errorFunction = () => {
      schemaConfigEntry.regExp = /ab+c/i;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting regExp with type property on number', () => {
    const message = 'RegExp pattern is invalid';

    const schemaConfigEntry = new SchemaConfigEntry();

    const errorFunction = () => {
      schemaConfigEntry.regExp = <any>'/ab+c/i';
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set regExp and regExpValue', () => {
    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.regExp = {
      value: /ab+c/i,
      message: 'error message',
    };

    expect(schemaConfigEntry.regExp).to.eql({
      value: /ab+c/i,
      message: 'error message',
    });
    expect(schemaConfigEntry.regExpValue).to.eql(/ab+c/i);
  });
  it('should throw error when setting validValues with type property', () => {
    const message = 'Valid_values and type can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.type = 'string';

    const errorFunction = () => {
      schemaConfigEntry.validValues = [1, 2];
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting validValues with regExp property', () => {
    const message = 'Valid_values and regExp pattern can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.regExp = /ab+c/i;

    const errorFunction = () => {
      schemaConfigEntry.validValues = [1, 2];
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting validValues with min property', () => {
    const message = 'Valid_values and length properties can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.min = 1;

    const errorFunction = () => {
      schemaConfigEntry.validValues = [1, 2];
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting validValues with max property', () => {
    const message = 'Valid_values and length properties can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.max = 2;

    const errorFunction = () => {
      schemaConfigEntry.validValues = [1, 2];
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting validValues with length properties', () => {
    const message = 'Valid_values and length properties can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.min = 1;
    schemaConfigEntry.max = 2;

    const errorFunction = () => {
      schemaConfigEntry.validValues = [1, 2];
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting validValues with nested property', () => {
    const message = 'Valid_values and nested can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.nested = {
      test: {
        type: 'string',
      },
    };

    const errorFunction = () => {
      schemaConfigEntry.validValues = [1, 2];
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting invalid validValues', () => {
    const message = 'valid_values is invalid';

    const schemaConfigEntry = new SchemaConfigEntry();

    const errorFunction = () => {
      schemaConfigEntry.validValues = <any>[1, 2, []];
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting invalid validValues with error message', () => {
    const message = 'valid_values is invalid';

    const schemaConfigEntry = new SchemaConfigEntry();

    const errorFunction = () => {
      schemaConfigEntry.validValues = {
        value: <any>[1, 2, []],
        message: 'error message',
      };
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set validValues and ValidValuesValue', () => {
    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.validValues = {
      value: [1, 2],
      message: 'error message',
    };

    expect(schemaConfigEntry.validValues).to.eql({
      value: [1, 2],
      message: 'error message',
    });
    expect(schemaConfigEntry.validValuesValue).to.eql([1, 2]);
  });
  it('should throw error when setting invalid required', () => {
    const message = 'required is invalid';

    const schemaConfigEntry = new SchemaConfigEntry();

    const errorFunction = () => {
      schemaConfigEntry.required = <any>1;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting invalid required', () => {
    const message = 'required is invalid';

    const schemaConfigEntry = new SchemaConfigEntry();

    const errorFunction = () => {
      schemaConfigEntry.required = {
        value: <any>1,
        message: 'error message',
      };
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set required and requiredValue', () => {
    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.required = {
      value: true,
      message: 'error message',
    };

    expect(schemaConfigEntry.required).to.eql({
      value: true,
      message: 'error message',
    });
    expect(schemaConfigEntry.requiredValue).to.eql(true);
  });
  it('should throw error when setting min with invalid type', () => {
    const message = 'Invalid type when usgin length properties';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.type = 'boolean';

    const errorFunction = () => {
      schemaConfigEntry.min = 1;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set min with valid type', () => {
    const message = 'Invalid type when usgin length properties';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.type = 'string';
    schemaConfigEntry.min = 1;

    expect(schemaConfigEntry.type).to.equal('string');
    expect(schemaConfigEntry.min).to.equal(1);
  });
  it('should throw error when setting min with regExp pattern', () => {
    const message = 'min and regExp pattern can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.regExp = /ab+c/i;

    const errorFunction = () => {
      schemaConfigEntry.min = 1;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting min with validValues', () => {
    const message = 'min and validValues can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.validValues = [1, 2];

    const errorFunction = () => {
      schemaConfigEntry.min = 1;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting min with nested', () => {
    const message = 'min and nested can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.nested = {
      test: {
        type: 'string',
      },
    };

    const errorFunction = () => {
      schemaConfigEntry.min = 1;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when min isn\'t a number', () => {
    const message = 'min needs to be numbers';

    const schemaConfigEntry = new SchemaConfigEntry();

    const errorFunction = () => {
      schemaConfigEntry.min = <any>'test';
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when min isn\'t a number', () => {
    const message = 'min needs to be numbers';

    const schemaConfigEntry = new SchemaConfigEntry();

    const errorFunction = () => {
      schemaConfigEntry.min = {
        value: <any>'test',
        message: 'error message',
      };
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when min is higher than max', () => {
    const message = 'min need to be lower than max';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.max = 1;

    const errorFunction = () => {
      schemaConfigEntry.min = 2;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set min and minValue', () => {
    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.min = {
      value: 1,
      message: 'error message',
    };

    expect(schemaConfigEntry.min).to.eql({
      value: 1,
      message: 'error message',
    });
    expect(schemaConfigEntry.minValue).to.eql(1);
  });
  it('should throw error when setting max with invalid type property', () => {
    const message = 'Invalid type when usgin length properties';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.type = 'boolean';

    const errorFunction = () => {
      schemaConfigEntry.max = 2;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set max with valid type property', () => {
    const message = 'Invalid type when usgin length properties';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.type = 'number';
    schemaConfigEntry.max = 2;

    expect(schemaConfigEntry.type).to.equal('number');
    expect(schemaConfigEntry.max).to.equal(2);
  });
  it('should throw error when setting max with regExp pattern', () => {
    const message = 'max and regExp pattern can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.regExp = /ab+c/i;

    const errorFunction = () => {
      schemaConfigEntry.max = 2;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting max with validValues', () => {
    const message = 'max and validValues can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.validValues = [1, 2];

    const errorFunction = () => {
      schemaConfigEntry.max = 2;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting max with validValues', () => {
    const message = 'max and nested can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.nested = {
      test: {
        type: 'string',
      },
    };

    const errorFunction = () => {
      schemaConfigEntry.max = 2;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting max with validValues', () => {
    const message = 'max and nested can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.nested = {
      test: {
        type: 'string',
      },
    };

    const errorFunction = () => {
      schemaConfigEntry.max = 2;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when min is higher than max', () => {
    const message = 'min need to be lower than max';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.min = 2;

    const errorFunction = () => {
      schemaConfigEntry.max = 1;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when max isn\'t a number', () => {
    const message = 'max needs to be numbers';

    const schemaConfigEntry = new SchemaConfigEntry();

    const errorFunction = () => {
      schemaConfigEntry.max = {
        value: <any>'test',
        message: 'error message',
      };
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set max and maxValue', () => {
    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.max = {
      value: 1,
      message: 'error message',
    };

    expect(schemaConfigEntry.max).to.eql({
      value: 1,
      message: 'error message',
    });
    expect(schemaConfigEntry.maxValue).to.eql(1);
  });
  it('should throw error when message isn\'t a valid string', () => {
    const message = 'message is not a valid message string or message object';

    const schemaConfigEntry = new SchemaConfigEntry();

    const errorFunction = () => {
      schemaConfigEntry.message = <any>true;
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when message isn\'t a valid string', () => {
    const message = 'message is not a valid message string or message object';

    const schemaConfigEntry = new SchemaConfigEntry();

    const errorFunction = () => {
      schemaConfigEntry.message = {
        de: <any>1,
        en: <any>2,
      };
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set message', () => {
    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.message = 'error message';

    expect(schemaConfigEntry.message).to.equal('error message');
  });
  it('should throw error when setting nested with type', () => {
    const message = 'nested and type can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.type = 'string';

    const errorFunction = () => {
      schemaConfigEntry.nested = {
        test: {
          type: 'string',
        },
      };
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting nested with regExp', () => {
    const message = 'nested and regExp pattern can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.regExp = /ab+c/i;

    const errorFunction = () => {
      schemaConfigEntry.nested = {
        test: {
          type: 'string',
        },
      };
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting nested with validValues', () => {
    const message = 'nested and validValues can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.validValues = [1, 2];

    const errorFunction = () => {
      schemaConfigEntry.nested = {
        test: {
          type: 'string',
        },
      };
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting nested with min', () => {
    const message = 'nested and length properties can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.min = 1;

    const errorFunction = () => {
      schemaConfigEntry.nested = {
        test: {
          type: 'string',
        },
      };
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting nested with max', () => {
    const message = 'nested and length properties can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.max = 1;

    const errorFunction = () => {
      schemaConfigEntry.nested = {
        test: {
          type: 'string',
        },
      };
    };

    expect(errorFunction).to.throw(message);
  });
  it('should throw error when setting nested with length properties', () => {
    const message = 'nested and length properties can\'t be set both';

    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.min = 1;
    schemaConfigEntry.max = 1;

    const errorFunction = () => {
      schemaConfigEntry.nested = {
        test: {
          type: 'string',
        },
      };
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set nested', () => {
    const schemaConfigEntry = new SchemaConfigEntry();
    schemaConfigEntry.nested = {
      test: {
        type: 'string',
      },
    };

    expect(schemaConfigEntry.nested).to.eql({
      test: {
        type: 'string',
      },
    });
  });
});
