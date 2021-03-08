import React from 'react';
import { TextField, Button } from "@material-ui/core";


/**
 * Login Page that allows users to login for accessing OpenCourse.
 * @function  LoginComponent
 * @returns HTML component for login authorization.
 */
const LoginComponent = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;
  return (
    <section className="login">
      <div className="loginContainer">
        <label>Username: </label>
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="filled"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)}/> */}
        <p className="errorMsg">{emailError}</p>
        <label>Password: </label>
        <br />
        <br />
        <TextField
          type="password"
          variant="filled"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <Button variant="contained" onClick={handleLogin}>
                Sign in
              </Button>
              <p>
                Don't have an account ?{" "}
                <button onClick={() => setHasAccount(!hasAccount)}>
                  Sign up
                </button>
              </p>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={handleSignup}>
                Sign up
              </Button>
              <p>
                Have an account ?{" "}
                <button onClick={() => setHasAccount(!hasAccount)}>
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginComponent;
