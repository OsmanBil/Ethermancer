var express = require('express');
var jwt = require('jsonwebtoken');
var UserStore = require('../models/user').UserStore;
var authMiddleware = require('./auth').verifyAuthToken;
var verifyDecodedUserMiddleware = require('./auth').verifyDecodedUser;

var store = new UserStore(); 

const index = async function(_req, res) {
  try {
    var users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(500).send('An unexpected error occurred.');
  }
};

const show = async function(req, res) {
  var userId = req.params.id;
  try {
    var user = await store.show(userId);
    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === `User ${userId} not found`) {
        res.status(404).send(`User ${userId} not found`);
      } else {
        res.status(500).send(err);
      }
    } else {
      res.status(500).send('An unexpected error occurred.');
    }
  }
};

const create = async function(req, res) {
  var user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    username: req.body.username,
  };

  try {
    var newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, 'alohomora123!');
    res.json(token);
  } catch (err) {
    console.log("Server Error:", err);  // Debugging-Zeile hinzugefügt
    res.status(400).json({ error: err.message });  // Fehlermeldung hinzugefügt
  }
};

const update = async function(req, res) {
  var userId = parseInt(req.params.id);
  var userUpdate = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  try {
    var updatedUser = await store.update(userId, userUpdate);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async function(req, res) {
  var userId = req.params.id;
  try {
    var deleted = await store.delete(userId);
    res.json(deleted);
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async function(req, res) {
  var user = {
    username: req.body.username,
    password: req.body.password,
  };
  
  try {
    var u = await store.authenticate(user.username, user.password);
    if (u) {
      var token = jwt.sign({ user: u }, 'alohomora123!');
      res.json(token);
    } else {
      res.status(401).send('Invalid login credentials');
    }
  } catch (err) {
    console.log("Login Error:", err); // Hier wird der Fehler in der Konsole angezeigt
    res.status(500).send(`Error during login: ${err}`);
  }
};

const users_routes = function(app) {
  app.post('/login', login);
  app.get('/users', authMiddleware, index);
  app.get('/users/:id', authMiddleware, show);
  app.post('/users', create);
  app.put('/users/:id', authMiddleware, verifyDecodedUserMiddleware, update);
  app.delete('/users/:id', authMiddleware, destroy);
};

module.exports = users_routes;
