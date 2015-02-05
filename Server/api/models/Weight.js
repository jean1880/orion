/**
 * Weight.js
 *
 * The Sails (Waterline) model of the Weight table/collection. Route to model:
 * /server/weight/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Weight
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