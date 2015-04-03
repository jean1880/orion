/**
 * Charge.js
 *
 * The Sails (Waterline) model of the Charge table/collection. Route to model:
 * /server/charge/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Charge
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        Quantity: {
            type: 'integer',
            required: true
        },
        Invoice: {
            model: 'invoice'
        },
        Service: {
            model: 'service'
        },
        ServiceCustom: {
            type: 'string'
        },
        Note: {
            model: 'note'
        }
    }
};
