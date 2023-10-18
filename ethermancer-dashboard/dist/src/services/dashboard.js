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
exports.DashboardStore = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardStore {
    // Function to get all products for a specific order from the database
    getOrderProducts(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM order_products WHERE order_id = $1';
                const result = yield conn.query(sql, [orderId]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get order products for order ${orderId}: ${err}`);
            }
        });
    }
    // Function to get all active orders for a specific user from the database
    getActiveOrdersByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE user_id=$1 AND status='active'";
                const result = yield conn.query(sql, [userId]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get active orders for user ${userId}: ${err}`);
            }
        });
    }
}
exports.DashboardStore = DashboardStore;
