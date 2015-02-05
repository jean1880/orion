/**
 * Business_info.js
 *
 * @description ::  Model of the Business_info table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
*/

/*jslint node:true*/

module.exports = {

    attributes: {
        Business_name: {
            type: 'string',
            required: 'true'
        },
        Owner: {
            type: 'string',
            required: 'true'
        },
        Tax_number: {
            type: 'string'
        },
        BN_number: {
            type: 'string'
        },
        address: {
            model: 'address',
            required: 'true'
        }
    }
};