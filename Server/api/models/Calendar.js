/**
 * Calendar.js
 *
 * The Sails (Waterline) model of the Calendar table/collection. Route to model:
 * /server/calendar/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Calendar
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        StartDate: {
            type: 'datetime',
            required: true
        },
        EndDate: {
            type: 'datetime',
            required: true
        },
        Consultations: {
            collection: 'consultation',
            via: 'Calendars',
            dominant: true
        },
        Daycares: {
            collection: 'daycare',
            via: 'Calendars',
            dominant: true
        }
    }
};
