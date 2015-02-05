/**
 * Invoice.js
 *
 * @description ::  Model of the Invoice table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
*/

/*jslint node:true*/

module.exports = {

    attributes: {
        Date: {
            type: 'datetime',
            required: 'true'
        },
        charges: {
            
        },
        consultations: {
            collection: 'consulation',
            via: 'invoice'
        },
        daycares: {
            collection: 'daycare',
            via: 'invoice'
        }
    }
};