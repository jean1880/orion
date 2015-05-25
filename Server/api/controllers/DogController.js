/**
 * DogsController
 *
 * @description :: Server-side logic for managing dogs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	uploadPhoto: function(req, res) {
		req.file('photo').upload({
		
		},function whenDone(err, uploadedFiles) {
			if (err) {
				return res.negotiate(err);
			}
			
			if (uploadedFiles.length === 0){
				return res.badRequest ('No file uploaded');
			}
			
			console.log(req);
			console.log(uploadedFiles);
			
			/*Dogs.update(id, {
				photoURL: require('util').format(%s/photos/%s', sails.getBaseUrl(), id),
				
				photoFd: uploadedFiles[0].fd
			})
			.exec(function (err){
				if (err) return res.negotiate(err);
				return res.ok();
			});	*/
		});
	}
	
	
};

