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
      it('exists', function (done) {
        attributes.should.have.property('StreetName');
        done();
      });

      it('is required', function (done) {
        attributes.StreetName.should.have.property('required').equal(true);
        done();
      });

      it('is a string', function (done) {
        attributes.StreetName.should.have.property('type').equal('string');
        done();
      });
    });

    describe('StreetNum', function() {
      it('exists', function (done) {
        attributes.should.have.property('StreetNum');
        done();
      });

      it('is required', function (done) {
        attributes.StreetNum.should.have.property('required').equal(true);
        done();
      });

      it('is a string', function (done) {
        attributes.StreetNum.should.have.property('type').equal('string');
        done();
      });
    });

    describe('City', function() {
      it('exists', function (done) {
        attributes.should.have.property('City');
        done();
      });

      it('is required', function (done) {
        attributes.City.should.have.property('required').equal(true);
        done();
      });

      it('is a string', function (done) {
        attributes.City.should.have.property('type').equal('string');
        done();
      });
    });

    describe('Province', function() {
      it('exists', function (done) {
        attributes.should.have.property('Province');
        done();
      });

      it('is not required', function (done) {
        attributes.Province.should.not.have.property('required');
        done();
      });

      it('is a string', function (done) {
        attributes.Province.should.have.property('type').equal('string');
        done();
      });

      it('is defaulted to "ON"', function (done) {
        attributes.Province.should.have.property('defaultsTo').equal('ON');
        done();
      });
    });

    describe('Country', function() {
      it('exists', function (done) {
        attributes.should.have.property('Country');
        done();
      });

      it('is not required', function (done) {
        attributes.Country.should.not.have.property('required');
        done();
      });

      it('is a string', function (done) {
        attributes.Country.should.have.property('type').equal('string');
        done();
      });

      it('is defaulted to "CA"', function (done) {
        attributes.Country.should.have.property('defaultsTo').equal('CA');
        done();
      });
    });

    describe('BusinessInfo', function() {
      it('exists', function (done) {
        attributes.should.have.property('BusinessInfo');
        done();
      });

      it('is joined to the business_info model', function (done) {
        attributes.BusinessInfo.should.have.property('model').equal('business_info');
        done();
      });
    });

    describe('Peoples', function() {
      it('exists', function (done) {
        attributes.should.have.property('Peoples');
        done();
      });

      it('is joined to the people model', function (done) {
        attributes.Peoples.should.have.property('model').equal('people');
        done();
      });
    });
  });
});