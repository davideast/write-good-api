var Firebase = require('firebase'),
  writeGood = require('write-good'),
  async = require('async');

var fbRef = new Firebase('https://write-good.firebaseio.com/');

var listeners = {};
var listenToSession = function (sessionId) {
  var sessionRef = fbRef.child('text').child(sessionId);
  var listener = sessionRef.child('input').on('value', function (snapshot) {
    async.each([snapshot.val()], function (input, callback) {
      sessionRef.child('output').set(writeGood(input), function () {
        callback();
      });
    });
  });
  listeners[sessionId] = listener;
};

fbRef.child('text').on('child_added', function (snapshot) {
  listenToSession(snapshot.name());
});

fbRef.child('text').on('child_removed', function (snapshot) {
  var sessionId = snapshot.name();
  fbRef.child(sessionId).off('value', listeners[sessionId]);
});
