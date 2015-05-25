/**
* Job.js
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
    Dogs: {
        collection: 'dogs',
        via 'Job'
    },
    Costs:  {
        collection: 'costs',
        via 'Job'
    },
    Notes:  {
        collection: 'notes',
        via 'Job'
    },
    Invoice:  {
        model: 'invoice'
    },
    JobType:  {
        model: 'jobtype',
        required true
    },
    Calender: {
        model: 'calendar',
        required true
    }
  }
};

