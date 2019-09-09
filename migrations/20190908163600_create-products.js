exports.up = function(knex) {
  return knex.schema.createTable("products", table => {
    table.increments("product_id");
    table.string("title").notNullable();
    table.string("description");
    table.integer("inventory").notNullable();
    table.integer("price");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("products");
};
