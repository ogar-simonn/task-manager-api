const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "please provide values" });
  }
  const user = User.findOne({ email });
  if (!user) {
    return res.json({ message: "invalid credentials" });
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      // handle error
    }
    if (res) {
      // Send JWT
      const token = createJWT();

      return res.status(200).json({ user: user.name, token });
    } else {
      return res.json({
        success: false,
        message: "passwords do not match",
      });
    }
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.send("Please provide values");
  }
  const user = await User.create({ name, email, password });
  // const token = user.createJWT();
  res.status(201).json({ user: user.name, token: token });
};
const createJWT = function () {
  return jwt.sign(
    { userId: User._userId, name: User.name },
    {
      expiresIn: "30d",
    }
  );
};
module.exports = { login, register };
