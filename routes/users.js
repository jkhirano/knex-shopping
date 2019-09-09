const express = require("express");
const router = express.Router();
const db = require("../database");

// GET USER BY USER_ID:
router.get("/users/:user_id", (req, res) => {
  let userId = req.params.user_id;
  return db
    .raw("SELECT * FROM users WHERE user_id=?", [userId])
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

// POST - USER LOGIN
// (NEED TO COME BACK TO THIS ONE - EVEN THOUGH PW MATCHES, IT SAYS USER NOT FOUND)
router.post("/users/login", (req, res) => {
  let email = req.body.email;
  let pw = req.body.password;
  return db
    .raw("SELECT * FROM users WHERE email=?", [email])
    .then(results => {
      if (results.rows.length === 0) {
        // return res.send({ message: "User not found" });
        throw new Error();
        //   console.log(results.rows);
        // console.log(results.rows.length);
      }

      if (results.rows[0].password !== pw) {
        return res.send({ message: "Incorrect password" });
      } else {
        return res.jason(results.rows);
        //   res.json(results.rows);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "User not found" });
    });
});

// POST - USER REGISTER:
router.post("/users/register", (req, res) => {
  let email = req.body.email;
  let pw = req.body.password;
  return db
    .raw("SELECT * FROM users WHERE email = ?", [email])
    .then(results => {
      if (results.rows.length !== 0) {
        return res.send({ message: "User already exists" });
      }
      return db
        .raw("INSERT INTO users (email, password) VALUES(?,?) RETURNING *", [
          email,
          pw
        ])
        .then(results => {
          //   console.log(results.rows);
          res.status(200).json({ user: results.rows[0] });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

// PUT - USER FORGOT PASSWORD
router.put("/users/:user_id/forgot-password", (req, res) => {
  let userId = req.params.user_id;
  let newPw = req.body;
  return db
    .raw("SELECT * FROM users WHERE user_id =?", [userId])
    .then(results => {
      if (results.rows.length === 0) {
        return res.send("User not found");
      }
      return db
        .raw("UPDATE users SET password = ? WHERE user_id = ?", [
          newPw.password,
          userId
        ])
        .then(results => {
          res.json({ message: "New password created!" });
        });
    });
});

// DELETE - BY USER ID
// (THROWING 'UNHANDLED ERROR EVENT', CAN'T FIGURE OUT WHERE THE ISSUE IS)
router.delete("/users/:user_id", (req, res) => {
  let userId = req.params.user_id;
  return db
    .raw("SELECT * FROM users WHERE user_id = ?", [userId])
    .then(results => {
      if (results.rows.length === 0) {
        // return res.send(400, "Not found");
        throw new Error();
      }
      // });
      return db
        .raw("DELETE FROM users WHERE user_id = ?", [userId])
        .then(results => {
          res.json({ message: `User id: ${userId} successfully deleted` });
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({ message: "User id not found" });
        });
    });
});

module.exports = router;
