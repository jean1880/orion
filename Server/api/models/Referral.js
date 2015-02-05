/**
 * Referral.js
 *
 * The Sails (Waterline) model of the Referral table/collection. Route to model:
 * /server/referral/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class People
*/

/*jslint node:true*/

module.exports = {

    attributes: {
        dog: {
            models: 'dog'
        },
        people: {
            model: 'people'
        },
        Other_source: {
            type: 'string'
        },
        Payed_forward: {
            type: 'boolean',
            required: 'true'
        },
        cost: {
            model: 'cost'
        }
    }
};