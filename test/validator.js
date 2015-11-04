var SchemaStore = require('../src/schema/store');

describe('Validator Unit test', function() {
  it('type: required', function() {
    var validator = SchemaStore.getValidator('required');

    validator('').should.be.false;
    validator(null).should.be.false;
    validator(undefined).should.be.false;

    validator(0).should.be.true;
    validator(true).should.be.true;
    validator(false).should.be.true;
    validator(' ').should.be.true;
  });

  it('type: length', function() {
    var validator = SchemaStore.getValidator('length');

    validator('').should.be.true;
    validator(null).should.be.true;
    validator(undefined).should.be.true;

    validator('', { min: 1 }).should.be.false;
    validator(null, { min: 1 }).should.be.false;
    validator(undefined, { min: 1 }).should.be.false;
  });

  it('type: pattern', function() {
    var validator = SchemaStore.getValidator('pattern');

    (function() {
      validator('');
    }).should.throw;

    validator('', { pattern: /i/ }).should.be.false;
    validator('i', { pattern: /i/ }).should.be.true;
  });

  it('type: custom', function() {
    var validator = SchemaStore.getValidator('custom');

    (function() {
      validator('');
    }).should.throw;

    validator('', { validate: function() { return true; } }).should.be.true;
    validator('', { validate: function() { return false; } }).should.be.false;
    validator('', { validate: function() {} }).should.be.false;
  });
});