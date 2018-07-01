import { ISchemaConfig, ISchemaConfigEntry, ISchemaConfigValidated, ValidValues, Type, SchemaConfigEntries, addNestedToSchemaConfigEntriesWithIndexParams } from './../interfaces/schema';
import { IOptions } from './../interfaces/options';
import { IError } from './../interfaces/errors';
import { SchemaConfigEntry } from './schema-config-entry';
import { DEFAULT_OPTIONS } from './../constants/default';
import { Utils } from './utils';
import { Options } from './options';

export class Schema {
  private schemaConfig: ISchemaConfig;
  private schemaConfigValidated: SchemaConfigEntry[];
  // private parsedResult: any;
  private utils: Utils;

  validationErrorMessages: IError[];

  constructor(schemaConfig: ISchemaConfig, options: IOptions = DEFAULT_OPTIONS) {
    this.schemaConfig = schemaConfig;
    const optionsClass = new Options(options);
    this.utils = new Utils(optionsClass);
    this.schemaConfigValidated = [];
    this.validationErrorMessages = [];
    this.validateSchemaConfig(schemaConfig);
  }

  private validateSchemaConfig(schemaConfig: ISchemaConfig) {
    if (!this.utils.isPlainObject(schemaConfig)) {
      throw new Error('schemaConfig needs to be an object');
    }
    this.iterateObject(this.validateSchemaConfigEntry.bind(this));
  }

  private validateSchemaConfigEntry(key: string, schemaConfigEntry: ISchemaConfigEntry, fullPath: string[]) {
    const schemaConfigEntryValidated = new SchemaConfigEntry(this.utils);
    schemaConfigEntryValidated.fullPath = fullPath;
    schemaConfigEntryValidated.type = schemaConfigEntry.type;
    schemaConfigEntryValidated.regExp = schemaConfigEntry.reg_exp;
    schemaConfigEntryValidated.validValues = schemaConfigEntry.valid_values;
    schemaConfigEntryValidated.required = schemaConfigEntry.required;
    schemaConfigEntryValidated.min = schemaConfigEntry.min;
    schemaConfigEntryValidated.max = schemaConfigEntry.max;
    schemaConfigEntryValidated.nested = schemaConfigEntry.nested;
    schemaConfigEntryValidated.message = schemaConfigEntry.message;
    this.schemaConfigValidated.push(schemaConfigEntryValidated);
  }

  private validateType(schemaConfigEntry: SchemaConfigEntry, parameter: any) {
    if (schemaConfigEntry.typeValue !== undefined) {
      if (!this.utils.checkType(schemaConfigEntry.typeValue, parameter)) {
        this.validationErrorMessages.push({ 
          path: schemaConfigEntry.fullPath,
          message: schemaConfigEntry.getErrorMessage(schemaConfigEntry.type) });
      }
    }
  }

  private validateRegExp(schemaConfigEntry: SchemaConfigEntry, parameter: any) {
    if (schemaConfigEntry.regExpValue !== undefined) {
      if (!this.utils.checkRegExp(schemaConfigEntry.regExpValue, parameter)) {
        this.validationErrorMessages.push({ 
          path: schemaConfigEntry.fullPath,
          message: schemaConfigEntry.getErrorMessage(schemaConfigEntry.regExp) });
      }
    }
  }

  private validateValidValues(schemaConfigEntry: SchemaConfigEntry, parameter: any) {
    if (schemaConfigEntry.validValuesValue !== undefined) {
      if (!this.utils.checkValidValue(schemaConfigEntry.validValuesValue, parameter)) {
        this.validationErrorMessages.push({ 
          path: schemaConfigEntry.fullPath,
          message: schemaConfigEntry.getErrorMessage(schemaConfigEntry.validValues) });
      }
    }
  }

  private validateRequired(schemaConfigEntry: SchemaConfigEntry, parameter: any) {
    if (schemaConfigEntry.requiredValue !== undefined) {
      if (!this.utils.checkRequired(schemaConfigEntry.requiredValue, parameter)) {
        this.validationErrorMessages.push({ 
          path: schemaConfigEntry.fullPath,
          message: schemaConfigEntry.getErrorMessage(schemaConfigEntry.required) });
      }
    }
  }

