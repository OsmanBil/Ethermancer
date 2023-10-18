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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("./auth");
const store = new user_1.UserStore(); // Create a new instance of the UserStore class
// Route handler to get all users from the database and send them as a JSON response
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        res.status(500).send('An unexpected error occurred.');
    }
});
// Route handler to get a specific user by ID from the database and send it as a JSON response
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield store.show(userId);
        res.json(user);
    }
    catch (err) {
        if (err instanceof Error) {
            if (err.message === `User ${userId} not found`) {
                res.status(404).send(`User ${userId} not found`);
            }
            else {
                res.status(500).send(err);
            }
        }
        else {
            res.status(500).send('An unexpected error occurred.');
        }
    }
});
// Route handler to create a new user in the database and send back the newly created user as a JSON response
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        username: req.body.username,
    };
    try {
        const newUser = yield store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Route handler to update a user's information in the database and send back the updated user as a JSON response
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const userUpdate = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };
    try {
        const updatedUser = yield store.update(userId, userUpdate);
        res.json(updatedUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Route handler to delete a user from the database by ID and send back the deleted user as a JSON response
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const deleted = yield store.delete(userId);
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Export the users_routes function as a default export so that it can be imported into other files and used to define the routes for the users API
const users_routes = (app) => {
    app.get('/users', auth_1.verifyAuthToken, index); // Define the GET route for getting all users
    app.get('/users/:id', auth_1.verifyAuthToken, show); // Define the GET route for getting a specific user by ID
    app.post('/users', create); // Define the POST route for creating a new user
    app.put('/users/:id', auth_1.verifyAuthToken, auth_1.verifyDecodedUser, update); // Define the PUT route for updating a user by ID
    app.delete('/users/:id', auth_1.verifyAuthToken, destroy); // Define the DELETE route for deleting a user with authentication middleware
};
exports.default = users_routes;
