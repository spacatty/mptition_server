const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  typeof req.headers["authorization"] !== "undefined"
    ? jwt.verify(
        req.headers["authorization"].split(" ")[1],
        process.env.JWT_SECRET,
        (err) => {
          err
            ? res.status(403).json({ success: false, message: "invalid token" })
            : next();
        }
      )
    : res.status(401).json({ success: false, message: "invalid token" });
};
module.exports = verifyToken;
