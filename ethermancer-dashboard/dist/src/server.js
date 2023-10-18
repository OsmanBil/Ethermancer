"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./handlers/users"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const dashboard_1 = __importDefault(require("./handlers/dashboard"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)(); // Create an Express application (App)
const PORT = process.env.PORT || 3000;
// const address: string = '0.0.0.0:3000'; // The address and port on which the server will run
// Konfiguriere CORS, um Anfragen von 'http://localhost:4200' zu akzeptieren
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    optionsSuccessStatus: 200,
};
// const corsOptions = {
//   origin: 'http://localhost:4200',
//   optionsSuccessStatus: 200
// };
app.use((0, cors_1.default)(corsOptions)); // Verwende CORS als Middleware
app.use(body_parser_1.default.json()); // Use the bodyParser middleware to parse the request body if it is in JSON format
// Define a route handler for the main endpoint ('/') of the server
app.get('/', function (req, res) {
    res.send('Main Route is working');
});
// Connect the user routes handler, product routes handler, and order routes handler to the Express app
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
(0, dashboard_1.default)(app);
// Start the server and make it listen for incoming connections on port 3000
app.listen(3000, function () {
    console.log(`Starting app on: ${PORT}`);
});
exports.default = app;
