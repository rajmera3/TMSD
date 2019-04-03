import React, { Component } from "react";
import createDatabaseClient from "./Database";
import queryString from "query-string";
import packageIcon from "./icons/icon-package.svg";
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

  TermList = () => {
    const terms = this.state.allTerms;
    //<p style={{textAlign:"center"}}> {term} </p>
    const listItems = terms.map(term => (
      <li>
        <a
          href={""}
          onClick={e => {
            this.props.history.push("?" + queryString.stringify({ v: term }));
          }}
        >
          {term}
        </a>
      </li>
    ));
    return <ul>{listItems}</ul>;
  };

  render() {
    // renders every time this.state is updated
    console.log(this.state.allTerms); // see this in browser's console (Right click => Inspect element => Console)
    return (
      // <div className="site-background">
      //   <h1 className="tmsd__title" style={{textAlign:"center"}}>
      //     Directory of Terms
      //   </h1>
      //   <this.TermList />
      // </div>

      <div align="center" style={styles.divStyle}>
        <div className="tmsd__headings">
          <div className="tmsd__icon-wrap">
            <img src={packageIcon} alt="Dinosaur Icon" className="tmsd__icon" />
          </div>
          <h1 className="tmsd__title">Time Machine Space Dinosaur</h1>
          <h4 className="tmsd__title" style={{ textAlign: "center" }}>
            Directory of Terms
          </h4>
          <this.TermList />
        </div>
      </div>
      // stuff here TODO
      // render this.state.allTerms in a list
      // see https://reactjs.org/docs/lists-and-keys.html
    );
  }
}

const styles = {
  header: {
    width: "75vw",
    margin: "auto",
    marginTop: "20px",
    textAlign: "center"
  },
  headerText: {
    textAlign: "center"
  },
  graph: {
    width: "90vw",
    height: "100%",
    margin: "auto",
    marginTop: "40px"
  },
  definition: {
    width: "60vw",
    height: "100%",
    margin: "auto",
    marginTop: "40px",
    marginBottom: "40px"
  },
  defText: {
    textAlign: "left",
    color: "black"
  }
};
