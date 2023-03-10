const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const routes = Router();

routes.get('/contacts', ContactController.index);
routes.get('/contacts/:id', ContactController.show);
routes.delete('/contacts/:id', ContactController.delete);
routes.post('/contacts', ContactController.store);
routes.put('/contacts/:id', ContactController.update);

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);
routes.get('/categories/:id', CategoryController.show);
routes.delete('/categories/:id', CategoryController.delete);
routes.put('/categories/:id', CategoryController.update);
module.exports = routes;
