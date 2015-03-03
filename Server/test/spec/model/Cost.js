var
  Model = require("../../../api/models/Cost");

describe('Model: Cost', function() {
  describe('attribute', function() {
    var attributes;

    beforeEach(function() {
      attributes = Model.attributes;
    });

    describe('Date', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Date;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is a datetime', function (done) {
        expect(attribute.type).toBe('datetime');
        done();
      });

      it('is required', function (done) {
        expect(attribute.required).toBe(true);
        done();
      });
    });

    describe('Description', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Description;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is a string', function (done) {
        expect(attribute.type).toBe('string');
        done();
      });

      it('is required', function (done) {
        expect(attribute.required).toBe(true);
        done();
      });
    });

    describe('Cost', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Cost;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is a float', function (done) {
        expect(attribute.type).toBe('float');
        done();
      });

      it('is required', function (done) {
        expect(attribute.required).toBe(true);
        done();
      });
    });

    describe('Consultation', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Consultation;
      });

      it('exists', function (done) {
        expect(attribute).toExist;
        done();
      });

      it('is joined to the Consultations model', function (done) {
        expect(attribute.model).toBe('Consultations');
        done();
      });
    });

    describe('Daycare', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Daycare;
      });

      it('exists', function (done) {
        expect(attribute).toExist;
        done();
      });

      it('is joined to the Daycare model', function (done) {
        expect(attribute.model).toBe('Daycare');
        done();
      });
    });

    describe('Referral', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Referral;
      });

      it('exists', function (done) {
        expect(attribute).toExist;
        done();
      });

      it('is joined to the Referral model', function (done) {
        expect(attribute.model).toBe('Referral');
        done();
      });
    });
  });
});
