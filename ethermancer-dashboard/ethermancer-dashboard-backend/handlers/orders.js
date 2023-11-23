const { OrderStore } = require('../models/order');
const { verifyAuthToken: authMiddleware } = require('./auth');

const store = new OrderStore();

// Route handler to get all orders from the database and send them as a JSON response
const index = async (_req, res) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(500).send('An unexpected error occurred.');
  }
};

// Route handler to get a specific order by ID from the database and send it as a JSON response
const show = async (_req, res) => {
  try {
    const order = await store.show(_req.params.id);
    res.json(order);
  } catch (err) {
    res.status(500).send('An unexpected error occurred.');
  }
};

// Route handler to create a new order in the database and send back the newly created order as a JSON response
const create = async (req, res) => {
  const order = {
    status: req.body.status,
    user_id: req.body.user_id,
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Route handler to add a product to an order in the database and send back the added product as a JSON response
const addProduct = async (_req, res) => {
  const orderId = parseInt(_req.params.id, 10);
  const productId = _req.body.productId;
  const quantity = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Route handler to update an order's information in the database and send back the updated order as a JSON response
const update = async (req, res) => {
  const orderId = parseInt(req.params.id);
  const orderUpdate = {
    status: req.body.status,
  };

  try {
    const updatedOrder = await store.update(orderId, orderUpdate);
    res.json(updatedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Define the order routes using the given application instance
const order_routes = (app) => {
  app.get('/orders', index); // Define the GET route for getting all orders
  app.get('/orders/:id', authMiddleware, show); // Define the GET route for getting a specific order by ID with authentication middleware
  app.post('/orders', create); // Define the POST route for creating a new order with authentication middleware
  app.put('/orders/:id', authMiddleware, update); // Define the PUT route for updating an order by ID with authentication middleware
  app.post('/orders/:id/products', authMiddleware, addProduct); // Define the POST route for adding a product to an order
};

module.exports = order_routes;
