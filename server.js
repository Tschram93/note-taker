// require packages
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const uuid = require('uuid');


app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
// set static folder to public
app.use(express.static('public/'));