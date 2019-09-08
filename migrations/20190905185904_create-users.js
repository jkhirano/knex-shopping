exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments("user_id"); // id SERIAL PRIMARY KEY
    table.string("email").notNullable(); // username VARCHAR (255) NOT NULL
    table.string("password").notNullable(); //password VARCHAR (255) NOT NULL
    table.timestamps(true, true); // first true = use timestamp with timezone, second true = sets default to now()
    // created_at timestamp with time zone NOT NULL default now()
    // updated_at timestamp with time zone NULL default now()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
