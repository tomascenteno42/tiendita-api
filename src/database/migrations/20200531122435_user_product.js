
exports.up = function(knex) {
    return knex.schema.createTable("user_product", table => {
        table.increments("id").primary();
        
        table.integer("user_id").unsigned();
        table.integer("product_id").unsigned();

        table.integer("quantity").defaultTo(1);

        table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");        
        table.foreign("product_id").references("id").inTable("products").onDelete("CASCADE");

        table.unique(["user_id", "product_id"]);

        table.timestamps();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("user_product");
};
