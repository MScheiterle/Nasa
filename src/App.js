import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import World from "./Components/World/World";
import NoPage from "./Components/NoPage/NoPage";

function App() {
  useEffect(() => {
    // callback function to call when event triggers
    const onPageLoad = () => {
      setTimeout(() => {
        const ele = document.getElementById("loading-indicator");
        if (ele) {
          // fade out
          ele.classList.add("available");
          setTimeout(() => {
            // remove from DOM
            ele.outerHTML = "";
          }, 2000);
        }
      }, 1000);
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<World />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
