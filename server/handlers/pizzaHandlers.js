'use strict';
// mongodb and dotenv setup
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// get all pizzas
const getPizzas = async (req, res) => {
  // create new mongoclient promise
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');
  try {
    // connect to client
    await client.connect();
    // find all pizzas and store them in an array
    const allPizzas = await db.collection('pizzas').find().toArray();
    if (allPizzas.length === 0) {
      // if array is empty return 404
      res.status(404).json({
        status: 404,
        message: 'No pizza to display',
      });
    } else {
      // send response containing all pizzas
      res.status(200).json({
        status: 200,
        data: allPizzas,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
  // close client
  client.close();
};

// Get only one specified pizza
const getAPizza = async (req, res) => {
  // create new mongoclient promise
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');
  try {
    // connect to client
    await client.connect();
    // Search of the requested pizza
    const pizza = await db
      .collection('pizzas')
      .findOne({ _id: req.params._id });

    if (pizza) {
      // get all the toppings of the pizza
      const listToppings = pizza.toppings.map((item) => item._id);
      // Build the query to be used to retrieve the lit of toppings of the pizza.
      const query = { _id: { $in: listToppings } };
      // Get all the toppings of the pizza from the toppings collection.
      const topping = await db.collection('toppings').find(query).toArray();
      if (topping) {
        // send response containing the pizza and the list  of toppings in an array
        pizza.toppings = topping;
        res.status(200).json({ status: 200, data: pizza });
      } else {
        // No topping for the pizza
        res.status(200).json({ status: 200, data: pizza });
      }
    } else {
      // if pizza is empty return 404
      res.status(404).json({
        status: 404,
        message: 'Pizza not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
  // close client
  client.close();
};

// Create a custom pizza
const addPizza = async (req, res) => {
  // create new mongoclient promise
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');
  try {
    // connect to client
    await client.connect();
    // Add a custom pizza in the pizzas collection
    const pizzaIsCreated = await db.collection('pizzas').insertOne(req.body);
    if (pizzaIsCreated) {
      // send response containing the pizza
      res.status(200).json({
        status: 200,
        data: req.body,
      });
    } else {
      // if pizzaIsCreated is null - client input bad request
      res.status(400).json({
        status: 400,
        data: req.body,
        message: 'The pizza creation failed',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
  // close client
  client.close();
};

// get all toppings
const getToppings = async (req, res) => {
  // create new mongoclient promise
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');
  try {
    // connect to client
    await client.connect();
    // find all toppings and store them in an array
    const allToppings = await db.collection('toppings').find().toArray();
    if (allToppings.length === 0) {
      // if array is empty return 404
      res.status(404).json({
        status: 404,
        message: 'No topping to display',
      });
    } else {
      // send response containing all toppings
      res.status(200).json({
        status: 200,
        data: allToppings,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
  // close client
  client.close();
};

module.exports = {
  addPizza,
  getPizzas,
  getAPizza,
  getToppings,
};
