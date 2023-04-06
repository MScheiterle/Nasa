import React, { useEffect } from "react";
import CookieManager from "../../Utils/CookieManager";
import "./style.scss";

function Projects() {
  useEffect(() => {
    new CookieManager().setCookie(
      "Simpl1f1ed.com-viewedProjects",
      `${Date.now()}`,
      {
        expires: 7,
      }
    );
  }, []);

  return (
    <div id="Projects" className="page center">
      Coming Soon...
    </div>
  );
}

export default Projects;
