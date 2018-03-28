exports.seed = function(knex, Promise) {
  return knex('sites').del()
  .then(() => knex('locations').del())
  .then(() => {
    return Promise.all([
      knex('locations').insert({
        city: 'Denver',
        county: 'Denver'
      }, 'id')
      .then(location => {
        return knex('sites').insert([
          {
            name: 'Fire',
            location_id: location[0],
            info: 'info link'
          }
        ])
      })
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${ error }`))
    ])
  })
  .catch(error => console.log(`Error seeding data: ${ error }`))
};
