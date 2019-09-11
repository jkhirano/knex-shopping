const express = require("express");
const router = express.Router();
const db = require("../database");

// GET CARTS BY USER_ID
router.get("/carts/:user_id", (req, res) => {
  return db
    .raw("SELECT * FROM carts WHERE user_id = ?", [req.params.user_id])
    .then(results => {
      res.json(results.rows);
    });
});

// POST INTO CARTS WITH USER_ID & PRODUCT_ID
router.post("/carts/:user_id/:product_id", (req, res) => {
  let userId = req.params.user_id;
  let productId = req.params.product_id;
  return db
    .raw("INSERT INTO carts (user_id, product_id) VALUES (?,?)", [
      userId,
      productId
    ])
    .then(results => {
      res.json({ success: true });
    });
});

// DELETE CARTS WHEN USER_ID & PRODUCT ID MATCH
router.delete("/carts/:user_id/:product_id", (req, res) => {
  let userId = req.params.user_id;
  let productId = req.params.product_id;
  return db
    .raw("DELETE FROM * carts WHERE user_id =? AND product_id = ?", [
      userId,
      productId
    ])
    .then(results => {
      res.json({ success: true });
    });
});

module.exports = router;
