'use strict';
// mongodb and dotenv setup
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require('uuid');

// *** Use the database for the Cart transactions ***/

//*******************/
// Update the cart session if the current pizza alreay in the cart
// Otherwise add the pizza in the cart
//*******************/
const addCart = async (req, res) => {
  // create new mongoclient sesion
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');
  // addCartSuccess will be for the response
  // It will be set to true for successful database request
  let addCartSuccess = false;
  try {
    // connect to client
    await client.connect();
    // Build the query to check if the user session pizza
    // already exists in the cart by using user email and pizza name

    const query = { email: req.body.email, name: req.body.name };

    // Define the update
    const increaseCartQty = { $inc: { cartQuantity: 1 } };

    // Try an update of the cart quantity +1 in case
    // the current pizza already in the cart

    const pizzaAlreadyInCart = await db
      .collection('cart')
      .updateOne(query, increaseCartQty);

    if (
      pizzaAlreadyInCart.acknowledged &&
      pizzaAlreadyInCart.modifiedCount < 1
    ) {
      // pizza not yet in the cart. It will be added with the following insert
      // Add a pizza in the cart collection for the user session

      req.body.cartQuantity = 1;
      // The following cartId will be useful when it's to remove the item;
      req.body.cartId = uuidv4();

      const pizzaAddedToCart = await db.collection('cart').insertOne(req.body);

      if (pizzaAddedToCart) {
        addCartSuccess = true;
      }
    } else {
      // The pizza already in the cart and its quantity has been increased
      addCartSuccess = true;
    }
    if (addCartSuccess) {
      // send response containing the cart for the added pizza
      res.status(200).json({
        status: 200,
        data: req.body,
      });
    } else {
      // client input bad request
      res.status(400).json({
        status: 400,
        data: req.body,
        message: 'The pizza add To Cart transaction has failed',
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

//*******************/
// Retrieve all the contemt of the Cart for a user session
//*******************/
const getCart = async (req, res) => {
  // create new mongoclient sesion
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');

  try {
    // connect to client
    await client.connect();

    // Get the content of the cart for the current user session using the email in the query
    const cartData = await db.collection('cart').find(req.params).toArray();

    if (cartData.length > 0) {
      // send response containing the content of the cart
      // const totalCartQty = cartData.reduce(
      //   (sum, current, index) => sum + current.cartQuantity,
      //   0
      // );

      res.status(200).json({
        status: 200,
        data: cartData,
      });
    } else {
      // client cart is empty
      res.status(404).json({
        status: 404,
        message: 'The cart is empty for the current user session',
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

//*******************/
// Reduce the quantity by 1 if the user session current pizza already in the cart.
// Otherwise remove the pizza from the Cart
//*******************/
const removeCart = async (req, res) => {
  // create new mongoclient sesion
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');

  try {
    // connect to client
    await client.connect();
    // Remove the current item for the current user session using
    // the item _id and the user email.

    const deletePizzaFromCart = await db
      .collection('cart')
      .deleteOne({ cartId: req.params.cartId });
    if (
      deletePizzaFromCart.acknowledged &&
      deletePizzaFromCart.deletedCount > 0
    ) {
      // Successfully deleted
      res.status(200).json({ status: 200, data: req.params });
    } else {
      res.status(404).json({
        status: 404,
        data: req.params,
        message: 'The pizza to remove not found',
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

//*******************/
// Update the cartQuantity using the params from the body.
//*******************/
const updateCart = async (req, res) => {
  // create new mongoclient sesion
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');

  try {
    // connect to client
    await client.connect();
    // Build the query for the update of the user session pizza cart
    const query = { _id: req.body._id, email: req.body.email };

    // Define the update consists of replacing the cartQuantity by the new value
    const updateCartQuantity = {
      $set: { cartQuantity: parseInt(req.body.cartQuantity) },
    };

    const userCartUpdate = await db
      .collection('cart')
      .updateOne(query, updateCartQuantity);

    if (userCartUpdate.acknowledged && userCartUpdate.modifiedCount > 0) {
      // send response containing the cart for the added pizza
      res.status(200).json({
        status: 200,
        data: req.body,
      });
    } else {
      // client input bad request
      res.status(400).json({
        status: 400,
        data: req.body,
        message: 'The pizza add To Cart transaction has failed',
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

// Export the modules
module.exports = {
  addCart,
  getCart,
  removeCart,
  updateCart,
};
