var ns = ns || {};

(function(window, document, undefined) {

    'use strict';

    /**
    * Global Constants
    */
	
	// Create constants
	ns.CONST = {
		DEFAULT : 24, // Default day of the calendar
		LAST : 31 // Last day of the calendar
	};

	// Get todays date
	let d = new Date();
	let day = d.getDate();
	let month = d.getMonth();
	let dayToDisplay = day;
	
	// If we're past december, use default day
	if (month !== 11) { 
		dayToDisplay = ns.CONST.DEFAULT; 
	} else {
		
		// We're in December.
		// Parse URL params for date passed
		let dayParam = ns.helpers.getQueryVariable('day');
		let safeDate = parseInt(dayParam);
		
		// Ensure day param is within accepted range
		if (safeDate > 0 && safeDate <= ns.CONST.LAST && safeDate <= day) {
			dayToDisplay = safeDate;
		}
	}
	
	console.log('showing day ' + dayToDisplay);
	
	// Set constants
    ns.CONST.DAY = dayToDisplay;
    ns.CONST.CURRENTDAY = day;
	ns.CONST.TEST = ns.helpers.getQueryVariable('test');
	
	// Fire off modules
	ns.animationCtrl.init();
	ns.UI.init();
	
})(window, document);

