import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import TermPage from "./TermPage";
import MainPage from "./MainPage";
import Directory from "./Directory";
import AdminPage from "./AdminPage";
import AdminLogin from "./AdminLogin";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: true };
  }

  render() {
    return (
      <Router basename="/TMSD">
        <div>
          <Route exact path="/" component={MainPage} />
          <Route path="/v=:id" component={TermPage} />
          <Route path="/directory" component={Directory} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/adminlogin" component={AdminLogin} />
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

/*
class App extends Component {
  render() {
    return <AdminPage />;
  }
}
*/

export default App;
