'use strict';

/* global Chance */
/* global chance : true */

var config = {
	chance: {
		settings: {
			overrideSeed: null
		}
	}
};



//=========== Setup =============

config.chance.run = function() {
	var seed = this.settings.overrideSeed || chance.natural({min: 10000, max: 99999});
	console.log('Chance seed: ' + seed);

	// redefine global chance so that tests don't need to change
	//   and still use the same library
	chance = new Chance(seed);
};



//============ Run ===============

for (var step in config) {
	config[step].run();
}

