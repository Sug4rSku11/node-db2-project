exports.up = async function (knex) {
  await knex.schema.createTable('cars', table => {
    table.increments('id')
    table.text('vin')
    .notNullable()
    .unique()
    table.text('make')
    .notNullable()
    table.text('model')
    .notNullable()
    table.decimal('mileage')
    .notNullable()
    table.text('title')
    .defaultTo(false)
    table.text('transmission')
    .defaultTo(false)
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cars')
};
