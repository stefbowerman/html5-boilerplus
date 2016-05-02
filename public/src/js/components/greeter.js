Greeter = function(text) {
  this.text = text || 'What\'s Up!';
};

Greeter.prototype.greet = function() {
  console && console.log( this.text );
}

module.exports = Greeter;