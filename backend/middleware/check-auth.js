const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "this-is-a-super-secret-message-should-be-hidden-TODO-make-hidden");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed!"
    });
  }
};
