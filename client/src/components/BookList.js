import React, { Component } from "react";
import { graphql } from "react-apollo";
import Spinner from "react-spinkit";
import { booksQuery } from "../queries/queries";
import BookDetail from "./BookDetail";

class BookList extends Component {
	state = {
		id: null
	};
	render() {
		if (this.props.booksQuery.loading) {
			return <Spinner name="ball-clip-rotate-multiple" />;
		}
		return (
			<div>
				<ul className="book-list">
					{this.props.booksQuery.books.map(book => (
						<li
							key={book.id}
							onClick={() => this.setState({ id: book.id })}
						>
							{book.name}
						</li>
					))}
				</ul>
				<BookDetail bookId={this.state.id} />
			</div>
		);
	}
}

export default graphql(booksQuery, { name: "booksQuery" })(BookList);
