exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { email: "ed@gmail.com", password: "***" },
        { email: "jason@gmail.com", password: "***" },
        { email: "mel@gmail.com", password: "***" }
      ]);
    });
};
