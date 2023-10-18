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
const product_1 = require("../models/product");
const auth_1 = require("./auth");
const store = new product_1.ProductStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (err) {
        res.status(500).send('An unexpected error occurred.');
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield store.show(productId);
        res.json(product);
    }
    catch (err) {
        res.status(500).send('An unexpected error occurred.');
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        url: req.body.url,
        quantity: req.body.quantity,
    };
    try {
        const newProduct = yield store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = parseInt(req.params.id);
    const productUpdate = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        url: req.body.url,
        quantity: req.body.quantity,
    };
    try {
        const updatedProduct = yield store.update(productId, productUpdate);
        res.json(updatedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield store.delete(req.params.id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const products_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', auth_1.verifyAuthToken, create);
    app.put('/products/:id', auth_1.verifyAuthToken, update);
    app.delete('/products/:id', auth_1.verifyAuthToken, destroy);
};
exports.default = products_routes;
