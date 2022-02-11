const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Post = require('../lib/models/Post.js');

jest.mock('../lib/utils/github-utils');

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

  const registerAndLogin = async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback').redirects(1);

    return agent;
  };

  it('should make a new post', async () => {
    const agent = await registerAndLogin();
    const post = await agent.post('/api/v1/posts').send(testPost);

    expect(post.body).toEqual(testPostReceive);
  });

  it('should get all posts', async () => {
    await Post.insert(testPost);
    await Post.insert(testPost);

    const agent = await registerAndLogin();

    const response = await agent.get('/api/v1/posts');

    expect(response.body).toEqual([testPostReceive, testPostReceive]);
  });
});
