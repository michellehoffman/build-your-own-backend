const siteData = require('../../../site-data.json');
const locationData = siteData.map(site => (
  { city: site.city, county: site.county }
));

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sites').del()
    .then(() => knex('locations').del())
    .then(() => {
      return knex('locations').insert(locationData)
    })    
    .then(() => {
      const sitesPromises = [];

      siteData.forEach(site => {
        let location = site.city
        sitesPromises.push(createLocation(knex, site, location))
      })

      return Promise.all(sitesPromises)
    })
};

const createLocation = (knex, site, location) => {
  return knex('locations').where('city', location).first()
  .then(locationRecord => {
    return knex('sites').insert({
      name: site.site_name,
      location_id: locationRecord.id,
      info: site.reports
    });
  });
};