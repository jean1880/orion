/**
 * People.js
 *
 * @description ::  Model of the People table/collection. Refer to the ERD
 *                  for more info: https://editor.ponyorm.com/user/jean1880/DogTool
 * @docs        ::  http://sailsjs.org/#!documentation/models
*/

/*jslint node:true*/

module.exports = {

    attributes: {
        dogs: {
            collection: 'dog',
            via: 'people'
        },
        People_type: {
            model: 'people_type',
            required: 'true'
        },
        referrals : {
            collection: 'referral',
            via: 'people'
        },
        address: {
            model: 'address',
            required: 'true'
        },
        Name: {
            type: 'string',
            require: true
        },
        Email: {
            type: 'email'
        },
        Phone: {
            type: 'string'
        }
    }
};