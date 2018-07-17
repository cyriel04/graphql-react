import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "antd/dist/antd.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import Login from "./components/Login";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	request: async operation => {
		const token = await sessionStorage.getItem("token");
		operation.setContext({
			headers: {
				authorization: token
			}
		});
	}
});
// const client = new ApolloClient({ uri: "http://10.19.13.208:4000/graphql" });

class App extends Component {
	render() {
		console.log(sessionStorage.getItem("token"));
		const token = sessionStorage.getItem("token");
		return (
			<ApolloProvider client={client}>
				<BrowserRouter>
					<Switch>
						{!token ? (
							<Login />
						) : (
							<Route
								children={() => (
									<Switch>
										<Route
											exact
											path="/"
											component={BookList}
										/>
										<Route
											exact
											path="/add"
											component={AddBook}
										/>
										{/* <Route component={NotFoundPage} /> */}
									</Switch>
								)}
							/>
						)}
					</Switch>
				</BrowserRouter>
			</ApolloProvider>
		);
	}
}

export default App;
