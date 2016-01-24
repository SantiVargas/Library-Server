//Dependencies
var request = require("request");
var expect = require("expect.js");

//Book Service Tests
describe("BookSerivce - /book", function() {
	var urlBase = "http://localhost:1337/book";
	var bookId;
	//ToDo - wipe db for each test
	describe("Creating the book - POST /", function() {
		it("should succeed if a new ISBN is provided", function(done) {
			var inputBody = {
				isbn: "9781433515002",
				name: "What is the Gospel?"
			};
			request({
				url: urlBase,
				method: "POST",
				json: true,
				body: inputBody
			}, function(err, res, body) {
				console.log(body);
				expect(err).to.not.be.ok();
				expect(res.statusCode).to.be(200);
				expect(body).to.be.ok();
				expect(body.success).to.be(true);
				expect(body.data).to.be.ok();
				expect(body.data.id).to.be.ok();
				bookId = body.data.id;
				expect(body.data.isbn).to.be(inputBody.isbn);
				expect(body.data.name).to.be(inputBody.name);
				done();
			})
		});

		//ToDo - preload data for this test
		it("should fail if a book with the same ISBN already exists");
	});
	describe("Updating the book - PUT /:book_id", function() {
		it("should succeed if the book exists");
		//ToDo - preload data for this test
		it("should fail if the book does not exist");
		//ToDo - preload data for this test
		it("should not allow updating of the book's isbn");
	});
	describe("Finding the book - GET /:book_id", function() {
		//ToDo - preload data for this test
		it("should succeed if the book exists");
		it("should fail if the book does not exist");;
	});
});