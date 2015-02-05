/**
 * Consultation.js
 *
 * @description ::  Model of the Consultation table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
*/

/*jslint node:true*/

module.exports = {

    attributes: {
        dogs: {
            collection: 'dog',
            via: 'consultations'
        },
        calendars: {
            collection: 'calendar',
            via: 'consultations'
        },
        costs: {
            collection: 'cost',
            via: 'consultations'
        },
        note: {
            
        },
        invoice: {
            model: 'invoice',
            required: 'true'
        }
    }
};