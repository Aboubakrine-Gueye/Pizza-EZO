const express = require('express');
const morgan = require('morgan');

// list imported handlers

const {
  addPizza,
  getAPizza,
  getPizzas,
  getToppings,
} = require('./handlers/pizzaHandlers');

const {
  addStore,
  getStore,
  deleteStore,
  getStores,
} = require('./handlers/storeHandlers');

const { getStoreMenu } = require('./handlers/storePizzasHandlers');

const {
  addCart,
  getCart,
  removeCart,
  updateCart,
} = require('./handlers/cartHandlers');

express()
  // Log server outputs
  .use(morgan('tiny'))
  .use(express.json())

  // Any request for static files will go inti the public folder
  // helps with file pathing, looks for files relative to the static directory (in
  // this case the public folder)
  // this defines that file paths are coming from our directory, and not server-generated
  // more info here: https://stackoverflow.com/questions/28918845/what-exactly-does-serving-static-files-mean
  .use(express.static('public'))

  // Testing purposes
  .get('/api', (req, res) => {
    res.json({ status: '200', data: 'success' });
  })

  // Add a user custom pizza
  .post('/api/pizza', addPizza)
  // get a pizza and toppings
  .get('/api/pizza/:_id', getAPizza)
  // Get all pizzas
  .get('/api/pizzas', getPizzas)
  // Get all pizza toppings
  .get('/api/toppings', getToppings)

  // Store endpoints
  .get('/api/stores', getStores)
  .get('/api/store/:_id', getStore)
  .delete('/api/stores/:_id', deleteStore)
  .post('/api/store', addStore)
  .get('/api/menu/:_id', getStoreMenu)
  // .get('/api/store/pizza/', getStorePizza)

  //  Cart endpoints
  // Get the content of the cart for the current user session
  .get('/api/cart/:email', getCart)
  // Add a new pizza in the cart for the current user session
  .post('/api/cart', addCart)
  // Remove one selected pizza from the cart for the current user session
  .delete('/api/cart/:cartId', removeCart)
  // The following will do an update of the cartQuantity
  // Choose PATCH instead of a PUT
  .patch('/api/cart', updateCart)

  //  This is our catch all endpoints
  .get('*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'This is obviously not what you are looking for.',
    });
  })
  // Node spins up our server and sets it to listen on port 8000
  .listen(8000, () => console.log(`Server launched on port 8000`));
