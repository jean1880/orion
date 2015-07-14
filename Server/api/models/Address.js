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
            type: 'string'
        },
        City: {
            type: 'string'
        },
        Province: {
            type: 'string',
            defaultsTo: 'Ontario'
        },
        Country: {
            type: 'string',
            defaultsTo: 'Canada'
        },
        PostalCode: {
            type: 'string'
        }
    }
};
