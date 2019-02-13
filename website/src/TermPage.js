import React from "react";

import ReactChartkick, { LineChart, PieChart } from "react-chartkick";
import Chart from "chart.js";

ReactChartkick.addAdapter(Chart);

const dates = {
  "1985": 5,
  "1990": 300,
  "1995": 900,
  "2000": 3000,
  "2005": 2500,
  "2010": 1000,
  "2015": 3
};

class TermPage extends React.Component {
  render() {
    return <LineChart data={dates} />;
  }
}
export default TermPage;
