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
        invoice: {
            model: 'invoice',
            required: true
        },
        service: {
            model: 'service'
        },
        Service_custom: {
            type: 'string'
        },
        note: {
            model: 'note'
        }
    }
};
