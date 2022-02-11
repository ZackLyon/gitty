const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GitHubUser = require('../models/GitHubUser.js');
const { tokenToPayload, codeToToken } = require('../utils/github-utils.js');

const ONE_DAY = 1000 * 60 * 60 * 24;
module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user`
    );
  })

  .get('/login/callback', async (req, res, next) => {
    const { code } = req.query;

    try {
      const accessToken = await codeToToken(code);
      const profile = await tokenToPayload(accessToken);

      const { login: username, email } = profile;

      let user = await GitHubUser.findByEmail(email);

      if (!user) {
        user = await GitHubUser.create({ username, email });
      }

      const jwtUser = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      res
        .cookie(process.env.COOKIE_NAME, jwtUser, {
          httpOnly: true,
          maxAge: ONE_DAY,
        })
        .redirect('/api/v1/posts');
    } catch (err) {
      next(err);
    }
  });
