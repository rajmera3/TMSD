import React, { Component } from "react";
import createDatabaseClient from "./Database";

const databaseClient = createDatabaseClient();

export default class Directory extends Component {
  constructor(props) {
    super(props);
    // this.state.allTerms is empty for now until loaded in componentDidMount()
    this.state = {
      allTerms: []
    };
  }

  componentDidMount() {
    // called once when you go to this page
    databaseClient.getAllTerms().then(docs => {
      // get all terms from databaseClient and then set this.state.allTerms to be the list of terms
      this.setState({
        allTerms: docs
      });
    });
  }

  render() {
    // renders every time this.state is updated
    console.log(this.state.allTerms); // see this in browser's console (Right click => Inspect element => Console)
    return (
      <div>
        <this.TermList />
      </div>
      // stuff here TODO
      // render this.state.allTerms in a list
      // see https://reactjs.org/docs/lists-and-keys.html
    );
  }

  TermList = () => {
    const terms = this.state.allTerms;
    const listItems = terms.map(term => (
      <li>
        <a
          href={"#"}
          //onClick={e =>
          //history.push("?" + queryString.stringify({v: term }));
          //}
        >
          {term}
        </a>
      </li>
    ));
    return <ul>{listItems}</ul>;
  };
}
