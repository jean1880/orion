/**
 * Service.js
 *
 * The Sails (Waterline) model of the Service table/collection. Route to model:
 * /server/service/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Service
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        Name: {
            type: 'string',
            required: true
        },
        Value: {
            type: 'float',
            required: true
        },
        Charges: {
            collection: 'charge',
            via: 'Service'
        }
    }
};
