'use strict';

module.exports = function(db) {
  db.User.create({
    email: 'valid@valid.valid',
    password: 'valid'
  }).then(function (user) {
    console.log('user with email : ' + user.email + ' has been created');
  }).catch(function (err) {
    console.log(err);
  });

};
