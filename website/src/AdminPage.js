import React from "react";
import Select from "react-select";

/*
https://jedwatson.github.io/react-select/

https://react-select.com/props
*/

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <div>
        <div style={styles.header}>
          <h1 style={styles.headerText} className="term-title">
            Admin Dashboard
          </h1>
          <hr />
        </div>
        <div className="admin-dashboard">
          <div className="pending-requests graph" style={styles.requests}>
            <h3>Pending Requests</h3>
            <p>Select requested terms to add or delete to the database</p>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
              isMulti={true}
              closeMenuOnSelect={false}
            />
            <a className="btn btn-ghost">Add to Database</a>
            <a className="btn btn-full">Delete Requests</a>
          </div>
          <div className="stats" />
          <div className="actions" />
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
  requests: {
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

export default AdminPage;
