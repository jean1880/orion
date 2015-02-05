/**
 * Compatability.js
 *
 * @description ::  Model of the Compatability table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
*/

/*jslint node:true*/

module.exports = {

    attributes: {
        dog: {
            model: 'dog',
            required: 'true'
        },
        dog2: {
            model: 'dog',
            required: 'true'
        }
    }
};