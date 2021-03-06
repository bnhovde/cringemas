var ns = ns || {};
var Velocity = Velocity || {};

(function(window, document, undefined) {

    'use strict';

    /**
    * Animation Controller
    */
    
    ns.animationCtrl = (function(){

        // App config and variables
        var DOM = {
            body            : document.querySelectorAll('body')[0],
            cracker 		: document.getElementById('cracker'),
            crackerLeft 	: document.getElementById('cracker-left'),
            crackerRight 	: document.getElementById('cracker-right'),
            diamond 		: document.getElementById('diamond'),
            diamondDate 	: document.getElementById('diamond-date'),
            soundClip       : document.getElementById('sound')
        };
        
        var settings = {
            crackerFired: false
        };


        /**
        * @name init
        * @desc Initialises the menu
        */ 
        var init = function () {
            
            // Initialise animation controller
            DOM.body.setAttribute('ui-animation-ctrl', 'is-started');
            
            // Set correct date on cracker
            DOM.diamondDate.innerHTML = ns.CONST.DAY;

        };


        /**
        * @name introComplete
        * @desc Intro animation has completed
        */ 
        var _introComplete = function () {
            
            // Now initialise video controller (prevents jank on page load)
            ns.videoCtrl.init();
            
            // Set correct date on cracker
            _attachEventListeners(); // Enable hovers

        };


        /**
        * @name _attachEventListeners
        * @desc Attach listeners AFTER the initial animation
        */ 
        var _attachEventListeners = function () {
            
            DOM.cracker.addEventListener('mouseover', _crackerHoverOn, false);
            DOM.cracker.addEventListener('mouseout', _crackerHoverOff, false);
            DOM.cracker.addEventListener('click', _fireCracker, false);

        };


        /**
        * @name _toggleMenu
        * @desc Animates the cracker in
        */   
        var showCracker = function () {
            
			Velocity(DOM.cracker, { translateZ: '-1000px' }, 0);
			Velocity(DOM.cracker, { translateZ: '0px' }, 1000, [1.5, 1.15]);
            
			Velocity(DOM.diamond, { 
                scale: 0,
                rotateZ: '45deg'
            }, 200);
			Velocity(DOM.diamond, { 
                scale: 1.2,
                rotateZ: '45deg'
            }, {
                duration: 200,
                complete: function() { _introComplete(); }
            });
			Velocity(DOM.diamond, { 
                scale: 1,
                rotateZ: '45deg'
            }, 1000, [2, 1.15]);
        };


        /**
        * @name _crackerHoverOn
        * @desc Animates the cracker in
        */   
        var _crackerHoverOn = function () {
            
            // No hover effects if cracker has been blown
            if (settings.crackerFired) { return; }
            
            Velocity(DOM.cracker, 'stop');
            Velocity(DOM.diamond, 'stop');
            
			Velocity(
                DOM.cracker, { 
                    translateZ: '100px',
                    rotateZ: '3deg'
                }, 500, [1.7, 1.15]
            );
            
			Velocity(
                DOM.diamond, { 
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
        var _crackerHoverOff = function () {
            
            // No hover effects if cracker has been blown
            if (settings.crackerFired) { return; }
            
            Velocity(DOM.cracker, 'stop');
            Velocity(DOM.diamond, 'stop');
            
			Velocity(
                DOM.cracker, { 
                translateZ: '0px',
                rotateZ: '0deg'
            }, 500, [1.7, 1.15]);
            
			Velocity(
                DOM.diamond, { 
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
        var _fireCracker = function () {
            
            settings.crackerFired = true;
            
            DOM.soundClip.play();
            
			Velocity(
                DOM.crackerLeft, { 
                translateX: '-300px',
                translateY: '100px',
                rotateZ: '-90deg',
            }, 500, [1.7, 1.15]);
            
			Velocity(
                DOM.crackerRight, { 
                translateX: '300px',
                translateY: '-90px',
                rotateZ: '270deg',
            }, {
                queue: false,
                duration: 500,
                easing: [1.7, 1.15],
                complete: function() { ns.videoCtrl.playVideo(); }
            });
            
			Velocity(
                DOM.cracker, { 
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