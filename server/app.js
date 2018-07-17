const express = require("express");
const expgraph = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const SECRET = "fasfasfs423sdsdfsdf";

const auth = async req => {
	const token = req.headers.authorization;
	try {
		const { user } = await jwt.verify(token, SECRET);
		req.user = user;
	} catch (err) {
		console.log(err);
	}
	req.next();
};

mongoose.connect(
	"mongodb://username:password1@ds231501.mlab.com:31501/songs",
	{ useNewUrlParser: true }
);

mongoose.connection.once("open", () => console.log("connected"));

app.use(cors());
// app.use(auth);

app.use(
	"/graphql",
	auth,
	expgraph(req => ({
		schema,
		context: {
			SECRET,
			user: req.user
		},
		graphiql: true
	}))
);
app.listen(4000, () => {
	console.log("Lets go!");
});
