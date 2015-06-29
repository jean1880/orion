/**
 * Expense.js
 *
 * The Sails (Waterline) model of the Expense table/collection. Route to model:
 * /server/expense/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Expense
 */

/*jslint node:true*/

module.exports = {
    attributes: {
		Name: {
			type: 'string',
			required: true
		},
		Type: {
			type: 'string',
			required: true
		},
		Description: {
			type: 'string',
			required: true
		},
		Cost: {
			type: 'float',
			required: true
		},
		Date: {
			type: 'datetime',
			required: true
		}
    }
};
