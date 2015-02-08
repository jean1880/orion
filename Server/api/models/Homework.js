/**
 * Homework.js
 *
 * The Sails (Waterline) model of the Homework table/collection. Route to model:
 * /server/homework/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Homework
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        Start_Date: {
            type: 'datetime',
            required: true
        },
        End_Date: {
            type: 'datetime'
        },
        Dogs: {
            collection: 'dog',
            via: 'homeworks',
            dominant: true
        },
        Description: {
            type: 'string'
        }
    }
};
