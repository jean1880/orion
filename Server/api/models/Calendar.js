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
        Start_Date: {
            type: 'datetime',
            required: true
        },
        End_Date: {
            type: 'datetime',
            required: true
        },
        consultations: {
            collection: 'consultation',
            via: 'calendars',
            dominant: true
        },
        daycares: {
            collection: 'daycare',
            via: 'calendars',
            dominant: true
        }
    }
};
