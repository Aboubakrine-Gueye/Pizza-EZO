// import pizzas data
const pizzas = require('./data/pizzas_denorm.json');

//import toppings data
const toppings = require('./data/toppings.json');

//import stores data
// const stores = require('./data/pizzaStores.json');

const stores = require('./data/stores.json');

const menus = require('./data/menus.json');

// mongodb/dotenv setup
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//load the stores menu
const loadMenus = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const db = client.db('Pezmdb');
    await client.connect();
    await db.collection('menus').insertMany(menus);
  } catch (err) {
    console.log(err);
  }
  client.close();
};

// loadMenus();

//load the stores and location
// Loads the pizzas data in pizzas collection
const loadStores = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const db = client.db('Pezmdb');
    await client.connect();
    await db.collection('stores').insertMany(stores);
  } catch (err) {
    console.log(err);
  }
  client.close();
};

// loadStores();

// Loads the pizzas data in pizzas collection
const loadPizzas = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const db = client.db('Pezmdb');
    await client.connect();
    await db.collection('pizzas').insertMany(pizzas);
  } catch (err) {
    console.log(err);
  }
  client.close();
};

loadPizzas();

// load the pizzas toppings in toppings collection
const loadToppings = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const db = client.db('Pezmdb');
    await client.connect();
    await db.collection('toppings').insertMany(toppings);
  } catch (err) {
    console.log(err);
  }
  client.close();
};

// loadToppings();
