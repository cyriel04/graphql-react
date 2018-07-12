import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import Spinner from "react-spinkit";

const bookQuery = gql`
	{
		books {
			id
			name
			genre
		}
	}
`;

class BookList extends Component {
	render() {
		return (
			<div>
				<ul>
					{this.props.data.loading ? (
						<Spinner name="ball-scale-multiple" />
					) : (
						this.props.data.books.map(book => (
							<li key={book.id}>{book.name}</li>
						))
					)}
				</ul>
			</div>
		);
	}
}

export default graphql(bookQuery)(BookList);
