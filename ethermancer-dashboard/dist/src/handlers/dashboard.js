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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const dashboard_1 = require("../services/dashboard");
const store = new dashboard_1.DashboardStore();
// Route handler to get all products of an order from the database and send them as a JSON response
const getOrderProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params.id);
    try {
        const orderProducts = yield store.getOrderProducts(orderId);
        res.json(orderProducts);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Route handler to get all active orders of a user from the database and send them as a JSON response
const getActiveOrdersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const activeOrders = yield store.getActiveOrdersByUser(userId);
        res.json(activeOrders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Define the order routes using the given application instance
const dashboard_routes = (app) => {
    app.get('/orders/users/:id', auth_1.verifyAuthToken, getActiveOrdersByUser); // Define the GET route for getting all active orders of a user with authentication middleware
    app.get('/orders/:id/products', auth_1.verifyAuthToken, getOrderProducts); // Define the GET route for getting all products of an order with authentication middleware
};
exports.default = dashboard_routes;
