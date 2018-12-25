/* global browser, describe, it, by, beforeEach, waitTimeOut, execute, $$ */

describe('Rozetka Automation', function () {
  let HomePage = require('../pages/home-page');
  let BasePage = require('../pages/base-page');
  let base = new BasePage();
  let homePage = new HomePage();

  beforeEach(function () {
    console.log('\n' + '--------------------- Test started ---------------------' + '\n\n');
    browser.ignoreSynchronization = true;
  });

  it('task #1', function () {
    let checkItems = [];
    let countNum;
    base.goTo(homePage.url);
    base.assertTitle(homePage.pageTitle);
    base.waitForClickableElement(homePage.smartphonesTvElectronicsLink);
    homePage.smartphonesTvElectronicsLink.click();
    base.waitForVisibilityOfElement(homePage.header);
    base.waitForTextInElement(homePage.header, homePage.smartphonesTvElectronicsTitle);
    base.waitForClickableElement(homePage.telephonesLink);
    homePage.telephonesLink.click();
    base.waitForClickableElement(homePage.smartphonesLink);
    homePage.smartphonesLink.click();
    base.waitForTextInElement(homePage.sectionHeader, homePage.smartphonesTitle);
    base.waitForClickableElement(homePage.sortDropdown);
    homePage.sortDropdown.click();
    base.waitForVisibilityOfElement(homePage.sortDropdownMenu);
    base.waitForClickableElement(homePage.sortDropdownMenu);
    homePage.sortDropdownMenu.$$('li').filter(function (link) {
      return link.getText().then(function (sort) {
        return sort === homePage.newItemsSortDropdownItem;
      });
    }).first().click();
    base.assertUrl(homePage.newItemsPartialUrl);
    base.waitForVisibilityOfElement(homePage.itemsMainDiv);
    base.waitForClickableElement(homePage.items.first());
    base.waitForClickableElement(homePage.items.first().$('i'));
    browser.wait(() => {
      return base.getElementAttribute($$('div[name="goods_item_with_promotion"]').first().$('i'), 'class').then((firstAtt) => {
        return String(firstAtt) === 'g-tag g-tag-icon-small-novelty sprite';
      });
    }, waitTimeOut, '[FAIL] - first element on the page is not labeled as "новинка" (“new”).');
    execute(() => {
      homePage.items.each(function (item, indexFirst) {
        item.getText()
          .then((t) => console.warn('Page 1: Verifying new item on index #' + indexFirst + ' - ' + t))
          .then(() => {
            item.$('i').isPresent()
              .then((present) => {
                if (present.toString() === 'true') {
                  item.$('i').getAttribute('class')
                    .then(function (itemClass) {
                      if (String(itemClass) !== 'g-tag g-tag-icon-small-novelty sprite') {
                        return checkItems.push(indexFirst);
                      }
                    });
                } else if (present.toString() === 'false') {
                  throw Error('[FAIL] - Page 1: Item without tag/class appeared to be listed on index #' + indexFirst + ' during item validation');
                }
              });
          });
      });
    }).catch((err) => { throw new Error(err); });
    execute(() => { homePage.paginator.all(by.tagName('li')).last().getText().then((num) => { countNum = num; }); });
    execute(() => {
      for (let starter = checkItems[0]; starter < 32; starter++) {
        homePage.items.get(starter).getText()
          .then((t) => console.warn('Page 1: Checking if item is new on index #' + starter + ' - ' + t))
          .then(() => {
            browser.wait(() => {
              return homePage.items.get(starter).$('i').getAttribute('class').then((attValue) => {
                return ['g-tag g-tag-icon-small-novelty sprite', 'g-tag g-tag-icon-small-promotion-novelty sprite'].indexOf(attValue) === -1;
              });
            }, waitTimeOut, '[FAIL] - Page 1: Item with "New" tag appears to be listed on index: ' + starter);
          });
      }
    });
    execute(() => {
      for (let index = 1; index < countNum; index++) {
        let page = index + 1;
        let startingPos = index * 32;
        let limit = page * 32;
        homePage.moreItems.click()
          .then(() => {
            browser.wait(function () {
              return $$('div[name="goods_item_with_promotion"]').count().then((results) => {
                if (index !== (countNum - 1)) {
                  return results === limit;
                } else {
                  return results > startingPos;
                }
              });
            }, waitTimeOut, '[FAIL] - Loading products process failed!');
          })
          .then(() => {
            $$('div[name="goods_item_with_promotion"]')
              .then((items) => {
                items.slice(startingPos).forEach((piece, pos) => {
                  piece.getText().then((t) => console.warn('Page ' + page + ': Checking item with index #' + (startingPos + pos) + ' - ' + t))
                    .then(() => {
                      piece.$('i').isPresent()
                        .then((is) => {
                          if (is === true) {
                            browser.wait(() => {
                              return piece.$('i').getAttribute('class').then((failingClass) => {
                                return ['g-tag g-tag-icon-small-novelty sprite', 'g-tag g-tag-icon-small-promotion-novelty sprite'].indexOf(failingClass) === -1;
                              });
                            }, waitTimeOut, '[FAIL] - Page ' + page + ': New element appears to be listed on index #' + (startingPos + pos));
                          }
                        });
                    });
                });
              });
          });
      }
    });
    base.scrollIntoView(homePage.paginator);
  });

  it('task #2', function () {
    let PositiveException = function (msg) {
      this.message = '[SUCCESS] - ' + msg;
    };
    let motoProductName = '';
    let iterator;
    base.goTo(homePage.url);
    base.assertTitle(homePage.pageTitle);
    base.waitForClickableElement(homePage.smartphonesTvElectronicsLink);
    homePage.smartphonesTvElectronicsLink.click();
    base.waitForVisibilityOfElement(homePage.header);
    base.waitForTextInElement(homePage.header, homePage.smartphonesTvElectronicsTitle);
    base.waitForClickableElement(homePage.telephonesLink);
    homePage.telephonesLink.click();
    base.waitForClickableElement(homePage.smartphonesLink);
    homePage.smartphonesLink.click();
    base.waitForTextInElement(homePage.sectionHeader, homePage.smartphonesTitle);
    base.waitForClickableElement(homePage.manufacturersUl);
    homePage.manufacturersUl.$$('li').filter((listItem) => {
      return listItem.getAttribute('id').then((motorolaID) => {
        return motorolaID.toString() === 'filter_producer_22';
      });
    }).first().click();
    base.waitForTextInElement(homePage.sectionHeader, homePage.motorolaTitle);
    base.waitForVisibilityOfElement(homePage.itemsMainDiv);
    base.waitForClickableElement(homePage.items.first());
    execute(() => {
      homePage.items.filter(function (item, indexFirst) {
        return item.getText()
          .then((t) => {
            console.warn('Page 1: Verifying motorola product on index #' + indexFirst + ' - ' + t + '\n');
            return t.includes(homePage.productSearch);
          });
      }).then((el) => {
        el[0].getText().then((txt) => { motoProductName = txt.split('\n')[0]; });
      });
    });
    base.goTo(homePage.url);
    base.assertTitle(homePage.pageTitle);
    base.waitForVisibilityOfElement(homePage.search);
    base.waitForClickableElement(homePage.search);
    homePage.search.click().sendKeys(homePage.productSearch);
    base.waitForClickableElement(homePage.searchButton);
    homePage.searchButton.click();
    base.waitForTextInElement(homePage.sectionHeader, homePage.productSearch);
    base.waitForVisibilityOfElement(homePage.searchItems.first());
    execute(() => {
      $$('div[class="g-i-tile g-i-tile-catalog"]').each((product, pos) => {
        product.getText().then((title) => {
          console.log('Page 1: Item on index #' + pos + ' - ' + title + '\n');
          if (title.indexOf(motoProductName) > -1) {
            throw new PositiveException('Page 1: Item found on index #' + pos + ' - ' + title);
          }
        });
      });
    }).catch((ex) => { if (ex instanceof PositiveException) { console.log(ex.message); } else { throw new Error(ex); } });
    base.scrollIntoView(homePage.loadMoreItems);
    execute(() => { homePage.paginator.all(by.tagName('li')).last().getText().then((number) => { iterator = number; }); });
    base.waitForClickableElement(homePage.loadMoreItems);
    execute(() => {
      for (let index = 1; index < iterator; index++) {
        let page = index + 1;
        let startingPos = index * 32;
        let limit = page * 32;
        homePage.loadMoreItems.click()
          .then(() => {
            browser.wait(function () {
              return $$('div[class="g-i-tile g-i-tile-catalog"]').count().then((results) => {
                if (index !== (iterator - 1)) {
                  return results === limit;
                } else {
                  return results > startingPos;
                }
              });
            }, waitTimeOut, '[FAIL] - Loading products process failed!');
          }).then(() => {
            $$('div[class="g-i-tile g-i-tile-catalog"]').then((cards) => {
              cards.slice(startingPos).forEach((product, pos) => {
                product.getText().then((title) => {
                  console.log('Page ' + page + ': Item on index #' + (startingPos + pos) + ' - ' + title + '\n');
                  if (title.indexOf(motoProductName) > -1) {
                    throw new PositiveException('Page ' + page + ': Item found on index #' + (startingPos + pos) + ' - ' + title);
                  }
                });
              });
            });
          }).then(() => {
            if (index === (iterator - 1)) {
              throw new Error('[FAIL] - Product of search was not found in listed items!');
            }
          });
      }
    }).catch((ex) => { if (ex instanceof PositiveException) { console.log(ex.message); } else { throw new Error(ex); } });
  });
});
