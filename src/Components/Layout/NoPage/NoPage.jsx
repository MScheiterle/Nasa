import React, { useEffect } from "react";
import "./style.css";

function NoPage() {

  useEffect(() => {
    document.title = "Simpl1f1ed.com - 404";

    return () => {
      document.title = "Simpl1f1ed.com";
    }
  }, [])

  return (
    <div id="NoPage" className="page center">
      <h1>404</h1>
      <p>We cant seem to find the page you're looking for...</p>
    </div>
  );
}

export default NoPage;
