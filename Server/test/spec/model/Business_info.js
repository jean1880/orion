var
  BusinessInfo = require("../../../api/models/Business_info"),
  should = require('should');

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

    describe('Owner', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Owner;
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

    describe('TaxNumber', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.TaxNumber;
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
    });

    describe('BNNumber', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.BNNumber;
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
    });

    describe('Address', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Address;
      });

      it('exists', function (done) {
        should.exist(attribute);
        done();
      });

      it('is joined to the Address model', function (done) {
        attribute.should.have.property('model').equal('Address');
        done();
      });
    });
  });
});