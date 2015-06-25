'use strict';

/* global BusinessInfo */

/**
 * Business_infoController
 *
 * @description :: Server-side logic for managing Business_infoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

	find: function (req, res) {
        BusinessInfo.find().limit(1).populate('Address').exec(function (err, businessInfos) {
            if(err) {
                return res.serverError();
            }

            return res.json(businessInfos[0]);
        });
    },

    update: function (req, res) {
        var newInfo = req.body;

        BusinessInfo.update({id: newInfo.id }, newInfo).exec(function (err, businessInfos) {
            if(err) {
                return res.serverError();
            }

            return res.json(businessInfos[0]);
        });
    },

    seed: function (req, res) {
        var info = req.body;

        BusinessInfo.count(function (err, num) {
            if(err) {
                return res.serverError();
            }

            if(num >= 1) {
                return res.forbidden();
            }
            else {
                BusinessInfo.create(info).exec(function (err, businessInfo) {
                    if(err) {
                        return res.serverError();
                    }

                    return res.json(businessInfo);
                });
            }
        })


    }
};

