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
    if(!req.body.token) {
      return res.json({
        valid: false,
      });
    }

    var token = req.body.token;

    AuthTokenService.verify(token, function (err) {
      if(err) {
        res.json({
          valid: false,
        });
      }
      else {
        res.json({
          valid: true,
        });
      }
    });
  }
};
