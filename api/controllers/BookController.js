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

Controller.find = function(req, res) {

};

Controller.update = function(req, res) {

};