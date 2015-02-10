/**
 * Note.js
 *
 * The Sails (Waterline) model of the Note table/collection. Route to model:
 * /server/note/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Note
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        Title: {
            type: 'string',
            required: true
        },
        Note: {
            type: 'string',
            required: true
        },
        dogs: {
            collection: 'dog',
            via: 'Notes'
        },
        NoteType: {
            model: 'note_type'
        },
        charges: {
            collection: 'charge',
            via: 'note'
        },
        consultations: {
            collection: 'consultation',
            via: 'note'
        },
        daycares: {
            collection: 'daycare',
            via: 'note'
        }
    }
};
