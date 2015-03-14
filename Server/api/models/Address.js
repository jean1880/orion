/**
 * Address.js
 *
 * The Sails (Waterline) model of the Address table/collection. Route to model:
 * /server/address/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Address
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        Street: {
            type: 'string',
            required: true
        },
        City: {
            type: 'string',
            required: true
        },
        Province: {
            type: 'string',
            defaultsTo: 'ON'
        },
        Country: {
            type: 'string',
            defaultsTo: 'CA'
        },
        PostalCode: {
            type: 'string'
        },
        BusinessInfo: {
            model: 'business_info'
        },
        People: {
            model: 'people'
        }
    }
};