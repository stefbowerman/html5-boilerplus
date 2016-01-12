Greeter = function() {
  this.text = 'What\s Up!';
};

Greeter.prototype.greet = function() {
  console && console.log( this.text );
}

module.exports = new Greeter();