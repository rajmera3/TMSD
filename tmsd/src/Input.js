import React from "react";
import { render } from "react-dom";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      term: ""
    };

    this.submit = this.submit.bind(this);
    this.changeTerm = this.changeTerm.bind(this);
  }

  changeTerm(event) {
    this.setState({ term: event.target.value });
  }

  submit(event) {
    // let url = 'http://api.example.com/results?q=' + encodeURI(this.state.term) + '&json=1';
    // axios.get(url)
    //   .then(response => {
    //     let data = {
    //       results: response.data,
    //     };
    //     this.setState(data);
    //   })
    //   .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input onChange={this.changeTerm} />
          <Button type="submit" bsStyle="primary">
            Find
          </Button>
        </form>
        {this.state.results.length > 0 && (
          <Redirect
            to={{
              pathname: "/results",
              state: { results: this.state.results }
            }}
          />
        )}
      </div>
    );
  }
}

export default Input;
