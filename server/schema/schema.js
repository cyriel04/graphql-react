const { Error } = require("mongoose");
const graphql = require("graphql");
const bcrypt = require("bcrypt");
const jtw = require("jsonwebtoken");
const Book = require("../models/book");
const Author = require("../models/author");
const User = require("../models/user");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		password: { type: GraphQLString }
	}),
	resolve(parent, args) {
		return User.find();
	}
});

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		authors: {
			type: AuthorType,
			resolve(parent, args) {
				// return authors.find(authors => authors.id === parent.authorId);
				return Author.findById(parent.authorId);
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return books.filter(book => {
				//   if (book.authorId === parent.id) return book;
				// });
				return Book.find({ authorId: parent.id });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		//user
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args, { user }) {
				if (user) {
					console.log(user);
					return User.find();
				}
				console.log("bobo");
				return null;
				// return books.find(books => books.id === args.id);
			}
		},

		user: {
			type: UserType,
			resolve(parent, args, { user }) {
				if (user) {
					console.log(user);
					return User.findById(user.id);
				}
				console.log("bobo");
				return null;
				// return books.find(books => books.id === args.id);
			}
		},

		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return books.find(books => books.id === args.id);
				return Book.findById(args.id);
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				// return authors.find(authors => authors.id === args.id);
				return Author.findById(args.id);
			}
		},
		books: {
			type: new GraphQLList(BookType),
			args: { cursor: { type: GraphQLString } },
			async resolve(parent, args, { user }) {
				// return books;
				if (user) {
					console.log(user);
					const gg = await Book.find();
					console.log(gg.length);
					// if (!args.cursor) {
					// 	cursor =
					// 		Book.messages[channel.messages.length - 1]
					// 			.createdAt;
					// }

					return Book.find();
				}
				console.log("bobo");
				return Book.find();
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				// return authors;
				return Author.find();
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age
				});
				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
					createdAt: Date.now()
				});
				return book.save();
			}
		},

		//register
		register: {
			type: UserType,
			args: {
				username: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) }
			},
			async resolve(parent, args) {
				let user = new User({
					username: args.username,
					email: args.email,
					password: args.password
				});
				user.password = await bcrypt.hash(user.password, 12);
				return user.save();
			}
		},

		//login
		login: {
			type: UserType,
			args: {
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) }
			},
			async resolve(parent, args, { SECRET }) {
				const user = await User.findOne({ email: args.email });
				if (!user) {
					throw new Error("Incorrect email");
				}
				const valid = await bcrypt.compare(
					args.password,
					user.password
				);
				if (!valid) {
					throw new Error("Incorrect pw");
				}
				const token = jtw.sign(
					{
						user: { id: user.id, username: user.username }
					},
					SECRET,
					{ expiresIn: "1y" }
				);
				console.log(token);
				return { id: token };
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
