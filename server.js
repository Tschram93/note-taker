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

// link to other files

// landing page
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index/html'));
});

// notes html page
app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// notes & db
app.get('/api/notes', (req, res) => {
	fs.readFile('./db/db.json', (err, data) => {
		if (err) throw err;
		const notes = JSON.parse(data);
		//need to make  json content readable
		res.json(notes);
	});
});