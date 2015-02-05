/**
 * Compatability.js
 *
 * The Sails (Waterline) model of the Compatability table/collection. Route to model:
 * /server/compatability/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Compatability
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