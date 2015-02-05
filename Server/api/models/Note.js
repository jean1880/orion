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
            required: 'true'
        },
        Note: {
            type: 'text',
            required: 'true'
        },
        dogs: {
            collection: 'dog',
            via: 'Health_notes'
        },
        dogs2: {
            collection: 'dog',
            via: 'Behavioural_notes'
        },
        note_type: {
            model: 'note_type',
            required: 'true'
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