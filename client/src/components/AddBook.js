import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { Select, Card, Form, Input, Button } from "antd";
const Option = Select.Option;
const FormItem = Form.Item;
const authorQuery = gql`
	{
		authors {
			id
			name
		}
	}
`;

class AddBook extends Component {
	state = {
		name: "",
		genre: "",
		authorId: ""
	};
	handleSubmit = e => {
		e.preventDefault();
		console.log(this.state);
	};
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	render() {
		console.log(this.props);
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
								{this.props.data.loading
									? console.log("fail")
									: this.props.data.authors.map(author => (
											<Option
												value={author.id}
												name={author.name}
												key={author.id}
											>
												{author.name}
											</Option>
									  ))}
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

export default graphql(authorQuery)(AddBook);
