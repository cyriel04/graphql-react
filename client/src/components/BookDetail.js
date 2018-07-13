import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Card } from "antd";
import { bookQuery } from "../queries/queries";

class BookDetail extends Component {
	gg() {
		if (this.props.data.book) {
			return (
				<Card
					title={`Title: ${this.props.data.book.name}`}
					bordered={false}
					style={{ width: 300, height: 200 }}
				>
					<p>{`Genre: ${this.props.data.book.name}`}</p>
					<p>{`Author: ${this.props.data.book.authors.name}`}</p>
					<ul>
						{this.props.data.book.authors.books.map(book => (
							<li
								key={book.id}
								onClick={() => this.setState({ id: book.id })}
							>
								{book.name}
							</li>
						))}
					</ul>
				</Card>
			);
		}
		return <div>No book selected</div>;
	}
	render() {
		console.log(this.props.data);
		return (
			<div style={{ background: "#ECECEC", padding: "30px" }}>
				{this.gg()}
			</div>
		);
	}
}

export default graphql(bookQuery, {
	options: props => {
		return { variables: { id: props.bookId } };
	}
})(BookDetail);
