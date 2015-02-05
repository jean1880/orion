/**
 * Daycare.js
 *
 * @description ::  Model of the Daycare table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
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
            via: 'daycares'
        },
        note: {
            model: 'note'
        },
        invoice: {
            model: 'invoice',
            required: 'true'
        }
    }
};