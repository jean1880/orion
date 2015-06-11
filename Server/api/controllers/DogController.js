/**
 * DogsController
 *
 * @description :: Server-side logic for managing dogs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * Upload a photo for a dog to the server
   * @method uploadPhoto
   */
  uploadPhoto: function (req, res) {
    req.file('file').upload({

    }, function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }

      if (uploadedFiles.length === 0) {
        return res.badRequest('No file uploaded');
      }
      Dog.update(req.param('id'), {
          photoURL: require('util').format('%s/Dog/getPhoto/%s', sails.getBaseUrl(), req.param('id')),

          photoFd: uploadedFiles[0].fd
        })
        .exec(function (err, data) {
          if (err) return res.negotiate(err);
          return res.ok(data[0]);
        });
    });
  },

  getPhoto: function (req, res) {

    req.validate({
      id: 'string'
    });

    Dog.findOne(req.param('id')).exec(function (err, dog) {
      if (err) return res.negotiate(err);
      if (!dog) return res.notFound();

      // User has no avatar image uploaded.
      // (should have never have hit this endpoint and used the default image)
      if (!dog.photoFd) {
        return res.notFound();
      }
      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk( /* optional opts */ );

      // Stream the file down
      fileAdapter.read(dog.photoFd)
        .on('error', function (err) {
          return res.serverError(err);
        })
        .pipe(res);
    });
  }
};