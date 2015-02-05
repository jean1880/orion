/**
 * Homework.js
 *
 * @description ::  Model of the Homework table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
*/

/*jslint node:true*/

module.exports = {

    attributes: {
        Start_Date: {
            type: 'datetime',
            required: 'true'
        },
        End_Date: {
            type: 'datetime'
        },
        Dog: {
            model: 'dog'
        },
        Description: {
            type: 'text'
        }
    }
};

