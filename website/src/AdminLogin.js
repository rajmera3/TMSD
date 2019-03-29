import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import packageIcon from "./icons/icon-package.svg";
// Configure Firebase.
// const config = {
//   apiKey: 'AIzaSyAeue-AsYu76MMQlTOM-KlbYBlusW9c1FM',
//   authDomain: 'myproject-1234.firebaseapp.com',
//   // ...
// };
// firebase.initializeApp(config);

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
  componentDidMount() {
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
          <div className="search-demo__headings">
            <div className="search-demo__icon-wrap">
              <img
                src={packageIcon}
                alt="Dinosaur Icon"
                className="search-demo__icon"
              />
            </div>
            <h1 className="search-demo__title">Time Machine Space Dinosaur</h1>
          </div>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    }
    return (
      <div>
        <h1>Admin Login</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

// import React from 'react';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import firebase from 'firebase';

// // Configure Firebase.
// // const config = {
// //   apiKey: 'AIzaSyAeue-AsYu76MMQlTOM-KlbYBlusW9c1FM',
// //   authDomain: 'myproject-1234.firebaseapp.com',
// //   // ...
// // };
// // firebase.initializeApp(config);

// // Configure FirebaseUI.
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'popup',
//   // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//   signInSuccessUrl: '/admin',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
//   ]
// };

// class AdminLogin extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Admin Login</h1>
//         <p>Please sign-in:</p>
//         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
//       </div>
//     );
//   }
// // }

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
