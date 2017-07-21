'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlsSchema = new Schema({
		original: String,
		short: Number
});

const Url = mongoose.model('Url', UrlsSchema);

module.exports.Url = Url;