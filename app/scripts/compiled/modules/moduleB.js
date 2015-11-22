// Module B (example)

'use strict';

var ns = ns || {};

(function (window, document, undefined) {

    'use strict';

    ns.ModuleB = function () {
        this.talk = function (text) {
            console.log('I am ' + text);
        };
    };
})(window, document);
//# sourceMappingURL=moduleB.js.map
