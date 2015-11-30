'use strict';

var ns = ns || {};

(function (window, document, undefined) {

    'use strict';

    /**
    * Video Controller
    */

    ns.videoCtrl = (function () {

        // App config and variables
        var DOM = {
            body: document.querySelectorAll('body')[0],
            videoPlayBtn: document.getElementById('cracker'),
            vimeoEmbed: document.getElementById('vimeo-container')
        };

        var settings = {
            data: [],
            date: 0
        };

        var s = settings;

        /**
        * @name init
        * @desc Initialises the menu
        */
        var init = function init() {

            // Initialise video controller
            DOM.body.setAttribute('ui-video-ctrl', 'is-started');

            // Get todays date
            s.date = ns.CONST.DAY;

            // Setup video embed from google spreadsheet
            _getVideoPath();
        };

        /**
        * @name _toggleMenu
        * @desc Toggles menu visibility
        */
        var _getVideoPath = function _getVideoPath() {

            var request = new XMLHttpRequest();
            request.open('GET', 'https://spreadsheets.google.com/feeds/list/1PPrpZfJEgJEry1Qsk61jtXLIz_5eZBDvKXzhJWKxWz0/od6/public/values?hl=en_US&alt=json', true);

            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    var response = JSON.parse(request.response);
                    s.data = response.feed.entry;

                    // Populate video embed
                    _createEmbed();
                } else {
                    // We reached our target server, but it returned an error
                }
            };

            request.onerror = function () {
                // There was a connection error of some sort
            };

            request.send();
        };

        /**
        * @name _toggleMenu
        * @desc Toggles menu visibility
        */
        var _createEmbed = function _createEmbed() {

            var vimeoID = undefined;

            // Check if date exists in data source
            if (s.data[s.date - 1] !== undefined) {
                vimeoID = s.data[s.date - 1].gsx$id.$t;
            }

            // If we're testing (or embed ID is empty), use the demo embed instead
            if (ns.CONST.TEST || vimeoID === '') {
                vimeoID = 146790300;
            }

            // Add markup to DOM
            var markup = '<iframe id="vimeo-embed" src=https://player.vimeo.com/video/' + vimeoID + '?api=1 frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
            DOM.vimeoEmbed.insertAdjacentHTML('beforeend', markup);

            // Attach Event listener to newly created close button
            var closeBtn = document.getElementById('video-close');
            closeBtn.addEventListener('click', _closeVideo, false);
        };

        /**
        * @name playVideo
        * @desc Shows the video and begins playback
        */
        var playVideo = function playVideo() {

            // Prepare data for Vimeo API
            var iframe = document.getElementById('vimeo-embed');
            var player = $f(iframe);

            player.api('play');

            // Show video container
            DOM.body.setAttribute('ui-video', 'is-playing');
        };

        /**
        * @name closeVideo
        * @desc Shows the video and begins playback
        */
        var _closeVideo = function _closeVideo() {

            // Prepare data for Vimeo API
            var iframe = document.getElementById('vimeo-embed');
            var player = $f(iframe);

            player.api('pause');

            // Hide video container and show archive
            DOM.body.setAttribute('ui-video', 'is-finished');
            DOM.body.setAttribute('ui-archive', 'is-visible');
            DOM.body.setAttribute('ui-cracker', 'is-hidden');
        };

        //////////////////

        var module = {
            init: init,
            playVideo: playVideo
        };

        return module;
    })();
})(window, document);
//# sourceMappingURL=videoCtrl.js.map
