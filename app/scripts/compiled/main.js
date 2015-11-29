'use strict';

var ns = ns || {};

(function (window, document, undefined) {

	'use strict';

	/**
 * Global Constants
 */

	// Create constants
	ns.CONST = {
		LAST: 31 // Default day of the calendar
	};

	// Get todays date
	var d = new Date();
	var day = d.getDate();
	var month = d.getMonth();
	var dayToDisplay = day;

	// If we're past december, use last day of december
	if (month !== 11) {
		dayToDisplay = ns.CONST.LAST;
	} else {

		// We're in December.
		// Parse URL params for date passed
		var dayParam = ns.helpers.getQueryVariable('day');
		var safeDate = parseInt(dayParam);

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
//# sourceMappingURL=main.js.map
