import React, { useEffect } from "react";
import CookieManager from "../../Utils/CookieManager";
import "./style.scss";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.ts";

function Profile() {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    new CookieManager().setCookie(
      "Simpl1f1ed.com-viewedProfile",
      `${Date.now()}`,
      {
        expires: 365,
      }
    );
    if (!user) navigate("/");
    document.title = "Simpl1f1ed.com - Profile";

    return () => {
      document.title = "Simpl1f1ed.com";
    }
  }, [navigate, user]);

  return (
    <div id="Profile" className="page center">
      Coming Soon...
    </div>
  );
}

export default Profile;
