"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = 'your-pepper-value'; // A pepper value used to add extra randomness to password hashing
const saltRounds = 10; // The number of salt rounds used for password hashing
class UserStore {
    // Function to get all users from the database
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
        });
    }
    // Function to get a specific user by ID from the database
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length === 0) {
                    throw new Error(`User ${id} not found`);
                }
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user ${id}: ${err}`);
            }
        });
    }
    // Function to create a new user in the database
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!u.username || !u.password) {
                    throw new Error('Username and password are required.');
                }
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (firstName, lastName, username, password) VALUES($1, $2, $3, $4) RETURNING *';
                const hash = bcrypt_1.default.hashSync(u.password + pepper, saltRounds);
                const result = yield conn.query(sql, [
                    u.firstName,
                    u.lastName,
                    u.username,
                    hash,
                ]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`unable create user (${u.username}): ${err}`);
            }
        });
    }
    // Function to update a user's information in the database
    update(id, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const existingUser = yield this.findById(id);
                if (!existingUser) {
                    throw new Error(`User with ID ${id} not found.`);
                }
                const mergedUser = Object.assign(Object.assign({}, existingUser), updatedUser);
                const sql = 'UPDATE users SET firstName = $1, lastName = $2, username = $3, password = $4 WHERE id = $5 RETURNING *';
                const hash = bcrypt_1.default.hashSync(mergedUser.password + pepper, saltRounds);
                const result = yield conn.query(sql, [
                    mergedUser.firstName,
                    mergedUser.lastName,
                    mergedUser.username,
                    hash,
                    id,
                ]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Unable to update user (ID: ${id}): ${err}`);
            }
        });
    }
    // Function to delete a user from the database by ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM users WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not delete user ${id}: ${err}`);
            }
        });
    }
    // Function to authenticate a user based on the provided username and password
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT password FROM users WHERE username=($1)';
            const result = yield conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                    return user;
                }
            }
            return null;
        });
    }
    // Function to find a user by ID in the database
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id = $1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length) {
                    return result.rows[0];
                }
                return null;
            }
            catch (err) {
                throw new Error(`Unable to find user (ID: ${id}): ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
