import React, { useEffect } from "react";
import CookieManager from "../../Utils/CookieManager";
import "./style.scss";

function Profile() {
  useEffect(() => {
    new CookieManager().setCookie("Simpl1f1ed.com-viewedProfile", `${Date.now()}`, {
      expires: 365,
    });
  }, []);

  return (
    <div id="Profile" className="page center">
      Coming Soon...
    </div>
  );
}

export default Profile;
