'use strict';

/* global AuthTokenService */

/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
  AuthTokenService.verify(req.headers.token, function (err) {
    if(err) {
      return res.forbidden('You are not permitted to perform this action.');
    }
    else {
      return next();
    }
  });
};
