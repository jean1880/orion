var
  Model = require("../../../api/models/Calendar");

describe('Model: Calendar', function() {
  describe('attribute', function() {
    var attributes;

    beforeEach(function() {
      attributes = Model.attributes;
    });

    describe('StartDate', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.StartDate;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is required', function (done) {
        expect(attribute.required).toBe(true);
        done();
      });

      it('is a datetime', function (done) {
        expect(attribute.type).toBe('datetime');
        done();
      });
    });

    describe('EndDate', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.EndDate;
      });

      it('exists', function (done) {
        expect(attribute).toExist;
        done();
      });

      it('is required', function (done) {
        expect(attribute.required).toBe(true);
        done();
      });

      it('is a datetime', function (done) {
        expect(attribute.type).toBe('datetime');
        done();
      });
    });

    describe('Consultations', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Consultations;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is a collection of consultations', function (done) {
        expect(attribute.collection).toBe('Consultation');
        done();
      });

      it('is joined via calendars', function (done) {
        expect(attribute.via).toBe('Calendars');
        done();
      });

      it('is dominant', function (done) {
        expect(attribute.dominant).toBe(true);
        done();
      });
    });

    describe('Daycares', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Daycares;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is a collection of daycares', function (done) {
        expect(attribute.collection).toBe('daycare');
        done();
      });

      it('is joined via calendars', function (done) {
        expect(attribute.via).toBe('Calendars');
        done();
      });

      it('is dominant', function (done) {
        expect(attribute.dominant).toBe(true);
        done();
      });
    });
  });
});
