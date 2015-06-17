/**
 * Business_info.js
 *
 * The Sails (Waterline) model of the Business_info table/collection. Route to model:
 * /server/business_info/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Business_info
 */

/*jslint node:true*/

module.exports = {
    attributes: {
        BusinessName: {
            type: 'string',
            required: true
        },
        Owner: {
            type: 'string',
            required: true
        },
        TaxNumber: {
            type: 'string'
        },
        BNNumber: {
            type: 'string'
        },
        Address: {
            model: 'address'
        },
		Phone: {
			type: 'string'
		}
		Email: {
			type: 'string'
		}
    }
};
