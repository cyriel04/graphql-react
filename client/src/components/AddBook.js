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
                onChange={this.handleChange}
              />
            </FormItem>
            <FormItem>
              <Input
                name="genre"
                placeholder="Genre"
                onChange={this.handleChange}
              />
            </FormItem>
            <FormItem>
              <Select
                style={{ width: 120 }}
                onChange={val => console.log({ val })}
              >
                {this.props.data.loading
                  ? console.log("fail")
                  : this.props.data.authors.map(author => (
                      <Option value={author.name} key={author.id}>
                        {author.name}
                      </Option>
                    ))}
              </Select>
            </FormItem>
            <Button htmlType="submit" type="primary">
              LOG IN
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default graphql(authorQuery)(AddBook);
