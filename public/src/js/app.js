(function(window, undefined){

    // Use a module installed using npm and listed in the mode_modules directory
    var _ = require('underscore');

    console.log("Current timestamp = " + _.now());

    // Use a module by passing the path to the file
    var Greeter = require('./components/greeter.js');

    var greeter = new Greeter();
        greeter.greet();

    // Use a module written in es6, just use the 'babel' extension
    var component = require('./components/es6Component.babel');

    component.appendText("I'm compiled with babel & injected via JS");

})(window);
