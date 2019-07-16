const express = require('express');
const router = express.Router();

const AuthController = require('./controllers/AuthController');
const ToolController = require('./controllers/ToolController');
const UserController = require('./controllers/UserController');

router.post('/token', AuthController.authenticate);

router.get('/tools/:tag?', AuthController.verifyJWT, ToolController.get);
router.post('/tools', AuthController.verifyJWT, ToolController.post);
router.delete('/tools/:id', AuthController.verifyJWT, ToolController.remove);

router.post('/users', UserController.post);
router.get('/users', AuthController.verifyJWT, UserController.get);

module.exports = router;