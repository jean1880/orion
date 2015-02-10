/**
 * Consultation.js
 *
 * The Sails (Waterline) model of the Consultation table/collection. Route to model:
 * /server/consultation/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Consultation
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        dogs: {
            collection: 'dog',
            via: 'consultations',
            dominant: true
        },
        calendars: {
            collection: 'calendar',
            via: 'consultations'
        },
        costs: {
            collection: 'cost',
            via: 'consultation'
        },
        note: {
            model: 'note'
        },
        invoice: {
            model: 'invoice'
        }
    }
};
