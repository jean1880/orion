/**
 * Note_Type.js
 *
 * The Sails (Waterline) model of the Note_Type table/collection. Route to model:
 * /server/note_type/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Note_Type
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        notes: {
            collection: 'note',
            via: 'NoteType'
        },
        Type: {
            type: 'string',
            required: true
        }
    }
};
