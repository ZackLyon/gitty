const codeToToken = async (code) => {
  return `nonsense nonsense ${code}`;
};

// eslint-disable-next-line
const tokenToPayload = async (token) => {
  return {
    login: 'octocat',
    email: 'octocat@got8arms.com',
  };
};

module.exports = { codeToToken, tokenToPayload };
