'use strict';
// mongodb and dotenv setup
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// get a pizza of the store
const getStorePizza = async (req, res) => {
  // create new mongoclient promise
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');
  // const _id = req.params._id;
  try {
    // open a client session database connection
    await client.connect();
    // find the store with its available pizzas

    console.log('REQ = ', req);
    // const storePizzas = await db.collection('stores').findOne({ _id });
    const storePizzas = 0;
    if (storePizzas) {
      // if storePizzas is null then return 404 not found
      res.status(404).json({
        status: 404,
        message: 'Store not found',
      });
    } else {
      // send response containing the store with its available pizzas
      res.status(200).json({
        status: 200,
        data: storePizzas,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
  // close client database session connection
  client.close();
};

module.exports = {
  getStorePizza,
};
