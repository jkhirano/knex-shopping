const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
// const knex = require("/knexfile.js");
const users = require("./routes/users");
const products = require("./routes/products");
const carts = require("./routes/carts");
const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(users);
app.use(products);
app.use(carts);

app.listen(PORT, () => {
  console.log("Server started on PORT: ${PORT}");
});
