# sean-boilerplate ![Dependency Status](https://david-dm.org/bducharme/sean-boilerplate/status.svg?style=flat)

A boilerplate for Node.js web applications with Gulp.

**Live Demo:** [https://sean-boilerplate.herokuapp.com](https://sean-boilerplate.herokuapp.com)

---

Technologies
--------
- [Sequelize](http://docs.sequelizejs.com/en/latest/)
- [Express.js ](http://expressjs.com/)
- [AngularJS](https://angularjs.org/)
- [Node.js](https://nodejs.org/en/)
- Pure Javascript, HTML and CSS

Features
--------
- **Gulp automated workflow** based on the [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular)
 - Using Nodemon and Browsersync for live development
 - Fully optimized build process
 - Unit test with Karma and E2E test with Protractor
- **Token-based Authentication** using [Satellizer](https://github.com/sahat/satellizer)
 - Local Authentication using Email and Password
 - Support for Google, Facebook, Twitter and Github
 - **Account Management**
    - Profile
    - Change Password
    - Forgot Password (Not done yet)
    - Link multiple providers to one account
    - Delete Account
- **Postgres** is the default database

Usage
--------
* `gulp` or `gulp build` to build an optimized version of your application in `/dist`
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode
* `gulp protractor` to launch your e2e tests with Protractor on test env with seed
* `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files on prod env with seed


License
-------

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
