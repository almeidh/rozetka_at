/* global jasmine, protractor, browser */
'use strict';

let HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
let reporter = new HtmlScreenshotReporter({
  dest: 'tmp/screenshots',
  filename: 'index.html',
  reportTitle: 'Rozetka Automation',
  reportFailedUrl: true
});

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // restartBrowserBetweenTests: true,

  specs: ['specs/test-spec.js'],

  jasmineNodeOpts: {
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 25 * 60000
  },

  capabilities: {
    'browserName': 'chrome'
  },

  beforeLaunch: function () {
    return new Promise(function (resolve) {
      reporter.beforeLaunch(resolve);
    });
  },

  onPrepare: function () {
    global.waitTimeOut = 45000;
    global.EC = protractor.ExpectedConditions;
    global.execute = browser.call;
    jasmine.getEnv().addReporter(reporter);
    // if tests are running in docker container, please comment below line
    browser.manage().window().maximize();
  },

  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
};
