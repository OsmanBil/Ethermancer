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
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("./auth");
const store = new order_1.OrderStore();
// Route handler to get all orders from the database and send them as a JSON response
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(500).send('An unexpected error occurred.');
    }
});
// Route handler to get a specific order by ID from the database and send it as a JSON response
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(_req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(500).send('An unexpected error occurred.');
    }
});
// Route handler to create a new order in the database and send back the newly created order as a JSON response
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        status: req.body.status,
        user_id: 0,
    };
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            res.status(401);
            res.json('Access denied, no token provided');
            return;
        }
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decoded && decoded.user && decoded.user.id) {
            order.user_id = decoded.user.id;
        }
        else {
            throw new Error('Unable to get user ID from the token.');
        }
        const newOrder = yield store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Route handler to add a product to an order in the database and send back the added product as a JSON response
const addProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(_req.params.id, 10);
    const productId = _req.body.productId;
    const quantity = parseInt(_req.body.quantity);
    try {
        const addedProduct = yield store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Route handler to update an order's information in the database and send back the updated order as a JSON response
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params.id);
    const orderUpdate = {
        status: req.body.status,
    };
    try {
        const updatedOrder = yield store.update(orderId, orderUpdate);
        res.json(updatedOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Define the order routes using the given application instance
const order_routes = (app) => {
    app.get('/orders', index); // Define the GET route for getting all orders
    app.get('/orders/:id', auth_1.verifyAuthToken, show); // Define the GET route for getting a specific order by ID with authentication middleware
    app.post('/orders', auth_1.verifyAuthToken, create); // Define the POST route for creating a new order with authentication middleware
    app.put('/orders/:id', auth_1.verifyAuthToken, update); // Define the PUT route for updating an order by ID with authentication middleware
    app.post('/orders/:id/products', auth_1.verifyAuthToken, addProduct); // Define the POST route for adding a product to an order
};
exports.default = order_routes;
