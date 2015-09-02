/**
 * Job.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    Name: {
      type: 'text',
      required: true
    },
    Dogs: {
      collection: 'dog',
      via: 'Job',
      dominant: true
    },
    Costs: {
      collection: 'cost',
      via: 'Job'
    },
    Notes: {
      collection: 'note'
    },
    Invoice: {
      model: 'invoice'
    },
    Jobtype: {
      model: 'jobtype',
      required: true
    },
    Calendars: {
      model: 'calendar'
    },
    Location: {
      model: 'address'
    }
  }
};