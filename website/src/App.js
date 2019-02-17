import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import queryString from "query-string";

import ScrollToTop from "./ScrollToTop";
import Pagination from "./Pagination";
import Results from "./Results";
import Search from "./Search";
import Totals from "./Totals";
import Directory from "./Directory";

import packageIcon from "./icons/icon-package.svg";
import poweredBy from "./images/powered-by@2x.png";
import TermPage from "./TermPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedResult: false
    };
  }

  getSearchComponent = (location, history) => {
    return (
      <Search location={location} history={history}>
        {({ query, queryState, queryClass, searchActions, searchResults }) => (
          <div>
            <div className={`search-demo live-filtering ${queryClass}`}>
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
                      value={query}
                      onChange={e => searchActions.updateQuery(e.target.value)}
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
                        <Totals {...searchResults.pageState} />
                      </div>
                      <div className="results__body">
                        <Results
                          results={searchResults.results}
                          queryState={queryState}
                          trackClick={searchActions.trackClick}
                          history={history}
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
            <div className="site-background" >
              <div className="emptyDirectorySpace" />
              <a href="#"
                onClick={e => {
                    history.push("?directory");
                  }
                }
              className="directory" > <p> Directory of Terms </p></a>
            </div>
            
          </div>
        )}
      </Search>
    );
  };

  getVisualizationComponent = (location, history, term) => {
    return <TermPage location={location} history={history} term={term} />;
  };

  getComponentToRender = (location, history) => {
    var url = queryString.parse(location.search);
    var mainComponent;
    if ("v" in url) {
      // visualizations
      console.log("visualizations page");
      mainComponent = this.getVisualizationComponent(location, history, url["v"]);
    } else if ("directory" in url) {
      console.log("directory page");
      mainComponent = (<Directory history={history}/>);
    } else {
      // search
      console.log("search page");
      mainComponent = this.getSearchComponent(location, history);
    }
    return (
      <div>
        {mainComponent}
      </div>
      );
  };

  render() {
    return (
      <Router>
        <ScrollToTop>
          <Route>
            {({ location, history }) =>
              this.getComponentToRender(location, history)
            }
          </Route>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
