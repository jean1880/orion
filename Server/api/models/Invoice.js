/**
 * Invoice.js
 *
 * The Sails (Waterline) model of the Invoice table/collection. Route to model:
 * /server/invoice/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Invoice
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        Date: {
            type: 'datetime',
            required: true
        },
        Charges: {
            collection: 'charge',
            via: 'Invoice'
        },
        Job: {
            model: 'job'
        },
        IsBill: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};
