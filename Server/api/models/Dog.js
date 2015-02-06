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
        people: {
            model: 'people',
            required: true
        },
        weights: {
            collection: 'weight',
            via: 'dog'
        },
        compatabilitys: {
            collection: 'compatability',
            via: 'dog'
        },
        Age: {
            type: 'integer',
            required: true
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
            via: 'dog'
        },
        Photo: {
            type: 'binary'
        }
    }
};
