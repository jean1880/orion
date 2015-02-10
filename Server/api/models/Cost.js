/**
 * Cost.js
 *
 * The Sails (Waterline) model of the Cost table/collection. Route to model:
 * /server/cost/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Cost
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        Date: {
            type: 'datetime',
            required: true
        },
        Description: {
            type: 'string',
            required: true
        },
        Cost: {
            type: 'float',
            required: true
        },
        consultation: {
            model: 'consultation'
        },
        daycare: {
            model: 'daycare'
        },
        referral: {
            model: 'referral'
        }
    }
};
