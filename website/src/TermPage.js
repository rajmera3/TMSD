import React from "react";

import ReactChartkick, { LineChart } from "react-chartkick";
import Chart from "chart.js";
import createDatabaseClient from "./Database";

const databaseClient = createDatabaseClient();

ReactChartkick.addAdapter(Chart);

const dates = [
  {
    name: "Academia",
    data: {
      1985: 5,
      1990: 300,
      1995: 900,
      2000: 3000,
      2005: 2500,
      2010: 1000,
      2015: 3
    }
  },
  {
    name: "Science Fiction",
    data: {
      "1985": 3000,
      "1990": 700,
      "1995": 300,
      "2000": 8000,
      "2005": 1200,
      "2010": 8000,
      "2015": 3
    }
  }
];

class TermPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: " " };
  }

  componentWillMount() {
    var alien = databaseClient.collection
      .doc("aliens")
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("Document data:", doc.data());
          console.log("Document name: " + doc.data().name);

          this.setState({
            name: doc.data().name,
            dates: doc.data().dates,
            description: doc.data().description
          });
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });

    console.log(alien);
  }

  render() {
    return (
      <div>
        <div style={styles.header}>
          <h1 style={styles.headerText}> {this.state.name} </h1>
        </div>

        <div style={styles.graph} class="graph">
          <LineChart
            height="42vh"
            data={this.state.dates}
            colors={["#3899E8", "#F55452", "9831FF"]}
          />
        </div>

        <div style={styles.definition} class="graph">
          <p style={styles.headerText}> {this.state.description} }</p>
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
