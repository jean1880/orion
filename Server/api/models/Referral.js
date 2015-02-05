/**
 * Referral.js
 *
 * @description ::  Model of the Referral table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
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