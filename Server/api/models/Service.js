/**
 * Service.js
 *
 * @description ::  Model of the Service table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
*/

/*jslint node:true*/

module.exports = {

    attributes: {
        Name: {
            type: 'string',
            required: 'true'
        },
        Value: {
            type: 'float',
            required: 'true'
        },
        charges: {
            collection: 'charge',
            via: 'service'
        }
    }
};