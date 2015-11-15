'use strict';

module.exports = function(db) {
  db.User.create({
    email: 'test@test.com',
    password: 'password'
  }).then(function (user) {
    console.log('user with email : ' + user.email + ' has been created');
  }).catch(function (err) {
    console.log(err);
  });

};
