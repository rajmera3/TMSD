import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import packageIcon from "./icons/icon-package.svg";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: " " };
  }

  componentWillMount() {}

  render() {
    return (
      <div>
        <div className="search-demo__content">
          <div className="search-demo__header">
            <div className="search-demo__headings">
              <div className="search-demo__icon-wrap">
                <img
                  src={packageIcon}
                  alt="Dinosaur Icon"
                  className="search-demo__icon"
                />
              </div>
              <h1 className="search-demo__title">TMSD Admin Login</h1>
            </div>
            <div className="graph">
              <label for="uname">
                <b>Username</b>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                name="uname"
                required
              />

              <label for="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />
              <input
                type="submit"
                value="Login"
                className="button search-demo__submit"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
