import React from "react";

import ReactChartkick, { LineChart } from "react-chartkick";
import Chart from "chart.js";

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

const title = "Machine Learning";

class TermPage extends React.Component {
  render() {
    return (
      <div>
        <div style={styles.header}>
          <h1 style={styles.headerText}> {title} </h1>
        </div>

        <div style={styles.graph} class="graph">
          <LineChart
            height="42vh"
            data={dates}
            colors={["#3899E8", "#F55452", "9831FF"]}
          />
        </div>

        <div style={styles.definition} class="graph">
          <h1 style={styles.headerText}>Hello</h1>
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
    width: "60vw",
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
