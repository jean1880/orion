var
  Address = require("../../../api/models/Address"),
  should = require('should');

describe('Model: Address', function() {
  describe('attribute', function() {
    var attributes;

    beforeEach(function() {
      attributes = Address.attributes;
    });

    describe('StreetName', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.StreetName;
      });

      it('exists', function (done) {
        should.exist(attribute);
        done();
      });

      it('is required', function (done) {
        attribute.should.have.property('required').equal(true);
        done();
      });

      it('is a string', function (done) {
        attribute.should.have.property('type').equal('string');
        done();
      });
    });

    describe('StreetNum', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.StreetNum;
      });

      it('exists', function (done) {
        should.exist(attribute);
        done();
      });

      it('is required', function (done) {
        attribute.should.have.property('required').equal(true);
        done();
      });

      it('is a string', function (done) {
        attribute.should.have.property('type').equal('string');
        done();
      });
    });

    describe('City', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.City;
      });

      it('exists', function (done) {
        should.exist(attribute);
        done();
      });

      it('is required', function (done) {
        attribute.should.have.property('required').equal(true);
        done();
      });

      it('is a string', function (done) {
        attribute.should.have.property('type').equal('string');
        done();
      });
    });

    describe('Province', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Province;
      });

      it('exists', function (done) {
        should.exist(attribute);
        done();
      });

      it('is not required', function (done) {
        attribute.should.not.have.property('required');
        done();
      });

      it('is a string', function (done) {
        attribute.should.have.property('type').equal('string');
        done();
      });

      it('is defaulted to "ON"', function (done) {
        attribute.should.have.property('defaultsTo').equal('ON');
        done();
      });
    });

    describe('Country', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Country;
      });

      it('exists', function (done) {
        should.exist(attribute);
        done();
      });

      it('is not required', function (done) {
        attribute.should.not.have.property('required');
        done();
      });

      it('is a string', function (done) {
        attribute.should.have.property('type').equal('string');
        done();
      });

      it('is defaulted to "CA"', function (done) {
        attribute.should.have.property('defaultsTo').equal('CA');
        done();
      });
    });

    describe('BusinessInfo', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.BusinessInfo;
      });

      it('exists', function (done) {
        should.exist(attribute);
        done();
      });

      it('is joined to the business_info model', function (done) {
        attribute.should.have.property('model').equal('business_info');
        done();
      });
    });

    describe('Peoples', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Peoples;
      });

      it('exists', function (done) {
        should.exist(attribute);
        done();
      });

      it('is joined to the people model', function (done) {
        attribute.should.have.property('model').equal('people');
        done();
      });
    });
  });
});