const Client = require('../database');
const bcrypt = require('bcrypt');

const pepper = 'your-pepper-value';
const saltRounds = 10;

class UserStore {
  async index() {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id) {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      if (result.rows.length === 0) {
        throw new Error(`User ${id} not found`);
      }

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}: ${err}`);
    }
  }

  async create(u) {
    try {
      if (!u.username || !u.password) {
        throw new Error('Username and password are required.');
      }
      const conn = await Client.connect();
      const sql = 'INSERT INTO users (firstName, lastName, username, password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(u.password + pepper, saltRounds);
      const result = await conn.query(sql, [u.firstName, u.lastName, u.username, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async update(id, updatedUser) {
    try {
      const conn = await Client.connect();
      const existingUser = await this.findById(id);

      if (!existingUser) {
        throw new Error(`User with ID ${id} not found.`);
      }
      const mergedUser = { ...existingUser, ...updatedUser };
      const sql = 'UPDATE users SET firstName = $1, lastName = $2, username = $3, password = $4 WHERE id = $5 RETURNING *';
      const hash = bcrypt.hashSync(mergedUser.password + pepper, saltRounds);
      const result = await conn.query(sql, [mergedUser.firstName, mergedUser.lastName, mergedUser.username, hash, id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Unable to update user (ID: ${id}): ${err}`);
    }
  }

  async delete(id) {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}: ${err}`);
    }
  }

  async authenticate(username, password) {
    const conn = await Client.connect();
    const sql = 'SELECT * FROM users WHERE username=($1)';
    const result = await conn.query(sql, [username]);
  
    if (result.rows.length) {
      const user = result.rows[0];
  
      if (bcrypt.compareSync(password + pepper, user.password)) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async findById(id) {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(`Unable to find user (ID: ${id}): ${err}`);
    }
  }
}

module.exports = { UserStore };
