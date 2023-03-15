import React from "react";
import { useNavigate } from "react-router-dom";
import { educationalComps } from "../../../Constants";
import "./style.scss";

function QuickMathsNav() {
  const navigate = useNavigate();

  let navLink = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 8; j++) {
      navLink.push(
        <div
          className="navLink"
          onClick={() =>
            navigate(
              "/QuickMaths/Challenge/" +
                Object.values(educationalComps)[i][j].name
            )
          }
          key={"QuickMathsNavlink" + i + j}
        >
          <h1>{Object.values(educationalComps)[i][j].name}</h1>
        </div>
      );
    }
  }

  return (
    <div id="QuickMathsNav" className="subNav">
      <button
        id="leftScrollButton"
        className="scrollButton"
        onClick={() => {
          document.getElementById("navElems").scrollBy({
            left: -100,
            behavior: "smooth",
          });
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
      </button>
      <div id={"navElems"} className="navElems">
        {navLink}
      </div>
      <button
        id="rightScrollButton"
        className="scrollButton"
        onClick={() => {
          document.getElementById("navElems").scrollBy({
            left: 100,
            behavior: "smooth",
          });
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
      </button>
    </div>
  );
}

export default QuickMathsNav;
