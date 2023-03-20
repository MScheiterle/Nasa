import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "./../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./style.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const handleLogin = () => {
    const emailElem = document.getElementById("email").parentElement;
    if (!email) {
      emailElem.classList.add("errored");
      return;
    }
    emailElem.classList.remove("errored");

    const passwordElem = document.getElementById("password").parentElement;
    if (!password) {
      passwordElem.classList.add("errored");
      return;
    }
    passwordElem.classList.remove("errored");

    logInWithEmailAndPassword(
      email,
      password,
      document.getElementsByClassName("loginInput"),
      document.getElementById("erorrMessage")
    );
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, navigate, loading]);

  return (
    <div id="Login" className="page">
      <div className="login-form">
        <div className="flex-row">
          <label className="errorLabel" htmlFor="email">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </label>
          <label className="loginLabel" htmlFor="email">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
          </label>
          <input
            id="email"
            className="loginInput"
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex-row">
          <label className="errorLabel" htmlFor="password">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </label>
          <label className="loginLabel" htmlFor="password">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
            </svg>
          </label>
          <input
            id="password"
            className="loginInput"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p id="erorrMessage"></p>
        <input
          className="loginSubmit ExtendedFont"
          type="submit"
          value="LOGIN"
          onClick={() => handleLogin()}
        />
      </div>
      <div className="loginProvidersSection">
        <p>Or Login Using:</p>
        <div className="loginProviders">
          <div className="loginProvider Google" onClick={signInWithGoogle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            <p>Google</p>
          </div>
        </div>
      </div>
      <div className="alternateOptions">
        <p onClick={() => navigate("/password_reset")}>Forgot password</p>
        <p>•</p>
        <p onClick={() => navigate("/register")}>Register New Account</p>
      </div>
    </div>
  );
}
export default Login;
