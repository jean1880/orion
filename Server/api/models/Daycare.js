/**
 * Daycare.js
 *
 * The Sails (Waterline) model of the Daycare table/collection. Route to model:
 * /server/daycare/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Daycare
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        dogs: {
            collection: 'dog',
            via: 'daycares'
        },
        calendars: {
            collection: 'calendar',
            via: 'daycares'
        },
        costs: {
            collection: 'cost',
            via: 'daycare'
        },
        note: {
            model: 'note'
        },
        invoice: {
            model: 'invoice'
        }
    }
};
