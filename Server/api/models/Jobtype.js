/**
 * Jobtype.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    Name: {
      type: 'string',
      required: true
    },
    Description: {
      type: 'string'
    },
    Jobs: {
      collection: 'job',
      via: 'Jobtype'
    },
    Value: {
      type: 'float',
      required: true
    },
    Charges: {
      collection: 'charge',
      via: 'JobType'
    }
  }
};