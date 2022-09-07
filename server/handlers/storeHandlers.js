'use strict';
// mongodb and dotenv setup
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//*******************/
// get all stores
//*******************/
const getStores = async (req, res) => {
  // create new mongoclient promise
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');
  try {
    // open a client session database connection
    await client.connect();
    // find all stores and put them in an array
    const allStores = await db.collection('stores').find().toArray();
    if (allStores.length === 0) {
      // if array is empty return 404
      res.status(404).json({
        status: 404,
        message: 'No store to display',
      });
    } else {
      // send response containing all stores
      res.status(200).json({
        status: 200,
        data: allStores,
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

//*******************/
// get a particulary store
//*******************/
const getStore = async (req, res) => {
  // create new mongoclient promise
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');
  const _id = req.params._id;
  try {
    // open a client session database connection
    await client.connect();
    // find the store
    const storeData = await db.collection('stores').findOne({ _id });
    if (storeData) {
      res.status(200).json({
        // send response containing the store
        status: 200,
        data: storeData,
      });
    } else {
      // if storeData is nulls return 404
      res.status(404).json({
        status: 404,
        message: 'The store is not found',
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

//*******************/
// Create a new store
//*******************/
const addStore = async (req, res) => {
  // create new mongoclient promise
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');
  try {
    // open a client session database connection
    await client.connect();
    // Add a new store
    const storeIsCreated = await db.collection('stores').insertOne(req.body);
    if (storeIsCreated) {
      // send response containing the store
      res.status(200).json({
        status: 200,
        data: req.body,
      });
    } else {
      // if storeIsCreated is null - client input bad request
      res.status(400).json({
        status: 400,
        data: req.body,
        message: 'The store creation has failed',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
  // close the client database session connection
  client.close();
};

//*******************/
// Delete an existing store
//*******************/
const deleteStore = async (req, res) => {
  // create new mongoclient promise
  const client = new MongoClient(MONGO_URI, options);
  //specify database
  const db = client.db('Pezmdb');
  const _id = req.params._id;
  try {
    // open a client session database connection
    await client.connect();
    // delete a store
    const storeIsDeleted = await db.collection('stores').deleteOne({ _id });
    if (storeIsDeleted) {
      // send response containing the deleted store
      res.status(200).json({
        status: 200,
        data: req.params.id,
      });
    } else {
      // if storeIsDeleted is null - client input bad request
      res.status(400).json({
        status: 400,
        data: req.params.id,
        message: 'The store deletion has failed',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
  // close the client database session connection
  client.close();
};

module.exports = {
  addStore,
  getStore,
  deleteStore,
  getStores,
};
