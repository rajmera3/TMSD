import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";
import Pagination from "./Pagination";
import Results from "./Results";
import Search from "./Search";
import Totals from "./Totals";

import packageIcon from "./icons/icon-package.svg";
import poweredBy from "./images/powered-by@2x.png";
import TermPage from "./TermPage";
import MainPage from "./MainPage";

class App extends Component {
  renderRedirect = () => {
    return <Redirect to="/home" />;
  };

  render() {
    return (
      <Router>
        <div>
          {this.renderRedirect()}
          <Route path="/home" component={MainPage} />
          <Route path="/term" component={TermPage} />
        </div>
      </Router>
    );
  }
}

/*
class App extends Component {
  render() {
    return <TermPage />;
  }
}*/

export default App;
