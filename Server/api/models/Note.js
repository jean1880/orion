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
        Content:  {
            type: 'text',
            required true
        },
        NoteType: {
            type: 'string',
            required true
        }
        
    }
};
