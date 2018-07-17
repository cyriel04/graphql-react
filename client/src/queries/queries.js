import { gql } from "apollo-boost";

const booksQuery = gql`
	{
		books {
			id
			name
			genre
		}
	}
`;
const authorsQuery = gql`
	{
		authors {
			id
			name
		}
	}
`;

const addBookMutation = gql`
	mutation($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			id
			name
			genre
			authors {
				id
				name
			}
		}
	}
`;

const bookQuery = gql`
	query($id: ID) {
		book(id: $id) {
			id
			name
			genre
			authors {
				name
				books {
					id
					name
				}
			}
		}
	}
`;

const loginQuery = gql`
	mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			id
		}
	}
`;

export { booksQuery, authorsQuery, addBookMutation, bookQuery, loginQuery };
