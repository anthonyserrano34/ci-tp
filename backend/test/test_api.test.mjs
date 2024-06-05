import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
const should = chai.should();
chai.use(chaiHttp);

describe("Authentication API Workflow", () => {
	let user_id;

	after(function (done) {
        server.close(done);
    });

	it("should register a user", (done) => {
		chai.request(server)
			.post("/api/register")
			.send({ username: "testuser", password: "testpassword" })
			.end((err, res) => {
				user_id = res.body.id;
				res.should.have.status(200);
				done();
			});
	});

	it("should login a user", (done) => {
		chai.request(server)
			.post("/api/login")
			.send({ username: "testuser", password: "testpassword" })
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.property("token");
				done();
			});
	});

	it("should delete the user account", (done) => {
		chai.request(server)
			.delete(`/api/account`)
			.send({ id: user_id })
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});

	it("should not login a user with wrong password", (done) => {
		chai.request(server)
			.post("/api/login")
			.send({ username: "testuser", password: "wrongpassword" })
			.end((err, res) => {
				res.should.have.status(400);
				res.body.should.have
					.property("error")
					.eql("Invalid username or password");
				done();
			});
	});
});
