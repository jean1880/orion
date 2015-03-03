var
  Model = require("../../../api/models/Charge");

describe('Model: Charge', function() {
  describe('attribute', function() {
    var attributes;

    beforeEach(function() {
      attributes = Model.attributes;
    });

    describe('Quantity', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Quantity;
      });

      it('exists', function (done) {
        expect(attribute).toExist();
        done();
      });

      it('is required', function (done) {
        expect(attribute.required).toBe(true);
        done();
      });

      it('is a integer', function (done) {
        expect(attribute.type).toBe('integer');
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

      it('is joined to the invoice model', function (done) {
        expect(attribute.model).toBe('invoice');
        done();
      });
    });

    describe('Service', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.Service;
      });

      it('exists', function (done) {
        expect(attribute).toExist;
        done();
      });

      it('is joined to the service model', function (done) {
        expect(attribute.model).toBe('service');
        done();
      });
    });

    describe('ServiceCustom', function() {
      var attribute;

      beforeEach(function() {
        attribute = attributes.ServiceCustom;
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
  });
});
