/**
 * People_type.js
 *
 * @description ::  Model of the People_type table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
*/

/*jslint node:true*/

module.exports = {

    attributes: {
        Type: {
            type: 'string',
            required: 'true'
        },
        peoples: {
            collection: 'people',
            via: 'People_type'
        }
    }
};