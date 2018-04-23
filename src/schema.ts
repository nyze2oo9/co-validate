import { ISchemaConfig, ISchemaConfigEntry } from './interfaces/schema';
import { IOptions } from './interfaces/options';
import { IErrors } from './interfaces/errors';

export class Schema {
  private schemaConfig: ISchemaConfig;
  private options: IOptions | undefined;

  private parsedResult: any;
  private errors: IErrors;

  constructor(schemaConfig: ISchemaConfig, options?: IOptions) {
    this.schemaConfig = schemaConfig;
    this.options = options;
  }

  validate(variableToValidate: any) {
    return this;
  }

  parse() {
    return this;
  }

  getResults() {

  }


  private iterateObject(func: (key: string, value: ISchemaConfigEntry) => void) {
    let schemaConfigKeys = Object.entries(this.schemaConfig);
    while (schemaConfigKeys.length) {
      const [currentKey, currentValue] = <[string, ISchemaConfigEntry]>schemaConfigKeys.shift();
      func(currentKey, currentValue);
      const nested = currentValue.nested;
      if (typeof nested !== 'undefined') {
        schemaConfigKeys = Object.entries(nested).concat(schemaConfigKeys);
      }
    }
  }
}
