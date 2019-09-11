exports.up = function(knex) {
  return knex.schema.createTable("carts", table => {
    table.increments();
    table
      .integer("user_id")
      .references("user_id")
      .inTable("users");
    table
      .integer("products_id")
      .references("product_id")
      .inTable("products");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("carts");
};
