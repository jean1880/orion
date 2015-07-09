/**
 * Quote.js
 *
 * The Sails (Waterline) model of the IQuote table/collection. Route to model:
 * /server/quote/
 *
 * Refer to the ERD for more info:
 * https://editor.ponyorm.com/user/jean1880/DogTool
 * @class Quote
 */

module.exports = {

	attributes: {
		Date: {
            type: 'datetime',
            required: true
        },
		Title: {
			type: 'string',
			required: true
		},
		Service{
			model: 'service'
		},
		Quantity{
			type: 'int'
			required: true
		},
		StartDate: {
			type: 'datetime',
			required: true
		},
		EndDate: {
			type: 'datetime',
			required: true
		},
		Price{
			type: 'float',
			required: true
		}
	}
};

