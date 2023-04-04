import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../../../firebase.ts";
import "./style.scss";
import { validateEmail } from "../../../Constants.ts";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const handleReset = () => {
    const errorMessageElem = document.getElementById("erorrMessage");
    const emailElem = document.getElementById("email").parentElement;
    if (!validateEmail(email)) {
      emailElem.classList.add("errored");
      errorMessageElem.innerHTML =
        "Error: This is not a valid email Ex: foobar13@gmail.com";
      return;
    }
    emailElem.classList.remove("errored");
    sendPasswordReset(
      email,
      document.getElementsByClassName("resetInput"),
      document.getElementById("erorrMessage")
    );
  };

  useEffect(() => {
    if (loading) return () => {};
    if (user) navigate("/");
  }, [user, navigate, loading]);

  return (
    <div id="Reset" className="page center">
      <div className="reset-form">
        <div className="flex-row">
          <label className="errorLabel" htmlFor="email">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </label>
          <label className="resetLabel" htmlFor="email">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
          </label>
          <input
            id="email"
            className="resetInput"
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <p id="erorrMessage"></p>
        <input
          className="resetSubmit ExtendedFont"
          type="submit"
          value="Send Reset Email"
          onClick={() => handleReset()}
        />
      </div>
    </div>
  );
}
export default Reset;
