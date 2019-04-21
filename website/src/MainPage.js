import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Popup from "reactjs-popup";

import ScrollToTop from "./ScrollToTop";
import Pagination from "./Pagination";
import Results from "./Results";
import Search from "./Search";
import Totals from "./Totals";

import packageIcon from "./icons/icon-package.svg";
import createDatabaseClient from "./Database";

const databaseClient = createDatabaseClient();

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { title: " ", isSuccessful: false };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  componentWillMount() {}

  async requestNewTerm() {
    databaseClient.changeCollection("requestedTerms");
    // event.preventDefault();

    var newTerm = document.getElementById("requestedTerm").value;
    newTerm = newTerm.toLowerCase();
    var termAdded = false;
    if (newTerm == "") {
      alert("Please provide a term");
    } else {
      await databaseClient.collection
        .doc(newTerm)
        .set({})
        .then(function() {
          console.log("Document successfully written!");
          termAdded = true;
          console.log(termAdded);
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
          termAdded = false;
        });

      console.log(termAdded);
      this.setState({
        isSuccessful: termAdded
      });
    }
  }

  render() {
    return (
      <div>
        <a
          className="btn btn-ghostLogin"
          href="/TMSD/#/adminLogin"
          style={styles.adminButton}
        >
          {" "}
          Admin Login{" "}
        </a>
        <div align="center">
          <ScrollToTop>
            <Route>
              {({ location, history }) => (
                <Search location={location} history={history}>
                  {({
                    query,
                    queryState,
                    queryClass,
                    searchActions,
                    searchResults
                  }) => (
                    <div>
                      <div className={`tmsd live-filtering ${queryClass}`}>
                        <div className="tmsd__content">
                          <div className="tmsd__header">
                            <div className="tmsd__headings">
                              <div className="tmsd__icon-wrap">
                                <img
                                  src={packageIcon}
                                  alt="Dinosaur Icon"
                                  className="tmsd__icon"
                                />
                              </div>
                              <h1 className="tmsd__title">
                                Time Machine Space Dinosaur
                              </h1>
                            </div>
                            <div className="tmsd__input-wrapper">
                              <input
                                className="tmsd__text-input"
                                placeholder="Search science fiction term&#8230;"
                                value={query}
                                onChange={e =>
                                  searchActions.updateQuery(e.target.value)
                                }
                              />
                              <input
                                type="submit"
                                value="Search"
                                className="button tmsd__submit"
                              />
                            </div>
                          </div>

                          <div className="tmsd__body">
                            <div className="search-results">
                              <div className="results">
                                <div className="results__header">
                                  <Totals {...searchResults.pageState} />
                                </div>
                                <div className="results__body">
                                  <Results
                                    results={searchResults.results}
                                    queryState={queryState}
                                    trackClick={searchActions.trackClick}
                                  />
                                </div>
                                <div className="results__footer">
                                  <Pagination
                                    {...searchResults.pageState}
                                    onPage={searchActions.updatePage}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Popup
                        position="top right"
                        trigger={
                          <button type="button" className="btn btn-ghostLogin">
                            {" "}
                            Request New Term{" "}
                          </button>
                        }
                        modal
                      >
                        {close => (
                          <div className="modal" align="center">
                            <a className="close" onClick={close}>
                              &times;
                            </a>
                            <div className="header"> Enter Term </div>
                            <form>
                              <input
                                id="requestedTerm"
                                name="requestedTerm"
                                type="text"
                                className="inputForm"
                              />
                            </form>
                            <div className="actions">
                              <button
                                className="btn btn-ghost"
                                type="button"
                                onClick={() => {
                                  this.requestNewTerm();
                                  close();
                                }}
                              >
                                {" "}
                                Confirm Request{" "}
                              </button>
                              <button
                                type="button"
                                className="btn btn-full"
                                onClick={() => {
                                  console.log("modal closed ");
                                  close();
                                }}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                      <div className="site-background">
                        <div />
                        <a href="/TMSD/#/directory" className="directory">
                          {" "}
                          <p> Directory of Terms </p>
                        </a>
                      </div>
                    </div>
                  )}
                </Search>
              )}
            </Route>
          </ScrollToTop>
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
  adminButton: {
    float: "right",
    margin: "10px"
  }
};

export default MainPage;
