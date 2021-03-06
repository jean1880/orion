/**
 * Dog.js
 *
 * The Sails (Waterline) model of the Dog table/collection. Route to model:
 * /server/dog/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Dog
 */

/*jslint node:true*/

module.exports = {

  attributes: {
    Owner: {
      model: 'people',
      required: true
    },
    Vet: {
      model: 'people'
    },
    EmergencyContact: {
      model: 'people'
    },
    Weights: {
      collection: 'weight',
      via: 'Dog'
    },
    Name: {
      type: 'string',
      required: true
    },
    Breed: {
      type: 'string'
    },
    Birthdate: {
      type: 'date'
    },
    Notes: {
      collection: 'note'
    },
    Job: {
      collection: 'job',
      via: 'Dogs'
    },
    Referral: {
      model: 'referral'
    },
    Homeworks: {
      collection: 'homework',
      via: 'Dogs'
    },
    PhotoURL: {
      type: 'text'
    },
    PhotoFd: {
      type: 'text'
    },
    SpayedNeutered: {
      type: 'string',
      defaultsTo: 'unknown'
    },
    OnTiters: {
      type: 'string',
      defaultsTo: 'unknown'
    },
    BehaviourFlag: {
      model: 'BehaviourFlag'
    },
    FoodInfo: {
      type: 'json'
    },
    Deceased: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
