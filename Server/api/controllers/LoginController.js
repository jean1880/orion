'use strict';

/* global AuthTokenService */

module.exports = {
  login: function (req, res) {
    if(req.body.passwordCert === sails.config.passwordCert ){
      res.json({
        token: AuthTokenService.create({authorized: true})
      });
    }
  },

  validate: function (req, res) {
    res.ok();
  }
};
