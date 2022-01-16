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

//POST    
app.post('/api/notes', (req, res) => {
	if (req.body.title && req.body.text) {
		const newNote = {
			title: req.body.title,
			text: req.body.text,
			id: uuidv4(),
		};
		console.log(`Saving new note:`, newNote);
		fs.readFile('./db/db.json', 'utf8', (err, data) => {
			if (err) throw err;
			const parseData = JSON.parse(data);
			parseData.push(newNote);

			const noteSave = JSON.stringify(parseData);
			fs.writeFile('./db/db.json', noteSave, (err) => {
				if (err) throw err;
				res.status(200).send('Note saved: success');
			});
		});
	} else {
		res.status(400).send('Did not send');
	}
});

// Delete
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const obj = JSON.parse(data);
        obj.forEach(element => {
            if (element.id === req.params.id) {
                obj.splice(obj.indexOf(element));
            }
        });
        
        fs.writeFile('./db/db.json', JSON.stringify(obj), (err, data) => {
            if (err) throw err;
                if (err) throw err;
                res.status(200).json(`Note deleted!`); 
        } );
    });  
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});