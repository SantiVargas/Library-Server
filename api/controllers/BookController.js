var Controller = module.exports = {};

Controller.create = function(req, res) {
	//Get inputs
	var postBody = req.body;
	var isbn = postBody.isbn;
	var name = postBody.name;

	var newBook = {
		isbn: isbn,
		name: name
	};
	Book.create(newBook, function(err, book) {
		if (err) {
			sails.log.error("BookController.create", "Error creating book", err);
			return res.json(400, {
				success: false
			});
		}
		return res.json(200, {
			success: true,
			data: book
		});
	});
};

Controller.get = function(req, res) {
	//Get inputs
	var bookId = req.params.book_id;

	Book.find(bookId, function(err, bookList) {
		if (err) {
			sails.log.error("BookController.get", "Error finding book", err);
			return res.serverError();
		}
		var book = bookList[0]; //The first and only book in the list
		//Check if a book was found
		if (!book) {
			sails.log.verbose("BookController.get", "Book not found", bookList);
			//Return an error if not found
			return res.json(200, {
				success: false
			});
		} else {
			//Return the book if found
			return res.json(200, {
				success: true,
				data: book
			});
		}
	});
};

Controller.update = function(req, res) {

};