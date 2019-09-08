const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/users/:user_id", (req, res) => {
  return db
    .raw("SELECT * FROM users WHERE user_id=?", [req.params.user_id])
    .then(results => {
      if (results.rows.length === 0) {
        throw new Error();
        // console.log(results.rows);
      }
      res.json(results.rows);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "User not found" });
    });
});

// router.post("/users", (req, res) => {
//   db.raw("INSERT INTO users (email) VALUES(?) RETURNING *", [email])
//     .then(results => {
//       console.log(results.rows);
//       res.status(200).json({ user: results.rows[0] });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: err.message });
//     });
// });

module.exports = router;
