import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "./../../../firebase";
import "./style.scss";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return () => {};
    if (user) navigate("/");
  }, [user, navigate, loading]);

  return (
    <div className="Reset">
      <div className="reset-form">
        <div className="flex-row">
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
        <input
          className="resetSubmit ExtendedFont"
          type="submit"
          value="Send Reset Email"
          onClick={() => sendPasswordReset(email)}
        />
      </div>
    </div>
  );
}
export default Reset;
