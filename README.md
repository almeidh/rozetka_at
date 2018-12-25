# rozetka_at

## Good to know

* 1st test is failing: When products are sorted "New", there is one item with the same tag that is shown on specific page.
* That item is: Samsung Galaxy J4+ 2/16GB SM-J415 Black
* 2nd test is passing: Searched item is found
* In the end of 2nd test console log there will be a message: SUCCESS - Page 4: Item found on index #119 - Motorola Moto Z2 Force (XT1789-06) Super Black

## Getting Started

Clone project in desired directory

### Description

Two tests written in Javascript using Protractor and Jasmine with simple reporting.

### Prerequisites

* NodeJS
* Protractor (npm install -g protractor)
* Chrome installed

### Working environment

1. NodeJS v8.11.2 (tested)
3. Chrome browser Version 71.0.3578.98 (tested)

### Installing

* Open Node.js command prompt
* CMD/Terminal > type in: "npm i -g protractor"
* Once downloaded, CMD/Terminal > type in: "webdriver-manager update"

1. Navigate to project directory (Cloned)
2. Verify presence of package.json file
3. Open Node.js command prompt positioned in project directory
4. CMD/Terminal > type in: "npm install" 
5. Once installed, you are good to go

## Running the tests

1. Open Node.js command prompt and execute: "webdriver-manager start" > this will start Selenium server locally
2. Open 2nd Node.js command prompt positioned in project root
3. CMD/Terminal > type in: "npm test"

## Reporting

1. Console reporter: Main steps that are performed during testing are logged to console
2. HTML report: Once test execution is completed, report is saved to "tmp/screenshots"
