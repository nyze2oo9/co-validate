import { ISchemaConfig, ISchemaConfigEntry, ISchemaConfigValidated, ValidValues, Type, SchemaConfigEntries, addNestedToSchemaConfigEntriesWithIndexParams, IArrayKey, IUnresolvedFullPath, IUnresolvedFullPathEntry, IFullPath } from './../interfaces/schema';
import { IOptions } from './../interfaces/options';
import { IError } from './../interfaces/errors';
import { SchemaConfigEntry } from './schema-config-entry';
import { DEFAULT_OPTIONS } from './../constants/default';
import { Utils } from './utils';
import { Options } from './options';

export class Schema {
  private schemaConfig: ISchemaConfig;
  private schemaConfigValidated: SchemaConfigEntry[];

  private variableToValidate: any;
  parsedVariable: any;

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
    if (this.utils.isSchemaConfigEntryNeeded(schemaConfigEntry)) {
      schemaConfigEntryValidated.fullPath = fullPath;
      schemaConfigEntryValidated.type = schemaConfigEntry.type;
      schemaConfigEntryValidated.regExp = schemaConfigEntry.regExp;
      schemaConfigEntryValidated.validValues = schemaConfigEntry.validValues;
      schemaConfigEntryValidated.required = schemaConfigEntry.required;
      schemaConfigEntryValidated.min = schemaConfigEntry.min;
      schemaConfigEntryValidated.max = schemaConfigEntry.max;
      schemaConfigEntryValidated.nested = schemaConfigEntry.nested;
      schemaConfigEntryValidated.message = schemaConfigEntry.message;
      this.schemaConfigValidated.push(schemaConfigEntryValidated);
    }
  }

  private validateType(schemaConfigEntry: SchemaConfigEntry, parameter: any) {
    if (schemaConfigEntry.typeValue !== undefined) {
      if (!this.utils.checkType(schemaConfigEntry.typeValue, parameter)) {
        this.validationErrorMessages.push({
          fullPath: <IFullPath>schemaConfigEntry.fullPath,
          message: schemaConfigEntry.getErrorMessage(schemaConfigEntry.type),
        });
      }
    }
  }

  private validateRegExp(schemaConfigEntry: SchemaConfigEntry, parameter: any) {
    if (schemaConfigEntry.regExpValue !== undefined) {
      if (!this.utils.checkRegExp(schemaConfigEntry.regExpValue, parameter)) {
        this.validationErrorMessages.push({
          fullPath: <IFullPath>schemaConfigEntry.fullPath,
          message: schemaConfigEntry.getErrorMessage(schemaConfigEntry.regExp),
        });
      }
    }
  }

  private validateValidValues(schemaConfigEntry: SchemaConfigEntry, parameter: any) {
    if (schemaConfigEntry.validValuesValue !== undefined) {
      if (!this.utils.checkValidValue(schemaConfigEntry.validValuesValue, parameter)) {
        this.validationErrorMessages.push({
          fullPath: <IFullPath>schemaConfigEntry.fullPath,
          message: schemaConfigEntry.getErrorMessage(schemaConfigEntry.validValues),
        });
      }
    }
  }

  private validateRequired(schemaConfigEntry: SchemaConfigEntry, parameter: any) {
    if (schemaConfigEntry.requiredValue !== undefined) {
      if (!this.utils.checkRequired(schemaConfigEntry.requiredValue, parameter)) {
        this.validationErrorMessages.push({
          fullPath: <IFullPath>schemaConfigEntry.fullPath,
          message: schemaConfigEntry.getErrorMessage(schemaConfigEntry.required),
        });
      }
    }
  }

  private validateMin(schemaConfigEntry: SchemaConfigEntry, parameter: any) {
    if (schemaConfigEntry.minValue !== undefined) {
      if (!this.utils.checkLengthProperty({ min: schemaConfigEntry.minValue }, parameter)) {
        this.validationErrorMessages.push({
          fullPath: <IFullPath>schemaConfigEntry.fullPath,
          message: schemaConfigEntry.getErrorMessage(schemaConfigEntry.min),
        });
      }
    }
  }

  private validateMax(schemaConfigEntry: SchemaConfigEntry, parameter: any) {
    if (schemaConfigEntry.maxValue !== undefined) {
      if (!this.utils.checkLengthProperty({ max: schemaConfigEntry.maxValue }, parameter)) {
        this.validationErrorMessages.push({
          fullPath: <IFullPath>schemaConfigEntry.fullPath,
          message: schemaConfigEntry.getErrorMessage(schemaConfigEntry.max),
        });
      }
    }
  }

  validate(variableToValidate: any) {
    this.validationErrorMessages = [];
    this.variableToValidate = variableToValidate;
    this.schemaConfigValidated = this.fillArrayPaths();
    for (const schemaConfigEntry of this.schemaConfigValidated) {
      const currentValue = this.utils.getValue((<IFullPath>schemaConfigEntry.fullPath), this.variableToValidate);
      this.validateRequired(schemaConfigEntry, currentValue);
      if (!this.utils.isNil(currentValue)) {
        this.validateType(schemaConfigEntry, currentValue);
        this.validateRegExp(schemaConfigEntry, currentValue);
        this.validateValidValues(schemaConfigEntry, currentValue);
        this.validateMin(schemaConfigEntry, currentValue);
        this.validateMax(schemaConfigEntry, currentValue);
      }   
    }
    return this;
  }

  parse() {
    this.parsedVariable = {};
    for (const schemaConfigEntry of this.schemaConfigValidated) {
      const currentValue = this.utils.getValue((<IFullPath>schemaConfigEntry.fullPath), this.variableToValidate);
      this.addToParsedVariable(currentValue, <IFullPath>schemaConfigEntry.fullPath);
    }
  }

  private addToParsedVariable(value: any, fullPath: IFullPath) {
    let parsedVariable = this.parsedVariable;
    for (let i = 0; i < fullPath.length; i += 1) {
      const pathEntry = fullPath[i];
      const isLastPathEntry = (i === fullPath.length - 1);
      if (this.utils.isNil(parsedVariable[pathEntry] && !isLastPathEntry)) {
        const isNextEntryAnArrayInstance = (this.utils.isNumber(fullPath[i + 1]));
        parsedVariable[pathEntry] =  isNextEntryAnArrayInstance ? [] : {};                   
      }
      if (isLastPathEntry) {
        parsedVariable[pathEntry] = value;
      }
      parsedVariable = parsedVariable[pathEntry];
    }
  }

  fillArrayPaths() : SchemaConfigEntry[] {
    const schemaConfigEntriesWithArrayPath = this.getSchemaConfigEntriesWithArrayPath();
    const newSchemaConfigEntries : SchemaConfigEntry[] = this.getSchemaConfigEntriesWithStringPath();
    while (schemaConfigEntriesWithArrayPath.length) {
      const currentSchemaConfigEntry = schemaConfigEntriesWithArrayPath.shift();
      if (!this.utils.isNil(currentSchemaConfigEntry)) {
        const currentIndex = this.utils.getFirstIndex(currentSchemaConfigEntry.fullPath, '0');
        const arrayLength = this.utils.getLength({
          variableToValidate: this.variableToValidate,
          fullPath: currentSchemaConfigEntry.fullPath,
          index: currentIndex,
        });
        for (let i = 0; i < arrayLength; i += 1) {
          const newSchemaConfigEntry = this.utils.getNewSchemaConfigEntry({
            schemaConfigEntry: currentSchemaConfigEntry,
            index: currentIndex,
            pathEntry: i,
          });
          if (this.utils.isStringOrNumberArray(newSchemaConfigEntry.fullPath)) {
            newSchemaConfigEntries.push(newSchemaConfigEntry);
          } else {
            schemaConfigEntriesWithArrayPath.push(newSchemaConfigEntry);
          }
        }
      }
    }
    return newSchemaConfigEntries;
  }

  getSchemaConfigEntriesWithArrayPath() {
    const result : SchemaConfigEntry[] = [];
    for (const schemaConfigEntry of this.schemaConfigValidated) {
      for (const pathEntry of schemaConfigEntry.fullPath) {
        if (!this.utils.isString(pathEntry) && !this.utils.isNumber(pathEntry) && pathEntry.array === true) {
          result.push(schemaConfigEntry);
          break;
        }
      }
    }
    return result;
  }

  getSchemaConfigEntriesWithStringPath() {
    const result : SchemaConfigEntry[] = [];
    for (const schemaConfigEntry of this.schemaConfigValidated) {
      if (this.utils.isStringArray(schemaConfigEntry.fullPath)) {
        result.push(schemaConfigEntry);
      }
    }
    return result;
  }

  private iterateObject(func: (key: IUnresolvedFullPathEntry, value: ISchemaConfigEntry, fullPath: IUnresolvedFullPath)
   => void) {
    // the complete path were to find the property
    let currentPath: IUnresolvedFullPath = [];
    // the index for the path
    let currentPathIndex = 0;
    // get key an values of the schemaConfig
    const schemaConfigEntries = Object.entries(this.schemaConfig);
    // add the currentPathIndex to the keys and values
    let schemaConfigEntriesWithIndex = this.pushIndexInSchemaConfigEntry(schemaConfigEntries, currentPathIndex);
    // iterate over all schemaConfigEntriesWithIndex entries
    while (schemaConfigEntriesWithIndex.length) {
      schemaConfigEntriesWithIndex = this.pushIndexInSchemaConfigEntry(schemaConfigEntriesWithIndex, currentPathIndex);
      // get currentSchemaConfigEntry 
      const currentSchemaConfigEntry = schemaConfigEntriesWithIndex.shift();
      if (!this.utils.isNil(currentSchemaConfigEntry)) {
        // get currentValue
        const [,currentValue] = currentSchemaConfigEntry;
        // get currentKey
        let [currentKey] = currentSchemaConfigEntry;
        // update the index for the path
        currentPathIndex = currentSchemaConfigEntry[2];
        // set array property to true if the '0' comes from an array iteration 
        // update the currentPath
        currentPath = this.updateCurrentPath(currentPath, currentPathIndex, currentKey);
        // call function
        func(currentKey, currentValue, currentPath.slice());
        // check if nested property of currentValue is set
        if (!this.utils.isNil(currentValue.nested)) {
          let nested: ISchemaConfig | ISchemaConfig[] = currentValue.nested;
          // if nested property is an array it should set the array property of currentKey to true and it should
          // update the currentPathIndex and currentPath
          if (this.utils.isArray(currentValue.nested)) {
            currentKey = {
              array: true,
            };
            currentPathIndex += 1;
            currentPath = this.updateCurrentPath(currentPath, currentPathIndex, currentKey);
            nested = currentValue.nested[0];
          }
          // add nested key, value and index to iteration array
          currentPathIndex += 1;
          schemaConfigEntriesWithIndex = this.addNestedToSchemaConfigEntriesWithIndex({
            nested,
            schemaConfigEntriesWithIndex,
            index: currentPathIndex,
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

  private updateCurrentPath(path: IUnresolvedFullPath, index: number, key: IUnresolvedFullPathEntry): 
  IUnresolvedFullPath {
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
