'use strict';
const express = require('express');
const router = express.Router();

// GET 
// Route for displaying the api user instructions
router.get('/', function(req, res, next) {
	// Render home view
	res.send('Hello');
});

module.exports = router;