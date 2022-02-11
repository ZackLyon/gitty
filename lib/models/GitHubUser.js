const pool = require('../utils/pool.js');

module.exports = class GitHubUser {
  id;
  username;
  email;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
  }

  static async create({ username, email }) {
    const { rows } = await pool.query(
      'INSERT INTO users(username, email) VALUES ($1, $2) RETURNING *;',
      [username, email]
    );

    return new GitHubUser(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [
      email,
    ]);

    if (!rows[0]) return null;

    return new GitHubUser(rows[0]);
  }
};
