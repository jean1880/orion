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
        Note: {
            model: 'note'
        },
        EndDate: {
            type: 'datetime',
            required: true
        },
        IsAllDay:{
            type: 'boolean'
        },
        Jobs: {
            collection: 'job',
            via: 'Calendars'
        }
    }
};
