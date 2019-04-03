import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import packageIcon from "./icons/icon-package.svg";

class AdminLogin extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    ],

    signInSuccessUrl: "/admin",

    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => true
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentWillMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
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
          <p>Please sign-in:</p>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    } else {
      window.location.href = "/admin";
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
          <p>Sign in successful! Redirecting...</p>
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
  }
};

export default AdminLogin;
