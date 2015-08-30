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
      defaultsTo: '41 Campbell Ave.'
    },
    City: {
      type: 'string',
      defaultsTo: 'Barrie'
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
      type: 'string',
      defaultsTo: 'L4N 2T2'
    }
  }
};