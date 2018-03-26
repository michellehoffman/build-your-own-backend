const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('https://www.epa.gov/co/cleanups-colorado')
  .wait(1000)
  .click('a[href="#tab-2"]')
  .wait(2000)
  .evaluate( () => {
    const sites = [...document.querySelector('tbody').childNodes]
    const superFundSites = sites.map(site => {
      return {
        site_name: site.childNodes[0].innerText,
        city: site.childNodes[2].innerText,
        county: site.childNodes[4].innerText,
        reports: site.childNodes[6].childNodes[site.childNodes[6].childNodes.length - 1].getAttribute("href")
      }
    })
    return superFundSites
  })
  .end()
  .then( results => {
    let output = JSON.stringify(results, null, 2);
    fs.writeFile('./site-data.json', output, 'utf8', error => {
      if(error) {
        return console.log(error)
      }
      console.log('File saved');
    })
  })
  .catch( error => {
    console.log(error);
  })