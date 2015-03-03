var
  Model = require("../../../api/models/Consultation");

describe('Model: Consultation', function() {
  describe('attribute', function() {
    var attributes;

    beforeEach(function() {
      attributes = Model.attributes;
    });

    describe('Dogs', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Dogs;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is a collection of Dogs', function (done) {
        expect(attribute.collection).toBe('Dog');
        done();
      });

      it('is joined via Consultations', function (done) {
        expect(attribute.via).toBe('Consultations');
        done();
      });

      it('is dominant', function (done) {
        expect(attribute.dominant).toBe(true);
        done();
      });
    });

    describe('Calendars', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Calendars;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is a collection of Calendars', function (done) {
        expect(attribute.collection).toBe('Calendar');
        done();
      });

      it('is joined via Consultations', function (done) {
        expect(attribute.via).toBe('Consultations');
        done();
      });
    });

    describe('Note', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Note;
      });

      it('exists', function (done) {
        expect(attribute).toExist;
        done();
      });

      it('is joined to the note model', function (done) {
        expect(attribute.model).toBe('note');
        done();
      });
    });

    describe('Invoice', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Invoice;
      });

      it('exists', function (done) {
        expect(attribute).toExist;
        done();
      });

      it('is joined to the Invoice model', function (done) {
        expect(attribute.model).toBe('Invoice');
        done();
      });
    });
  });
});
