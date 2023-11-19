var express = require('express');
var bodyParser = require('body-parser');
var users_routes = require('./handlers/users');
var products_routes = require('./handlers/products');
var order_routes = require('./handlers/orders');
// var dashboard_routes = require('./handlers/dashboard');
var cors = require('cors');
var pg = require('pg');
var Client = pg.Client;

var app = express(); // Create an Express application (App)

var PORT = process.env.PORT || 3000;

var corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Verwende CORS als Middleware
// Diese Zeilen ersetzen body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route handler for the main endpoint ('/') of the server
app.get('/', function (req, res) {
  res.json({ message: 'Main Route is working' });
});

app.get('/dbtest', async function (req, res) {
  var client = new Client({
    host: 'awseb-e-2qqhhymhns-stack-awsebrdsdatabase-9ztbwuywgpng.cxindoou3tc6.us-east-1.rds.amazonaws.com',
    port: 5432,
    user: 'postgres',
    password: 'postgresPW',
    database: 'postgres',
    ssl: {
       rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    var dbResponse = await client.query('SELECT NOW()');
    res.json({
      status: 'success',
      timestamp: dbResponse.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });  
  } finally {
    client.end();
  }
});

users_routes(app);
products_routes(app);
order_routes(app);
// dashboard_routes(app);

app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
