'use strict';

var jwt = require('jsonwebtoken');

module.exports = {
  verify: function (token, callback) {
    jwt.verify(token, sails.config.tokenSecret, {}, callback);
  },
  create: function (data) {
    return jwt.sign(data, sails.config.tokenSecret, {
        expiresInMinutes: 720
    });
  },
  decode: function (token, callback) {
    var decoded = jwt.decode(token, {});

    if(callback) {
      callback(decoded);
    }
    else {
      return decoded;
    }
  }
};
