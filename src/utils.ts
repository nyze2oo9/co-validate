export class Utils {
  static isMessage(value: any): boolean {
    return Utils.isString(value) || Utils.isMessageObject(value);
  }
  static isMinOrMaxWithSpecificErrorMessage(value: any): boolean {
    if (Utils.isPlainObject(value)) {
      if (Utils.isString(value.message)) {
        return (Utils.isInteger(value.value) && Utils.isString(value.message));
      } else {
        return (Utils.isInteger(value.value) && Utils.isMessageObject(value.message));
      }
    }
    return false;
  }
  static isValidTypeWithLengthProperties(value: string): boolean {
    const validTypes = ['number', 'integer', 'string', 'boolean[]', 'number[]', 'integer[]', 'string[]', 'array'];
    return validTypes.includes(value);
  }

  static isRequiredWithSpecificErrorMessage(value: any): boolean {
    if (Utils.isPlainObject(value)) {
      if (Utils.isString(value.message)) {
        return (Utils.isBoolean(value.value) && Utils.isString(value.message));
      }
      return (Utils.isBoolean(value.value) && Utils.isMessageObject(value.message));
    }
    return false;
  }

  static isValidValuesArray(value: any): boolean {
    if (Utils.isArray(value)) {
      for (let valid_value of value) {
        if (!Utils.isBoolean(valid_value) && !Utils.isNumber(valid_value) && !Utils.isString(valid_value)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  static isValidValuesWithSpecificErrorMessage(value: any): boolean {
    if (Utils.isPlainObject(value)) {
      if (Utils.isString(value.message)) {
        return (Utils.isValidValuesArray(value.value) && Utils.isString(value.message));
      }
      return (Utils.isValidValuesArray(value.value) && Utils.isMessageObject(value.message));
    }
    return false;
  }

  static isPlainObject(value: any): boolean {
    return value !== null && typeof value === 'object'
      && this.getBaseTag(value) === '[object Object]';
  }

  static isArray(value: any): boolean {
    return value.constructor === Array;
  }

  static isBoolean(value: any): boolean {
    return typeof (value) === 'boolean';
  }

  static isNumber(value: any): boolean {
    return typeof (value) === 'number';
  }

  static isInteger(value: any): boolean {
    return Number.isInteger(value);
  }

  static isString(value: any): boolean {
    return typeof value === 'string' || (typeof value === 'object'
      && Utils.getBaseTag(value) === '[object String]');
  }

  static isRegExp(value: any): boolean {
    return typeof value === 'object' && Utils.getBaseTag(value) === '[object RegExp]'
  }

  static isRegExpWithSpecificErrorMessage(value: any): boolean {
    if (Utils.isPlainObject(value)) {
      if (Utils.isString(value.message)) {
        return (Utils.isRegExp(value.value) && Utils.isString(value.message));
      }
      return (Utils.isRegExp(value.value) && Utils.isMessageObject(value.message));
    }
    return false;
  }

  static isType(value: any): boolean {
    const validTypes = ['boolean', 'number', 'integer', 'string', 'boolean[]', 'number[]',
      'integer[]', 'string[]', 'object', 'array', 'mongo_id', 'email'];
    return validTypes.includes(value);
  }

  static isTypeWithSpecificErrorMessage(value: any): boolean {
    if (Utils.isPlainObject(value)) {
      if (Utils.isString(value.message)) {
        return (Utils.isType(value.value) && Utils.isString(value.message));
      }
      return (Utils.isType(value.value) && Utils.isMessageObject(value.message));
    }
    return false;
  }

  static isSet(value: any) {
    return typeof value !== 'undefined' && value !== null;
  }

  static areAllValuesSet(...args: any[]) {
    for (const arg of args) {
      if (typeof arg === 'undefined') {
        return false;
      }
    }
    return true;
  }

  static isFilled(value: any): boolean {
    return Object.keys(value).length > 0
  }

  static isMessageObject(message: any): boolean {
    if (Utils.isPlainObject(message) && Utils.isFilled(message)) {
      let result = true;
      const messageEntries = Object.entries(message);
      messageEntries.forEach((messageEntry) => {
        const [key, value] = messageEntry;
        if (!Utils.isString(key) || !Utils.isString(value)) {
          result = false;
        }
      });
      return result;
    }
    return false
  }

  private static getBaseTag(value: any): string {
    return Object.prototype.toString.call(value);
  }
}
