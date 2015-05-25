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
        Dogs: {
            collection: 'dog',
            via: 'Owner'
        },
        PeopleType: {
            type: 'string'
        },
        Referrals: {
            collection: 'referral',
            via: 'People'
        },
        Address: {
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
        },
        Note: {
            collection: 'note',
            via: 'People'
        }
    }
};
