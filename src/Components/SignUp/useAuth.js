import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import React, { useState, createContext, useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();
export const AuthProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}> {props.children} </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user.email || isLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export const AdminRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn() || auth.admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const isLoggedIn = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return false;
  }
  const decodedToken = jwt_decode(token);
  const currentTime = new Date().getTime() / 1000;

  return decodedToken.exp > currentTime;
};
const Auth = () => {
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const currUser = user;
        setUser(currUser);
      }
    });
  }, []);

  const getUser = (user) => {
    const { email, displayName, photoURL } = user;
    return { email, name: displayName, photo: photoURL };
  };
  const isAdmin = (email) => {
    console.log(email);
    fetch(`https://pomato-restaurant.herokuapp.com/users/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data.admin);
        console.log(data.admin);
      });
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const signedInUser = getUser(result.user);
        setUser(signedInUser);
        saveUser(signedInUser.email, signedInUser.name, "PUT");
        storeAuthToken();
        isAdmin(signedInUser.email);
        console.log(admin);
        window.history.back();
        return result.user;
      })
      .catch((error) => {
        setUser({});
        return error.message;
      });
  };

  const signIn = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(res.user);
        isAdmin(res.user.email);
        storeAuthToken();
        window.history.back();
      })
      .catch((err) => setUser({ error: err.message }));
  };

  const signUp = (email, password, name) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => {
            setUser(res.user);
            saveUser(email, name, "POST");
            window.history.back();
          });
      })
      .catch((err) => setUser({ error: err.message }));
  };

  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch("https://pomato-restaurant.herokuapp.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  const storeAuthToken = () => {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        sessionStorage.setItem("token", idToken);
        window.history.back();
      })
      .catch(function (error) {});
  };
  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then((res) => {
        setUser({});
        sessionStorage.clear();
      });
  };
  return {
    user,
    admin,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
};

export default Auth;
