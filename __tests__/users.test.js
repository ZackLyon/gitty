const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Post = require('../lib/models/Post.js');

jest.mock('../lib/utils/github-utils');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const testPost = { post: 'Successful redirect test!' };

  it('should redirect to the github oauth page when logging in', async () => {
    const response = await request(app).get('/api/v1/github/login');

    expect(response.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback&scope=user/i
    );
  });

  it('should redirect to posts once logged in', async () => {
    await Post.insert(testPost);
    const response = await request
      .agent(app)
      .get('/api/v1/github/login/callback')
      .redirects(1);

    expect(response.body).toEqual([
      {
        id: expect.any(String),
        ...testPost,
      },
    ]);
  });
});
