const jwt = require("jsonwebtoken");

const jwtAuth = (req, resp, next) => {
  try {
    const authToken = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(authToken, "xxxx");
    req.userData = decoded;
    next();
  } catch (error) {
    return resp.status(401).json({
      message: "Authorization Fail.!",
      data: error,
    });
  }
};

module.exports = { jwtAuth };
