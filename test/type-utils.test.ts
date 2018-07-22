import * as chai from 'chai';
import { Utils } from '../src/entities/utils';

const expect = chai.expect;

describe('Utils Type Validation', () => {
  it('should be able to validate boolean correctly', () => {
    // boolean
    expect(Utils.checkType('boolean', true)).to.equal(true);
    expect(Utils.checkType('boolean', false)).to.equal(true);

    // integer / number
    expect(Utils.checkType('boolean', 0)).to.equal(false);
    expect(Utils.checkType('boolean', 1)).to.equal(false);
    expect(Utils.checkType('boolean', -1)).to.equal(false);
    expect(Utils.checkType('boolean', 1.2)).to.equal(false);
    expect(Utils.checkType('boolean', -1.2)).to.equal(false);
    expect(Utils.checkType('boolean', NaN)).to.equal(false);

    // string
    expect(Utils.checkType('boolean', '')).to.equal(false);
    expect(Utils.checkType('boolean', 'string')).to.equal(false);

    // boolean[]
    expect(Utils.checkType('boolean', [true, false])).to.equal(false);
    expect(Utils.checkType('boolean', [true, false, 1])).to.equal(false);
    expect(Utils.checkType('boolean', [true, false, -1])).to.equal(false);
    expect(Utils.checkType('boolean', [true, false, 1.2])).to.equal(false);
    expect(Utils.checkType('boolean', [true, false, -1.2])).to.equal(false);
    expect(Utils.checkType('boolean', [true, false, NaN])).to.equal(false);
    expect(Utils.checkType('boolean', [true, false, ''])).to.equal(false);
    expect(Utils.checkType('boolean', [true, false, 'string'])).to.equal(false);
    expect(Utils.checkType('boolean', [true, false, []])).to.equal(false);
    expect(Utils.checkType('boolean', [true, false, [false]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('boolean', [true, false, {}])).to.equal(false);
    expect(Utils.checkType('boolean', [true, false, { test: false }])).to.equal(false);

    // number[]
    expect(Utils.checkType('boolean', [1, 2])).to.equal(false);
    expect(Utils.checkType('boolean', [-1, 2])).to.equal(false);
    expect(Utils.checkType('boolean', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('boolean', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, { test: false }])).to.equal(false);

    // integer[]
    expect(Utils.checkType('boolean', [1, 2])).to.equal(false);
    expect(Utils.checkType('boolean', [-1, 2])).to.equal(false);
    expect(Utils.checkType('boolean', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('boolean', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2, { test: false }])).to.equal(false);

    // string[]
    expect(Utils.checkType('boolean', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', ''])).to.equal(false);
    expect(Utils.checkType('boolean', ['', ''])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', 2])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', -2])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', 1.2])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', -1.2])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', NaN])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', []])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', [false]])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', [1]])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', [-1]])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', [1.1]])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', [-1.1]])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', ['']])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', {}])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string', { test: false }])).to.equal(false);

    // object
    expect(Utils.checkType('boolean', {})).to.equal(false);
    expect(Utils.checkType('boolean', { test: 1 })).to.equal(false);
    expect(Utils.checkType('boolean', { test: 'string' })).to.equal(false);

    // array
    expect(Utils.checkType('boolean', [])).to.equal(false);
    expect(Utils.checkType('boolean', [true, false])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 2])).to.equal(false);
    expect(Utils.checkType('boolean', [-1, -2])).to.equal(false);
    expect(Utils.checkType('boolean', [1.2, 2.2])).to.equal(false);
    expect(Utils.checkType('boolean', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('boolean', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(Utils.checkType('boolean', [1, 'string', true, { test: 'string' }])).to.equal(false);

    // mongo_id
    expect(Utils.checkType('boolean', '59d7fce00000000000000000')).to.equal(false);
    expect(Utils.checkType('boolean', '59d7fce000000000000000002')).to.equal(false);

    // email
    expect(Utils.checkType('boolean', 'test@test.test')).to.equal(false);
    expect(Utils.checkType('boolean', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate number correctly', () => {
    // boolean
    expect(Utils.checkType('number', true)).to.equal(false);
    expect(Utils.checkType('number', false)).to.equal(false);

    // integer / number
    expect(Utils.checkType('number', 0)).to.equal(true);
    expect(Utils.checkType('number', 1)).to.equal(true);
    expect(Utils.checkType('number', -1)).to.equal(true);
    expect(Utils.checkType('number', 1.2)).to.equal(true);
    expect(Utils.checkType('number', -1.2)).to.equal(true);
    expect(Utils.checkType('number', NaN)).to.equal(false);

    // string
    expect(Utils.checkType('number', '')).to.equal(false);
    expect(Utils.checkType('number', 'string')).to.equal(false);

    // boolean[]
    expect(Utils.checkType('number', [true, false])).to.equal(false);
    expect(Utils.checkType('number', [true, false, 1])).to.equal(false);
    expect(Utils.checkType('number', [true, false, -1])).to.equal(false);
    expect(Utils.checkType('number', [true, false, 1.2])).to.equal(false);
    expect(Utils.checkType('number', [true, false, -1.2])).to.equal(false);
    expect(Utils.checkType('number', [true, false, NaN])).to.equal(false);
    expect(Utils.checkType('number', [true, false, ''])).to.equal(false);
    expect(Utils.checkType('number', [true, false, 'string'])).to.equal(false);
    expect(Utils.checkType('number', [true, false, []])).to.equal(false);
    expect(Utils.checkType('number', [true, false, [false]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('number', [true, false, {}])).to.equal(false);
    expect(Utils.checkType('number', [true, false, { test: false }])).to.equal(false);

    // number[]
    expect(Utils.checkType('number', [1, 2])).to.equal(false);
    expect(Utils.checkType('number', [-1, 2])).to.equal(false);
    expect(Utils.checkType('number', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('number', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, { test: false }])).to.equal(false);

    // integer[]
    expect(Utils.checkType('number', [1, 2])).to.equal(false);
    expect(Utils.checkType('number', [-1, 2])).to.equal(false);
    expect(Utils.checkType('number', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('number', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('number', [1, 2, { test: false }])).to.equal(false);

    // string[]
    expect(Utils.checkType('number', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('number', ['string', ''])).to.equal(false);
    expect(Utils.checkType('number', ['', ''])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', 2])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', -2])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', 1.2])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', -1.2])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', NaN])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', []])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', [false]])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', [1]])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', [-1]])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', [1.1]])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', [-1.1]])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', ['']])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', {}])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string', { test: false }])).to.equal(false);

    // object
    expect(Utils.checkType('number', {})).to.equal(false);
    expect(Utils.checkType('number', { test: 1 })).to.equal(false);
    expect(Utils.checkType('number', { test: 'string' })).to.equal(false);

    // array
    expect(Utils.checkType('number', [])).to.equal(false);
    expect(Utils.checkType('number', [true, false])).to.equal(false);
    expect(Utils.checkType('number', [1, 2])).to.equal(false);
    expect(Utils.checkType('number', [-1, -2])).to.equal(false);
    expect(Utils.checkType('number', [1.2, 2.2])).to.equal(false);
    expect(Utils.checkType('number', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('number', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(Utils.checkType('number', [1, 'string', true, { test: 'string' }])).to.equal(false);

    // mongo_id
    expect(Utils.checkType('number', '59d7fce00000000000000000')).to.equal(false);
    expect(Utils.checkType('number', '59d7fce000000000000000002')).to.equal(false);

    // email
    expect(Utils.checkType('number', 'test@test.test')).to.equal(false);
    expect(Utils.checkType('number', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate integers correctly', () => {
    // boolean
    expect(Utils.checkType('integer', true)).to.equal(false);
    expect(Utils.checkType('integer', false)).to.equal(false);

    // integer / number
    expect(Utils.checkType('integer', 0)).to.equal(true);
    expect(Utils.checkType('integer', 1)).to.equal(true);
    expect(Utils.checkType('integer', -1)).to.equal(true);
    expect(Utils.checkType('integer', 1.2)).to.equal(false);
    expect(Utils.checkType('integer', -1.2)).to.equal(false);
    expect(Utils.checkType('integer', NaN)).to.equal(false);

    // string
    expect(Utils.checkType('integer', '')).to.equal(false);
    expect(Utils.checkType('integer', 'string')).to.equal(false);

    // boolean[]
    expect(Utils.checkType('integer', [true, false])).to.equal(false);
    expect(Utils.checkType('integer', [true, false, 1])).to.equal(false);
    expect(Utils.checkType('integer', [true, false, -1])).to.equal(false);
    expect(Utils.checkType('integer', [true, false, 1.2])).to.equal(false);
    expect(Utils.checkType('integer', [true, false, -1.2])).to.equal(false);
    expect(Utils.checkType('integer', [true, false, NaN])).to.equal(false);
    expect(Utils.checkType('integer', [true, false, ''])).to.equal(false);
    expect(Utils.checkType('integer', [true, false, 'string'])).to.equal(false);
    expect(Utils.checkType('integer', [true, false, []])).to.equal(false);
    expect(Utils.checkType('integer', [true, false, [false]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('integer', [true, false, {}])).to.equal(false);
    expect(Utils.checkType('integer', [true, false, { test: false }])).to.equal(false);

    // number[]
    expect(Utils.checkType('integer', [1, 2])).to.equal(false);
    expect(Utils.checkType('integer', [-1, 2])).to.equal(false);
    expect(Utils.checkType('integer', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('integer', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, { test: false }])).to.equal(false);

    // integer[]
    expect(Utils.checkType('integer', [1, 2])).to.equal(false);
    expect(Utils.checkType('integer', [-1, 2])).to.equal(false);
    expect(Utils.checkType('integer', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('integer', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2, { test: false }])).to.equal(false);

    // string[]
    expect(Utils.checkType('integer', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('integer', ['string', ''])).to.equal(false);
    expect(Utils.checkType('integer', ['', ''])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', 2])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', -2])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', 1.2])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', -1.2])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', NaN])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', []])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', [false]])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', [1]])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', [-1]])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', [1.1]])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', [-1.1]])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', ['']])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', {}])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string', { test: false }])).to.equal(false);

    // object
    expect(Utils.checkType('integer', {})).to.equal(false);
    expect(Utils.checkType('integer', { test: 1 })).to.equal(false);
    expect(Utils.checkType('integer', { test: 'string' })).to.equal(false);

    // array
    expect(Utils.checkType('integer', [])).to.equal(false);
    expect(Utils.checkType('integer', [true, false])).to.equal(false);
    expect(Utils.checkType('integer', [1, 2])).to.equal(false);
    expect(Utils.checkType('integer', [-1, -2])).to.equal(false);
    expect(Utils.checkType('integer', [1.2, 2.2])).to.equal(false);
    expect(Utils.checkType('integer', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('integer', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(Utils.checkType('integer', [1, 'string', true, { test: 'string' }])).to.equal(false);

    // mongo_id
    expect(Utils.checkType('integer', '59d7fce00000000000000000')).to.equal(false);
    expect(Utils.checkType('integer', '59d7fce000000000000000002')).to.equal(false);

    // email
    expect(Utils.checkType('integer', 'test@test.test')).to.equal(false);
    expect(Utils.checkType('integer', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate strings correctly', () => {
    // boolean
    expect(Utils.checkType('string', true)).to.equal(false);
    expect(Utils.checkType('string', false)).to.equal(false);

    // integer / number
    expect(Utils.checkType('string', 0)).to.equal(false);
    expect(Utils.checkType('string', 1)).to.equal(false);
    expect(Utils.checkType('string', -1)).to.equal(false);
    expect(Utils.checkType('string', 1.2)).to.equal(false);
    expect(Utils.checkType('string', -1.2)).to.equal(false);
    expect(Utils.checkType('string', NaN)).to.equal(false);

    // string
    expect(Utils.checkType('string', '')).to.equal(false);
    expect(Utils.checkType('string', 'string')).to.equal(true);

    // boolean[]
    expect(Utils.checkType('string', [true, false])).to.equal(false);
    expect(Utils.checkType('string', [true, false, 1])).to.equal(false);
    expect(Utils.checkType('string', [true, false, -1])).to.equal(false);
    expect(Utils.checkType('string', [true, false, 1.2])).to.equal(false);
    expect(Utils.checkType('string', [true, false, -1.2])).to.equal(false);
    expect(Utils.checkType('string', [true, false, NaN])).to.equal(false);
    expect(Utils.checkType('string', [true, false, ''])).to.equal(false);
    expect(Utils.checkType('string', [true, false, 'string'])).to.equal(false);
    expect(Utils.checkType('string', [true, false, []])).to.equal(false);
    expect(Utils.checkType('string', [true, false, [false]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('string', [true, false, {}])).to.equal(false);
    expect(Utils.checkType('string', [true, false, { test: false }])).to.equal(false);

    // number[]
    expect(Utils.checkType('string', [1, 2])).to.equal(false);
    expect(Utils.checkType('string', [-1, 2])).to.equal(false);
    expect(Utils.checkType('string', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('string', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, { test: false }])).to.equal(false);

    // integer[]
    expect(Utils.checkType('string', [1, 2])).to.equal(false);
    expect(Utils.checkType('string', [-1, 2])).to.equal(false);
    expect(Utils.checkType('string', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('string', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('string', [1, 2, { test: false }])).to.equal(false);

    // string[]
    expect(Utils.checkType('string', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('string', ['string', ''])).to.equal(false);
    expect(Utils.checkType('string', ['', ''])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', 2])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', -2])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', 1.2])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', -1.2])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', NaN])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', []])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', [false]])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', [1]])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', [-1]])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', [1.1]])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', [-1.1]])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', ['']])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', {}])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string', { test: false }])).to.equal(false);

    // object
    expect(Utils.checkType('string', {})).to.equal(false);
    expect(Utils.checkType('string', { test: 1 })).to.equal(false);
    expect(Utils.checkType('string', { test: 'string' })).to.equal(false);

    // array
    expect(Utils.checkType('string', [])).to.equal(false);
    expect(Utils.checkType('string', [true, false])).to.equal(false);
    expect(Utils.checkType('string', [1, 2])).to.equal(false);
    expect(Utils.checkType('string', [-1, -2])).to.equal(false);
    expect(Utils.checkType('string', [1.2, 2.2])).to.equal(false);
    expect(Utils.checkType('string', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('string', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(Utils.checkType('string', [1, 'string', true, { test: 'string' }])).to.equal(false);

    // mongo_id
    expect(Utils.checkType('string', '59d7fce00000000000000000')).to.equal(true);
    expect(Utils.checkType('string', '59d7fce000000000000000002')).to.equal(true);

    // email
    expect(Utils.checkType('string', 'test@test.test')).to.equal(true);
    expect(Utils.checkType('string', 'testtest,test')).to.equal(true);
  });
  it('should be able to validate boolean arrays correctly', () => {

    // boolean
    expect(Utils.checkType('boolean[]', true)).to.equal(false);
    expect(Utils.checkType('boolean[]', false)).to.equal(false);

    // integer / number
    expect(Utils.checkType('boolean[]', 0)).to.equal(false);
    expect(Utils.checkType('boolean[]', 1)).to.equal(false);
    expect(Utils.checkType('boolean[]', -1)).to.equal(false);
    expect(Utils.checkType('boolean[]', 1.2)).to.equal(false);
    expect(Utils.checkType('boolean[]', -1.2)).to.equal(false);
    expect(Utils.checkType('boolean[]', NaN)).to.equal(false);

    // string
    expect(Utils.checkType('boolean[]', '')).to.equal(false);
    expect(Utils.checkType('boolean[]', 'string')).to.equal(false);

    // boolean[]
    expect(Utils.checkType('boolean[]', [true, false])).to.equal(true);
    expect(Utils.checkType('boolean[]', [true, false, 1])).to.equal(false);
    expect(Utils.checkType('boolean[]', [true, false, -1])).to.equal(false);
    expect(Utils.checkType('boolean[]', [true, false, 1.2])).to.equal(false);
    expect(Utils.checkType('boolean[]', [true, false, -1.2])).to.equal(false);
    expect(Utils.checkType('boolean[]', [true, false, NaN])).to.equal(false);
    expect(Utils.checkType('boolean[]', [true, false, ''])).to.equal(false);
    expect(Utils.checkType('boolean[]', [true, false, 'string'])).to.equal(false);
    expect(Utils.checkType('boolean[]', [true, false, []])).to.equal(false);
    expect(Utils.checkType('boolean[]', [true, false, [false]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('boolean[]', [true, false, {}])).to.equal(false);
    expect(Utils.checkType('boolean[]', [true, false, { test: false }])).to.equal(false);

    // number[]
    expect(Utils.checkType('boolean[]', [1, 2])).to.equal(false);
    expect(Utils.checkType('boolean[]', [-1, 2])).to.equal(false);
    expect(Utils.checkType('boolean[]', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, { test: false }])).to.equal(false);

    // integer[]
    expect(Utils.checkType('boolean[]', [1, 2])).to.equal(false);
    expect(Utils.checkType('boolean[]', [-1, 2])).to.equal(false);
    expect(Utils.checkType('boolean[]', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 2, { test: false }])).to.equal(false);

    // string[]
    expect(Utils.checkType('boolean[]', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', ''])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['', ''])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', 2])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', -2])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', 1.2])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', -1.2])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', NaN])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', []])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', [false]])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', [1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', [-1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', [1.1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', [-1.1]])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', ['']])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', {}])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string', { test: false }])).to.equal(false);

    // object
    expect(Utils.checkType('boolean[]', {})).to.equal(false);
    expect(Utils.checkType('boolean[]', { test: 1 })).to.equal(false);
    expect(Utils.checkType('boolean[]', { test: 'string' })).to.equal(false);

    // array
    expect(Utils.checkType('boolean[]', [])).to.equal(false);
    expect(Utils.checkType('boolean[]', [true, false])).to.equal(true);
    expect(Utils.checkType('boolean[]', [1, 2])).to.equal(false);
    expect(Utils.checkType('boolean[]', [-1, -2])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1.2, 2.2])).to.equal(false);
    expect(Utils.checkType('boolean[]', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('boolean[]', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(Utils.checkType('boolean[]', [1, 'string', true, { test: 'string' }])).to.equal(false);

    // mongo_id
    expect(Utils.checkType('boolean[]', '59d7fce00000000000000000')).to.equal(false);
    expect(Utils.checkType('boolean[]', '59d7fce000000000000000002')).to.equal(false);

    // email
    expect(Utils.checkType('boolean[]', 'test@test.test')).to.equal(false);
    expect(Utils.checkType('boolean[]', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate number arrays correctly', () => {

    // boolean
    expect(Utils.checkType('number[]', true)).to.equal(false);
    expect(Utils.checkType('number[]', false)).to.equal(false);

    // integer / number
    expect(Utils.checkType('number[]', 0)).to.equal(false);
    expect(Utils.checkType('number[]', 1)).to.equal(false);
    expect(Utils.checkType('number[]', -1)).to.equal(false);
    expect(Utils.checkType('number[]', 1.2)).to.equal(false);
    expect(Utils.checkType('number[]', -1.2)).to.equal(false);
    expect(Utils.checkType('number[]', NaN)).to.equal(false);

    // string
    expect(Utils.checkType('number[]', '')).to.equal(false);
    expect(Utils.checkType('number[]', 'string')).to.equal(false);

    // boolean[]
    expect(Utils.checkType('number[]', [true, false])).to.equal(false);
    expect(Utils.checkType('number[]', [true, false, 1])).to.equal(false);
    expect(Utils.checkType('number[]', [true, false, -1])).to.equal(false);
    expect(Utils.checkType('number[]', [true, false, 1.2])).to.equal(false);
    expect(Utils.checkType('number[]', [true, false, -1.2])).to.equal(false);
    expect(Utils.checkType('number[]', [true, false, NaN])).to.equal(false);
    expect(Utils.checkType('number[]', [true, false, ''])).to.equal(false);
    expect(Utils.checkType('number[]', [true, false, 'string'])).to.equal(false);
    expect(Utils.checkType('number[]', [true, false, []])).to.equal(false);
    expect(Utils.checkType('number[]', [true, false, [false]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('number[]', [true, false, {}])).to.equal(false);
    expect(Utils.checkType('number[]', [true, false, { test: false }])).to.equal(false);

    // number[]
    expect(Utils.checkType('number[]', [1, 2])).to.equal(true);
    expect(Utils.checkType('number[]', [-1, 2])).to.equal(true);
    expect(Utils.checkType('number[]', [-1, 2.1])).to.equal(true);
    expect(Utils.checkType('number[]', [1, -2.1])).to.equal(true);
    expect(Utils.checkType('number[]', [1.2, 1])).to.equal(true);
    expect(Utils.checkType('number[]', [1, 2, 1.2])).to.equal(true);
    expect(Utils.checkType('number[]', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, { test: false }])).to.equal(false);

    // integer[]
    expect(Utils.checkType('number[]', [1, 2])).to.equal(true);
    expect(Utils.checkType('number[]', [-1, 2])).to.equal(true);
    expect(Utils.checkType('number[]', [-1, 2.1])).to.equal(true);
    expect(Utils.checkType('number[]', [1, -2.1])).to.equal(true);
    expect(Utils.checkType('number[]', [1, 2, 1])).to.equal(true);
    expect(Utils.checkType('number[]', [1, 2, 1.2])).to.equal(true);
    expect(Utils.checkType('number[]', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2, { test: false }])).to.equal(false);

    // string[]
    expect(Utils.checkType('number[]', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', ''])).to.equal(false);
    expect(Utils.checkType('number[]', ['', ''])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', 2])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', -2])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', 1.2])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', -1.2])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', NaN])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', []])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', [false]])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', [1]])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', [-1]])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', [1.1]])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', [-1.1]])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', ['']])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', {}])).to.equal(false);
    expect(Utils.checkType('number[]', ['string', 'string', { test: false }])).to.equal(false);

    // object
    expect(Utils.checkType('number[]', {})).to.equal(false);
    expect(Utils.checkType('number[]', { test: 1 })).to.equal(false);
    expect(Utils.checkType('number[]', { test: 'string' })).to.equal(false);

    // array
    expect(Utils.checkType('number[]', [])).to.equal(false);
    expect(Utils.checkType('number[]', [true, false])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 2])).to.equal(true);
    expect(Utils.checkType('number[]', [-1, -2])).to.equal(true);
    expect(Utils.checkType('number[]', [1.2, 2.2])).to.equal(true);
    expect(Utils.checkType('number[]', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('number[]', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(Utils.checkType('number[]', [1, 'string', true, { test: 'string' }])).to.equal(false);

    // mongo_id
    expect(Utils.checkType('number[]', '59d7fce00000000000000000')).to.equal(false);
    expect(Utils.checkType('number[]', '59d7fce000000000000000002')).to.equal(false);

    // email
    expect(Utils.checkType('number[]', 'test@test.test')).to.equal(false);
    expect(Utils.checkType('number[]', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate integer arrays correctly', () => {

    // boolean
    expect(Utils.checkType('integer[]', true)).to.equal(false);
    expect(Utils.checkType('integer[]', false)).to.equal(false);

    // integer / number
    expect(Utils.checkType('integer[]', 0)).to.equal(false);
    expect(Utils.checkType('integer[]', 1)).to.equal(false);
    expect(Utils.checkType('integer[]', -1)).to.equal(false);
    expect(Utils.checkType('integer[]', 1.2)).to.equal(false);
    expect(Utils.checkType('integer[]', -1.2)).to.equal(false);
    expect(Utils.checkType('integer[]', NaN)).to.equal(false);

    // string
    expect(Utils.checkType('integer[]', '')).to.equal(false);
    expect(Utils.checkType('integer[]', 'string')).to.equal(false);

    // boolean[]
    expect(Utils.checkType('integer[]', [true, false])).to.equal(false);
    expect(Utils.checkType('integer[]', [true, false, 1])).to.equal(false);
    expect(Utils.checkType('integer[]', [true, false, -1])).to.equal(false);
    expect(Utils.checkType('integer[]', [true, false, 1.2])).to.equal(false);
    expect(Utils.checkType('integer[]', [true, false, -1.2])).to.equal(false);
    expect(Utils.checkType('integer[]', [true, false, NaN])).to.equal(false);
    expect(Utils.checkType('integer[]', [true, false, ''])).to.equal(false);
    expect(Utils.checkType('integer[]', [true, false, 'string'])).to.equal(false);
    expect(Utils.checkType('integer[]', [true, false, []])).to.equal(false);
    expect(Utils.checkType('integer[]', [true, false, [false]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('integer[]', [true, false, {}])).to.equal(false);
    expect(Utils.checkType('integer[]', [true, false, { test: false }])).to.equal(false);

    // number[]
    expect(Utils.checkType('integer[]', [1, 2])).to.equal(true);
    expect(Utils.checkType('integer[]', [-1, 2])).to.equal(true);
    expect(Utils.checkType('integer[]', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('integer[]', [1.2, 1])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, { test: false }])).to.equal(false);

    // integer[]
    expect(Utils.checkType('integer[]', [1, 2])).to.equal(true);
    expect(Utils.checkType('integer[]', [-1, 2])).to.equal(true);
    expect(Utils.checkType('integer[]', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, 1])).to.equal(true);
    expect(Utils.checkType('integer[]', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2, { test: false }])).to.equal(false);

    // string[]
    expect(Utils.checkType('integer[]', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', ''])).to.equal(false);
    expect(Utils.checkType('integer[]', ['', ''])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', 2])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', -2])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', 1.2])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', -1.2])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', NaN])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', []])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', [false]])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', [1]])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', [-1]])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', [1.1]])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', [-1.1]])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', ['']])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', {}])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string', { test: false }])).to.equal(false);

    // object
    expect(Utils.checkType('integer[]', {})).to.equal(false);
    expect(Utils.checkType('integer[]', { test: 1 })).to.equal(false);
    expect(Utils.checkType('integer[]', { test: 'string' })).to.equal(false);

    // array
    expect(Utils.checkType('integer[]', [])).to.equal(false);
    expect(Utils.checkType('integer[]', [true, false])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 2])).to.equal(true);
    expect(Utils.checkType('integer[]', [-1, -2])).to.equal(true);
    expect(Utils.checkType('integer[]', [1.2, 2.2])).to.equal(false);
    expect(Utils.checkType('integer[]', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('integer[]', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(Utils.checkType('integer[]', [1, 'string', true, { test: 'string' }])).to.equal(false);

    // mongo_id
    expect(Utils.checkType('integer[]', '59d7fce00000000000000000')).to.equal(false);
    expect(Utils.checkType('integer[]', '59d7fce000000000000000002')).to.equal(false);

    // email
    expect(Utils.checkType('integer[]', 'test@test.test')).to.equal(false);
    expect(Utils.checkType('integer[]', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate string arrays correctly', () => {

    // boolean
    expect(Utils.checkType('string[]', true)).to.equal(false);
    expect(Utils.checkType('string[]', false)).to.equal(false);

    // integer / number
    expect(Utils.checkType('string[]', 0)).to.equal(false);
    expect(Utils.checkType('string[]', 1)).to.equal(false);
    expect(Utils.checkType('string[]', -1)).to.equal(false);
    expect(Utils.checkType('string[]', 1.2)).to.equal(false);
    expect(Utils.checkType('string[]', -1.2)).to.equal(false);
    expect(Utils.checkType('string[]', NaN)).to.equal(false);

    // string
    expect(Utils.checkType('string[]', '')).to.equal(false);
    expect(Utils.checkType('string[]', 'string')).to.equal(false);

    // boolean[]
    expect(Utils.checkType('string[]', [true, false])).to.equal(false);
    expect(Utils.checkType('string[]', [true, false, 1])).to.equal(false);
    expect(Utils.checkType('string[]', [true, false, -1])).to.equal(false);
    expect(Utils.checkType('string[]', [true, false, 1.2])).to.equal(false);
    expect(Utils.checkType('string[]', [true, false, -1.2])).to.equal(false);
    expect(Utils.checkType('string[]', [true, false, NaN])).to.equal(false);
    expect(Utils.checkType('string[]', [true, false, ''])).to.equal(false);
    expect(Utils.checkType('string[]', [true, false, 'string'])).to.equal(false);
    expect(Utils.checkType('string[]', [true, false, []])).to.equal(false);
    expect(Utils.checkType('string[]', [true, false, [false]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('string[]', [true, false, {}])).to.equal(false);
    expect(Utils.checkType('string[]', [true, false, { test: false }])).to.equal(false);

    // number[]
    expect(Utils.checkType('string[]', [1, 2])).to.equal(false);
    expect(Utils.checkType('string[]', [-1, 2])).to.equal(false);
    expect(Utils.checkType('string[]', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('string[]', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('string[]', [1.2, 1])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, { test: false }])).to.equal(false);

    // integer[]
    expect(Utils.checkType('string[]', [1, 2])).to.equal(false);
    expect(Utils.checkType('string[]', [-1, 2])).to.equal(false);
    expect(Utils.checkType('string[]', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('string[]', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2, { test: false }])).to.equal(false);

    // string[]
    expect(Utils.checkType('string[]', ['string', 'string'])).to.equal(true);
    expect(Utils.checkType('string[]', ['string', ''])).to.equal(false);
    expect(Utils.checkType('string[]', ['', ''])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', 2])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', -2])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', 1.2])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', -1.2])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', NaN])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', []])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', [false]])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', [1]])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', [-1]])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', [1.1]])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', [-1.1]])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', ['']])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', {}])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string', { test: false }])).to.equal(false);

    // object
    expect(Utils.checkType('string[]', {})).to.equal(false);
    expect(Utils.checkType('string[]', { test: 1 })).to.equal(false);
    expect(Utils.checkType('string[]', { test: 'string' })).to.equal(false);

    // array
    expect(Utils.checkType('string[]', [])).to.equal(false);
    expect(Utils.checkType('string[]', [true, false])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 2])).to.equal(false);
    expect(Utils.checkType('string[]', [-1, -2])).to.equal(false);
    expect(Utils.checkType('string[]', [1.2, 2.2])).to.equal(false);
    expect(Utils.checkType('string[]', ['string', 'string'])).to.equal(true);
    expect(Utils.checkType('string[]', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(Utils.checkType('string[]', [1, 'string', true, { test: 'string' }])).to.equal(false);

    // mongo_id
    expect(Utils.checkType('string[]', '59d7fce00000000000000000')).to.equal(false);
    expect(Utils.checkType('string[]', '59d7fce000000000000000002')).to.equal(false);

    // email
    expect(Utils.checkType('string[]', 'test@test.test')).to.equal(false);
    expect(Utils.checkType('string[]', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate objects correctly', () => {

    // boolean
    expect(Utils.checkType('object', true)).to.equal(false);
    expect(Utils.checkType('object', false)).to.equal(false);

    // integer / number
    expect(Utils.checkType('object', 0)).to.equal(false);
    expect(Utils.checkType('object', 1)).to.equal(false);
    expect(Utils.checkType('object', -1)).to.equal(false);
    expect(Utils.checkType('object', 1.2)).to.equal(false);
    expect(Utils.checkType('object', -1.2)).to.equal(false);
    expect(Utils.checkType('object', NaN)).to.equal(false);

    // string
    expect(Utils.checkType('object', '')).to.equal(false);
    expect(Utils.checkType('object', 'string')).to.equal(false);

    // boolean[]
    expect(Utils.checkType('object', [true, false])).to.equal(false);
    expect(Utils.checkType('object', [true, false, 1])).to.equal(false);
    expect(Utils.checkType('object', [true, false, -1])).to.equal(false);
    expect(Utils.checkType('object', [true, false, 1.2])).to.equal(false);
    expect(Utils.checkType('object', [true, false, -1.2])).to.equal(false);
    expect(Utils.checkType('object', [true, false, NaN])).to.equal(false);
    expect(Utils.checkType('object', [true, false, ''])).to.equal(false);
    expect(Utils.checkType('object', [true, false, 'string'])).to.equal(false);
    expect(Utils.checkType('object', [true, false, []])).to.equal(false);
    expect(Utils.checkType('object', [true, false, [false]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('object', [true, false, {}])).to.equal(false);
    expect(Utils.checkType('object', [true, false, { test: false }])).to.equal(false);

    // number[]
    expect(Utils.checkType('object', [1, 2])).to.equal(false);
    expect(Utils.checkType('object', [-1, 2])).to.equal(false);
    expect(Utils.checkType('object', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('object', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('object', [1.2, 1])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, { test: false }])).to.equal(false);

    // integer[]
    expect(Utils.checkType('object', [1, 2])).to.equal(false);
    expect(Utils.checkType('object', [-1, 2])).to.equal(false);
    expect(Utils.checkType('object', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('object', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('object', [1, 2, { test: false }])).to.equal(false);

    // string[]
    expect(Utils.checkType('object', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('object', ['string', ''])).to.equal(false);
    expect(Utils.checkType('object', ['', ''])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', 2])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', -2])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', 1.2])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', -1.2])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', NaN])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', []])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', [false]])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', [1]])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', [-1]])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', [1.1]])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', [-1.1]])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', ['']])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', {}])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string', { test: false }])).to.equal(false);

    // object
    expect(Utils.checkType('object', {})).to.equal(false);
    expect(Utils.checkType('object', { test: 1 })).to.equal(true);
    expect(Utils.checkType('object', { test: 'string' })).to.equal(true);

    // array
    expect(Utils.checkType('object', [])).to.equal(false);
    expect(Utils.checkType('object', [true, false])).to.equal(false);
    expect(Utils.checkType('object', [1, 2])).to.equal(false);
    expect(Utils.checkType('object', [-1, -2])).to.equal(false);
    expect(Utils.checkType('object', [1.2, 2.2])).to.equal(false);
    expect(Utils.checkType('object', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('object', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(Utils.checkType('object', [1, 'string', true, { test: 'string' }])).to.equal(false);

    // mongo_id
    expect(Utils.checkType('object', '59d7fce00000000000000000')).to.equal(false);
    expect(Utils.checkType('object', '59d7fce000000000000000002')).to.equal(false);

    // email
    expect(Utils.checkType('object', 'test@test.test')).to.equal(false);
    expect(Utils.checkType('object', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate arrays correctly', () => {

    // boolean
    expect(Utils.checkType('array', true)).to.equal(false);
    expect(Utils.checkType('array', false)).to.equal(false);

    // integer / number
    expect(Utils.checkType('array', 0)).to.equal(false);
    expect(Utils.checkType('array', 1)).to.equal(false);
    expect(Utils.checkType('array', -1)).to.equal(false);
    expect(Utils.checkType('array', 1.2)).to.equal(false);
    expect(Utils.checkType('array', -1.2)).to.equal(false);
    expect(Utils.checkType('array', NaN)).to.equal(false);

    // string
    expect(Utils.checkType('array', '')).to.equal(false);
    expect(Utils.checkType('array', 'string')).to.equal(false);

    // boolean[]
    expect(Utils.checkType('array', [true, false])).to.equal(true);
    expect(Utils.checkType('array', [true, false, 1])).to.equal(true);
    expect(Utils.checkType('array', [true, false, -1])).to.equal(true);
    expect(Utils.checkType('array', [true, false, 1.2])).to.equal(true);
    expect(Utils.checkType('array', [true, false, -1.2])).to.equal(true);
    expect(Utils.checkType('array', [true, false, NaN])).to.equal(true);
    expect(Utils.checkType('array', [true, false, ''])).to.equal(true);
    expect(Utils.checkType('array', [true, false, 'string'])).to.equal(true);
    expect(Utils.checkType('array', [true, false, []])).to.equal(true);
    expect(Utils.checkType('array', [true, false, [false]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [1]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [-1]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [1.1]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [-1.1]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, ['']])).to.equal(true);
    expect(Utils.checkType('array', [true, false, {}])).to.equal(true);
    expect(Utils.checkType('array', [true, false, { test: false }])).to.equal(true);

    // number[]
    expect(Utils.checkType('array', [1, 2])).to.equal(true);
    expect(Utils.checkType('array', [-1, 2])).to.equal(true);
    expect(Utils.checkType('array', [-1, 2.1])).to.equal(true);
    expect(Utils.checkType('array', [1, -2.1])).to.equal(true);
    expect(Utils.checkType('array', [1.2, 1])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, 1.2])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, NaN])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, ''])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, 'string'])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, []])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [false]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [1]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [-1]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [1.1]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [-1.1]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, ['']])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, {}])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, { test: false }])).to.equal(true);

    // integer[]
    expect(Utils.checkType('array', [1, 2])).to.equal(true);
    expect(Utils.checkType('array', [-1, 2])).to.equal(true);
    expect(Utils.checkType('array', [-1, 2.1])).to.equal(true);
    expect(Utils.checkType('array', [1, -2.1])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, 1])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, 1.2])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, NaN])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, ''])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, 'string'])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, []])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [false]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [1]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [-1]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [1.1]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, [-1.1]])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, ['']])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, {}])).to.equal(true);
    expect(Utils.checkType('array', [1, 2, { test: false }])).to.equal(true);

    // string[]
    expect(Utils.checkType('array', ['string', 'string'])).to.equal(true);
    expect(Utils.checkType('array', ['string', ''])).to.equal(true);
    expect(Utils.checkType('array', ['', ''])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', 2])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', -2])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', 1.2])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', -1.2])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', NaN])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', []])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', [false]])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', [1]])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', [-1]])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', [1.1]])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', [-1.1]])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', ['']])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', {}])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string', { test: false }])).to.equal(true);

    // object
    expect(Utils.checkType('array', {})).to.equal(false);
    expect(Utils.checkType('array', { test: 1 })).to.equal(false);
    expect(Utils.checkType('array', { test: 'string' })).to.equal(false);

    // array
    expect(Utils.checkType('array', [])).to.equal(false);
    expect(Utils.checkType('array', [true, false])).to.equal(true);
    expect(Utils.checkType('array', [1, 2])).to.equal(true);
    expect(Utils.checkType('array', [-1, -2])).to.equal(true);
    expect(Utils.checkType('array', [1.2, 2.2])).to.equal(true);
    expect(Utils.checkType('array', ['string', 'string'])).to.equal(true);
    expect(Utils.checkType('array', [{ test: 'string' }, { test: 'string' }])).to.equal(true);
    expect(Utils.checkType('array', [1, 'string', true, { test: 'string' }])).to.equal(true);

    // mongo_id
    expect(Utils.checkType('array', '59d7fce00000000000000000')).to.equal(false);
    expect(Utils.checkType('array', '59d7fce000000000000000002')).to.equal(false);

    // email
    expect(Utils.checkType('array', 'test@test.test')).to.equal(false);
    expect(Utils.checkType('array', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate mongo_id correctly', () => {

    // boolean
    expect(Utils.checkType('mongo_id', true)).to.equal(false);
    expect(Utils.checkType('mongo_id', false)).to.equal(false);

    // integer / number
    expect(Utils.checkType('mongo_id', 0)).to.equal(false);
    expect(Utils.checkType('mongo_id', 1)).to.equal(false);
    expect(Utils.checkType('mongo_id', -1)).to.equal(false);
    expect(Utils.checkType('mongo_id', 1.2)).to.equal(false);
    expect(Utils.checkType('mongo_id', -1.2)).to.equal(false);
    expect(Utils.checkType('mongo_id', NaN)).to.equal(false);

    // string
    expect(Utils.checkType('mongo_id', '')).to.equal(false);
    expect(Utils.checkType('mongo_id', 'string')).to.equal(false);

    // boolean[]
    expect(Utils.checkType('mongo_id', [true, false])).to.equal(false);
    expect(Utils.checkType('mongo_id', [true, false, 1])).to.equal(false);
    expect(Utils.checkType('mongo_id', [true, false, -1])).to.equal(false);
    expect(Utils.checkType('mongo_id', [true, false, 1.2])).to.equal(false);
    expect(Utils.checkType('mongo_id', [true, false, -1.2])).to.equal(false);
    expect(Utils.checkType('mongo_id', [true, false, NaN])).to.equal(false);
    expect(Utils.checkType('mongo_id', [true, false, ''])).to.equal(false);
    expect(Utils.checkType('mongo_id', [true, false, 'string'])).to.equal(false);
    expect(Utils.checkType('mongo_id', [true, false, []])).to.equal(false);
    expect(Utils.checkType('mongo_id', [true, false, [false]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('mongo_id', [true, false, {}])).to.equal(false);
    expect(Utils.checkType('mongo_id', [true, false, { test: false }])).to.equal(false);

    // number[]
    expect(Utils.checkType('mongo_id', [1, 2])).to.equal(false);
    expect(Utils.checkType('mongo_id', [-1, 2])).to.equal(false);
    expect(Utils.checkType('mongo_id', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1.2, 1])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, { test: false }])).to.equal(false);

    // integer[]
    expect(Utils.checkType('mongo_id', [1, 2])).to.equal(false);
    expect(Utils.checkType('mongo_id', [-1, 2])).to.equal(false);
    expect(Utils.checkType('mongo_id', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2, { test: false }])).to.equal(false);

    // string[]
    expect(Utils.checkType('mongo_id', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', ''])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['', ''])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', 2])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', -2])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', 1.2])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', -1.2])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', NaN])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', []])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', [false]])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', [1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', [-1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', [1.1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', [-1.1]])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', ['']])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', {}])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string', { test: false }])).to.equal(false);

    // object
    expect(Utils.checkType('mongo_id', {})).to.equal(false);
    expect(Utils.checkType('mongo_id', { test: 1 })).to.equal(false);
    expect(Utils.checkType('mongo_id', { test: 'string' })).to.equal(false);

    // array
    expect(Utils.checkType('mongo_id', [])).to.equal(false);
    expect(Utils.checkType('mongo_id', [true, false])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 2])).to.equal(false);
    expect(Utils.checkType('mongo_id', [-1, -2])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1.2, 2.2])).to.equal(false);
    expect(Utils.checkType('mongo_id', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('mongo_id', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(Utils.checkType('mongo_id', [1, 'string', true, { test: 'string' }])).to.equal(false);

    // mongo_id
    expect(Utils.checkType('mongo_id', '59d7fce00000000000000000')).to.equal(true);
    expect(Utils.checkType('mongo_id', '59d7fce000000000000000002')).to.equal(false);

    // email
    expect(Utils.checkType('mongo_id', 'test@test.test')).to.equal(false);
    expect(Utils.checkType('mongo_id', 'testtest,test')).to.equal(false);
  });
  it('should be able to validate emails correctly', () => {

    // boolean
    expect(Utils.checkType('email', true)).to.equal(false);
    expect(Utils.checkType('email', false)).to.equal(false);

    // integer / number
    expect(Utils.checkType('email', 0)).to.equal(false);
    expect(Utils.checkType('email', 1)).to.equal(false);
    expect(Utils.checkType('email', -1)).to.equal(false);
    expect(Utils.checkType('email', 1.2)).to.equal(false);
    expect(Utils.checkType('email', -1.2)).to.equal(false);
    expect(Utils.checkType('email', NaN)).to.equal(false);

    // string
    expect(Utils.checkType('email', '')).to.equal(false);
    expect(Utils.checkType('email', 'string')).to.equal(false);

    // boolean[]
    expect(Utils.checkType('email', [true, false])).to.equal(false);
    expect(Utils.checkType('email', [true, false, 1])).to.equal(false);
    expect(Utils.checkType('email', [true, false, -1])).to.equal(false);
    expect(Utils.checkType('email', [true, false, 1.2])).to.equal(false);
    expect(Utils.checkType('email', [true, false, -1.2])).to.equal(false);
    expect(Utils.checkType('email', [true, false, NaN])).to.equal(false);
    expect(Utils.checkType('email', [true, false, ''])).to.equal(false);
    expect(Utils.checkType('email', [true, false, 'string'])).to.equal(false);
    expect(Utils.checkType('email', [true, false, []])).to.equal(false);
    expect(Utils.checkType('email', [true, false, [false]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('email', [true, false, {}])).to.equal(false);
    expect(Utils.checkType('email', [true, false, { test: false }])).to.equal(false);

    // number[]
    expect(Utils.checkType('email', [1, 2])).to.equal(false);
    expect(Utils.checkType('email', [-1, 2])).to.equal(false);
    expect(Utils.checkType('email', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('email', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('email', [1.2, 1])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, { test: false }])).to.equal(false);

    // integer[]
    expect(Utils.checkType('email', [1, 2])).to.equal(false);
    expect(Utils.checkType('email', [-1, 2])).to.equal(false);
    expect(Utils.checkType('email', [-1, 2.1])).to.equal(false);
    expect(Utils.checkType('email', [1, -2.1])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, 1])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, 1.2])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, NaN])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, ''])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, 'string'])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, []])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [false]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [1]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [-1]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [1.1]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, [-1.1]])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, ['']])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, {}])).to.equal(false);
    expect(Utils.checkType('email', [1, 2, { test: false }])).to.equal(false);

    // string[]
    expect(Utils.checkType('email', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('email', ['string', ''])).to.equal(false);
    expect(Utils.checkType('email', ['', ''])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', 2])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', -2])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', 1.2])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', -1.2])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', NaN])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', []])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', [false]])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', [1]])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', [-1]])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', [1.1]])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', [-1.1]])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', ['']])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', {}])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string', { test: false }])).to.equal(false);

    // object
    expect(Utils.checkType('email', {})).to.equal(false);
    expect(Utils.checkType('email', { test: 1 })).to.equal(false);
    expect(Utils.checkType('email', { test: 'string' })).to.equal(false);

    // array
    expect(Utils.checkType('email', [])).to.equal(false);
    expect(Utils.checkType('email', [true, false])).to.equal(false);
    expect(Utils.checkType('email', [1, 2])).to.equal(false);
    expect(Utils.checkType('email', [-1, -2])).to.equal(false);
    expect(Utils.checkType('email', [1.2, 2.2])).to.equal(false);
    expect(Utils.checkType('email', ['string', 'string'])).to.equal(false);
    expect(Utils.checkType('email', [{ test: 'string' }, { test: 'string' }])).to.equal(false);
    expect(Utils.checkType('email', [1, 'string', true, { test: 'string' }])).to.equal(false);

    // mongo_id
    expect(Utils.checkType('email', '59d7fce00000000000000000')).to.equal(false);
    expect(Utils.checkType('email', '59d7fce000000000000000002')).to.equal(false);

    // email
    expect(Utils.checkType('email', 'test@test.test')).to.equal(true);
    expect(Utils.checkType('email', 'testtest,test')).to.equal(false);
  });
});
