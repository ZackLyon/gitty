const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Post = require('../lib/models/Post.js');

describe('post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const testPost = {
    post: 'Sometimes nothing can be a pretty cool hand.',
  };

  const testPostReceive = {
    id: expect.any(String),
    ...testPost,
  };

  it('should make a new post', async () => {
    const post = await request(app).post('/api/v1/posts').send(testPost);

    expect(post.body).toEqual(testPostReceive);
  });

  it('should get all posts', async () => {
    await Post.insert(testPost);
    await Post.insert(testPost);

    const posts = await request(app).get('/api/v1/posts');

    expect(posts.body).toEqual([testPostReceive, testPostReceive]);
  });
});
