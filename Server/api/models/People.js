/**
 * People.js
 *
 * The Sails (Waterline) model of the People table/collection. Route to model:
 * /server/people/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class People
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        DogsOwned: {
            collection: 'dog',
            via: 'Owner'
        },
        DogsVet: {
            collection: 'dog',
            via: 'Vet'
        },
        DogsEmergencyContact: {
            collection: 'dog',
            via: 'EmergencyContact'
        },
        PeopleType: {
            model: 'people_type'
        },
        referrals: {
            collection: 'referral',
            via: 'people'
        },
        address: {
            model: 'address'
        },
        Name: {
            type: 'string',
            required: true
        },
        Email: {
            type: 'email'
        },
        Phone: {
            type: 'string'
        }
    }
};
