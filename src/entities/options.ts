import { IOptions } from "./../interfaces/options";
import { Utils } from "./utils";
import { DEFAULT_OPTIONS } from "../constants/default";

export class Options {
  private _allowNaN: boolean;
	public get allowNaN(): boolean {
		return this._allowNaN;
  }

  private _allowInfinite: boolean;
	public get allowInfinite(): boolean {
		return this._allowInfinite;
	}
  
  private _allowEmpty: boolean;
	public get allowEmpty(): boolean {
		return this._allowEmpty;
	}

  constructor(params: IOptions) {
    const {allowNaN, allowInfinite, allowEmpty} = params;

    if (allowNaN !== undefined && typeof (allowNaN) !== 'boolean') {
      throw new Error('allowNaN needs to be a boolean');
    }
    if (allowInfinite !== undefined && typeof (allowInfinite) !== 'boolean') {
      throw new Error('allowInfinite needs to be a boolean');
    }
    if (allowEmpty !== undefined && typeof (allowEmpty) !== 'boolean') {
      throw new Error('allowEmpty needs to be a boolean');
    }

    this._allowNaN = allowNaN ? allowNaN : DEFAULT_OPTIONS.allowNaN;
    this._allowInfinite = allowInfinite ? allowInfinite : DEFAULT_OPTIONS.allowInfinite;
    this._allowEmpty = allowEmpty ? allowEmpty : DEFAULT_OPTIONS.allowEmpty;
  }
}