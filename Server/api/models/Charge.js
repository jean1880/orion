/**
 * Charge.js
 *
 * @description ::  Model of the Charge table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
*/

/*jslint node:true*/

module.exports = {

    attributes: {
        Quantity: {
            type: 'integer',
            required: 'true'
        },
        invoice: {
            model: 'invoice',
            required: 'true'
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