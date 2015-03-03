var
  Model = require("../../../api/models/Address");

describe('Model: Address', function() {
  describe('attribute', function() {
    var attributes;

    beforeEach(function() {
      attributes = Model.attributes;
    });

    describe('StreetName', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.StreetName;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is required', function (done) {
        expect(attribute.required).toBe(true);
        done();
      });

      it('is a string', function (done) {
        expect(attribute.type).toBe('string');
        done();
      });
    });

    describe('StreetNum', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.StreetNum;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is required', function (done) {
        expect(attribute.required).toBe(true);
        done();
      });

      it('is a string', function (done) {
        expect(attribute.type).toBe('string');
        done();
      });
    });

    describe('City', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.City;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is required', function (done) {
        expect(attribute.required).toBe(true);
        done();
      });

      it('is a string', function (done) {
        expect(attribute.type).toBe('string');
        done();
      });
    });

    describe('Province', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Province;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is not required', function (done) {
        expect(attribute.required).toNotExist();
        done();
      });

      it('is a string', function (done) {
        expect(attribute.type).toBe('string');
        done();
      });

      it('is defaulted to "ON"', function (done) {
        expect(attribute.defaultsTo).toBe('ON');
        done();
      });
    });

    describe('Country', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Country;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is not required', function (done) {
        expect(attribute.required).toNotExist();
        done();
      });

      it('is a string', function (done) {
        expect(attribute.type).toBe('string');
        done();
      });

      it('is defaulted to "CA"', function (done) {
        expect(attribute.defaultsTo).toBe('CA');
        done();
      });
    });

    describe('BusinessInfo', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.BusinessInfo;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is joined to the business_info model', function (done) {
        expect(attribute.model).toBe('business_info');
        done();
      });
    });

    describe('Peoples', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Peoples;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is joined to the people model', function (done) {
        expect(attribute.model).toBe('people');
        done();
      });
    });
  });
});
