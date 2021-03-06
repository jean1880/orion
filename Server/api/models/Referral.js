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
        Dog: {
            model: 'dog'
        },
        People: {
            model: 'people'
        },
        OtherSource: {
            type: 'string'
        },
        PayedForward: {
            type: 'boolean',
            required: true
        },
        Cost: {
            model: 'cost'
        }
    }
};
