/**
 * note_type.js
 *
 * the sails (waterline) model of the note_type table/collection. route to model:
 * /server/note_type/
 *
 * refer to the erd for more info:
 * https://editor.ponyorm.com/user/jean1880/dogtool
 * @class note_type
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        Notes: {
            collection: 'note',
            via: 'NoteType'
        },
        Type: {
            type: 'string',
            required: true
        }
    }
};
