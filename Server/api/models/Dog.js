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
            model: 'people'
        },
        Vet: {
            model: 'people'
        },
        EmergencyContact: {
            model: 'people'
        },
        weights: {
            collection: 'weight',
            via: 'dog'
        },
        Name: {
            type: 'string',
            required: true
        },
        Breed: {
            type: 'string'
        },
        Age: {
            type: 'date'
        },
        Notes: {
            collection: 'note',
            via: 'dogs'
        },
        consultations: {
            collection: 'consultation',
            via: 'dogs'
        },
        daycares: {
            collection: 'daycare',
            via: 'dogs'
        },
        referral: {
            model: 'referral'
        },
        homeworks: {
            collection: 'homework',
            via: 'Dogs'
        },
        Photo: {
            type: 'binary'
        }
    }
};
