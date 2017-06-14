const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let books = []

//serve static file
app.get('/', function(req, res) {
	var file = path.join(__dirname, '/index.html');
	res.sendFile(file, function() {
		console.log('file sent: index.html');
	})
})

app.get('/book', function(req, res) {

	const title = req.query.title
	const length = books.length

	//error handling
	if (!title) {
		return res.status(400).send('Please, fill in the form')
	}

	if (title.length > 32) {
		return res.status(400).send('Title is too long')
	}

	// return empty object if books is empty
	if (books.length === 0) {
		return res.json({})
	}

	//searching books for specific title
	let min = 0
	let max = books.length
	let mid = 0;
	while (max - min !== 1) {
		mid = Math.floor(( max + min ) / 2)
		if (title == books[mid].title) {
			return res.status(200).json(books[mid])
		}
		if (title < books[mid].title) {
			max = mid
		} else {
			min = mid
		}
	}

	if (title == books[0].title) {
		return res.status(200).json(books[0])
	}

	// return empty object (instruction condition)
	if (title < books[0].title) {
		return res.json({})
	}

	// return closest book that is alphabetically not larger than book
	if (title < books[mid].title) {
		return res.status(200).json(books[mid - 1]) 
	} else return res.status(200).json(books[mid])

	});

app.post('/book', function(req, res) { 

	const title = req.body.title
	const author = req.body.author

	//error handling
	if (!title || !author) {
		return res.status(400).send('Please, fill in the form')
	}

	if (title.length > 32 || author.length > 32) {
		return res.status(400).send('Title or author is too long')
	}

	const book = {
		title: title,
		author: author
	}

	// initial push to empty books array
	if (!books) {
		books.push(book)
		return res.status(204)	
	}

	// post a book instance so that the array stays in alphabetical order 
	for (let i = 0; i < books.length; i++) {
		if (title < books[i].title) {
			books.splice(i, 0, book)
			return res.status(204).end()
		} 
	}
	books.push(book)
	return res.status(204).end()

})

app.listen(port, function() {
	console.log('listening on port 8080');
});

module.exports = app;