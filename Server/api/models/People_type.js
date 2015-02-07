/**
 * People_type.js
 *
 * The Sails (Waterline) model of the People_type table/collection. Route to model:
 * /server/people_type/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class People_type
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        Type: {
            type: 'string',
            required: true
        },
        peoples: {
            collection: 'people',
            via: 'PeopleType'
        }
    }
};
