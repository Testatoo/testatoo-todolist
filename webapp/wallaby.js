/* eslint-env node  */
/* global requirejs */

module.exports = function(wallaby) {
  let path = require('path');
  let aureliaJson = require('./aurelia_project/aurelia.json');

  return {
    debug: true,

    files: [
      { pattern: 'node_modules/bluebird/js/browser/bluebird.core.js', instrument: false },
      { pattern: 'node_modules/requirejs/require.js', instrument: false },
      { pattern: 'src/**/*.js', load: false },
      { pattern: 'test/stubs/**/*.js', load: false },
      { pattern: 'test/unit/setup.js', load: false },
    ],

    tests: [
      { pattern: 'test/unit/**/*.spec.js', load: false }
    ],

    env: {
      kind: 'electron'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        'presets': [
          ['es2015', { 'loose': true }],
          'stage-1'
        ],
        plugins: [
          'syntax-flow',
          'transform-decorators-legacy',
          'transform-flow-strip-types',
          'transform-es2015-modules-amd'
        ]
      })
    },

    middleware: function (app, express) {
      app.use('/node_modules',
        express.static(path.join(__dirname, 'node_modules')));
    },

    setup: (function(wallaby) {
      wallaby.delayStart();

      requirejs.config({
        packages: [
          // packages
        ]
      });

      require(['test/unit/setup.js'].concat(wallaby.tests), function () {
        wallaby.start();
      });
    }).toString().replace('// packages', aureliaJson.build.bundles[1].dependencies.reduce(function (prev, curr) {
      let moduleName, modulePath, moduleMain;
      if (curr.path) {
        moduleName = moduleMain = curr.name;
        modulePath = path.relative(
          __dirname,
          path.resolve(__dirname, 'aurelia_project', curr.path))
          .split('\\').join('/');
        if (curr.main) {
          moduleMain = curr.main;
        }
      }
      else {
        moduleName = curr;
        let packageJson = require(__dirname + '/node_modules/' + moduleName + '/package.json');
        if (packageJson.jspm) {
          moduleMain = packageJson.jspm.main;
          modulePath = 'node_modules/' + moduleName + '/' + packageJson.jspm.directories.dist;
        }
        else {
          // <-- handling non jspm modules
          moduleMain = path.basename(packageJson.main, '.js');
          packageJson.main = packageJson.main.split('/');
          packageJson.main.pop();
          modulePath = 'node_modules/' + moduleName + '/' + packageJson.main.join('/');
          // console.log('--->' + moduleMain);
          // console.log('--->' + modulePath);
        }
      }
      return prev
        + '{ name: ' + JSON.stringify(moduleName)
        + ', location: ' + JSON.stringify(modulePath)
        + ', main: ' + JSON.stringify(moduleMain)
        + '},';
    }, ''))
  };
};
