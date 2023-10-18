import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { verifyAuthToken as authMiddleware } from './auth';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    console.error(err);  // <-- Fügen Sie diese Zeile hinzu
    res.status(500).send('An unexpected error occurred.');
  }
};

const show = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const product = await store.show(productId);
    res.json(product);
  } catch (err) {
    res.status(500).send('An unexpected error occurred.');
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
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
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const productUpdate: Partial<Product> = {
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
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', authMiddleware, create);
  app.put('/products/:id', authMiddleware, update);
  app.delete('/products/:id', authMiddleware, destroy);
};

export default products_routes;
