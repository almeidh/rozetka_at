/* global element, by, $, $$ */
let HomePage = function () {
  // General items
  this.url = 'https://rozetka.com.ua/';
  this.pageTitle = 'Интернет-магазин ROZETKA™: фототехника, видеотехника, аудиотехника, компьютеры и компьютерные комплектующие';
  this.smartphonesTvElectronicsLink = $('a[href*="https://rozetka.com.ua/telefony-tv-i-ehlektronika/"]');
  this.header = $('header[class="title-page"]');
  this.search = $('input[placeholder="Поиск"]');
  this.searchButton = element(by.buttonText('Найти'));

  // Smartphones TV Electronics
  this.smartphonesTvElectronicsTitle = 'Смартфоны, ТВ и электроника';
  this.telephonesLink = element(by.cssContainingText('.pab-h3-link', 'Телефоны'));
  this.smartphonesLink = element(by.cssContainingText('.m-cat-l-i-title-link', 'Смартфоны'));
  this.smartphonesTitle = 'Смартфоны';
  this.sectionHeader = element(by.tagName('h1'));
  this.sortDropdown = $('a[name="drop_link"]');
  this.sortDropdownMenu = $('div[name="drop_menu"]');
  this.newItemsSortDropdownItem = 'новинки';
  this.newItemsPartialUrl = 'sort=novelty';
  this.itemsMainDiv = $('div[name="goods_list"]');
  this.items = $$('div[name="goods_item_with_promotion"]');
  this.paginator = $('ul[name="paginator"]');
  this.tagIcon = $('i');
  this.moreItems = $('div[name="more_goods"]');

  // manufacturers
  this.productSearch = 'Motorola Moto Z';
  this.manufacturersUl = $('ul[id="sort_producer"]');
  this.motorolaTitle = 'Смартфоны Motorola';
  this.searchItems = $$('div[class="g-i-tile g-i-tile-catalog"]');
  this.loadMoreItems = $('div[name="more"]');
};

module.exports = HomePage;
