import React, { useState, useEffect } from "react";
import fire from "./fire";
import LoginComponent from "./Components/LoginComponent";
import CourseList from "./Components/CourseList";
import { Grid } from "@material-ui/core";

/**
 * Renders login page or course list.
 * @function Login
 * @returns HTML component
 */
export default function Login() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPassWordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const clearInputs = () => {
    setEmailError("");
    setPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPassWordError("");
  };

    /**
     * Uses firebase authentication to login user.
     * @function handleLogin
     */
const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPassWordError(err.message);
            break;
          default:
            console.log("Default case hit");
        }
    });
};
    /**
     * Uses firebase authentication to sign up user.
     * @function handleSignup
     */
const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPassWordError(err.message);
            break;
          default:
            console.log("Default case hit");
        }
    });
};
/**
     * Uses firebase authentication to log user out.
     * @function handleLogout
     */
const handleLogout = () => {
    fire.auth().signOut();
}

  /**
     * Uses firebase authentication to check if user is logged in.
     * @function authListener
     */
const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
        if (user){
            clearInputs();
            setUser(user);
        }else{
            setUser("");
        }
    });
};
  

  useEffect(() => {
    authListener();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {user ? (
        <CourseList handleLogout={handleLogout} />
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <LoginComponent
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
