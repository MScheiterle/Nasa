import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CountdownClock from "./CountdownClock.jsx";
import { encode } from "base-64";
import "./style.scss";
import { addCustomFieldToUserByUID } from "../../../../firebase.ts";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "code";
const SCOPE =
  "user-top-read user-library-read user-modify-playback-state user-read-playback-state user-read-private";
const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
const base64Auth = encode(authString);

function SpotifyUserWidget({
  user,
  spotifyToken,
  updateTokens,
  spotifyRefreshToken,
  disconnect
}) {
  const [userName, setUserName] = useState("");
  const [spotifyTokenExpiration, setSpotifyTokenExpiration] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const expiration = localStorage.getItem("spotifyTokenExpiration");
    if (expiration) {
      setSpotifyTokenExpiration(parseInt(expiration));
    }
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      async function getTokensFromCode(code) {
        try {
          const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`,
            {
              headers: {
                Authorization: `Basic ${base64Auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          const accessToken = response.data.access_token;
          const refreshToken = response.data.refresh_token;
          const expirationTime = Date.now() + 60 * 55 * 1000;
          setSpotifyTokenExpiration(expirationTime);
          updateTokens(accessToken, expirationTime, refreshToken);
          setLoading(false);
        } catch (error) {
          if (error.response && error.response.status === 400) {
            console.error("Error obtaining access/refresh tokens: ", error);
          } else {
            throw error;
          }
        }
      }

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      window.history.replaceState({}, document.title, window.location.pathname);

      if (code) {
        getTokensFromCode(code);
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [updateTokens]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        `grant_type=refresh_token&refresh_token=${spotifyRefreshToken}&scope=${SCOPE}`,
        {
          headers: {
            Authorization: `Basic ${base64Auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = response.data.access_token;
      const expirationTime = Date.now() + 60 * 55 * 1000;
      setSpotifyTokenExpiration(expirationTime);
      updateTokens(accessToken, expirationTime, null);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.trace("Call stack trace:");
      } else {
        throw error;
      }
    }
  }, [spotifyRefreshToken, updateTokens]);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!user) {
        return;
      }

      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        });

        setUserName(data.display_name);
        addCustomFieldToUserByUID(
          null,
          "public",
          "SpotifyPublic",
          [data.display_name, data.external_urls.spotify, data.images[0].url],
        );
        setLoading(false);
      } catch {
        refreshAccessToken();
      }
    };

    if (spotifyToken) {
      getUserProfile();
    } else {
      setLoading(false);
    }
  }, [user, spotifyToken, refreshAccessToken]);

  return (
    <>
      {user ? (
        <div id="SpotifyUserWidget">
          <div className="spotifyConnection">
            {!loading && (
              <>
                {!spotifyToken ? (
                  <a
                    href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                    >
                      <path
                        fill="#1ed760"
                        d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
                      />
                      <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
                    </svg>
                    <span>Connect Spotify</span>
                  </a>
                ) : (
                  <>
                    <a
                      href="https://www.spotify.com/us/account/overview/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 496 512"
                      >
                        <path
                          fill="#1ed760"
                          d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
                        />
                        <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
                      </svg>
                      <span>{userName}</span>
                    </a>
                    <div onClick={() => disconnect()}>
                      Disconnect
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className="disclaimer">
            {!loading && (
              <>
                {spotifyToken ? (
                  <CountdownClock
                    refreshAccessToken={refreshAccessToken}
                    spotifyTokenExpiration={spotifyTokenExpiration}
                  />
                ) : (
                  <>
                    <div className="disclaimerMessage">
                      <div className="disclaimerTitle">Data Usage</div>
                      Data updates every 55 minutes.
                      <br />
                      only while this page is open.
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SpotifyUserWidget;
