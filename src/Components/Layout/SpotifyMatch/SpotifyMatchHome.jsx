import React, { useEffect } from "react";
import CookieManager from "../../Utils/CookieManager";
import SpotifyUserWidget from "./SpotifyUserWidget";

import "./styleHome.scss";

function SpotifyMatchHome(props) {
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
            {props.user ? (
              <SpotifyUserWidget
                user={props.user}
                spotifyToken={props.spotifyToken}
                updateTokens={props.updateTokens}
                spotifyTokenExpiration={props.spotifyTokenExpiration}
                spotifyRefreshToken={props.spotifyRefreshToken}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="menuButtons">
            <a href="SpotifyMatch/user_stats">
              <button>
                <span>View Your Data</span>
              </button>
            </a>
            <a href="SpotifyMatch/compare_data">
              <button>
                <span>Compare With Friends</span>
              </button>
            </a>
            <a href="SpotifyMatch/get_recommendations">
              <button>
                <span>Get Song Recommendations</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpotifyMatchHome;
