exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert([
        {
          title: "Lavender Oil",
          description: "To Sleep",
          inventory: "10",
          price: "12"
        },
        {
          title: "Pepperment Oil",
          description: "To wake up",
          inventory: "8",
          price: "14"
        },
        {
          title: "Orange Oil",
          description: "To get happy",
          inventory: "4",
          price: "11"
        }
      ]);
    });
};
