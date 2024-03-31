const express = require("express");
const router = express.Router();

const user = require('../controllers/userController');

// deploy mern app
router.post('/mern', user.deployMernApp);

// deploy static app
router.post('/static', user.deployStaticApplication);

// deploy lamp app
router.post('/lamp', user.deployLampApp);

// destroy mern app
router.post('/mern', user.destroyMernApp);

// destroy static app
router.post('/destroy-static', user.destroyStaticApp);

module.exports = router;