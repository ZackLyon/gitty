const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    const token = jwt.verify(cookie, process.env.JWT_SECRET);

    req.user = token;
    next();
  } catch (err) {
    next(err);
  }
};
