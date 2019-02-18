import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import TermPage from "./TermPage";
import MainPage from "./MainPage";
import Directory from "./Directory";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: true };
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={MainPage} />
          <Route path="/v=:id" component={TermPage} />
          <Route path="/directory" component={Directory} />
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
