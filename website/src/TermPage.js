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

class TermPage extends React.Component {
  render() {
    return (
      <div>
        <div
          style={{ width: "50vw", margin: "auto", marginTop: "20px" }}
          class="graph"
        >
          <LineChart data={dates} colors={["#3899E8", "#F55452", "9831FF"]} />
        </div>
      </div>
    );
  }
}
export default TermPage;
