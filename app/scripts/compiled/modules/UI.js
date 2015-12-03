'use strict';

var ns = ns || {};

(function (window, document, undefined) {

    'use strict';

    /**
    * Video Controller
    */

    ns.UI = (function () {

        // App config and variables
        var DOM = {
            body: document.querySelectorAll('body')[0],
            previousBtn: document.getElementById('previous'),
            archive: document.getElementById('archive'),
            fbShareLink: document.getElementById('social-facebook'),
            twShareLink: document.getElementById('social-twitter')
        };

        /**
        * @name init
        * @desc Initialises the UI controller
        */
        var init = function init() {

            // Initialise video controller
            DOM.body.setAttribute('ui-ctrl', 'is-started');

            // Setup video embed from google spreadsheet
            _attachEventListeners();

            // Create twitter link
            _buildShareLinks();
        };

        /**
        * @name _attachEventListeners
        * @desc Attach listeners AFTER the initial animation
        */
        var _attachEventListeners = function _attachEventListeners() {
            DOM.previousBtn.addEventListener('click', showArchive, false);
        };

        /**
        * @name _buildShareLinks
        * @desc Hide cracker and show previous cracker archive
        */
        var _buildShareLinks = function _buildShareLinks() {

            // http://twitter.com/home?status=[TITLE]+[URL]
            var twitterURL = 'http://twitter.com/home?status=Merry Cringemas!+http://cringemas.co.uk/?day=' + ns.CONST.DAY;

            // http://www.facebook.com/share.php?u=[URL]&title=[TITLE]
            var facebookURL = 'http://www.facebook.com/share.php?u=http://cringemas.co.uk/?day=' + ns.CONST.DAY + '&title=Merry Cringemas!';

            DOM.twShareLink.setAttribute('href', twitterURL);
            DOM.fbShareLink.setAttribute('href', facebookURL);
        };

        /**
        * @name showArchive
        * @desc Hide cracker and show previous cracker archive
        */
        var showArchive = function showArchive() {
            DOM.body.setAttribute('ui-archive', 'is-visible');
            DOM.body.setAttribute('ui-cracker', 'is-hidden');
            DOM.previousBtn.innerHTML = 'Previous Crackers:';

            _buildArchive();
        };

        /**
        * @name _buildArchive
        * @desc Build the archive of previous crackers
        */
        var _buildArchive = function _buildArchive() {

            var markup = '';

            for (var index = 1; index <= ns.CONST.CURRENTDAY; index++) {
                markup += '<li class="archive__item"><a href="/?day=' + index + '">Day ' + index + '</a></li>';
            }

            DOM.archive.innerHTML = markup;
        };

        //////////////////

        var module = {
            init: init,
            showArchive: showArchive
        };

        return module;
    })();
})(window, document);
//# sourceMappingURL=UI.js.map
