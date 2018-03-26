const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('https://www.epa.gov/co/cleanups-colorado')
  .wait(1000)
  .click('a[href="#tab-2"]')
  .wait(2000)
  .end()
  .then( (results ) => {
    console.log('on page');
  })
  .catch( error => {
    console.log(error);
  })