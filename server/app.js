const express = require("express");
const expgraph = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const SECRET = "fasfasfs423sdsdfsdf";

app.use(cors());

mongoose.connect(
	"mongodb://username:password1@ds231501.mlab.com:31501/songs",
	{ useNewUrlParser: true }
);

mongoose.connection.once("open", () => console.log("connected"));

app.use(
	"/graphql",
	expgraph({
		schema,
		context: {
			SECRET
		},
		graphiql: true
	})
);
app.listen(4000, () => {
	console.log("Lets go!");
});
