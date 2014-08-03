var Firebase = require('firebase'),
  writeGood = require('write-good');

var fbRef = new Firebase('https://write-good.firebaseio.com/');

fbRef.child('input').on('value', function (snapshot) {
  var input = snapshot.val();
  var suggestions = writeGood(input);
  fbRef.child('output').set(suggestions);
});
