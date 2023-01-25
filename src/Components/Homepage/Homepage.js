import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div class="Homepage">
      <h1 class="name">Simpl1f1ed<span style={{"color": "#c1678b"}}>_</span></h1>
      <p class="description">
        Front and Back End Developer • Applications and Graphics Hobbiest •
        Intelligence Enthusiast
      </p>
    </div>
  );
}

export default Homepage;
