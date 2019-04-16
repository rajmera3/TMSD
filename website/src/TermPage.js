import React from "react";

import ReactChartkick, { LineChart } from "react-chartkick";
import Chart from "chart.js";
import createDatabaseClient from "./Database";

const databaseClient = createDatabaseClient();

ReactChartkick.addAdapter(Chart);

class TermPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: " " };
  }

  componentWillMount() {
    var currentLocation = decodeURI(window.location.href);
    var term = currentLocation.split(/"/)[1].toLocaleLowerCase();
    console.log(term);

    var alien = databaseClient.collection
      .doc(term)
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
            description: doc.data().description,
            first_occurance: doc.data().first_occurance
          });
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });

    // console.log(alien);
  }

  render() {
    console.log(this.state.dates)
    return (
      <div>
        <div style={styles.header}>
          <h1 style={styles.headerText} className="term-title">
            {" "}
            {this.state.name}{" "}
          </h1>
          <hr />
        </div>

        <div style={styles.graph} className="graph">
          <LineChart
            height="42vh"
            data={this.state.dates}
            colors={["#3899E8", "#F55452", "9831FF"]}
          />
        </div>

        <div style={styles.definition} className="graph">
          <p style={styles.defText}>
            {" "}
            <strong>Definition:</strong> {this.state.description}
          </p>
          <p style={styles.defText}>
            {" "}
            <strong>First Occurance:</strong> {this.state.first_occurance}
          </p>
          <p style={styles.defText}>
            {" "}
            <strong>Data Sources:</strong> Pubmed for Academia, Google NGram for Science Fiction
          </p>
        </div>
      </div>
    );
  }
}

const styles = {
  header: {
    width: "75vw",
    margin: "auto",
    marginTop: "2%",
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

export default TermPage;
