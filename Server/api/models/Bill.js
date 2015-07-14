module.exports = {
    Attributes: {
        Date: {
            type: 'datetime'
        },
        Charges: {
            type: 'array'
        },
        Job: {
            type: 'json'
        },
        Invoice: {
            model: 'invoice'
        },
        Bill: {
            model: 'bill'
        }
    }
}
