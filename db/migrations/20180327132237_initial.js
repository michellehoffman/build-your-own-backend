
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('locations', table => {
      table.increments('id').primary();
      table.string('city');
      table.string('county');
    }),

    knex.schema.createTable('sites', table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('location_id').unsigned()
      table.foreign('location_id')
        .references('locations.id');
      table.string('info');
    })
  ]);  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('sites'),
    knex.schema.dropTable('locations')
  ])
};
