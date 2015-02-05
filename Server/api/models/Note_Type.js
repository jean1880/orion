/**
 * Note_Type.js
 *
 * @description ::  Model of the Note_Type table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
*/

/*jslint node:true*/

module.exports = {

    attributes: {
        notes: {
            collection: 'note',
            via: 'note_type'
        },
        Type: {
            type: 'string',
            required: 'true'
        }
    }
};