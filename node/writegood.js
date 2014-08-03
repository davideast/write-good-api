var Firebase = require('firebase'),
  writeGood = require('write-good'),
  async = require('async');

var fbRef = new Firebase('https://write-good.firebaseio.com/');

fbRef.child('input').on('value', function (snapshot) {
  async.each([snapshot.val()], function (input, callback) {
    fbRef.child('output').set(writeGood(input));
    callback();
  });
});
