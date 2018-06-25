import * as chai from 'chai';
import { Utils } from '../src/entities/utils';

const expect = chai.expect;

const utils = new Utils();

describe('Utils Type Validation', () => {
  it('should be able to validate boolean correctly', () => {
    //boolean
    expect(utils.checkType('boolean', true)).to.equal(true);
    expect(utils.checkType('boolean', false)).to.equal(true);

    //integer / number
    expect(utils.checkType('boolean', 0)).to.equal(false);
    expect(utils.checkType('boolean', 1)).to.equal(false);
    expect(utils.checkType('boolean', -1)).to.equal(false);
    expect(utils.checkType('boolean', 1.2)).to.equal(false);
    expect(utils.checkType('boolean', -1.2)).to.equal(false);
    expect(utils.checkType('boolean', NaN)).to.equal(false);

    //string
    expect(utils.checkType('boolean', '')).to.equal(false);
    expect(utils.checkType('boolean', 'string')).to.equal(false);

    //boolean[]
    expect(utils.checkType('boolean', [true, false])).to.equal(false);
    expect(utils.checkType('boolean', [true, false, 1])).to.equal(false);
    expect(utils.checkType('boolean', [true, false, -1])).to.equal(false);
    expect(utils.checkType('boolean', [true, false, 1.2])).to.equal(false);
    expect(utils.checkType('boolean', [true, false, -1.2])).to.equal(false);
    expect(utils.checkType('boolean', [true, false, NaN])).to.equal(false);
    expect(utils.checkType('boolean', [true, false, ''])).to.equal(false);
    expect(utils.checkType('boolean', [true, false, 'string'])).to.equal(false);
    expect(utils.checkType('boolean', [true, false, []])).to.equal(false);
    expect(utils.checkType('boolean', [true, false, [false]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('boolean', [true, false, {}])).to.equal(false);
    expect(utils.checkType('boolean', [true, false, { test: false }])).to.equal(false);

    //number[]
    expect(utils.checkType('boolean', [1, 2])).to.equal(false);
    expect(utils.checkType('boolean', [-1, 2])).to.equal(false);
    expect(utils.checkType('boolean', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('boolean', [1, -2.1])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, []])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, { test: false }])).to.equal(false);

    //integer[]
    expect(utils.checkType('boolean', [1, 2])).to.equal(false);
    expect(utils.checkType('boolean', [-1, 2])).to.equal(false);
    expect(utils.checkType('boolean', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('boolean', [1, -2.1])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, []])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2, { test: false }])).to.equal(false);

    //string[]
    expect(utils.checkType('boolean', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('boolean', ['string', ''])).to.equal(false);
    expect(utils.checkType('boolean', ['', ''])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', 2])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', -2])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', 1.2])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', -1.2])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', NaN])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', []])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', [false]])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', [1]])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', [-1]])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', [1.1]])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', [-1.1]])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', ['']])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', {}])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string', { test: false }])).to.equal(false);

    //object
    expect(utils.checkType('boolean', {})).to.equal(false);
    expect(utils.checkType('boolean', { test: 1 })).to.equal(false);
    expect(utils.checkType('boolean', { test: 'string' })).to.equal(false);

    //array
    expect(utils.checkType('boolean', [])).to.equal(false);
    expect(utils.checkType('boolean', [true, false])).to.equal(false);
    expect(utils.checkType('boolean', [1, 2])).to.equal(false);
    expect(utils.checkType('boolean', [-1, -2])).to.equal(false);
    expect(utils.checkType('boolean', [1.2, 2.2])).to.equal(false);
    expect(utils.checkType('boolean', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('boolean', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(utils.checkType('boolean', [1, 'string', true, { test: 'string' }])).to.equal(false);

    //mongo_id
    expect(utils.checkType('boolean', '59d7fce00000000000000000')).to.equal(false);
    expect(utils.checkType('boolean', '59d7fce000000000000000002')).to.equal(false);

    //email
    expect(utils.checkType('boolean', 'test@test.test')).to.equal(false);
    expect(utils.checkType('boolean', 'test@test@test.test')).to.equal(false);
    expect(utils.checkType('boolean', 'test@test,test')).to.equal(false);
    expect(utils.checkType('boolean', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate number correctly', () => {
    //boolean
    expect(utils.checkType('number', true)).to.equal(false);
    expect(utils.checkType('number', false)).to.equal(false);

    //integer / number
    expect(utils.checkType('number', 0)).to.equal(true);
    expect(utils.checkType('number', 1)).to.equal(true);
    expect(utils.checkType('number', -1)).to.equal(true);
    expect(utils.checkType('number', 1.2)).to.equal(true);
    expect(utils.checkType('number', -1.2)).to.equal(true);
    expect(utils.checkType('number', NaN)).to.equal(false);

    //string
    expect(utils.checkType('number', '')).to.equal(false);
    expect(utils.checkType('number', 'string')).to.equal(false);

    //boolean[]
    expect(utils.checkType('number', [true, false])).to.equal(false);
    expect(utils.checkType('number', [true, false, 1])).to.equal(false);
    expect(utils.checkType('number', [true, false, -1])).to.equal(false);
    expect(utils.checkType('number', [true, false, 1.2])).to.equal(false);
    expect(utils.checkType('number', [true, false, -1.2])).to.equal(false);
    expect(utils.checkType('number', [true, false, NaN])).to.equal(false);
    expect(utils.checkType('number', [true, false, ''])).to.equal(false);
    expect(utils.checkType('number', [true, false, 'string'])).to.equal(false);
    expect(utils.checkType('number', [true, false, []])).to.equal(false);
    expect(utils.checkType('number', [true, false, [false]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('number', [true, false, {}])).to.equal(false);
    expect(utils.checkType('number', [true, false, { test: false }])).to.equal(false);

    //number[]
    expect(utils.checkType('number', [1, 2])).to.equal(false);
    expect(utils.checkType('number', [-1, 2])).to.equal(false);
    expect(utils.checkType('number', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('number', [1, -2.1])).to.equal(false);
    expect(utils.checkType('number', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('number', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('number', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('number', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('number', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('number', [1, 2, []])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('number', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('number', [1, 2, { test: false }])).to.equal(false);

    //integer[]
    expect(utils.checkType('number', [1, 2])).to.equal(false);
    expect(utils.checkType('number', [-1, 2])).to.equal(false);
    expect(utils.checkType('number', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('number', [1, -2.1])).to.equal(false);
    expect(utils.checkType('number', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('number', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('number', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('number', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('number', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('number', [1, 2, []])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('number', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('number', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('number', [1, 2, { test: false }])).to.equal(false);

    //string[]
    expect(utils.checkType('number', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('number', ['string', ''])).to.equal(false);
    expect(utils.checkType('number', ['', ''])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', 2])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', -2])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', 1.2])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', -1.2])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', NaN])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', []])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', [false]])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', [1]])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', [-1]])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', [1.1]])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', [-1.1]])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', ['']])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', {}])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string', { test: false }])).to.equal(false);

    //object
    expect(utils.checkType('number', {})).to.equal(false);
    expect(utils.checkType('number', { test: 1 })).to.equal(false);
    expect(utils.checkType('number', { test: 'string' })).to.equal(false);

    //array
    expect(utils.checkType('number', [])).to.equal(false);
    expect(utils.checkType('number', [true, false])).to.equal(false);
    expect(utils.checkType('number', [1, 2])).to.equal(false);
    expect(utils.checkType('number', [-1, -2])).to.equal(false);
    expect(utils.checkType('number', [1.2, 2.2])).to.equal(false);
    expect(utils.checkType('number', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('number', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(utils.checkType('number', [1, 'string', true, { test: 'string' }])).to.equal(false);

    //mongo_id
    expect(utils.checkType('number', '59d7fce00000000000000000')).to.equal(false);
    expect(utils.checkType('number', '59d7fce000000000000000002')).to.equal(false);

    //email
    expect(utils.checkType('number', 'test@test.test')).to.equal(false);
    expect(utils.checkType('number', 'test@test@test.test')).to.equal(false);
    expect(utils.checkType('number', 'test@test,test')).to.equal(false);
    expect(utils.checkType('number', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate integers correctly', () => {
    //boolean
    expect(utils.checkType('integer', true)).to.equal(false);
    expect(utils.checkType('integer', false)).to.equal(false);

    //integer / number
    expect(utils.checkType('integer', 0)).to.equal(true);
    expect(utils.checkType('integer', 1)).to.equal(true);
    expect(utils.checkType('integer', -1)).to.equal(true);
    expect(utils.checkType('integer', 1.2)).to.equal(false);
    expect(utils.checkType('integer', -1.2)).to.equal(false);
    expect(utils.checkType('integer', NaN)).to.equal(false);

    //string
    expect(utils.checkType('integer', '')).to.equal(false);
    expect(utils.checkType('integer', 'string')).to.equal(false);

    //boolean[]
    expect(utils.checkType('integer', [true, false])).to.equal(false);
    expect(utils.checkType('integer', [true, false, 1])).to.equal(false);
    expect(utils.checkType('integer', [true, false, -1])).to.equal(false);
    expect(utils.checkType('integer', [true, false, 1.2])).to.equal(false);
    expect(utils.checkType('integer', [true, false, -1.2])).to.equal(false);
    expect(utils.checkType('integer', [true, false, NaN])).to.equal(false);
    expect(utils.checkType('integer', [true, false, ''])).to.equal(false);
    expect(utils.checkType('integer', [true, false, 'string'])).to.equal(false);
    expect(utils.checkType('integer', [true, false, []])).to.equal(false);
    expect(utils.checkType('integer', [true, false, [false]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('integer', [true, false, {}])).to.equal(false);
    expect(utils.checkType('integer', [true, false, { test: false }])).to.equal(false);

    //number[]
    expect(utils.checkType('integer', [1, 2])).to.equal(false);
    expect(utils.checkType('integer', [-1, 2])).to.equal(false);
    expect(utils.checkType('integer', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('integer', [1, -2.1])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, []])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, { test: false }])).to.equal(false);

    //integer[]
    expect(utils.checkType('integer', [1, 2])).to.equal(false);
    expect(utils.checkType('integer', [-1, 2])).to.equal(false);
    expect(utils.checkType('integer', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('integer', [1, -2.1])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, []])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('integer', [1, 2, { test: false }])).to.equal(false);

    //string[]
    expect(utils.checkType('integer', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('integer', ['string', ''])).to.equal(false);
    expect(utils.checkType('integer', ['', ''])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', 2])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', -2])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', 1.2])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', -1.2])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', NaN])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', []])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', [false]])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', [1]])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', [-1]])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', [1.1]])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', [-1.1]])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', ['']])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', {}])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string', { test: false }])).to.equal(false);

    //object
    expect(utils.checkType('integer', {})).to.equal(false);
    expect(utils.checkType('integer', { test: 1 })).to.equal(false);
    expect(utils.checkType('integer', { test: 'string' })).to.equal(false);

    //array
    expect(utils.checkType('integer', [])).to.equal(false);
    expect(utils.checkType('integer', [true, false])).to.equal(false);
    expect(utils.checkType('integer', [1, 2])).to.equal(false);
    expect(utils.checkType('integer', [-1, -2])).to.equal(false);
    expect(utils.checkType('integer', [1.2, 2.2])).to.equal(false);
    expect(utils.checkType('integer', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('integer', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(utils.checkType('integer', [1, 'string', true, { test: 'string' }])).to.equal(false);

    //mongo_id
    expect(utils.checkType('integer', '59d7fce00000000000000000')).to.equal(false);
    expect(utils.checkType('integer', '59d7fce000000000000000002')).to.equal(false);

    //email
    expect(utils.checkType('integer', 'test@test.test')).to.equal(false);
    expect(utils.checkType('integer', 'test@test@test.test')).to.equal(false);
    expect(utils.checkType('integer', 'test@test,test')).to.equal(false);
    expect(utils.checkType('integer', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate strings correctly', () => {
    //boolean
    expect(utils.checkType('string', true)).to.equal(false);
    expect(utils.checkType('string', false)).to.equal(false);

    //integer / number
    expect(utils.checkType('string', 0)).to.equal(false);
    expect(utils.checkType('string', 1)).to.equal(false);
    expect(utils.checkType('string', -1)).to.equal(false);
    expect(utils.checkType('string', 1.2)).to.equal(false);
    expect(utils.checkType('string', -1.2)).to.equal(false);
    expect(utils.checkType('string', NaN)).to.equal(false);

    //string
    expect(utils.checkType('string', '')).to.equal(false);
    expect(utils.checkType('string', 'string')).to.equal(true);

    //boolean[]
    expect(utils.checkType('string', [true, false])).to.equal(false);
    expect(utils.checkType('string', [true, false, 1])).to.equal(false);
    expect(utils.checkType('string', [true, false, -1])).to.equal(false);
    expect(utils.checkType('string', [true, false, 1.2])).to.equal(false);
    expect(utils.checkType('string', [true, false, -1.2])).to.equal(false);
    expect(utils.checkType('string', [true, false, NaN])).to.equal(false);
    expect(utils.checkType('string', [true, false, ''])).to.equal(false);
    expect(utils.checkType('string', [true, false, 'string'])).to.equal(false);
    expect(utils.checkType('string', [true, false, []])).to.equal(false);
    expect(utils.checkType('string', [true, false, [false]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('string', [true, false, {}])).to.equal(false);
    expect(utils.checkType('string', [true, false, { test: false }])).to.equal(false);

    //number[]
    expect(utils.checkType('string', [1, 2])).to.equal(false);
    expect(utils.checkType('string', [-1, 2])).to.equal(false);
    expect(utils.checkType('string', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('string', [1, -2.1])).to.equal(false);
    expect(utils.checkType('string', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('string', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('string', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('string', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('string', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('string', [1, 2, []])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('string', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('string', [1, 2, { test: false }])).to.equal(false);

    //integer[]
    expect(utils.checkType('string', [1, 2])).to.equal(false);
    expect(utils.checkType('string', [-1, 2])).to.equal(false);
    expect(utils.checkType('string', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('string', [1, -2.1])).to.equal(false);
    expect(utils.checkType('string', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('string', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('string', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('string', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('string', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('string', [1, 2, []])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('string', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('string', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('string', [1, 2, { test: false }])).to.equal(false);

    //string[]
    expect(utils.checkType('string', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('string', ['string', ''])).to.equal(false);
    expect(utils.checkType('string', ['', ''])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', 2])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', -2])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', 1.2])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', -1.2])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', NaN])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', []])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', [false]])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', [1]])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', [-1]])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', [1.1]])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', [-1.1]])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', ['']])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', {}])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string', { test: false }])).to.equal(false);

    //object
    expect(utils.checkType('string', {})).to.equal(false);
    expect(utils.checkType('string', { test: 1 })).to.equal(false);
    expect(utils.checkType('string', { test: 'string' })).to.equal(false);

    //array
    expect(utils.checkType('string', [])).to.equal(false);
    expect(utils.checkType('string', [true, false])).to.equal(false);
    expect(utils.checkType('string', [1, 2])).to.equal(false);
    expect(utils.checkType('string', [-1, -2])).to.equal(false);
    expect(utils.checkType('string', [1.2, 2.2])).to.equal(false);
    expect(utils.checkType('string', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('string', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(utils.checkType('string', [1, 'string', true, { test: 'string' }])).to.equal(false);

    //mongo_id
    expect(utils.checkType('string', '59d7fce00000000000000000')).to.equal(true);
    expect(utils.checkType('string', '59d7fce000000000000000002')).to.equal(true);

    //email
    expect(utils.checkType('string', 'test@test.test')).to.equal(true);
    expect(utils.checkType('string', 'test@test@test.test')).to.equal(true);
    expect(utils.checkType('string', 'test@test,test')).to.equal(true);
    expect(utils.checkType('string', 'testtest,test')).to.equal(true);
  });
  it('should be able to validate boolean arrays correctly', () => {

    //boolean
    expect(utils.checkType('boolean[]', true)).to.equal(false);
    expect(utils.checkType('boolean[]', false)).to.equal(false);

    //integer / number
    expect(utils.checkType('boolean[]', 0)).to.equal(false);
    expect(utils.checkType('boolean[]', 1)).to.equal(false);
    expect(utils.checkType('boolean[]', -1)).to.equal(false);
    expect(utils.checkType('boolean[]', 1.2)).to.equal(false);
    expect(utils.checkType('boolean[]', -1.2)).to.equal(false);
    expect(utils.checkType('boolean[]', NaN)).to.equal(false);

    //string
    expect(utils.checkType('boolean[]', '')).to.equal(false);
    expect(utils.checkType('boolean[]', 'string')).to.equal(false);

    //boolean[]
    expect(utils.checkType('boolean[]', [true, false])).to.equal(true);
    expect(utils.checkType('boolean[]', [true, false, 1])).to.equal(false);
    expect(utils.checkType('boolean[]', [true, false, -1])).to.equal(false);
    expect(utils.checkType('boolean[]', [true, false, 1.2])).to.equal(false);
    expect(utils.checkType('boolean[]', [true, false, -1.2])).to.equal(false);
    expect(utils.checkType('boolean[]', [true, false, NaN])).to.equal(false);
    expect(utils.checkType('boolean[]', [true, false, ''])).to.equal(false);
    expect(utils.checkType('boolean[]', [true, false, 'string'])).to.equal(false);
    expect(utils.checkType('boolean[]', [true, false, []])).to.equal(false);
    expect(utils.checkType('boolean[]', [true, false, [false]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('boolean[]', [true, false, {}])).to.equal(false);
    expect(utils.checkType('boolean[]', [true, false, { test: false }])).to.equal(false);

    //number[]
    expect(utils.checkType('boolean[]', [1, 2])).to.equal(false);
    expect(utils.checkType('boolean[]', [-1, 2])).to.equal(false);
    expect(utils.checkType('boolean[]', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, -2.1])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, []])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, { test: false }])).to.equal(false);

    //integer[]
    expect(utils.checkType('boolean[]', [1, 2])).to.equal(false);
    expect(utils.checkType('boolean[]', [-1, 2])).to.equal(false);
    expect(utils.checkType('boolean[]', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, -2.1])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, []])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 2, { test: false }])).to.equal(false);

    //string[]
    expect(utils.checkType('boolean[]', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', ''])).to.equal(false);
    expect(utils.checkType('boolean[]', ['', ''])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', 2])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', -2])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', 1.2])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', -1.2])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', NaN])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', []])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', [false]])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', [1]])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', [-1]])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', [1.1]])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', [-1.1]])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', ['']])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', {}])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string', { test: false }])).to.equal(false);

    //object
    expect(utils.checkType('boolean[]', {})).to.equal(false);
    expect(utils.checkType('boolean[]', { test: 1 })).to.equal(false);
    expect(utils.checkType('boolean[]', { test: 'string' })).to.equal(false);

    //array
    expect(utils.checkType('boolean[]', [])).to.equal(false);
    expect(utils.checkType('boolean[]', [true, false])).to.equal(true);
    expect(utils.checkType('boolean[]', [1, 2])).to.equal(false);
    expect(utils.checkType('boolean[]', [-1, -2])).to.equal(false);
    expect(utils.checkType('boolean[]', [1.2, 2.2])).to.equal(false);
    expect(utils.checkType('boolean[]', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('boolean[]', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(utils.checkType('boolean[]', [1, 'string', true, { test: 'string' }])).to.equal(false);

    //mongo_id
    expect(utils.checkType('boolean[]', '59d7fce00000000000000000')).to.equal(false);
    expect(utils.checkType('boolean[]', '59d7fce000000000000000002')).to.equal(false);

    //email
    expect(utils.checkType('boolean[]', 'test@test.test')).to.equal(false);
    expect(utils.checkType('boolean[]', 'test@test@test.test')).to.equal(false);
    expect(utils.checkType('boolean[]', 'test@test,test')).to.equal(false);
    expect(utils.checkType('boolean[]', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate number arrays correctly', () => {

    //boolean
    expect(utils.checkType('number[]', true)).to.equal(false);
    expect(utils.checkType('number[]', false)).to.equal(false);

    //integer / number
    expect(utils.checkType('number[]', 0)).to.equal(false);
    expect(utils.checkType('number[]', 1)).to.equal(false);
    expect(utils.checkType('number[]', -1)).to.equal(false);
    expect(utils.checkType('number[]', 1.2)).to.equal(false);
    expect(utils.checkType('number[]', -1.2)).to.equal(false);
    expect(utils.checkType('number[]', NaN)).to.equal(false);

    //string
    expect(utils.checkType('number[]', '')).to.equal(false);
    expect(utils.checkType('number[]', 'string')).to.equal(false);

    //boolean[]
    expect(utils.checkType('number[]', [true, false])).to.equal(false);
    expect(utils.checkType('number[]', [true, false, 1])).to.equal(false);
    expect(utils.checkType('number[]', [true, false, -1])).to.equal(false);
    expect(utils.checkType('number[]', [true, false, 1.2])).to.equal(false);
    expect(utils.checkType('number[]', [true, false, -1.2])).to.equal(false);
    expect(utils.checkType('number[]', [true, false, NaN])).to.equal(false);
    expect(utils.checkType('number[]', [true, false, ''])).to.equal(false);
    expect(utils.checkType('number[]', [true, false, 'string'])).to.equal(false);
    expect(utils.checkType('number[]', [true, false, []])).to.equal(false);
    expect(utils.checkType('number[]', [true, false, [false]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('number[]', [true, false, {}])).to.equal(false);
    expect(utils.checkType('number[]', [true, false, { test: false }])).to.equal(false);

    //number[]
    expect(utils.checkType('number[]', [1, 2])).to.equal(true);
    expect(utils.checkType('number[]', [-1, 2])).to.equal(true);
    expect(utils.checkType('number[]', [-1, 2.1])).to.equal(true);
    expect(utils.checkType('number[]', [1, -2.1])).to.equal(true);
    expect(utils.checkType('number[]', [1.2, 1])).to.equal(true);
    expect(utils.checkType('number[]', [1, 2, 1.2])).to.equal(true);
    expect(utils.checkType('number[]', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, []])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, { test: false }])).to.equal(false);

    //integer[]
    expect(utils.checkType('number[]', [1, 2])).to.equal(true);
    expect(utils.checkType('number[]', [-1, 2])).to.equal(true);
    expect(utils.checkType('number[]', [-1, 2.1])).to.equal(true);
    expect(utils.checkType('number[]', [1, -2.1])).to.equal(true);
    expect(utils.checkType('number[]', [1, 2, 1])).to.equal(true);
    expect(utils.checkType('number[]', [1, 2, 1.2])).to.equal(true);
    expect(utils.checkType('number[]', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, []])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2, { test: false }])).to.equal(false);

    //string[]
    expect(utils.checkType('number[]', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('number[]', ['string', ''])).to.equal(false);
    expect(utils.checkType('number[]', ['', ''])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', 2])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', -2])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', 1.2])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', -1.2])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', NaN])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', []])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', [false]])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', [1]])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', [-1]])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', [1.1]])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', [-1.1]])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', ['']])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', {}])).to.equal(false);
    expect(utils.checkType('number[]', ['string', 'string', { test: false }])).to.equal(false);

    //object
    expect(utils.checkType('number[]', {})).to.equal(false);
    expect(utils.checkType('number[]', { test: 1 })).to.equal(false);
    expect(utils.checkType('number[]', { test: 'string' })).to.equal(false);

    //array
    expect(utils.checkType('number[]', [])).to.equal(false);
    expect(utils.checkType('number[]', [true, false])).to.equal(false);
    expect(utils.checkType('number[]', [1, 2])).to.equal(true);
    expect(utils.checkType('number[]', [-1, -2])).to.equal(true);
    expect(utils.checkType('number[]', [1.2, 2.2])).to.equal(true);
    expect(utils.checkType('number[]', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('number[]', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(utils.checkType('number[]', [1, 'string', true, { test: 'string' }])).to.equal(false);

    //mongo_id
    expect(utils.checkType('number[]', '59d7fce00000000000000000')).to.equal(false);
    expect(utils.checkType('number[]', '59d7fce000000000000000002')).to.equal(false);

    //email
    expect(utils.checkType('number[]', 'test@test.test')).to.equal(false);
    expect(utils.checkType('number[]', 'test@test@test.test')).to.equal(false);
    expect(utils.checkType('number[]', 'test@test,test')).to.equal(false);
    expect(utils.checkType('number[]', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate integer arrays correctly', () => {

    //boolean
    expect(utils.checkType('integer[]', true)).to.equal(false);
    expect(utils.checkType('integer[]', false)).to.equal(false);

    //integer / number
    expect(utils.checkType('integer[]', 0)).to.equal(false);
    expect(utils.checkType('integer[]', 1)).to.equal(false);
    expect(utils.checkType('integer[]', -1)).to.equal(false);
    expect(utils.checkType('integer[]', 1.2)).to.equal(false);
    expect(utils.checkType('integer[]', -1.2)).to.equal(false);
    expect(utils.checkType('integer[]', NaN)).to.equal(false);

    //string
    expect(utils.checkType('integer[]', '')).to.equal(false);
    expect(utils.checkType('integer[]', 'string')).to.equal(false);

    //boolean[]
    expect(utils.checkType('integer[]', [true, false])).to.equal(false);
    expect(utils.checkType('integer[]', [true, false, 1])).to.equal(false);
    expect(utils.checkType('integer[]', [true, false, -1])).to.equal(false);
    expect(utils.checkType('integer[]', [true, false, 1.2])).to.equal(false);
    expect(utils.checkType('integer[]', [true, false, -1.2])).to.equal(false);
    expect(utils.checkType('integer[]', [true, false, NaN])).to.equal(false);
    expect(utils.checkType('integer[]', [true, false, ''])).to.equal(false);
    expect(utils.checkType('integer[]', [true, false, 'string'])).to.equal(false);
    expect(utils.checkType('integer[]', [true, false, []])).to.equal(false);
    expect(utils.checkType('integer[]', [true, false, [false]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('integer[]', [true, false, {}])).to.equal(false);
    expect(utils.checkType('integer[]', [true, false, { test: false }])).to.equal(false);

    //number[]
    expect(utils.checkType('integer[]', [1, 2])).to.equal(true);
    expect(utils.checkType('integer[]', [-1, 2])).to.equal(true);
    expect(utils.checkType('integer[]', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('integer[]', [1, -2.1])).to.equal(false);
    expect(utils.checkType('integer[]', [1.2, 1])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, []])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, { test: false }])).to.equal(false);

    //integer[]
    expect(utils.checkType('integer[]', [1, 2])).to.equal(true);
    expect(utils.checkType('integer[]', [-1, 2])).to.equal(true);
    expect(utils.checkType('integer[]', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('integer[]', [1, -2.1])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, 1])).to.equal(true);
    expect(utils.checkType('integer[]', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, []])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2, { test: false }])).to.equal(false);

    //string[]
    expect(utils.checkType('integer[]', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', ''])).to.equal(false);
    expect(utils.checkType('integer[]', ['', ''])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', 2])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', -2])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', 1.2])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', -1.2])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', NaN])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', []])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', [false]])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', [1]])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', [-1]])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', [1.1]])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', [-1.1]])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', ['']])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', {}])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string', { test: false }])).to.equal(false);

    //object
    expect(utils.checkType('integer[]', {})).to.equal(false);
    expect(utils.checkType('integer[]', { test: 1 })).to.equal(false);
    expect(utils.checkType('integer[]', { test: 'string' })).to.equal(false);

    //array
    expect(utils.checkType('integer[]', [])).to.equal(false);
    expect(utils.checkType('integer[]', [true, false])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 2])).to.equal(true);
    expect(utils.checkType('integer[]', [-1, -2])).to.equal(true);
    expect(utils.checkType('integer[]', [1.2, 2.2])).to.equal(false);
    expect(utils.checkType('integer[]', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('integer[]', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(utils.checkType('integer[]', [1, 'string', true, { test: 'string' }])).to.equal(false);

    //mongo_id
    expect(utils.checkType('integer[]', '59d7fce00000000000000000')).to.equal(false);
    expect(utils.checkType('integer[]', '59d7fce000000000000000002')).to.equal(false);

    //email
    expect(utils.checkType('integer[]', 'test@test.test')).to.equal(false);
    expect(utils.checkType('integer[]', 'test@test@test.test')).to.equal(false);
    expect(utils.checkType('integer[]', 'test@test,test')).to.equal(false);
    expect(utils.checkType('integer[]', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate string arrays correctly', () => {

    //boolean
    expect(utils.checkType('string[]', true)).to.equal(false);
    expect(utils.checkType('string[]', false)).to.equal(false);

    //integer / number
    expect(utils.checkType('string[]', 0)).to.equal(false);
    expect(utils.checkType('string[]', 1)).to.equal(false);
    expect(utils.checkType('string[]', -1)).to.equal(false);
    expect(utils.checkType('string[]', 1.2)).to.equal(false);
    expect(utils.checkType('string[]', -1.2)).to.equal(false);
    expect(utils.checkType('string[]', NaN)).to.equal(false);

    //string
    expect(utils.checkType('string[]', '')).to.equal(false);
    expect(utils.checkType('string[]', 'string')).to.equal(false);

    //boolean[]
    expect(utils.checkType('string[]', [true, false])).to.equal(false);
    expect(utils.checkType('string[]', [true, false, 1])).to.equal(false);
    expect(utils.checkType('string[]', [true, false, -1])).to.equal(false);
    expect(utils.checkType('string[]', [true, false, 1.2])).to.equal(false);
    expect(utils.checkType('string[]', [true, false, -1.2])).to.equal(false);
    expect(utils.checkType('string[]', [true, false, NaN])).to.equal(false);
    expect(utils.checkType('string[]', [true, false, ''])).to.equal(false);
    expect(utils.checkType('string[]', [true, false, 'string'])).to.equal(false);
    expect(utils.checkType('string[]', [true, false, []])).to.equal(false);
    expect(utils.checkType('string[]', [true, false, [false]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('string[]', [true, false, {}])).to.equal(false);
    expect(utils.checkType('string[]', [true, false, { test: false }])).to.equal(false);

    //number[]
    expect(utils.checkType('string[]', [1, 2])).to.equal(false);
    expect(utils.checkType('string[]', [-1, 2])).to.equal(false);
    expect(utils.checkType('string[]', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('string[]', [1, -2.1])).to.equal(false);
    expect(utils.checkType('string[]', [1.2, 1])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, []])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, { test: false }])).to.equal(false);

    //integer[]
    expect(utils.checkType('string[]', [1, 2])).to.equal(false);
    expect(utils.checkType('string[]', [-1, 2])).to.equal(false);
    expect(utils.checkType('string[]', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('string[]', [1, -2.1])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, []])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2, { test: false }])).to.equal(false);

    //string[]
    expect(utils.checkType('string[]', ['string', 'string'])).to.equal(true);
    expect(utils.checkType('string[]', ['string', ''])).to.equal(false);
    expect(utils.checkType('string[]', ['', ''])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', 2])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', -2])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', 1.2])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', -1.2])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', NaN])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', []])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', [false]])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', [1]])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', [-1]])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', [1.1]])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', [-1.1]])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', ['']])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', {}])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string', { test: false }])).to.equal(false);

    //object
    expect(utils.checkType('string[]', {})).to.equal(false);
    expect(utils.checkType('string[]', { test: 1 })).to.equal(false);
    expect(utils.checkType('string[]', { test: 'string' })).to.equal(false);

    //array
    expect(utils.checkType('string[]', [])).to.equal(false);
    expect(utils.checkType('string[]', [true, false])).to.equal(false);
    expect(utils.checkType('string[]', [1, 2])).to.equal(false);
    expect(utils.checkType('string[]', [-1, -2])).to.equal(false);
    expect(utils.checkType('string[]', [1.2, 2.2])).to.equal(false);
    expect(utils.checkType('string[]', ['string', 'string'])).to.equal(true);
    expect(utils.checkType('string[]', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(utils.checkType('string[]', [1, 'string', true, { test: 'string' }])).to.equal(false);

    //mongo_id
    expect(utils.checkType('string[]', '59d7fce00000000000000000')).to.equal(false);
    expect(utils.checkType('string[]', '59d7fce000000000000000002')).to.equal(false);

    //email
    expect(utils.checkType('string[]', 'test@test.test')).to.equal(false);
    expect(utils.checkType('string[]', 'test@test@test.test')).to.equal(false);
    expect(utils.checkType('string[]', 'test@test,test')).to.equal(false);
    expect(utils.checkType('string[]', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate objects correctly', () => {

    //boolean
    expect(utils.checkType('object', true)).to.equal(false);
    expect(utils.checkType('object', false)).to.equal(false);

    //integer / number
    expect(utils.checkType('object', 0)).to.equal(false);
    expect(utils.checkType('object', 1)).to.equal(false);
    expect(utils.checkType('object', -1)).to.equal(false);
    expect(utils.checkType('object', 1.2)).to.equal(false);
    expect(utils.checkType('object', -1.2)).to.equal(false);
    expect(utils.checkType('object', NaN)).to.equal(false);

    //string
    expect(utils.checkType('object', '')).to.equal(false);
    expect(utils.checkType('object', 'string')).to.equal(false);

    //boolean[]
    expect(utils.checkType('object', [true, false])).to.equal(false);
    expect(utils.checkType('object', [true, false, 1])).to.equal(false);
    expect(utils.checkType('object', [true, false, -1])).to.equal(false);
    expect(utils.checkType('object', [true, false, 1.2])).to.equal(false);
    expect(utils.checkType('object', [true, false, -1.2])).to.equal(false);
    expect(utils.checkType('object', [true, false, NaN])).to.equal(false);
    expect(utils.checkType('object', [true, false, ''])).to.equal(false);
    expect(utils.checkType('object', [true, false, 'string'])).to.equal(false);
    expect(utils.checkType('object', [true, false, []])).to.equal(false);
    expect(utils.checkType('object', [true, false, [false]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('object', [true, false, {}])).to.equal(false);
    expect(utils.checkType('object', [true, false, { test: false }])).to.equal(false);

    //number[]
    expect(utils.checkType('object', [1, 2])).to.equal(false);
    expect(utils.checkType('object', [-1, 2])).to.equal(false);
    expect(utils.checkType('object', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('object', [1, -2.1])).to.equal(false);
    expect(utils.checkType('object', [1.2, 1])).to.equal(false);
    expect(utils.checkType('object', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('object', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('object', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('object', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('object', [1, 2, []])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('object', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('object', [1, 2, { test: false }])).to.equal(false);

    //integer[]
    expect(utils.checkType('object', [1, 2])).to.equal(false);
    expect(utils.checkType('object', [-1, 2])).to.equal(false);
    expect(utils.checkType('object', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('object', [1, -2.1])).to.equal(false);
    expect(utils.checkType('object', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('object', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('object', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('object', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('object', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('object', [1, 2, []])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('object', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('object', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('object', [1, 2, { test: false }])).to.equal(false);

    //string[]
    expect(utils.checkType('object', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('object', ['string', ''])).to.equal(false);
    expect(utils.checkType('object', ['', ''])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', 2])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', -2])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', 1.2])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', -1.2])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', NaN])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', []])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', [false]])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', [1]])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', [-1]])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', [1.1]])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', [-1.1]])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', ['']])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', {}])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string', { test: false }])).to.equal(false);

    //object
    expect(utils.checkType('object', {})).to.equal(false);
    expect(utils.checkType('object', { test: 1 })).to.equal(true);
    expect(utils.checkType('object', { test: 'string' })).to.equal(true);

    //array
    expect(utils.checkType('object', [])).to.equal(false);
    expect(utils.checkType('object', [true, false])).to.equal(false);
    expect(utils.checkType('object', [1, 2])).to.equal(false);
    expect(utils.checkType('object', [-1, -2])).to.equal(false);
    expect(utils.checkType('object', [1.2, 2.2])).to.equal(false);
    expect(utils.checkType('object', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('object', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(utils.checkType('object', [1, 'string', true, { test: 'string' }])).to.equal(false);

    //mongo_id
    expect(utils.checkType('object', '59d7fce00000000000000000')).to.equal(false);
    expect(utils.checkType('object', '59d7fce000000000000000002')).to.equal(false);

    //email
    expect(utils.checkType('object', 'test@test.test')).to.equal(false);
    expect(utils.checkType('object', 'test@test@test.test')).to.equal(false);
    expect(utils.checkType('object', 'test@test,test')).to.equal(false);
    expect(utils.checkType('object', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate arrays correctly', () => {

    //boolean
    expect(utils.checkType('array', true)).to.equal(false);
    expect(utils.checkType('array', false)).to.equal(false);

    //integer / number
    expect(utils.checkType('array', 0)).to.equal(false);
    expect(utils.checkType('array', 1)).to.equal(false);
    expect(utils.checkType('array', -1)).to.equal(false);
    expect(utils.checkType('array', 1.2)).to.equal(false);
    expect(utils.checkType('array', -1.2)).to.equal(false);
    expect(utils.checkType('array', NaN)).to.equal(false);

    //string
    expect(utils.checkType('array', '')).to.equal(false);
    expect(utils.checkType('array', 'string')).to.equal(false);

    //boolean[]
    expect(utils.checkType('array', [true, false])).to.equal(true);
    expect(utils.checkType('array', [true, false, 1])).to.equal(true);
    expect(utils.checkType('array', [true, false, -1])).to.equal(true);
    expect(utils.checkType('array', [true, false, 1.2])).to.equal(true);
    expect(utils.checkType('array', [true, false, -1.2])).to.equal(true);
    expect(utils.checkType('array', [true, false, NaN])).to.equal(true);
    expect(utils.checkType('array', [true, false, ''])).to.equal(true);
    expect(utils.checkType('array', [true, false, 'string'])).to.equal(true);
    expect(utils.checkType('array', [true, false, []])).to.equal(true);
    expect(utils.checkType('array', [true, false, [false]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [1]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [-1]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [1.1]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [-1.1]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, ['']])).to.equal(true);
    expect(utils.checkType('array', [true, false, {}])).to.equal(true);
    expect(utils.checkType('array', [true, false, { test: false }])).to.equal(true);

    //number[]
    expect(utils.checkType('array', [1, 2])).to.equal(true);
    expect(utils.checkType('array', [-1, 2])).to.equal(true);
    expect(utils.checkType('array', [-1, 2.1])).to.equal(true);
    expect(utils.checkType('array', [1, -2.1])).to.equal(true);
    expect(utils.checkType('array', [1.2, 1])).to.equal(true);
    expect(utils.checkType('array', [1, 2, 1.2])).to.equal(true);
    expect(utils.checkType('array', [1, 2, NaN])).to.equal(true);
    expect(utils.checkType('array', [1, 2, ''])).to.equal(true);
    expect(utils.checkType('array', [1, 2, 'string'])).to.equal(true);
    expect(utils.checkType('array', [1, 2, []])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [false]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [1]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [-1]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [1.1]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [-1.1]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, ['']])).to.equal(true);
    expect(utils.checkType('array', [1, 2, {}])).to.equal(true);
    expect(utils.checkType('array', [1, 2, { test: false }])).to.equal(true);

    //integer[]
    expect(utils.checkType('array', [1, 2])).to.equal(true);
    expect(utils.checkType('array', [-1, 2])).to.equal(true);
    expect(utils.checkType('array', [-1, 2.1])).to.equal(true);
    expect(utils.checkType('array', [1, -2.1])).to.equal(true);
    expect(utils.checkType('array', [1, 2, 1])).to.equal(true);
    expect(utils.checkType('array', [1, 2, 1.2])).to.equal(true);
    expect(utils.checkType('array', [1, 2, NaN])).to.equal(true);
    expect(utils.checkType('array', [1, 2, ''])).to.equal(true);
    expect(utils.checkType('array', [1, 2, 'string'])).to.equal(true);
    expect(utils.checkType('array', [1, 2, []])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [false]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [1]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [-1]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [1.1]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, [-1.1]])).to.equal(true);
    expect(utils.checkType('array', [1, 2, ['']])).to.equal(true);
    expect(utils.checkType('array', [1, 2, {}])).to.equal(true);
    expect(utils.checkType('array', [1, 2, { test: false }])).to.equal(true);

    //string[]
    expect(utils.checkType('array', ['string', 'string'])).to.equal(true);
    expect(utils.checkType('array', ['string', ''])).to.equal(true);
    expect(utils.checkType('array', ['', ''])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', 2])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', -2])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', 1.2])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', -1.2])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', NaN])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', []])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', [false]])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', [1]])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', [-1]])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', [1.1]])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', [-1.1]])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', ['']])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', {}])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string', { test: false }])).to.equal(true);

    //object
    expect(utils.checkType('array', {})).to.equal(false);
    expect(utils.checkType('array', { test: 1 })).to.equal(false);
    expect(utils.checkType('array', { test: 'string' })).to.equal(false);

    //array
    expect(utils.checkType('array', [])).to.equal(false);
    expect(utils.checkType('array', [true, false])).to.equal(true);
    expect(utils.checkType('array', [1, 2])).to.equal(true);
    expect(utils.checkType('array', [-1, -2])).to.equal(true);
    expect(utils.checkType('array', [1.2, 2.2])).to.equal(true);
    expect(utils.checkType('array', ['string', 'string'])).to.equal(true);
    expect(utils.checkType('array', [{ test: 'string' }, { test: 'string' }])).to.equal(true);
    expect(utils.checkType('array', [1, 'string', true, { test: 'string' }])).to.equal(true);

    //mongo_id
    expect(utils.checkType('array', '59d7fce00000000000000000')).to.equal(false);
    expect(utils.checkType('array', '59d7fce000000000000000002')).to.equal(false);

    //email
    expect(utils.checkType('array', 'test@test.test')).to.equal(false);
    expect(utils.checkType('array', 'test@test@test.test')).to.equal(false);
    expect(utils.checkType('array', 'test@test,test')).to.equal(false);
    expect(utils.checkType('array', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate mongo_id correctly', () => {

    //boolean
    expect(utils.checkType('mongo_id', true)).to.equal(false);
    expect(utils.checkType('mongo_id', false)).to.equal(false);

    //integer / number
    expect(utils.checkType('mongo_id', 0)).to.equal(false);
    expect(utils.checkType('mongo_id', 1)).to.equal(false);
    expect(utils.checkType('mongo_id', -1)).to.equal(false);
    expect(utils.checkType('mongo_id', 1.2)).to.equal(false);
    expect(utils.checkType('mongo_id', -1.2)).to.equal(false);
    expect(utils.checkType('mongo_id', NaN)).to.equal(false);

    //string
    expect(utils.checkType('mongo_id', '')).to.equal(false);
    expect(utils.checkType('mongo_id', 'string')).to.equal(false);

    //boolean[]
    expect(utils.checkType('mongo_id', [true, false])).to.equal(false);
    expect(utils.checkType('mongo_id', [true, false, 1])).to.equal(false);
    expect(utils.checkType('mongo_id', [true, false, -1])).to.equal(false);
    expect(utils.checkType('mongo_id', [true, false, 1.2])).to.equal(false);
    expect(utils.checkType('mongo_id', [true, false, -1.2])).to.equal(false);
    expect(utils.checkType('mongo_id', [true, false, NaN])).to.equal(false);
    expect(utils.checkType('mongo_id', [true, false, ''])).to.equal(false);
    expect(utils.checkType('mongo_id', [true, false, 'string'])).to.equal(false);
    expect(utils.checkType('mongo_id', [true, false, []])).to.equal(false);
    expect(utils.checkType('mongo_id', [true, false, [false]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('mongo_id', [true, false, {}])).to.equal(false);
    expect(utils.checkType('mongo_id', [true, false, { test: false }])).to.equal(false);

    //number[]
    expect(utils.checkType('mongo_id', [1, 2])).to.equal(false);
    expect(utils.checkType('mongo_id', [-1, 2])).to.equal(false);
    expect(utils.checkType('mongo_id', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, -2.1])).to.equal(false);
    expect(utils.checkType('mongo_id', [1.2, 1])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, []])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, { test: false }])).to.equal(false);

    //integer[]
    expect(utils.checkType('mongo_id', [1, 2])).to.equal(false);
    expect(utils.checkType('mongo_id', [-1, 2])).to.equal(false);
    expect(utils.checkType('mongo_id', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, -2.1])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, []])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2, { test: false }])).to.equal(false);

    //string[]
    expect(utils.checkType('mongo_id', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', ''])).to.equal(false);
    expect(utils.checkType('mongo_id', ['', ''])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', 2])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', -2])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', 1.2])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', -1.2])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', NaN])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', []])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', [false]])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', [1]])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', [-1]])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', [1.1]])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', [-1.1]])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', ['']])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', {}])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string', { test: false }])).to.equal(false);

    //object
    expect(utils.checkType('mongo_id', {})).to.equal(false);
    expect(utils.checkType('mongo_id', { test: 1 })).to.equal(false);
    expect(utils.checkType('mongo_id', { test: 'string' })).to.equal(false);

    //array
    expect(utils.checkType('mongo_id', [])).to.equal(false);
    expect(utils.checkType('mongo_id', [true, false])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 2])).to.equal(false);
    expect(utils.checkType('mongo_id', [-1, -2])).to.equal(false);
    expect(utils.checkType('mongo_id', [1.2, 2.2])).to.equal(false);
    expect(utils.checkType('mongo_id', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('mongo_id', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(utils.checkType('mongo_id', [1, 'string', true, { test: 'string' }])).to.equal(false);

    //mongo_id
    expect(utils.checkType('mongo_id', '59d7fce00000000000000000')).to.equal(true);
    expect(utils.checkType('mongo_id', '59d7fce000000000000000002')).to.equal(false);

    //email
    expect(utils.checkType('mongo_id', 'test@test.test')).to.equal(false);
    expect(utils.checkType('mongo_id', 'test@test@test.test')).to.equal(false);
    expect(utils.checkType('mongo_id', 'test@test,test')).to.equal(false);
    expect(utils.checkType('mongo_id', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate emails correctly', () => {

    //boolean
    expect(utils.checkType('email', true)).to.equal(false);
    expect(utils.checkType('email', false)).to.equal(false);

    //integer / number
    expect(utils.checkType('email', 0)).to.equal(false);
    expect(utils.checkType('email', 1)).to.equal(false);
    expect(utils.checkType('email', -1)).to.equal(false);
    expect(utils.checkType('email', 1.2)).to.equal(false);
    expect(utils.checkType('email', -1.2)).to.equal(false);
    expect(utils.checkType('email', NaN)).to.equal(false);

    //string
    expect(utils.checkType('email', '')).to.equal(false);
    expect(utils.checkType('email', 'string')).to.equal(false);

    //boolean[]
    expect(utils.checkType('email', [true, false])).to.equal(false);
    expect(utils.checkType('email', [true, false, 1])).to.equal(false);
    expect(utils.checkType('email', [true, false, -1])).to.equal(false);
    expect(utils.checkType('email', [true, false, 1.2])).to.equal(false);
    expect(utils.checkType('email', [true, false, -1.2])).to.equal(false);
    expect(utils.checkType('email', [true, false, NaN])).to.equal(false);
    expect(utils.checkType('email', [true, false, ''])).to.equal(false);
    expect(utils.checkType('email', [true, false, 'string'])).to.equal(false);
    expect(utils.checkType('email', [true, false, []])).to.equal(false);
    expect(utils.checkType('email', [true, false, [false]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('email', [true, false, {}])).to.equal(false);
    expect(utils.checkType('email', [true, false, { test: false }])).to.equal(false);

    //number[]
    expect(utils.checkType('email', [1, 2])).to.equal(false);
    expect(utils.checkType('email', [-1, 2])).to.equal(false);
    expect(utils.checkType('email', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('email', [1, -2.1])).to.equal(false);
    expect(utils.checkType('email', [1.2, 1])).to.equal(false);
    expect(utils.checkType('email', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('email', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('email', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('email', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('email', [1, 2, []])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('email', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('email', [1, 2, { test: false }])).to.equal(false);

    //integer[]
    expect(utils.checkType('email', [1, 2])).to.equal(false);
    expect(utils.checkType('email', [-1, 2])).to.equal(false);
    expect(utils.checkType('email', [-1, 2.1])).to.equal(false);
    expect(utils.checkType('email', [1, -2.1])).to.equal(false);
    expect(utils.checkType('email', [1, 2, 1])).to.equal(false);
    expect(utils.checkType('email', [1, 2, 1.2])).to.equal(false);
    expect(utils.checkType('email', [1, 2, NaN])).to.equal(false);
    expect(utils.checkType('email', [1, 2, ''])).to.equal(false);
    expect(utils.checkType('email', [1, 2, 'string'])).to.equal(false);
    expect(utils.checkType('email', [1, 2, []])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [false]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [1]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [-1]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [1.1]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, [-1.1]])).to.equal(false);
    expect(utils.checkType('email', [1, 2, ['']])).to.equal(false);
    expect(utils.checkType('email', [1, 2, {}])).to.equal(false);
    expect(utils.checkType('email', [1, 2, { test: false }])).to.equal(false);

    //string[]
    expect(utils.checkType('email', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('email', ['string', ''])).to.equal(false);
    expect(utils.checkType('email', ['', ''])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', 2])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', -2])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', 1.2])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', -1.2])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', NaN])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', []])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', [false]])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', [1]])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', [-1]])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', [1.1]])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', [-1.1]])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', ['']])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', {}])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string', { test: false }])).to.equal(false);

    //object
    expect(utils.checkType('email', {})).to.equal(false);
    expect(utils.checkType('email', { test: 1 })).to.equal(false);
    expect(utils.checkType('email', { test: 'string' })).to.equal(false);

    //array
    expect(utils.checkType('email', [])).to.equal(false);
    expect(utils.checkType('email', [true, false])).to.equal(false);
    expect(utils.checkType('email', [1, 2])).to.equal(false);
    expect(utils.checkType('email', [-1, -2])).to.equal(false);
    expect(utils.checkType('email', [1.2, 2.2])).to.equal(false);
    expect(utils.checkType('email', ['string', 'string'])).to.equal(false);
    expect(utils.checkType('email', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(utils.checkType('email', [1, 'string', true, { test: 'string' }])).to.equal(false);

    //mongo_id
    expect(utils.checkType('email', '59d7fce00000000000000000')).to.equal(false);
    expect(utils.checkType('email', '59d7fce000000000000000002')).to.equal(false);

    //email
    expect(utils.checkType('email', 'test@test.test')).to.equal(true);
    expect(utils.checkType('email', 'test@test@test.test')).to.equal(false);
    expect(utils.checkType('email', 'test@test,test')).to.equal(false);
    expect(utils.checkType('email', 'testtest,test')).to.equal(false);
  });
});