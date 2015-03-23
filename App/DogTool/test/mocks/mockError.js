'use strict';

/* global Mockery */
/* global chance */

Mockery.mockError = function () {
  return {
    error: 'E_VALIDATION',
    status: 400,
    summary: chance.sentence(),
    model: chance.word(),
    invalidAttributes: {},

    addInvalidAttribute: function (attribute, rule, message) {
      if(!this.invalidAttributes[attribute]) {
        this.invalidAttributes[attribute] = [];
      }

      this.invalidAttributes[attribute].push({
        rule: rule,
        message: message
      });
    }
  };
};
