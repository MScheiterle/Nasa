import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div class="Navbar">
      <div class="navlinks">
        <a onClick={() => navigate("Projects")}>
          <h1>// Projects</h1>
        </a>
        <a class="MainLogo" onClick={() => navigate("/")}></a>
        <a onClick={() => navigate("Contact Me")}>
          <h1>// Contact Me</h1>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
