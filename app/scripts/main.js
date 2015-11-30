var ns = ns || {};

(function(window, document, undefined) {

    'use strict';

    /**
    * Global Constants
    */
	
	// Create constants
	ns.CONST = {
		LAST : 31 // Default day of the calendar
	};

	// Get todays date
	let d = new Date();
	let day = d.getDate();
	let month = d.getMonth();
	let dayToDisplay = day;
	
	// If we're past december, use last day of december
	if (month !== 11) { 
		dayToDisplay = ns.CONST.LAST; 
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
	ns.CONST.TEST = ns.helpers.getQueryVariable('test');
	
	// Fire off modules
	ns.animationCtrl.init();
	
})(window, document);

