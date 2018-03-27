
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('locations', table => {
      table.unique('city')
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('locations', table => {
      table.dropUnique('city')
    })
  ]);
};
