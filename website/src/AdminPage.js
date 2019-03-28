import React from "react";
import Select from "react-select";
import createDatabaseClient from "./Database";
/*
https://jedwatson.github.io/react-select/

https://react-select.com/props
*/

var options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const databaseClient = createDatabaseClient();

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    databaseClient.changeCollection("requestedTerms");
    let promiseRequestedTerms = databaseClient.getAllTerms();
    let listofTerms = [];
    console.log(promiseRequestedTerms);
    let i = 0;
    promiseRequestedTerms.then(function(value) {
      listofTerms = value;
      let dict = {};
      for (let i = 0; i < listofTerms.length; i++) {
        dict[listofTerms[i]] = listofTerms[i];
      }

      //Options is not being updated here, and no way to force it
      options = dict;
      console.log(listofTerms);
      console.log(options);
    });
  }

  deleteRequests(termsToDelete) {
    databaseClient.changeCollection("requestedTerms");

    for (let i = 0; i < termsToDelete.length; i++) {
      databaseClient.collection
        .doc(termsToDelete[i])
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
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
            <a
              className="btn btn-full"
              onClick={() => {
                this.deleteRequests(["React", "hi"]);
              }}
            >
              Delete Requests
            </a>
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
