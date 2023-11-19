const express = require('express');
const { ProductStore } = require('../models/product');
const { verifyAuthToken: authMiddleware } = require('./auth');

const store = new ProductStore();

const index = async (_req, res) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('An unexpected error occurred.');
  }
};

const show = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await store.show(productId);
    res.json(product);
  } catch (err) {
    res.status(500).send('An unexpected error occurred.');
  }
};

const create = async (req, res) => {
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    url: req.body.url,
    quantity: req.body.quantity,
  };

  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400).send(err);
  }
};

const update = async (req, res) => {
  const productId = parseInt(req.params.id);
  const productUpdate = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    url: req.body.url,
    quantity: req.body.quantity,
  };

  try {
    const updatedProduct = await store.update(productId, productUpdate);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
};

const destroy = async (req, res) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400).send(err);
  }
};

const products_routes = (app) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', authMiddleware, create);
  app.put('/products/:id', authMiddleware, update);
  app.delete('/products/:id', authMiddleware, destroy);
};

module.exports = products_routes;
