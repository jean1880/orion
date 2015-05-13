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
        Dogs: {
            collection: 'dog',
            via: 'Consultations',
            dominant: true
        },
        Calendars: {
            collection: 'calendar',
            via: 'Consultations'
        },
        Costs: {
            collection: 'cost',
            via: 'Consultation'
        },
        Note: {
            model: 'note'
        },
        Invoice: {
            model: 'invoice'
        }
    }
};
