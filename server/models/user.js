'use strict';

var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      displayName: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      picture: {
        type: DataTypes.STRING
      },
      facebook: {
        type: DataTypes.STRING
      },
      google: {
        type: DataTypes.STRING
      },
      github: {
        type: DataTypes.STRING
      },
      twitter: {
        type: DataTypes.STRING
      }
    },
    {
      instanceMethods: {
        authenticate: function(password){
          return this.password === this.hashPassword(password);
        },
        comparePassword: function(password, done) {
          bcrypt.compare(password, this.password, function(err, isMatch) {
            done(err, isMatch);
          });
        }
      },
      hooks: {
        beforeCreate: function(user, options, next) {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
              user.password = hash;
              next();
            });
          });
        },
        beforeUpdate: function(user, options, next) {
          if (!user.changed('password')) {
            return next();
          }
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
              user.password = hash;
              next();
            });
          });
        }
      }
    });

  return User;
};
