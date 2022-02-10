const { Router } = require('express');
const Post = require('../models/Post.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const post = await Post.insert(req.body);

      res.json(post);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const posts = await Post.getAll();

      res.json(posts);
    } catch (err) {
      next(err);
    }
  });
