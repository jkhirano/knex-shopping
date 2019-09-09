const express = require("express");
const router = express.Router();
const db = require("../database");

// GET PRODUCTS:
router.get("/products", (req, res) => {
  return db
    .raw("SELECT * FROM products")
    .then(results => {
      res.json(results.rows);
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

// GET PRODUCT BY PRODUCT_ID:
router.get("/products/:product_id", (req, res) => {
  let productId = req.params.product_id;
  return db
    .raw("SELECT * FROM products WHERE product_id = ?", [productId])
    .then(results => {
      if (results.rows.length === 0) {
        throw new Error();
      }
      res.json(results.rows[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).status.json({ message: "Product not found" });
    });
});

// POST - ADD NEW PRODUCT:
router.post("/products/new", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let inventory = req.body.inventory;
  let price = req.body.price;
  return db
    .raw(
      "INSERT INTO products (title, description, inventory, price) VALUES (?, ?, ?, ?) RETURNING *",
      [title, description, inventory, price]
    )
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => {
      res.status(500).json({ message: "Must POST all product fields" });
    });
});

// PUT - UPDATE EXISTING PRODUCT:
router.put("/products/:product_id", (req, res) => {
  let productId = req.params.product_id;
  let title = req.body;
  let description = req.body;
  let inventory = req.body;
  let price = req.body;
  return db
    .raw(
      "UPDATE products SET title =?, description = ?, inventory = ?, price = ? WHERE product_id = ?",
      [
        title.title,
        description.description,
        inventory.inventory,
        price.price,
        productId
      ]
    )
    .then(results => {
      res.json({ message: `Product: ${productId} has been updated` });
    });
});

// DELETE - DELETE PRODUCT:
// (DELETE ISN'T WORKING...WHIYEE)
router.delete("products/:product_id", (req, res) => {
  let productId = req.params.product_id;
  return db
    .raw("SELECT * FROM products WHERE product_id =?", [productId])
    .then(results => {
      if (results.rows.length === 0) {
        throw new Error();
      }
      return db.raw("DELETE FROM products WHERE product_id = ?", [productId]);
    })
    .then(results => {
      res.json({
        message: `Product id: ${productId} successfully deleted`
      });
    })
    .catch(err => {
      res.status(400).json({ message: `Product id: ${productId} not found` });
    });
});

module.exports = router;
