import React, { useEffect, useState } from "react";
import "./styleTimeSelection.scss"

function RenderTimeSelector(props) {
  const [windowHeightReq, setWindowHeightReq] = useState("");

  useEffect(() => {
    const elem = document.getElementById("timeSelection");

    if (elem) {
      function handleScroll() {
        const rect = elem.getBoundingClientRect();
        if (rect["top"] <= 90 && !elem.classList.contains("fixed")) {
          elem.classList.add("fixed");
          setWindowHeightReq(window.scrollY);
        } else if (
          window.scrollY < windowHeightReq &&
          elem.classList.contains("fixed")
        ) {
          elem.classList.remove("fixed");
        }
      }

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [windowHeightReq]);

  return (
    <div id="timeSelection">
      Data From: 
      <input
        type="radio"
        id="weeks"
        name="timeChoice"
        value="short_term"
        checked={props.timeSelected === "short_term"}
        onChange={props.handleTimeChange}
      />
      <label htmlFor="weeks">4 Weeks</label>
      <input
        type="radio"
        id="months"
        name="timeChoice"
        value="medium_term"
        checked={props.timeSelected === "medium_term"}
        onChange={props.handleTimeChange}
      />
      <label htmlFor="months">6 Months</label>
      <input
        type="radio"
        id="years"
        name="timeChoice"
        value="long_term"
        checked={props.timeSelected === "long_term"}
        onChange={props.handleTimeChange}
      />
      <label htmlFor="years">Several Years</label>
    </div>
  );
}

export default RenderTimeSelector;
