var express = require('express');

var users_routes = require('./handlers/users');
var products_routes = require('./handlers/products');
var order_routes = require('./handlers/orders');
// var dashboard_routes = require('./handlers/dashboard');
var cors = require('cors');

var app = express(); // Create an Express application (App)

var PORT = process.env.PORT || 3000;

var corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use CORS as middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route handler for the main endpoint ('/') of the server
app.get('/', function (req, res) {
  res.json({ message: 'Main Route is working!!' });
});

users_routes(app);
products_routes(app);
order_routes(app);
// dashboard_routes(app);

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
