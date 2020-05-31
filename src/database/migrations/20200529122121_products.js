
exports.up = function(knex) {
    return knex.schema.createTable("products", table => {
        table.increments("id").primary();
        table.string("name").unique().notNullable();
        table.integer("price").notNullable();
        table.timestamps();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("products");
};
