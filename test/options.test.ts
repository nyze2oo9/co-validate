import { expect } from 'chai';
import { Options } from '../src/entities/options';

describe('Options', () => {
  it('should throw error when allowNaN isn\'t a boolean', () => {
    const message = 'allowNaN needs to be a boolean';

    const errorFunction = () => {
      const options = new Options(<any>{ allowNaN: 1 });
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set allowNaN when it is a boolean', () => {
    const options = new Options(<any>{ allowNaN: true });
    expect(options.allowNaN).to.equal(true);
  });
  it('should throw error when allowInfinite isn\'t a boolean', () => {
    const message = 'allowInfinite needs to be a boolean';

    const errorFunction = () => {
      const options = new Options(<any>{ allowInfinite: 1 });
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set allowInfinite when it is a boolean', () => {
    const options = new Options(<any>{ allowInfinite: true });
    expect(options.allowInfinite).to.equal(true);
  });
  it('should throw error when allowEmpty isn\'t a boolean', () => {
    const message = 'allowEmpty needs to be a boolean';

    const errorFunction = () => {
      const options = new Options(<any>{ allowEmpty: 1 });
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set allowEmpty when it is a boolean', () => {
    const options = new Options(<any>{ allowEmpty: true });
    expect(options.allowEmpty).to.equal(true);
  });
  it('should throw error when countryCode isn\'t a string', () => {
    const message = 'countryCode needs to be a string';

    const errorFunction = () => {
      const options = new Options(<any>{ countryCode: 1 });
    };

    expect(errorFunction).to.throw(message);
  });
  it('should set countryCode when it is a string', () => {
    const options = new Options(<any>{ countryCode: 'test' });
    expect(options.countryCode).to.equal('test');
  });
});
