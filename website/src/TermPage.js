import React, {Component} from "react";

import ReactChartkick, { LineChart } from "react-chartkick";
import Chart from "chart.js";
import queryString from "query-string";
import createDatabaseClient from "./Database";

const databaseClient = createDatabaseClient();

ReactChartkick.addAdapter(Chart);

class TermPage extends Component {
  constructor(props) {
    super(props);
    this.state = { title: " " };
  }

  componentWillMount() {
    databaseClient.collection
      .doc(this.props.term)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          // console.log("Document data:", doc.data());
          // console.log("Document name: " + doc.data().name);

          this.setState({
            name: doc.data().name,
            dates: doc.data().dates,
            first_occurance: doc.data().first_occurance,
            description: doc.data().description
          });
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }

  getQueryState = () => queryString.parse(this.props.location.search);

  render() {
    return (
      <div>
        <div style={styles.header}>
          <h1 style={styles.headerText}> {this.state.name} </h1>
        </div>

        <div style={styles.graph} className="graph">
          <LineChart
            height="42vh"
            data={this.state.dates}
            colors={["#3899E8", "#F55452", "9831FF"]}
          />
        </div>

        <div style={styles.definition} class="graph">
          <p style={styles.headerText}> Definition: {this.state.description }</p>
          <p style={styles.headerText}> First Occurance: {this.state.first_occurance }</p>
        </div>

      </div>
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
    height: "50vh",
    margin: "auto",
    marginTop: "20px"
  },
  definition: {
    width: "60vw",
    height: "30vh",
    margin: "auto",
    marginTop: "40px"
  }
};

export default TermPage;
