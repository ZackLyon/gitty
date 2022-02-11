const { default: fetch } = require('cross-fetch');

const codeToToken = async (code) => {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  });

  const { access_token: accessToken } = await response.json();

  return accessToken;
};

const tokenToPayload = async (token) => {
  const response = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `token ${token}`,
    },
  });

  const payload = await response.json();

  return payload;
};

module.exports = { codeToToken, tokenToPayload };
