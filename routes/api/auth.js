const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

router.get("/", auth, (req, res) => {
  res.send("Auth Route");
});

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password  is required").exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user Exist

      let user = await User.findOne({ email });
      // checking is user exist
      console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Creditials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      //Matching the password
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Creditials" }] });
      }

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
