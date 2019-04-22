import React from "react";

import ReactChartkick, { LineChart } from "react-chartkick";
import Chart from "chart.js";
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import createDatabaseClient from "./Database";

const databaseClient = createDatabaseClient();

ReactChartkick.addAdapter(Chart);

class TermPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { graph_type: "frequency_graph" };
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

          var frequency_data = doc.data().dates;
          var rate_data = [];
          for (var i = 0; i < frequency_data.length; i++) {
            var name = frequency_data[i]["name"]; // "Science Fiction" or "Academia"
            var data = frequency_data[i]["data"]; // map of data to freq
            var rateData = {}
            var years = Object.keys(data).map(function(item) {
                return parseInt(item, 10);
            });
            for (var j = Math.min(...years)+1; j < Math.max(...years); j++) {
              if (!(j-1 in data) || !(j in data)) {
                continue;
              }
              var prev_freq = data[j-1];
              var curr_freq = data[j];
              rateData[j] = 100 * (curr_freq-prev_freq)/prev_freq;
            }
            rate_data.push({
              data: rateData,
              name: name
            });
          }

          console.log(frequency_data);

          this.setState({
            name: doc.data().name,
            frequency_data: frequency_data,
            rate_data: rate_data,
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

  onChange(graph_type) {
    this.setState({
      graph_type: graph_type
    });
  }

  renderGraph() {
    if (this.state.graph_type == "frequency_graph") {
      return (<LineChart
              title="Frequency in Academia and Science Fiction"
              xtitle="Year"
              ytitle="Frequency in Source"
              height="42vh"
              data={this.state.frequency_data}
              colors={["#3899E8", "#F55452", "9831FF"]}
            />)
    } else if (this.state.graph_type == "rate_graph") {
      return (<LineChart
              title="Percentage of Change in Frequency from Previous Year"
              xtitle="Year"
              ytitle="Percentage of Change"
              height="42vh"
              data={this.state.rate_data}
              colors={["#3899E8", "#F55452", "9831FF"]}
            />)
    }
  }

  render() {
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
          {this.renderGraph()}
          <p style={styles.select_graph}>Type of graph to display:</p>
        <RadioGroup onChange={ this.onChange.bind(this) } horizontal value="frequency_graph">
          <RadioButton value="frequency_graph" iconSize={20}>
            Frequency
          </RadioButton>
          <RadioButton value="rate_graph" iconSize={20}>
            Rate of Change
          </RadioButton>
        </RadioGroup>
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
  },
  select_graph: {
    width: "100%",
    textAlign:"center"
  }
};

export default TermPage;
