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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const order_1 = require("../models/order");
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const request = (0, supertest_1.default)(server_1.default);
let token;
let orderId;
let productId;
let userId1;
let userId2;
beforeAll((done) => {
    request
        .post('/users')
        .send({
        username: 'testUsername',
        password: 'testPassword',
        firstName: 'testFirstName',
        lastName: 'testLastName',
    })
        .end((err, response) => {
        token = response.body;
        const decoded = jsonwebtoken_1.default.decode(token);
        if (typeof decoded !== 'string' &&
            decoded &&
            'user' in decoded &&
            'id' in decoded.user) {
            userId1 = decoded.user.id;
        }
        request
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'testProduct',
            price: 100,
            description: 'testDescription',
            url: 'testUrl',
        })
            .end((err, response) => {
            productId = response.body.id;
            done();
        });
    });
});
describe('Test endpoint responses', () => {
    describe('Server Main Route', () => {
        it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/');
            expect(response.status).toBe(200);
        }));
    });
    describe('Users Routes', () => {
        it('should retrieve all users', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get('/users')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.post('/users').send({
                username: 'testUsername2',
                password: 'testPassword2',
                firstName: 'testFirstName2',
                lastName: 'testLastName2',
            });
            expect(res.statusCode).toEqual(200);
            const decoded = jsonwebtoken_1.default.decode(token);
            if (typeof decoded !== 'string' &&
                decoded &&
                'user' in decoded &&
                'id' in decoded.user)
                userId2 = decoded.user.id;
        }));
        it('should retrieve a specific user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get(`/users/${userId2}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('should update a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .put(`/users/${userId2}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                firstName: 'updatedFirstName',
                lastName: 'updatedLastName',
                password: 'updatedPassword',
                username: 'updatedUsername',
            });
            expect(response.status).toBe(200);
        }));
        it('should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .delete(`/users/${userId2}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('should fail to create a new user due to missing information', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.post('/users').send({
                username: 'testUsername3',
                // Password is missing
                firstName: 'testFirstName3',
                lastName: 'testLastName3',
            });
            expect(res.statusCode).toEqual(400);
        }));
        it('should fail to retrieve a non-existent user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get(`/users/9999999`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(500);
        }));
    });
    describe('Orders Routes', () => {
        it('should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post('/orders')
                .set('Authorization', `Bearer ${token}`)
                .send({
                status: 'active',
            });
            expect(response.status).toBe(200);
            expect(response.body.status).toEqual('active');
            orderId = response.body.id;
        }));
        it('should retrieve all orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get('/orders')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('should retrieve a specific order by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get(`/orders/${orderId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('should update an order', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .put(`/orders/${orderId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                status: 'active',
            });
            expect(response.status).toBe(200);
            expect(response.body.status).toEqual('active');
        }));
        it('should add a product to an order', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post(`/orders/${orderId}/products`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                productId: productId,
                quantity: 2,
            });
            expect(response.status).toBe(200);
            expect(response.body.quantity).toEqual(2);
        }));
    });
    describe('Products Routes', () => {
        it('should retrieve all products', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get('/products')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('should retrieve a specific product by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get(`/products/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('should update a product', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .put(`/products/${productId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                name: 'updatedProduct',
                price: 200,
            });
            expect(response.status).toBe(200);
            expect(response.body.name).toEqual('updatedProduct');
        }));
        it('should delete a product', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .delete(`/products/${productId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
    });
    describe('Order Model', () => {
        const store = new order_1.OrderStore();
        let testOrder;
        // Test for the index method
        it('should have an index method', () => {
            expect(typeof store.index).toBe('function');
        });
        it('index method should return a list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
        }));
        // Test for the create method
        it('should have a create method', () => {
            expect(typeof store.create).toBe('function');
        });
        it('create method should add an order', () => __awaiter(void 0, void 0, void 0, function* () {
            testOrder = yield store.create({
                user_id: 1,
                status: 'active',
            });
            expect(testOrder).toBeDefined();
            expect(testOrder.user_id).toBe(1);
            expect(testOrder.status).toBe('active');
        }));
        // Test for the update method
        it('should have an update method', () => {
            expect(typeof store.update).toBe('function');
        });
        it('update method should update the status of an order', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedOrder = yield store.update(testOrder.id, {
                status: 'complete',
            });
            expect(updatedOrder).toBeDefined();
            expect(updatedOrder.id).toBe(testOrder.id);
            expect(updatedOrder.status).toBe('complete');
        }));
        // Test for the show method
        it('should have a show method', () => {
            expect(typeof store.show).toBe('function');
        });
        it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.show(`${testOrder.id}`);
            expect(result).toBeDefined();
            expect(result.id).toBe(testOrder.id);
            expect(result.user_id).toBe(1);
            expect(result.status).toBe('complete');
        }));
        // Test for the addProduct method
        it('should have an addProduct method', () => {
            expect(typeof store.addProduct).toBe('function');
        });
    });
    describe('Product Model', () => {
        const store = new product_1.ProductStore();
        // Test for the index method
        it('should have an index method', () => {
            expect(typeof store.index).toBe('function');
        });
        it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
        }));
        // Test for the create method
        it('should have a create method', () => {
            expect(typeof store.create).toBe('function');
        });
        // Test for the show method
        it('should have a show method', () => {
            expect(typeof store.show).toBe('function');
        });
        // Test for the update method
        it('should have an update method', () => {
            expect(typeof store.update).toBe('function');
        });
        it('should have an update method', () => {
            expect(typeof store.update).toBe('function');
        });
        // Test for the delete method
        it('should have a delete method', () => {
            expect(typeof store.delete).toBe('function');
        });
    });
    describe('User Model', () => {
        const store = new user_1.UserStore();
        let userId;
        it('should have an index method', () => {
            expect(typeof store.index).toBe('function');
        });
        it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
        }));
        it('should have a show method', () => {
            expect(typeof store.show).toBe('function');
        });
        it('should have a create method', () => {
            expect(typeof store.create).toBe('function');
        });
        it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.create({
                firstName: 'Test',
                lastName: 'User',
                username: 'testuser',
                password: 'password123',
            });
            expect(result).toBeDefined();
            if (result) {
                expect(result.username).toBe('testuser');
                userId = result.id;
            }
        }));
        it('should have an update method', () => {
            expect(typeof store.update).toBe('function');
        });
        it('update method should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.update(userId, {
                firstName: 'Updated',
                lastName: 'User',
                username: 'updateduser',
                password: 'newpassword123',
            });
            expect(result).toBeDefined();
            if (result) {
                expect(result.username).toBe('updateduser');
            }
        }));
        it('should have a delete method', () => {
            expect(typeof store.delete).toBe('function');
        });
        it('should have an authenticate method', () => {
            expect(typeof store.authenticate).toBe('function');
        });
    });
    afterAll((done) => {
        request
            .delete(`/orders/${orderId}/products/${productId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err1) => {
            if (err1) {
                console.error('Error deleting order product:', err1);
            }
            request
                .delete(`/orders/${orderId}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err2) => {
                if (err2) {
                    console.error('Error deleting order:', err2);
                }
                request
                    .delete(`/products/${productId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .end((err3) => {
                    if (err3) {
                        console.error('Error deleting product:', err3);
                    }
                    request
                        .delete(`/users/${userId1}`)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err4) => {
                        if (err4) {
                            console.error('Error deleting user:', err4);
                        }
                        done();
                    });
                });
            });
        });
    });
});
