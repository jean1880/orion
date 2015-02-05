/**
 * Weight.js
 *
 * @description ::  Model of the Weight table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
*/

/*jslint node:true*/

module.exports = {

    attributes: {
        dogs: {
            collection: 'dog',
            via: 'weights'
        },
        Date_taken: {
            type: 'datetime',
            required: 'true'
        },
        Weight: {
            type: 'integer',
            required: 'true'
        }
    }
};