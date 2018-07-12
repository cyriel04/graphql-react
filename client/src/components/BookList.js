import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

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
          {this.props.data.loading
            ? console.log("fail")
            : this.props.data.books.map(book => (
                <li key={book.id}>{book.name}</li>
              ))}
        </ul>
      </div>
    );
  }
}

export default graphql(bookQuery)(BookList);
