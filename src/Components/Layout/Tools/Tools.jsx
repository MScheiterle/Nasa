import React, { useEffect } from "react";
import CookieManager from "../../Utils/CookieManager";
import "./style.scss";

function Tools() {
  useEffect(() => {
    new CookieManager().setCookie("Simpl1f1ed.com-viewedTools", `${Date.now()}`, {
      expires: 7,
    });
  }, []);

  return (
    <div id="Tools" className="page center">
      Coming Soon...
    </div>
  );
}

export default Tools;
