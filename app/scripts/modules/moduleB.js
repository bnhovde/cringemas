// Module B (example)

var ns = ns || {};

(function(window, document, undefined) {

    'use strict';

    ns.ModuleB = function() {
        this.talk = function(text){
            console.log('I am ' + text);
        };
    };

})(window, document);