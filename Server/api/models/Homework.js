/**
 * homework.js
 *
 * the sails (waterline) model of the homework table/collection. route to model:
 * /server/homework/
 *
 * refer to the erd for more info:
 * https://editor.ponyorm.com/user/jean1880/dogtool
 * @class homework
 */

/*jslint node:true*/

module.exports = {

    attributes: {
        StartDate: {
            type: 'datetime',
            required: true
        },
        EndDate: {
            type: 'datetime'
        },
        Dogs: {
            collection: 'dog',
            via: 'Homeworks',
            dominant: true
        },
        Description: {
            type: 'string'
        },
        Note: {
            model: 'note'
        },
        Title:
        {
          type:'text'
        }
    }
};
