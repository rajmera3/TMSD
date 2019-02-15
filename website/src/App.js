import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";
import Pagination from "./Pagination";
import Results from "./Results";
import Search from "./Search";
import Totals from "./Totals";

import packageIcon from "./icons/icon-package.svg";
import poweredBy from "./images/powered-by@2x.png";
import TermPage from "./TermPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      queryClass: "",
      queryState: {q: ""},
      searchActions: {
        trackClick: (documentId) => {},
        updatePage: (newPage) => {},
        updateQuery: (query) => {}
      },
      searchResults: {
        facets: {},
        filters: {},
        pageState: {
          currentPage: 1,
          pageSize: 10,
          totalPages: 0,
          totalResults: 0
        },
        query: "",
        requestId: "",
        results: []
      }
    }
  }

  setAppState = (newState) => {
    this.setState(newState);
  }

  render() {
    console.log("render");
    return (
      <Router>
        <ScrollToTop>
          <Route>
            {({ location, history }) => (
              <div>
              <Search location={location} history={history} setAppState={this.setAppState} />
                  <div>
                    <div className="site-background" />
                    <div className={`search-demo live-filtering ${this.state.queryClass}`}>
                      <div className="search-demo__content">
                        <div className="search-demo__header">
                          <div className="search-demo__headings">
                            <div className="search-demo__icon-wrap">
                              <img
                                src={packageIcon}
                                alt="Dog Icon"
                                className="search-demo__icon"
                              />
                            </div>
                            <h1 className="search-demo__title">
                              Time Machine Space Dinosaur
                            </h1>
                          </div>
                          <div className="search-demo__input-wrapper">
                            <input
                              className="search-demo__text-input"
                              placeholder="Search science fiction term or author&#8230;"
                              value={this.state.query.q}
                              onChange={e =>
                                this.state.searchActions.updateQuery(e.target.value)
                              }
                            />
                            <input
                              type="submit"
                              value="Search"
                              className="button search-demo__submit"
                            />
                          </div>
                        </div>

                        <div className="search-demo__body">
                          <div className="search-results">
                            <div className="results">
                              <div className="results__header">
                                <Totals {...this.state.searchResults.pageState} />
                              </div>
                              <div className="results__body">
                                <Results
                                  results={this.state.searchResults.results}
                                  queryState={this.state.queryState}
                                  trackClick={this.state.searchActions.trackClick}
                                />
                              </div>
                              <div className="results__footer">
                                <Pagination
                                  {...this.state.searchResults.pageState}
                                  onPage={this.state.searchActions.updatePage}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
            )}
          </Route>
        </ScrollToTop>
      </Router>
    );
  }
}

/*
class App extends Component {
  render() {
    return (
      <TermPage/>
    )
  }
}
*/

export default App;