  private validateMin(schemaConfigEntry: SchemaConfigEntry, parameter: any) {
    if (schemaConfigEntry.minValue !== undefined) {
      if (!this.utils.checkLengthProperty({ min: schemaConfigEntry.minValue }, parameter)) {
        this.validationErrorMessages.push({ 
          path: schemaConfigEntry.fullPath,
          message: schemaConfigEntry.getErrorMessage(schemaConfigEntry.min) });
      }
    }
  }

  private validateMax(schemaConfigEntry: SchemaConfigEntry, parameter: any) {
    if (schemaConfigEntry.maxValue !== undefined) {
      if (!this.utils.checkLengthProperty({ max : schemaConfigEntry.maxValue }, parameter)) {
        this.validationErrorMessages.push({ 
          path: schemaConfigEntry.fullPath,
          message: schemaConfigEntry.getErrorMessage(schemaConfigEntry.max) });
      }
    }
  }

  validate(variableToValidate: any) {
    for (const schemaConfigEntry of this.schemaConfigValidated) {
      const currentValue = this.utils.getValue(schemaConfigEntry.fullPath, variableToValidate);
      this.validateType(schemaConfigEntry, currentValue);
      this.validateRegExp(schemaConfigEntry, currentValue);
      this.validateValidValues(schemaConfigEntry, currentValue);
      this.validateRequired(schemaConfigEntry, currentValue);
      this.validateMin(schemaConfigEntry, currentValue);
      this.validateMax(schemaConfigEntry, currentValue);
    }
    return this;
  }

  private iterateObject(func: (key: string, value: ISchemaConfigEntry, fullPath: string[]) => void) {
    let currentPath : string[] = [];
    let currentIndex = 0;
    const schemaConfigEntries = Object.entries(this.schemaConfig);
    let schemaConfigEntriesWithIndex = this.pushIndexInSchemaConfigEntry(schemaConfigEntries, currentIndex);
    while (schemaConfigEntriesWithIndex.length) {
      schemaConfigEntriesWithIndex = this.pushIndexInSchemaConfigEntry(schemaConfigEntriesWithIndex, currentIndex);
      const currentSchemaConfigEntry = schemaConfigEntriesWithIndex.shift();
      if (currentSchemaConfigEntry !== undefined) {
        const [currentKey, currentValue] = currentSchemaConfigEntry;
        currentIndex = currentSchemaConfigEntry[2];
        currentPath = this.updateCurrentPath(currentPath, currentIndex, currentKey);
        func(currentKey, currentValue, currentPath.slice());
        if (typeof currentValue.nested !== 'undefined') {
          currentIndex += 1;
          schemaConfigEntriesWithIndex = this.addNestedToSchemaConfigEntriesWithIndex({
            schemaConfigEntriesWithIndex,
            nested: currentValue.nested,
            index: currentIndex,
          });
        }
      }
    }
  }

  private addNestedToSchemaConfigEntriesWithIndex(params: addNestedToSchemaConfigEntriesWithIndexParams):
   SchemaConfigEntries {
    const { nested, index, schemaConfigEntriesWithIndex } = params;
    const nestedEntries = Object.entries(nested);
    const nestedWithIndex = this.pushIndexInSchemaConfigEntry(nestedEntries, index);
    return nestedWithIndex.concat(schemaConfigEntriesWithIndex);
  }

  private updateCurrentPath(path: string[], index: number, key: string): string[] {
    path[index] = key;
    return path.slice(0, index + 1);

  }

  private pushIndexInSchemaConfigEntry(schemaConfigEntries: any, index: number): SchemaConfigEntries {
    for (const schemaConfigKey of schemaConfigEntries) {
      if (schemaConfigKey[2] === undefined) {
        schemaConfigKey[2] = index;
      }
    }
    return schemaConfigEntries;
  }
}
