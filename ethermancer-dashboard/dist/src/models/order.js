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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    // Function to get all orders from the database
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get orders: ${err}`);
            }
        });
    }
    // Function to create a new order in the database
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
                const result = yield conn.query(sql, [order.user_id, order.status]);
                const createdOrder = result.rows[0];
                conn.release();
                return createdOrder;
            }
            catch (err) {
                throw new Error(`Could not add new order: ${err}`);
            }
        });
    }
    // Function to update the status of an order in the database
    update(orderId, orderUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
                const result = yield conn.query(sql, [orderUpdate.status, orderId]);
                const updatedOrder = result.rows[0];
                conn.release();
                return updatedOrder;
            }
            catch (err) {
                throw new Error(`Could not update order ${orderId}: ${err}`);
            }
        });
    }
    // Function to get a specific order by ID from the database
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find order ${id}: ${err}`);
            }
        });
    }
    // Function to add a product to an order in the database
    addProduct(quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getOrderSql = 'SELECT status FROM orders WHERE id = $1';
                const insertProductSql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                const conn = yield database_1.default.connect();
                const orderResult = yield conn.query(getOrderSql, [orderId]);
                const order = orderResult.rows[0];
                if (!order) {
                    throw new Error(`Order with ID ${orderId} not found.`);
                }
                if (order.status !== 'active') {
                    throw new Error(`Order with ID ${orderId} has status '${order.status}', and cannot accept new products.`);
                }
                const result = yield conn.query(insertProductSql, [
                    quantity,
                    orderId,
                    productId,
                ]);
                const addedProduct = result.rows[0];
                conn.release();
                return addedProduct;
            }
            catch (err) {
                throw new Error(`Could not add new product ${productId} to order ${orderId}: ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
