/* global browser, EC, waitTimeOut */
'use strict';

let BasePage = function () {
  /* base specific functions */

  this.goTo = function (url) {
    return browser.get(url);
  };

  this.assertTitle = function (title) {
    return browser.wait(EC.titleIs(title), waitTimeOut, '[FAIL] - Title is not correct!');
  };

  this.assertUrl = function (partial) {
    return browser.wait(EC.urlContains(partial), waitTimeOut, '[FAIL] - Url does not contain expected partial');
  };

  this.goBack = function () {
    return browser.navigate().back();
  };

  this.scroll = function (x, y) {
    return browser.executeScript(`window.scrollTo(${x},${y});`);
  };

  this.scrollIntoView = function (element) {
    return browser.executeScript('arguments[0].scrollIntoView()', element.getWebElement());
  };

  this.wait = function (timeout) {
    return browser.sleep(timeout);
  };

  this.getElementAttribute = function (element, attribute) {
    return element.getAttribute(attribute)
      .then(function (value) {
        return value;
      });
  };

  this.waitForVisibilityOfElement = function (element) {
    return browser.wait(EC.visibilityOf(element), waitTimeOut, '[FAIL] - Element appears to be invisible.');
  };

  this.waitForDisappearanceOfElement = function (element) {
    return browser.wait(EC.stalenessOf(element), waitTimeOut, '[FAIL] - Element is still present.');
  };

  this.waitForTextInElement = function (element, text) {
    return browser.wait(EC.textToBePresentInElement(element, text), waitTimeOut, '[FAIL] - Text in element in not present.');
  };

  this.waitForClickableElement = function (element) {
    return browser.wait(EC.elementToBeClickable(element), waitTimeOut, '[FAIL] - Element appears not to be clickable');
  };

  this.waitForInvisibilityOfElement = function (element) {
    return browser.wait(EC.invisibilityOf(element), waitTimeOut, '[FAIL] - Element appears to be visible');
  };

  this.waitForNotClickableElement = function (element) {
    return browser.wait(EC.not(EC.elementToBeClickable(element)), waitTimeOut, '[FAIL] - Element appears to be clickable');
  };
};

module.exports = BasePage;
