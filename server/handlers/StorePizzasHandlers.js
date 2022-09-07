'use strict';
// mongodb and dotenv setup
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Get the Menu of the current store
const getStoreMenu = async (req, res) => {
  // create new mongoclient promise
  const client = new MongoClient(MONGO_URI, options);
  //specify client session database
  const db = client.db('Pezmdb');
  try {
    // open a client session database connection
    await client.connect();

    // find the store menu that shows the available pizzas
    const menu = await db.collection('menus').findOne({ _id: req.params._id });

    if (menu) {
      // send response containing the menu of the store with its available pizzas
      res.status(200).json({
        status: 200,
        data: menu,
      });
    } else {
      // if the menu is empty or not found then return 404 not found
      res.status(404).json({
        status: 404,
        data: req.params._id,
        message: 'Store not found',
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
  getStoreMenu,
};
