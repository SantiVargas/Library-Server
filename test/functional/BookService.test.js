//Dependencies
var request = require("request");
var expect = require("expect.js");

//Book Service Tests
describe("BookSerivce - /book", function() {
	var urlBase = "http://localhost:1337/book";
	var bookId;
	//ToDo - wipe db before each test
	describe("Creating the book - POST /create", function() {
		var inputBody = {
			isbn: "9781433515002",
			name: "What is the Gospel?"
		};
		it("should succeed if a new ISBN is provided", function(done) {
			request({
				url: urlBase,
				method: "POST",
				json: true,
				body: inputBody
			}, function(err, res, body) {
				expect(err).to.not.be.ok();
				expect(res.statusCode).to.be(200);
				expect(body).to.be.an(Object);
				expect(body.success).to.eql(true);
				expect(body.data).to.be.an(Object);
				expect(body.data.id).to.be.ok();
				bookId = body.data.id;
				expect(body.data.isbn).to.be(inputBody.isbn);
				expect(body.data.name).to.be(inputBody.name);
				done();
			});
		});

		//ToDo - preload data for this test, remove "global" variables
		it("should fail if a book with the same ISBN already exists", function(done) {
			request({
				url: urlBase,
				method: "POST",
				json: true,
				body: inputBody
			}, function(err, res, body) {
				expect(err).to.not.be.ok();
				expect(res.statusCode).to.be(400);
				expect(body).to.be.an(Object);
				expect(body.success).to.eql(false);
				expect(body.data).to.not.be.ok();
				done();
			});
		});
		it("should ignore hyphens and spaces in the ISBN number");
		it("should treat ISBN 10 and 13 the same");
	});
	describe("Updating the book - PUT /:book_id", function() {
		it("should succeed if the book exists");
		//ToDo - preload data for this test
		it("should fail if the book does not exist");
		//ToDo - preload data for this test
		it("should not allow updating of the book's isbn");
	});
	describe("Get the book by id - GET /:book_id", function() {
		//ToDo - preload data for this test
		it("should succeed if the book exists", function(done) {
			var url = urlBase + "/" + bookId;
			request({
				url: url,
				method: "GET",
				json: true
			}, function(err, res, body) {
				expect(err).to.not.be.ok();
				expect(res.statusCode).to.be(200);
				expect(body).to.be.an(Object);
				expect(body.success).to.eql(true);
				expect(body.data).to.be.an(Object);
				expect(body.data.id).to.be(bookId);
				expect(body.data.isbn).to.be.ok();
				done();
			});
		});
		it("should fail if the book does not exist", function(done) {
			var url = urlBase + "/-50"; //Use a negative id, since a book id should never be negative
			request({
				url: url,
				method: "GET",
				json: true
			}, function(err, res, body) {
				expect(err).to.not.be.ok();
				expect(res.statusCode).to.be(200);
				expect(body).to.be.an(Object);
				expect(body.success).to.eql(false);
				expect(body.data).to.not.be.ok();
				done();
			});
		});
	});
	describe("Finding the book by its proeprties - POST /find", function() {
		//ToDo - preload data for this test
		it("should be able to search by ISBN");
		it("should be able to search by name");
		it("should treat multiple properties as union when searching");
	});
});