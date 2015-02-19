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
        Dogs: {
            collection: 'dog',
            via: 'Daycares',
            dominant: true
        },
        Calendars: {
            collection: 'calendar',
            via: 'Daycares'
        },
        Costs: {
            collection: 'cost',
            via: 'Daycare'
        },
        Note: {
            model: 'note'
        },
        Invoice: {
            model: 'invoice'
        }
    }
};
