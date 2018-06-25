import { expect } from 'chai';
import { Schema } from '../src/entities/schema';
import { ISchemaConfigEntry } from '../src/interfaces/schema';

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
});

