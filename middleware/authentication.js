const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authToken = req.headers.authorization;
  // console.log(authToken);
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json("Invalid athentication");
  }
  const token = authToken.split(" ")[1];

  try {
    const payload = jwt.verify(token);
    console.log(payload);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
