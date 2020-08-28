const jwt = require("jsonwebtoken");

async function authHeader(req, res, next) {
  const auth = req.headers && req.headers.authorization;

  if (!auth) {
    req.isAuth = false;
    return next();
  }

  const token = auth.split(" ")[1];

  if (!token || token.length === 0) {
    req.isAuth = false;
    return next();
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  const { userID } = decodedToken;

  req.isAuth = true;
  req.userID = userID;

  return next();
}

module.exports = authHeader;
