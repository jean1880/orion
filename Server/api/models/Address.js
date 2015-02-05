/**
 * Address.js
 *
 * @description ::  Model of the Address table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
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