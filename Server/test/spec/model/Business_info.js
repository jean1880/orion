var
  BusinessInfo = require("../../../api/models/Business_info");

describe('Model: BusinessInfo', function() {
  describe('attribute', function() {
    var attributes;

    beforeEach(function() {
      attributes = BusinessInfo.attributes;
    });

    describe('BusinessName', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.BusinessName;
      });

      it('exists', function (done) {
        expect(attribute).toExist;
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

    describe('Owner', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Owner;
      });

      it('exists', function (done) {
        expect(attribute).toExist;
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

    describe('TaxNumber', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.TaxNumber;
      });

      it('exists', function (done) {
        expect(attribute).toExist;
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
    });

    describe('BNNumber', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.BNNumber;
      });

      it('exists', function (done) {
        expect(attribute).toExist;
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
    });

    describe('Address', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Address;
      });

      it('exists', function (done) {
        expect(attribute).toExist;
        done();
      });

      it('is joined to the Address model', function (done) {
        expect(attribute.model).toBe('Address');
        done();
      });
    });
  });
});
