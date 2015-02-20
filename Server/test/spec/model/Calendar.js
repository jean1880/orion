var
  Calendar = require("../../../api/models/Calendar"),
  should = require('should');

describe('Model: Calendar', function() {
  describe('attribute', function() {
    var attributes;

    beforeEach(function() {
      attributes = Calendar.attributes;
    });

    describe('StartDate', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.StartDate;
      });

      it('exists', function (done) {
        should.exist(attribute);
        done();
      });

      it('is required', function (done) {
        attribute.should.have.property('required').equal(true);
        done();
      });

      it('is a datetime', function (done) {
        attribute.should.have.property('type').equal('datetime');
        done();
      });
    });

    describe('EndDate', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.EndDate;
      });

      it('exists', function (done) {
        should.exist(attribute);
        done();
      });

      it('is required', function (done) {
        attribute.should.have.property('required').equal(true);
        done();
      });

      it('is a datetime', function (done) {
        attribute.should.have.property('type').equal('datetime');
        done();
      });
    });

    describe('Consultations', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Consultations;
      });

      it('exists', function (done) {
        should.exist(attribute);
        done();
      });

      it('is a collection of consultations', function (done) {
        attribute.should.have.property('collection').equal('consultation');
        done();
      });

      it('is joined via calendars', function (done) {
        attribute.should.have.property('via').equal('calendars');
        done();
      });

      it('is dominant', function (done) {
        attribute.should.have.property('dominant').equal(true);
        done();
      });
    });

    describe('Daycares', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Daycares;
      });

      it('exists', function (done) {
        should.exist(attribute);
        done();
      });

      it('is a collection of daycares', function (done) {
        attribute.should.have.property('collection').equal('daycare');
        done();
      });

      it('is joined via calendars', function (done) {
        attribute.should.have.property('via').equal('calendars');
        done();
      });

      it('is dominant', function (done) {
        attribute.should.have.property('dominant').equal(true);
        done();
      });
    });
  });
});