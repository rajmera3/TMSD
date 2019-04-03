import React from "react";
import Select from "react-select";
import createDatabaseClient from "./Database";
import firebase from "firebase";
import packageIcon from "./icons/icon-package.svg";
/*
https://jedwatson.github.io/react-select/

https://react-select.com/props
*/

var options = [];

const databaseClient = createDatabaseClient();

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: options,
      isLoggedIn: false
    };
  }

  componentWillMount() {
    this.updateOptions();

    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          this.setState({
            isLoggedIn: true
          });
        }
      }.bind(this)
    );

    console.log("First check " + this.state.user);
  }

  checkLoginStatus() {
    return new Promise((resolve, reject) => {
      const check = firebase.auth().onAuthStateChanged(function(user) {
        resolve(user);
      }, reject("api failed"));
    });
  }

  isUserLoggedIn = async () => {
    try {
      let user = await this.checkLoginStatus();
      console.log("try | react side: ", user);
      if (user) {
        this.setState({
          user: user
        });
      }
    } catch (err) {
      console.log("catch | error: ", err);
    }
  };

  updateOptions = () => {
    databaseClient.changeCollection("requestedTerms");
    let promiseRequestedTerms = databaseClient.getAllTerms();
    console.log(promiseRequestedTerms);
    promiseRequestedTerms.then(listofTerms => {
      let terms = [];
      for (let i = 0; i < listofTerms.length; i++) {
        const newEntry = { value: listofTerms[i], label: listofTerms[i] };
        terms.push(newEntry);
      }

      //Options is not being updated here, and no way to force it
      //options = dict;
      this.setState({ options: terms });

      console.log(listofTerms);
      console.log(options);
    });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    console.log(this.state.selectedOption);
  };

  deleteRequests = termsToDelete => {
    databaseClient.changeCollection("requestedTerms");

    console.log(this.state);
    termsToDelete = this.state.selectedOption;

    if (termsToDelete) {
      for (let i = 0; i < termsToDelete.length; i++) {
        databaseClient.collection
          .doc(termsToDelete[i].value)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      }

      this.updateOptions();
      this.setState({
        selectedOption: null
      });
    }
  };

  logout() {
    firebase.auth().signOut();
  }

  render() {
    const { selectedOption } = this.state;
    //var user = firebase.auth().currentUser;
    console.log("User " + this.state.user);
    if (this.state.isLoggedIn) {
      return (
        <div>
          <a
            className="btn btn-ghostLogin"
            href="/"
            style={styles.adminButton}
            onClick={this.logout}
          >
            {" "}
            Logout{" "}
          </a>
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
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.options}
                isMulti={true}
                closeMenuOnSelect={false}
              />
              <a className="btn btn-ghost"> Add to Database </a>
              <a className="btn btn-full" onClick={this.deleteRequests}>
                {" "}
                Delete Requests{" "}
              </a>
            </div>
            <div className="stats" />
            <div className="actions" />
          </div>
        </div>
      );
    } else {
      return (
        <div align="center" style={styles.divStyle}>
          <div className="tmsd__headings">
            <div className="tmsd__icon-wrap">
              <img
                src={packageIcon}
                alt="Dinosaur Icon"
                className="tmsd__icon"
              />
            </div>
            <h1 className="tmsd__title">Time Machine Space Dinosaur</h1>
          </div>
          <p>
            You are not logged in. Please use the buttons below to redirect.
          </p>
          <a className="btn btn-ghost" href="/">
            Redirect to TMSD Home
          </a>
          <a className="btn btn-ghost" href="/adminLogin">
            Redirect to TMSD Admin Login
          </a>
        </div>
      );
    }
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
  },
  divStyle: {
    margin: "auto",
    marginTop: "10%",
    height: "100%"
  },
  adminButton: {
    float: "right",
    margin: "10px",
    marginTop: "-20px"
  }
};

export default AdminPage;
