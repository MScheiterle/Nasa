import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div class="Navbar">
      <div class="navlinks">
        <div onClick={() => navigate("Projects")}>
          <h1>{'//'} Projects</h1>
        </div>
        <div class="MainLogo" onClick={() => navigate("/")} />
        <div onClick={() => navigate("Contact Me")}>
          <h1>{'//'} Contact Me</h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
