'use strict';
// mongodb and dotenv setup
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// get user data by email and send the respponse to the client
const userLogIn = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db('Pezmdb');
  let user = null;

  try {
    await client.connect();
    user = await db.collection('users').findOne({ email: req.body.email });

    if (user) {
      // Returns the response with the user information
      res.status(200).json({
        status: 200,
        data: user,
        message: 'Success',
      });
    } else {
      res.status(404).json({
        status: 404,
        data: req.body,
        message: 'No account found',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: err.message,
    });
  }
  client.close();
};

module.exports = { userLogin };
