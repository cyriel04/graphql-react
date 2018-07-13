import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "antd/dist/antd.css";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });
// const client = new ApolloClient({ uri: "http://10.19.13.208:4000/graphql" });

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div className="main">
					<h1>Welcome to React</h1>
					<BookList />
					<h1>Welcome to React</h1>
					<AddBook />
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
