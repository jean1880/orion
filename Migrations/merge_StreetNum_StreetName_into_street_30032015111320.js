var data = db.address.aggregate([
    {
        $match: {
            StreetName: { $exists: true },
            StreetNum: { $exists: true }
        }
    },
    {
        $project: {
            Street: {
                $concat: [ "$StreetNum", " ", "$StreetName" ]
            }
        }
    }
]).result;

for(index in data) {
    var address = data[index];
    db.address.update({
        _id: address._id
    },
    {
        $set: {
            Street: address.Street
        },
        $unset: {
            StreetNum: null,
            StreetName: null
        }
    });
};
