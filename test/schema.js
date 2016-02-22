import { default as Schema } from '../src/schema/index';
import { default as SchemaStore } from '../src/schema/store';

describe('Schema Store', function() {
  afterEach(function() {
    SchemaStore.removeSchema('test');
  });

  describe('#defineSchema()', function() {
    it('should return a Schema Instance', function() {
      var schema = SchemaStore.defineSchema('test', {});

      schema.validate.should.be.a('function');
    });

    it('should define a Schema with new operator', function() {
      var schema = new Schema('test2', {});
      schema.validate.should.be.a('function');

      SchemaStore.getSchema('test2').should.equal(schema);
    });
  });

  describe('#newModel', function() {
    var newConfig = {
      a: {
        type: String,
        default: ''
      },
      b: {
        type: Date,
        default: function() {
          return new Date();
        }
      },
      c: {
        type: Number,
        default: 4
      },
      d: {
      }
    };

    it('should return a new object with all props', function() {
      var schema = SchemaStore.defineSchema('test', newConfig);

      var newObject = schema.newModel();

      var keys = Object.keys(newObject);
      keys.length.should.equal(4);

      keys.should.eql(['a', 'b', 'c', 'd']);
    });

    it('should return a new object with default value', function() {
      var schema = SchemaStore.defineSchema('test', newConfig);

      var newObject = schema.newModel();

      newObject.a.should.equal('');
      newObject.b.should.be.a('date');
      newObject.c.should.equal(4);
      (typeof newObject.d).should.equal('undefined');
    });
  });

  describe('#validate', function() {
    var validateConfig = {
      name: {
        type: String,
        required: true,
        rules: [{
          type: 'length',
          min: 6,
          max: 20,
          message: '长度最长为20'
        }]
      },
      test: {
        type: Number,
        required: true,
        default: 1
      }
    };

    it('should not throw when no object passed', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);
      (function() {
        schema.validate();
      }).should.not.throw();
    });

    it('should validate required property in prop define', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);

      var object = {
        name: '123456',
        test: null
      };

      schema.validateProperty(object, 'test').should.be.false;
    });

    it('should validate object with rules', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);

      var result = schema.validate({
        name: '',
        test: 2
      });

      result.should.be.false;
    });

    it('should validate object with props option', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);

      var result = schema.validate({
        name: '',
        test: 2
      }, {
        props: [ 'test' ]
      });

      result.should.be.true;
    });

    it('should validate object with skips option', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);

      var result = schema.validate({
        name: '',
        test: 2
      }, {
        skips: ['name']
      });

      result.should.be.true;
    });

    it('should validate object with callback', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);
      var count = 0;
      var callback = (errors) => {
        count++;
        errors.should.not.be.empty;
      };

      schema.validate({
        name: '',
        test: 2
      }, callback);

      count.should.be.equal(1);

      var should = require('chai').should();

      var callback2 = (errors) => {
        count++;
        should.equal(errors, null);
      };

      schema.validate({
        name: '123456',
        test: 2
      }, callback2);
    });

    it('should validate nested object', function() {
      var nestedSchema = new Schema({
        name: {
          type: 'string',
          required: true
        },
        nested: {
          type: 'object',
          fields: {
            prop1: {
              required: true
            },
            prop2: {}
          }
        }
      });

      var result = nestedSchema.validate({
        name: '111',
        nested: {}
      });

      result.should.be.false;

      var validObject = {
        name: '111',
        nested: {
          prop1: 'test'
        }
      };

      result = nestedSchema.validate(validObject);

      result.should.be.true;
    });

    it('should validate object property with rules', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);

      var object = {
        name: '',
        test: 2
      };

      var result = schema.validateProperty(object, 'test');
      result.should.be.true;

      result = schema.validateProperty(object, 'name');
      result.should.be.false;
    });

    it('should not throws when validate a invalid property', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);

      var object = {
        name: '',
        test: 2
      };

      var result = schema.validateProperty(object, 'test2');
      result.should.be.true;

      result = schema.validateProperty(object, 'name3');
      result.should.be.true;
    });
  });

  describe('#toObject', function() {
    it('should convert model to object', function() {
      var schema = SchemaStore.defineSchema('test', {
        a: {},
        b: {}
      });

      var object = schema.toObject({
        a: 2,
        b: 3
      });

      object.a.should.equal(2);
      object.b.should.equal(3);
    });

    it('should convert model to object & ignore empty', function() {
      var schema = SchemaStore.defineSchema('test', {
        a: {},
        b: {}
      });

      var object = schema.toObject({
        a: 2,
        b: null
      }, {
        ignoreEmpty: true
      });

      object.a.should.equal(2);
      object.hasOwnProperty('b').should.be.false;
    });
  });

  describe('#save & #reset', function() {
    var newConfig = {
      a: {
        type: String,
        default: ''
      },
      b: {
        type: Date,
        default: function() {
          return new Date();
        }
      },
      c: {
        type: Number,
        default: 4
      },
      d: {
      }
    };

    it('should save current state & reset saved state', function() {
      var schema = new Schema(newConfig);
      var object = schema.newModel();

      schema.save(object);
      object.d = 3;
      object.d.should.equal(3);
      schema.reset(object);
      (object.d === undefined).should.equal(true);
    });

    it('should reset to default value when no saved state', function() {
      var schema = new Schema(newConfig);
      var object = schema.newModel();

      object.c.should.equal(4);
      object.c = 5;

      schema.reset(object);
      object.c.should.equal(4);
      (object.d === undefined).should.equal(true);
    });
  });

  describe('#getPropertyDescriptor', function() {
    it('should get property descriptor defined in constructor', function() {
      var config = {
        a: { label: 'a' },
        b: {}
      };
      var schema = new Schema(config);
      schema.getPropertyDescriptor('a').should.equal(config.a);
      schema.getPropertyDescriptor('b').should.equal(config.b);
    });
  });

  describe('#getPropertyLabel', function() {
    it('should get property label defined in property descriptor', function() {
      var schema = new Schema({
        a: { label: 'a' },
        b: {}
      });

      schema.getPropertyLabel('a').should.equal('a');
      schema.getPropertyLabel('b').should.equal('');
    });
  });

  describe('#getPropertyText', function() {
    it('should get type=date prop\'s formatted text', function() {
      var schema = new Schema({
        a: { type: 'date', default: function() {
          return new Date(2015, 0, 1);
        }}
      });

      var object = schema.newModel();

      schema.getPropertyText(object, 'a').should.equal('2015-01-01');
    });
  });

  describe('#getPropertyMapping', function() {
    it('should get property mapping(object) defined in descriptor', function() {
      var mapping = { test1: 1, test2: 2, test3: 3, test4: 4 };
      var schema = new Schema({
        a: {
          mapping: mapping
        }
      });

      schema.getPropertyMapping('a').should.equal(mapping);
    });

    it('should get property mapping(array) defined in descriptor', function() {
      var mapping = [
        { name: 'test1', value: 1 },
        { name: 'test2', value: 2 },
        { name: 'test3', value: 3 },
        { name: 'test4', value: 4 }
      ];

      var schema = new Schema({
        a: {
          mapping: mapping
        }
      });

      schema.getPropertyMapping('a').should.eql({ test1: 1, test2: 2, test3: 3, test4: 4 });
    });

    it('should get property mapping(function) defined in descriptor', function() {
      var mapping = function() {
        return { test1: 1, test2: 2, test3: 3, test4: 4 };
      };

      var schema = new Schema({
        a: {
          mapping: mapping
        }
      });

      schema.getPropertyMapping('a').should.eql({ test1: 1, test2: 2, test3: 3, test4: 4 });
    });

    it('should get property mapping(function return a promise) defined in descriptor', function(done) {
      var mapping = function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            resolve({ test1: 1, test2: 2, test3: 3, test4: 4 });
          }, 10);
        });
      };

      var schema = new Schema({
        a: {
          mapping: mapping
        }
      });

      schema.getPropertyMapping('a').then(function(value) {
        value.should.eql({ test1: 1, test2: 2, test3: 3, test4: 4 });
        done();
      });
    });
  });
});
