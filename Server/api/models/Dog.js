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
            required: 'true'
        },
        weights: {
            collection: 'weight',
            via: 'dogs'
        },
        compatabilitys: {
            collection: 'compatability',
            via: 'dog'
        },
        compatabilitys2: {
            collection: 'compatability',
            via: 'dog2'
        },
        Age: {
            type: 'integer',
            required: 'true'
        },
        Health_notes: {
            collection: 'note',
            via: 'dogs'
        },
        Behavioural_notes: {
            collection: 'note',
            via: 'dogs2'
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