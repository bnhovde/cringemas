'use strict';

var ns = ns || {};
var Velocity = Velocity || {};

(function (window, document, undefined) {

    'use strict';

    /**
    * Animation Controller
    */

    ns.animationCtrl = (function () {

        // App config and variables
        var DOM = {
            body: document.querySelectorAll('body')[0],
            cracker: document.getElementById('cracker'),
            crackerLeft: document.getElementById('cracker-left'),
            crackerRight: document.getElementById('cracker-right'),
            diamond: document.getElementById('diamond')
        };

        var settings = {
            crackerFired: false
        };

        /**
        * @name init
        * @desc Initialises the menu
        */
        var init = function init() {

            // Initialise animation controller
            DOM.body.setAttribute('ui-animation-ctrl', 'is-started');

            DOM.cracker.addEventListener('mouseover', _crackerHoverOn, false);
            DOM.cracker.addEventListener('mouseout', _crackerHoverOff, false);
            DOM.cracker.addEventListener('click', _fireCracker, false);
        };

        /**
        * @name _toggleMenu
        * @desc Animates the cracker in
        */
        var showCracker = function showCracker() {

            Velocity(DOM.cracker, { translateZ: '-1000px' }, 0);
            Velocity(DOM.cracker, { translateZ: '0px' }, 1000, [1.7, 1.15]);

            Velocity(DOM.diamond, {
                scale: 3,
                rotateZ: '-145deg'
            }, 0);
            Velocity(DOM.diamond, {
                scale: 1,
                rotateZ: '45deg'
            }, 1500, [2, 1.15]);
        };

        /**
        * @name _crackerHoverOn
        * @desc Animates the cracker in
        */
        var _crackerHoverOn = function _crackerHoverOn() {

            // No hover effects if cracker has been blown
            if (settings.crackerFired) {
                return;
            }

            Velocity(DOM.cracker, 'stop');
            Velocity(DOM.diamond, 'stop');

            Velocity(DOM.cracker, {
                translateZ: '200px',
                rotateZ: '3deg'
            }, 500, [1.7, 1.15]);

            Velocity(DOM.diamond, {
                scale: 1.2,
                rotateZ: '40deg'
            }, {
                queue: false,
                duration: 600,
                easing: [2, 1.15]
            });
        };

        /**
        * @name _crackerHoverOff
        * @desc Animates the cracker in
        */
        var _crackerHoverOff = function _crackerHoverOff() {

            // No hover effects if cracker has been blown
            if (settings.crackerFired) {
                return;
            }

            Velocity(DOM.cracker, 'stop');
            Velocity(DOM.diamond, 'stop');

            Velocity(DOM.cracker, {
                translateZ: '0px',
                rotateZ: '0deg'
            }, 500, [1.7, 1.15]);

            Velocity(DOM.diamond, {
                scale: 1,
                rotateZ: '45deg'
            }, {
                queue: false,
                duration: 600,
                easing: [2, 1.15]
            });
        };

        /**
        * @name _fireCracker
        * @desc Pop that cracker
        */
        var _fireCracker = function _fireCracker() {

            settings.crackerFired = true;

            Velocity(DOM.crackerLeft, {
                translateX: '-300px',
                translateY: '100px',
                rotateZ: '-90deg'
            }, 500, [1.7, 1.15]);

            Velocity(DOM.crackerRight, {
                translateX: '300px',
                translateY: '-90px',
                rotateZ: '270deg'
            }, {
                queue: false,
                duration: 500,
                easing: [1.7, 1.15]
            });

            Velocity(DOM.cracker, {
                opacity: 1
            }, {
                queue: false,
                opacity: 0
            });
        };

        //////////////////

        var module = {
            init: init,
            showCracker: showCracker
        };

        return module;
    })();
})(window, document);
//# sourceMappingURL=animationCtrl.js.map
