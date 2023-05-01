import React, { useEffect } from "react";
import CookieManager from "../../../Utils/CookieManager";
import { useNavigate } from "react-router-dom";

import "./style.scss";

function SpotifyMatchHome(props) {
  const navigate = useNavigate();

  useEffect(() => {
    new CookieManager().setCookie(
      "Simpl1f1ed.com-viewedSpotifyMatch",
      `${Date.now()}`,
      {
        expires: 7,
      }
    );
    document.title = "Simpl1f1ed.com - SpotifyMatch";

    return () => {
      document.title = "Simpl1f1ed.com";
    };
  }, []);

  return (
    <div id="SpotifyMatchHome">
      <div className="header page" id="Spotify Match Header">
        <div className="headerCard">
          <div className="title">Spotify Match</div>
          <div className="description">
            Get your <span>spotify stats</span> and compare them with{" "}
            <span>friends</span>
          </div>
          <div className="account">
            {!props.user ? (
              <p>
                <span>
                  <a href="/login">Login</a>
                </span>{" "}
                to connect your Spotify account
              </p>
            ) : (
              <p>Welcome, {props.name}!</p>
            )}
          </div>
          <div className="menuButtons">
            <button onClick={() => navigate("./user_stats")}>
              <span>View Your Data</span>
            </button>

            <button onClick={() => navigate("./compare_stats")}>
              <span>Compare With Friends</span>
            </button>

            <button onClick={() => navigate("./recommendations")}>
              <span>Get Recommendations</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpotifyMatchHome;
