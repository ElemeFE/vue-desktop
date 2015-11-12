var SchemaStore = require('../src/schema/store');
var Schema = require('../src/schema/schema');

describe('Schema Store', function() {
  afterEach(function() {
    SchemaStore.removeSchema('test');
  });

  describe('#defineSchema()', function () {
    it('should return a Schema Instance', function () {
      var schema = SchemaStore.defineSchema('test', {});

      schema.$validate.should.be.a('function');
    });

    it('should define a Schema with new operator', function () {
      var schema = new Schema('test2', {});
      schema.$validate.should.be.a('function');

      SchemaStore.getSchema('test2').should.equal(schema);
    });
  });

  describe('$validate', function() {
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
        schema.$validate();
      }).should.not.throw();
    });

    it('should validate required property in prop define', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);

      var object = {
        name: '123456',
        test: null
      };

      schema.$validateProperty(object, 'test').should.be.false;
    });

    it('should validate object with rules', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);

      var result = schema.$validate({
        name: '',
        test: 2
      });

      result.should.be.false;
    });

    it('should validate object with props option', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);

      var result = schema.$validate({
        name: '',
        test: 2
      }, {
        props: [ 'test' ]
      });

      result.should.be.true;
    });

    it('should validate object with skips option', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);

      var result = schema.$validate({
        name: '',
        test: 2
      }, {
        skips: ['name']
      });

      result.should.be.true;
    });

    it('should validate object property with rules', function () {
      var schema = SchemaStore.defineSchema('test', validateConfig);

      var object = {
        name: '',
        test: 2
      };

      var result = schema.$validateProperty(object, 'test');
      result.should.be.true;

      result = schema.$validateProperty(object, 'name');
      result.should.be.false;
    });

    it('should not throws when $validate a invalid property', function() {
      var schema = SchemaStore.defineSchema('test', validateConfig);

      var object = {
        name: '',
        test: 2
      };

      var result = schema.$validateProperty(object, 'test2');
      result.should.be.true;

      result = schema.$validateProperty(object, 'name3');
      result.should.be.true;
    });
  });

  describe('$new', function() {
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

      var newObject = schema.$new();

      var keys = Object.keys(newObject);
      keys.length.should.equal(4);

      keys.should.eql(['a', 'b', 'c', 'd']);
    });

    it('should return a new object with default value', function() {
      var schema = SchemaStore.defineSchema('test', newConfig);

      var newObject = schema.$new();

      newObject.a.should.equal('');
      newObject.b.should.be.a('date');
      newObject.c.should.equal(4);
      (typeof newObject.d).should.equal('undefined');
    });
  });
});