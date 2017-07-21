'use strict';
const express = require('express');
const validUrl = require('valid-url');
const router = express.Router();

// Validate incomming request :url
router.param('url', function (req, res, next, url) {
	if (validUrl.isUri(url)){
			console.log('Looks like an URI:', url);
	} else {
			console.log('Not a URI');
	}
	// const validUrl = url.match(/^[http|https]+:\//);
	// const short = {"original-url": null, "short-url": null};
	// if(validUrl) {
	// 	short["original-url"] = validUrl;
	// 	req.shortUrl = short;
	// 	return next();
	// }	
	// req.shortUrl = 'Invalid Url';
	return next();
});

// GET 
// Route for displaying the api user instructions
router.get('/', function(req, res, next) {
	// Render home view
	res.render('index');
});

// GET /:url
// Route for displaying the shorten url
router.get('/api/:url(https?:\/\/[\\da-z\.-]+\.[a-z]{2,6}$)', function(req, res, next) {
	// Render home view
	res.json(req.params);
});

module.exports = router;