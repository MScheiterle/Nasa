import React, { useEffect } from "react";
import CookieManager from "../../Utils/CookieManager";
import "./style.scss";

function Tutorials() {
  useEffect(() => {
    new CookieManager().setCookie(
      "Simpl1f1ed.com-viewedTutorials",
      `${Date.now()}`,
      {
        expires: 7,
      }
    );
  }, []);

  return (
    <div id="Tutorials" className="page center">
      Coming Soon...
    </div>
  );
}

export default Tutorials;
