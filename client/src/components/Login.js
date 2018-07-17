import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import { Form, Button, Input, Card, Timeline, Row, Col } from "antd";
import { loginQuery } from "../queries/queries";

const FormItem = Form.Item;

class Login extends Component {
	state = {
		email: "",
		password: "",
		loading: false,
		id: 0,
		error: ""
	};
	handleSubmit = async e => {
		e.preventDefault();
		this.setState({
			loading: true
		});
		this.props
			.loginQuery({
				variables: {
					email: this.state.email,
					password: this.state.password
				}
			})
			.then(res => {
				console.log(res.data.login.id);
				sessionStorage.setItem("token", res.data.login.id);
			})
			.catch(error => {
				console.log(error.message);
				this.setState({
					error: error.message,
					loading: false
				});
			});
	};
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(this.state);
	};
	render() {
		return (
			<div className="Login">
				<Row gutter={48}>
					<Col xl={8} lg={10} md={24} xs={24}>
						<Card className="login">
							<Form onSubmit={this.handleSubmit}>
								<FormItem>
									<Input
										name="email"
										placeholder="Email"
										type="email"
										onChange={this.handleChange}
										value={this.state.email}
									/>
								</FormItem>
								<FormItem>
									<Input
										name="password"
										placeholder="Password"
										type="password"
										value={this.state.password}
										onChange={this.handleChange}
									/>
								</FormItem>
								<Button
									htmlType="submit"
									type="primary"
									loading={this.state.loading}
								>
									LOG IN
								</Button>
								{this.state.error}
							</Form>
						</Card>
					</Col>
					<Col xl={16} lg={14} md={24} xs={24}>
						<Card className="register">
							<Timeline>
								<Timeline.Item>
									Create a services site 2015-09-01
								</Timeline.Item>
								<Timeline.Item>
									Solve initial network problems 2015-09-01
								</Timeline.Item>
								<Timeline.Item>
									Technical testing 2015-09-01
								</Timeline.Item>
								<Timeline.Item>
									Network problems being solved 2015-09-01
								</Timeline.Item>
							</Timeline>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default compose(graphql(loginQuery, { name: "loginQuery" }))(Login);
