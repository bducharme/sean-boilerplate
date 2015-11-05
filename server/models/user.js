'use strict';

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      salt: {
        type: DataTypes.BLOB
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
      linkedin: {
        type: DataTypes.STRING
      },
      twitter: {
        type: DataTypes.STRING
      }
    },
    {
      instanceMethods: {
        makeSalt: function() {
          return crypto.randomBytes(128).toString('base64');
        },
        authenticate: function(password){
          return this.password === this.hashPassword(password);
        },
        hashPassword: function(password) {
          if (this.salt && password) {
            return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
          } else {
            return password;
          }
        }
      },
      hooks: {
        beforeCreate: function(user, options, next) {
          if (!user.password) {
            return next();
          }

          console.log('problemo2');
          user.salt = user.makeSalt();
          user.password = user.hashPassword(user.password);
        }
      }
    });

  return User;
};
