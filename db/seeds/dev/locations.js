const siteData = require('../../../site-data.json');
const locationData = [];
siteData.forEach(site => {
  const match = locationData.find(location => location.city === site.city)

  if(!match) {
    locationData.push({ city: site.city, county: site.county })
  }
  return;
})

exports.seed = function(knex, Promise) {
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