'use strict';
const express = require('express');
const validUrl = require('valid-url');
const router = express.Router();
const Url = require('./model').Url;

function checkRandomShort(callback) {
	const shortId = Math.floor(Math.random()*10000) + 1;
	Url.findOne({short: shortId}, function(err, doc) {
		if(err) return callback(err);
		// if not found. Store this shortId
		if(!doc) {
			return callback(null,shortId);
		}
		checkRandomShort(callback);
	});
}

// Validate incomming request :url
router.param('url', function (req, res, next, url, err) {
	const short = {"original": null, "short": null};
	if (validUrl.isWebUri(url)){
		short["original"] = url;
		// Try to find url in DB 
		Url.findOne({original: url}, function(err, doc) {
			if(err) return next(err);
			// if not found. Create short url
			if(!doc) {
				//Check shortId availability
				checkRandomShort(function(err, id){
					short["short"] = id;
					const urlObj = new Url(short);
						urlObj.save(function(err) {
							if(err) return next(err);
							res.status(201);
							req.shortUrl = short;
							return next();
						});
				});
			} else {
				// Send short Obj to rout handler
				req.shortUrl = {"original": doc.original, "short": doc.short};
				return next();
			}
		});
	} else {
		err = new Error('Invalid Url');
		err.status = 404;
		return next(err); 
	}
});

// Check if :id exists in DB 
router.param('id', function (req, res, next, id) {
	Url.findOne({short: id}, function(err, doc) {
		if(err) return next(err);
		if(doc) {
			req.original = doc.original;
			return next();
		}
		err = new Error('That short Url is not in the Database!');
		err.status = 404;
		return next(err); 
	});
});

// GET 
// Route for displaying the api user instructions
router.get('/', function(req, res, next) {
	// Render home view
	res.render('index');
});

// GET /:url
// Route for displaying the shorten url
// https?:\/\/[\\da-z\.-]+\.[a-z]{2,6}$
router.get('/api/:url(*)', function(req, res, next) {
	// Render home view
	res.json(req.shortUrl);
});

// GET /:id
// Route for redirecting to original url
router.get('/:id', function(req, res, next) {
	// Redirect to original url
	res.redirect(req.original);
});

module.exports = router;