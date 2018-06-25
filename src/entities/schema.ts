import { ISchemaConfig, ISchemaConfigEntry, ISchemaConfigValidated } from './../interfaces/schema';
import { IOptions } from './../interfaces/options';
import { IErrors } from './../interfaces/errors';
import { SchemaConfigEntry } from './schema-config-entry';
import { DEFAULT_OPTIONS } from './../constants/default';
import { Utils } from './utils';
import { Options } from './options';

export class Schema {
  private schemaConfig: ISchemaConfig;
  private schemaConfigValidated: SchemaConfigEntry[];

  private parsedResult: any;
  private errors: IErrors;

  private utils: Utils;

  constructor(schemaConfig: ISchemaConfig, options: IOptions = DEFAULT_OPTIONS) {
    this.schemaConfig = schemaConfig;
    const optionsClass = new Options(options);
    this.utils = new Utils(optionsClass);
    this.schemaConfigValidated = new Array<SchemaConfigEntry>();
    this.validateSchemaConfig(schemaConfig);
  }

  private validateSchemaConfig(schemaConfig: ISchemaConfig) {
    if (!this.utils.isPlainObject(schemaConfig)) {
      throw new Error('schemaConfig needs to be an object');
    }
    this.iterateObject(this.validateSchemaConfigEntry.bind(this));
  }

  private validateSchemaConfigEntry(key: string, schemaConfigEntry: ISchemaConfigEntry, fullPath: string[]) {
    const schemaConfigEntryValidated = new SchemaConfigEntry();
    schemaConfigEntryValidated.fullPath = fullPath;
    schemaConfigEntryValidated.type = schemaConfigEntry.type;
    schemaConfigEntryValidated.regExp = schemaConfigEntry.reg_exp;
    schemaConfigEntryValidated.validValues = schemaConfigEntry.valid_values;
    schemaConfigEntryValidated.required = schemaConfigEntry.required;
    schemaConfigEntryValidated.min = schemaConfigEntry.min;
    schemaConfigEntryValidated.max = schemaConfigEntry.max;
    schemaConfigEntryValidated.nested = schemaConfigEntry.nested;
    this.schemaConfigValidated.push(schemaConfigEntryValidated);
  }

  private validateType(type: string, parameter: any) {
    if (type !== undefined) {
      this.utils.checkType(type, parameter);
    }
  }

  private validateRegExp() {

  }

  private validateValidValues() {

  }

  private validateRequired() {

  }

  private validateMin() {

  }

  private validateMax() {

  }

  private validateMessage() {

  }

  validate(variableToValidate: any) {
    for (let schemaConfigEntry of this.schemaConfigValidated) {
      this.validateType(schemaConfigEntry.typeValue, this.utils.getValue(schemaConfigEntry.fullPath, variableToValidate));
    }
    return this;
  }

  getResults() {

  }

  private iterateObject(func: (key: string, value: ISchemaConfigEntry, fullPath: string[]) => void) {
    let currentPath = new Array<string>();
    let currentIndex = 0;
    const schemaConfigEntries = Object.entries(this.schemaConfig);
    let schemaConfigEntriesWithIndex = this.pushIndexInSchemaConfigEntry(schemaConfigEntries, currentIndex);
    while (schemaConfigEntriesWithIndex.length) {
      schemaConfigEntriesWithIndex = this.pushIndexInSchemaConfigEntry(schemaConfigEntriesWithIndex, currentIndex);
      const currentSchemaConfigEntry = schemaConfigEntriesWithIndex.shift();
      if (currentSchemaConfigEntry !== undefined) {
        let [currentKey, currentValue] = currentSchemaConfigEntry;
        currentIndex = currentSchemaConfigEntry[2]
        currentPath = this.updateCurrentPath(currentPath, currentIndex, currentKey);
        func(currentKey, currentValue, currentPath.slice())
        if (typeof currentValue.nested !== 'undefined') {
          currentIndex++;
          schemaConfigEntriesWithIndex = this.addNestedToSchemaConfigEntriesWithIndex(currentValue.nested, currentIndex, schemaConfigEntriesWithIndex)
        }
      }
    }
  }

  private addNestedToSchemaConfigEntriesWithIndex(nested: ISchemaConfig, index: number, schemaConfigEntriesWithIndex: [string, ISchemaConfigEntry, number][]): [string, ISchemaConfigEntry, number][] {
    const nestedEntries = Object.entries(nested);
    const nestedWithIndex = this.pushIndexInSchemaConfigEntry(nestedEntries, index);
    return nestedWithIndex.concat(schemaConfigEntriesWithIndex);
  }

  private updateCurrentPath(path: string[], index: number, key: string): string[] {
    path[index] = key;
    return path.slice(0, index + 1);

  }

  private pushIndexInSchemaConfigEntry(schemaConfigEntries: any, index: number): [string, ISchemaConfigEntry, number][] {
    for (let schemaConfigKey of schemaConfigEntries) {
      if (schemaConfigKey[2] === undefined) {
        schemaConfigKey[2] = index;
      }
    }
    return schemaConfigEntries;
  }
}
