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
        business_infos: {
            collection: 'business_info',
            via: 'address'
        },
        peoples: {
            collection: 'people',
            via: 'address'
        }
    }
};