import React, { Component } from "react";
import { Select, Card, Form, Input, Button } from "antd";
import { graphql, compose } from "react-apollo";
import { authorsQuery, addBookMutation, booksQuery } from "../queries/queries";

const Option = Select.Option;
const FormItem = Form.Item;

class AddBook extends Component {
	state = {
		name: "",
		genre: "",
		authorId: ""
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.addBookMutation({
			variables: {
				name: this.state.name,
				genre: this.state.genre,
				authorId: this.state.authorId
			},
			refetchQueries: [
				{
					query: booksQuery
				}
			]
		});
		this.setState({
			name: "",
			genre: "",
			authorId: ""
		});
	};
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	render() {
		return (
			<div>
				<Card>
					<Form onSubmit={this.handleSubmit}>
						<FormItem>
							<Input
								name="name"
								placeholder="Name"
								value={this.state.name}
								onChange={this.handleChange}
							/>
						</FormItem>
						<FormItem>
							<Input
								name="genre"
								placeholder="Genre"
								value={this.state.genre}
								onChange={this.handleChange}
							/>
						</FormItem>
						<FormItem>
							<Select
								style={{ width: 120 }}
								onChange={val =>
									this.setState({ authorId: val })
								}
							>
								{this.props.authorsQuery.loading
									? console.log("fail")
									: this.props.authorsQuery.authors.map(
											author => (
												<Option
													value={author.id}
													name={author.name}
													key={author.id}
												>
													{author.name}
												</Option>
											)
									  )}
							</Select>
						</FormItem>
						<Button htmlType="submit" type="primary">
							ADD
						</Button>
					</Form>
				</Card>
			</div>
		);
	}
}

// export default graphql(authorsQuery)(AddBook);
export default compose(
	graphql(authorsQuery, { name: "authorsQuery" }),
	graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
